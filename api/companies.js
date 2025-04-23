import { companies } from '../drizzle/schema.js';
import { authenticateUser } from './_apiUtils.js';
import Sentry from './_sentry.js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq, like, asc, desc } from 'drizzle-orm';

export default async function handler(req, res) {
  console.log('Companies API called with method:', req.method);
  
  try {
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    
    // GET - fetch companies or a single company
    if (req.method === 'GET') {
      // Get a single company by ID
      if (req.query.id) {
        const companyId = parseInt(req.query.id);
        const result = await db.select()
          .from(companies)
          .where(eq(companies.id, companyId))
          .limit(1);
          
        if (result.length === 0) {
          return res.status(404).json({ error: 'Company not found' });
        }
        
        console.log(`Fetched company with ID ${companyId}`);
        return res.status(200).json(result[0]);
      }
      
      // Get all companies with optional filtering
      const { search, sort, order, limit = 20, offset = 0 } = req.query;
      
      let query = db.select().from(companies);
      
      // Apply search filter
      if (search) {
        query = query.where(like(companies.name, `%${search}%`));
      }
      
      // Apply sorting
      if (sort && ['name', 'createdAt'].includes(sort)) {
        const sortField = sort === 'name' ? companies.name : companies.createdAt;
        query = order === 'desc' ? query.orderBy(desc(sortField)) : query.orderBy(asc(sortField));
      } else {
        // Default sort by name ascending
        query = query.orderBy(asc(companies.name));
      }
      
      // Apply pagination
      query = query.limit(parseInt(limit)).offset(parseInt(offset));
      
      const result = await query;
      console.log(`Fetched ${result.length} companies`);
      
      return res.status(200).json(result);
    }
    
    // POST - add new company
    if (req.method === 'POST') {
      const user = await authenticateUser(req);
      const { name, description, industry, website } = req.body;
      
      if (!name) {
        return res.status(400).json({ error: 'Company name is required' });
      }
      
      const result = await db.insert(companies).values({
        name,
        description,
        industry,
        website,
        userId: user.id
      }).returning();
      
      console.log('Company created:', result[0].id);
      return res.status(201).json(result[0]);
    }
    
    // Handle other methods
    return res.status(405).json({ error: 'Method not allowed' });
    
  } catch (error) {
    console.error('Error in companies API:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}