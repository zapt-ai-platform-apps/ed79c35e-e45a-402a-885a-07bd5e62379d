import React from 'react';
import { useAuth } from '@/modules/auth/internal/state';
import { api as reviewsApi } from '../api';

export const ReviewList = ({ reviews, onReviewDeleted }) => {
  const { user } = useAuth();
  
  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
        No reviews yet. Be the first to share your experience!
      </div>
    );
  }
  
  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await reviewsApi.deleteReview(reviewId);
        if (onReviewDeleted) {
          onReviewDeleted(reviewId);
        }
      } catch (error) {
        console.error('Error deleting review:', error);
        alert('Failed to delete review. Please try again.');
      }
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
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center mb-1">
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
              
              <div className="text-sm font-medium">
                Paid in <span className="text-blue-600">{review.paymentTime} days</span>
                {review.amount && (
                  <span className="ml-2 text-gray-600">
                    | Invoice: ${review.amount.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
            
            <div className="text-xs text-gray-500">
              {formatDate(review.createdAt)}
            </div>
          </div>
          
          {review.comment && (
            <div className="mt-2 text-gray-700">
              {review.comment}
            </div>
          )}
          
          <div className="mt-3 flex justify-between items-center">
            <div className="text-xs text-gray-500">
              {review.anonymous ? 'Anonymous' : 'Verified User'}
            </div>
            
            {user && review.userId === user.id && (
              <button
                onClick={() => handleDeleteReview(review.id)}
                className="text-xs text-red-600 hover:text-red-800 cursor-pointer"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};