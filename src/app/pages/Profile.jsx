import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/modules/auth/internal/state';
import { api as reviewsApi } from '@/modules/reviews/api';
import * as Sentry from '@sentry/browser';

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchUserReviews = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const userReviews = await reviewsApi.getUserReviews(user.id);
        setReviews(userReviews);
      } catch (err) {
        console.error('Error fetching user reviews:', err);
        Sentry.captureException(err);
        setError('Failed to load your reviews. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserReviews();
  }, [user]);
  
  const handleDeleteReview = async (reviewId) => {
    try {
      await reviewsApi.deleteReview(reviewId);
      setReviews(reviews.filter(review => review.id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
      Sentry.captureException(error);
      alert('Failed to delete review. Please try again.');
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Profile</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold mr-4">
                {user?.email?.[0].toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {user?.email}
                </h2>
                <p className="text-gray-600 text-sm">
                  Member since {new Date(user?.created_at || Date.now()).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex">
              <button
                onClick={signOut}
                className="text-red-600 hover:text-red-800 text-sm cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Reviews</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your reviews...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center text-red-700">
              {error}
            </div>
          ) : reviews.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-600 mb-4">You haven't submitted any reviews yet.</p>
              <Link 
                to="/companies" 
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
              >
                Browse Companies to Review
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map(review => (
                <div key={review.id} className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex justify-between items-start">
                    <Link to={`/companies/${review.company_id}`} className="text-lg font-semibold text-blue-600 hover:underline">
                      {review.company_name}
                    </Link>
                    <div className="text-sm text-gray-500">
                      {formatDate(review.created_at)}
                    </div>
                  </div>
                  
                  <div className="mt-2 flex items-center">
                    <div className="flex text-yellow-500">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg 
                          key={star}
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-700">
                      Paid in <span className="font-medium">{review.payment_time} days</span>
                    </span>
                  </div>
                  
                  {review.comment && (
                    <div className="mt-2 text-gray-700">
                      {review.comment}
                    </div>
                  )}
                  
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="text-xs text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      Delete Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}