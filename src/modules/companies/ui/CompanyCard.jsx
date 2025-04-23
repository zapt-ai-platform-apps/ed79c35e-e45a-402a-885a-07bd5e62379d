import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api as reviewsApi } from '@/modules/reviews/api';
import * as Sentry from '@sentry/browser';

export const CompanyCard = ({ company }) => {
  const [stats, setStats] = useState({
    averageRating: 0,
    averagePaymentTime: 0,
    reviewCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviewStats = async () => {
      try {
        setLoading(true);
        const reviews = await reviewsApi.getReviews(company.id);
        
        if (reviews.length > 0) {
          const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
          const totalPaymentTime = reviews.reduce((sum, review) => sum + review.paymentTime, 0);
          
          setStats({
            averageRating: totalRating / reviews.length,
            averagePaymentTime: totalPaymentTime / reviews.length,
            reviewCount: reviews.length
          });
        }
      } catch (error) {
        console.error('Error fetching review stats:', error);
        Sentry.captureException(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewStats();
  }, [company.id]);

  return (
    <Link to={`/companies/${company.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-center mb-2">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
            {company.logoUrl ? (
              <img 
                src={company.logoUrl} 
                alt={`${company.name} logo`} 
                className="w-full h-full rounded-full object-cover" 
              />
            ) : (
              <span className="text-xl font-bold text-gray-500">
                {company.name.charAt(0)}
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{company.name}</h3>
        </div>
        
        <div className="mt-2 text-sm text-gray-600">
          {company.industry && (
            <div className="mb-1">Industry: {company.industry}</div>
          )}
        </div>
        
        {loading ? (
          <div className="mt-3 text-sm text-gray-500">Loading stats...</div>
        ) : (
          <>
            <div className="mt-3 flex justify-between items-center">
              <div className="flex items-center">
                <div className="flex items-center text-yellow-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star}
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-4 w-4 ${star <= stats.averageRating ? 'text-yellow-500' : 'text-gray-300'}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-1 text-sm text-gray-600">
                  {stats.averageRating.toFixed(1)}
                </span>
              </div>
              
              <div className="text-sm text-gray-600">
                <span className="font-medium">
                  {Math.round(stats.averagePaymentTime)} days
                </span> avg. payment
              </div>
            </div>
            
            <div className="mt-2 text-xs text-gray-500">
              {stats.reviewCount} reviews
            </div>
          </>
        )}
      </div>
    </Link>
  );
};