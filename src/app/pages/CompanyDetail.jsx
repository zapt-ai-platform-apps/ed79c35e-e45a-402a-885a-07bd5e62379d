import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api as companiesApi } from '@/modules/companies/api';
import { api as reviewsApi } from '@/modules/reviews/api';
import { ReviewForm } from '@/modules/reviews/ui/ReviewForm';
import { ReviewList } from '@/modules/reviews/ui/ReviewList';
import { useAuth } from '@/modules/auth/internal/state';
import * as Sentry from '@sentry/browser';

export default function CompanyDetailPage() {
  const { companyId } = useParams();
  const { user, loading: authLoading } = useAuth();
  const [company, setCompany] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    averageRating: 0,
    averagePaymentTime: 0,
    reviewCount: 0
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log(`Fetching data for company ID: ${companyId}`);
        
        // Fetch company data
        const companyData = await companiesApi.getCompany(companyId);
        setCompany(companyData);
        
        // Fetch reviews
        const reviewsData = await reviewsApi.getReviews(companyId);
        setReviews(reviewsData);
        
        // Calculate stats
        if (reviewsData.length > 0) {
          const totalRating = reviewsData.reduce((sum, review) => sum + review.rating, 0);
          const totalPaymentTime = reviewsData.reduce((sum, review) => sum + review.paymentTime, 0);
          
          setStats({
            averageRating: totalRating / reviewsData.length,
            averagePaymentTime: totalPaymentTime / reviewsData.length,
            reviewCount: reviewsData.length
          });
        }
      } catch (err) {
        console.error('Error fetching company data:', err);
        Sentry.captureException(err, {
          extra: { companyId, context: 'CompanyDetail.fetchData' }
        });
        setError('Failed to load company data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    if (companyId) {
      fetchData();
    }
  }, [companyId]);
  
  const handleReviewAdded = (newReview) => {
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    
    // Update stats
    const totalRating = updatedReviews.reduce((sum, review) => sum + review.rating, 0);
    const totalPaymentTime = updatedReviews.reduce((sum, review) => sum + review.paymentTime, 0);
    
    setStats({
      averageRating: totalRating / updatedReviews.length,
      averagePaymentTime: totalPaymentTime / updatedReviews.length,
      reviewCount: updatedReviews.length
    });
  };
  
  const handleReviewDeleted = (reviewId) => {
    const updatedReviews = reviews.filter(review => review.id !== reviewId);
    setReviews(updatedReviews);
    
    if (updatedReviews.length > 0) {
      const totalRating = updatedReviews.reduce((sum, review) => sum + review.rating, 0);
      const totalPaymentTime = updatedReviews.reduce((sum, review) => sum + review.paymentTime, 0);
      
      setStats({
        averageRating: totalRating / updatedReviews.length,
        averagePaymentTime: totalPaymentTime / updatedReviews.length,
        reviewCount: updatedReviews.length
      });
    } else {
      setStats({
        averageRating: 0,
        averagePaymentTime: 0,
        reviewCount: 0
      });
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading company data...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link to="/companies" className="text-blue-600 hover:underline">
            Go back to companies
          </Link>
        </div>
      </div>
    );
  }
  
  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Company Not Found</h2>
          <p className="text-gray-600 mb-4">Sorry, we couldn't find the company you're looking for.</p>
          <Link to="/companies" className="text-blue-600 hover:underline">
            Go back to companies
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link to="/companies" className="text-blue-600 hover:underline">
              ← Back to all companies
            </Link>
          </div>
          
          {/* Company Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-start">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                {company.logoUrl ? (
                  <img 
                    src={company.logoUrl} 
                    alt={`${company.name} logo`} 
                    className="w-full h-full rounded-full object-cover" 
                  />
                ) : (
                  <span className="text-2xl font-bold text-gray-500">
                    {company.name?.[0]}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-1">{company.name}</h1>
                {company.industry && (
                  <div className="text-gray-600 mb-2">{company.industry}</div>
                )}
                {company.website && (
                  <a 
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm inline-flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Visit website
                  </a>
                )}
              </div>
            </div>
            
            {company.description && (
              <div className="mt-4 text-gray-700">
                {company.description}
              </div>
            )}
            
            <div className="mt-6 grid grid-cols-3 divide-x divide-gray-200">
              <div className="text-center px-2">
                <div className="text-2xl font-bold text-gray-800">{stats.averageRating.toFixed(1)}</div>
                <div className="text-sm text-gray-600">Avg. Rating</div>
              </div>
              <div className="text-center px-2">
                <div className="text-2xl font-bold text-gray-800">{Math.round(stats.averagePaymentTime)} days</div>
                <div className="text-sm text-gray-600">Avg. Payment Time</div>
              </div>
              <div className="text-center px-2">
                <div className="text-2xl font-bold text-gray-800">{stats.reviewCount}</div>
                <div className="text-sm text-gray-600">Reviews</div>
              </div>
            </div>
          </div>
          
          {/* Review Form - only show if user is logged in */}
          {user ? (
            <div className="mb-6">
              <ReviewForm 
                companyId={parseInt(companyId)}
                onReviewAdded={handleReviewAdded}
              />
            </div>
          ) : !authLoading && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-center">
              <p className="text-blue-800 mb-2">Want to share your experience with this company?</p>
              <Link 
                to="/login" 
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
              >
                Log in to write a review
              </Link>
            </div>
          )}
          
          {/* Reviews */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {stats.reviewCount > 0 
                ? `${stats.reviewCount} Reviews for ${company.name}`
                : `No reviews yet for ${company.name}`}
            </h2>
            <ReviewList 
              reviews={reviews}
              onReviewDeleted={handleReviewDeleted}
            />
          </div>
        </div>
      </div>
    </div>
  );
}