import { reviews, companies } from '../drizzle/schema.js';
import { authenticateUser } from './_apiUtils.js';
import Sentry from './_sentry.js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq, and, asc, desc } from 'drizzle-orm';

export default async function handler(req, res) {
  console.log('Reviews API called with method:', req.method);
  
  try {
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    
    // GET - fetch reviews for a company or user
    if (req.method === 'GET') {
      // Get reviews for a specific user
      if (req.query.userId) {
        const user = await authenticateUser(req);
        
        // Only allow users to get their own reviews
        if (user.id !== req.query.userId) {
          return res.status(403).json({ error: 'Not authorized to view these reviews' });
        }
        
        // Using the correct postgres.js syntax for raw queries
        // With postgres.js, you call the client directly as a tagged template literal
        const userReviews = await client`
          SELECT r.*, c.name as company_name
          FROM reviews r
          JOIN companies c ON r.company_id = c.id
          WHERE r.user_id = ${user.id}
          ORDER BY r.created_at DESC
        `;
        
        console.log(`Fetched ${userReviews.length} reviews for user ${user.id}`);
        return res.status(200).json(userReviews);
      }
      
      // Get reviews for a specific company
      if (req.query.companyId) {
        // Use the companyId as-is without parseInt to preserve precision for large numbers
        const companyId = req.query.companyId;
        
        const result = await db.select()
          .from(reviews)
          .where(eq(reviews.companyId, companyId))
          .orderBy(desc(reviews.createdAt));
        
        console.log(`Fetched ${result.length} reviews for company ${companyId}`);
        return res.status(200).json(result);
      }
      
      return res.status(400).json({ error: 'Company ID or User ID is required' });
    }
    
    // POST - add new review
    if (req.method === 'POST') {
      const user = await authenticateUser(req);
      const { companyId, paymentTime, rating, comment, amount, anonymous } = req.body;
      
      console.log('Review submission received for company ID:', companyId);
      
      if (!companyId || !paymentTime || !rating) {
        return res.status(400).json({ 
          error: 'Company ID, payment time, and rating are required' 
        });
      }
      
      // Don't parse the company ID to preserve precision
      if (!companyId) {
        return res.status(400).json({ error: 'Invalid company ID format' });
      }
      
      // Check if company exists
      console.log('Checking if company exists for ID:', companyId);
      const company = await db.select()
        .from(companies)
        .where(eq(companies.id, companyId))
        .limit(1);
      
      console.log('Company query result:', company);
      
      if (company.length === 0) {
        console.log('Company not found for ID:', companyId);
        return res.status(404).json({ error: 'Company not found' });
      }
      
      const result = await db.insert(reviews).values({
        companyId: companyId,
        userId: user.id,
        paymentTime: parseInt(paymentTime),
        rating: parseInt(rating),
        comment,
        amount: amount ? parseInt(amount) : null,
        anonymous: !!anonymous
      }).returning();
      
      console.log('Review created:', result[0].id);
      return res.status(201).json(result[0]);
    }
    
    // DELETE - remove a review
    if (req.method === 'DELETE') {
      const user = await authenticateUser(req);
      const { id } = req.query;
      
      if (!id) {
        return res.status(400).json({ error: 'Review ID is required' });
      }
      
      // Check if review exists and belongs to user
      const existingReview = await db.select()
        .from(reviews)
        .where(
          and(
            eq(reviews.id, parseInt(id)),
            eq(reviews.userId, user.id)
          )
        )
        .limit(1);
      
      if (existingReview.length === 0) {
        return res.status(404).json({ 
          error: 'Review not found or you do not have permission to delete it' 
        });
      }
      
      await db.delete(reviews)
        .where(eq(reviews.id, parseInt(id)));
      
      console.log('Review deleted:', id);
      return res.status(200).json({ message: 'Review deleted successfully' });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
    
  } catch (error) {
    console.error('Error in reviews API:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}