import React, { useState } from 'react';
import { api as reviewsApi } from '../api';
import * as Sentry from '@sentry/browser';

export function ReviewForm({ companyId, onReviewAdded }) {
  const [formData, setFormData] = useState({
    paymentTime: '',
    rating: 3,
    comment: '',
    amount: '',
    anonymous: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleRatingChange = (newRating) => {
    setFormData(prev => ({
      ...prev,
      rating: newRating
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      
      // Don't parse company ID to preserve precision for large numbers
      const reviewData = {
        companyId: companyId,
        paymentTime: formData.paymentTime,
        rating: formData.rating,
        comment: formData.comment,
        amount: formData.amount || undefined,
        anonymous: formData.anonymous
      };
      
      console.log('Submitting review data:', reviewData);
      
      const newReview = await reviewsApi.addReview(reviewData);
      setSuccess(true);
      
      // Reset form
      setFormData({
        paymentTime: '',
        rating: 3,
        comment: '',
        amount: '',
        anonymous: false
      });
      
      // Notify parent component
      if (onReviewAdded) {
        onReviewAdded(newReview);
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      
    } catch (err) {
      console.error('Error submitting review:', err);
      Sentry.captureException(err, {
        extra: { companyId, context: 'ReviewForm.handleSubmit' }
      });
      setError(err.message || 'Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const StarRating = ({ rating, onRatingChange }) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className="text-2xl focus:outline-none cursor-pointer"
            aria-label={`Rate ${star} stars`}
          >
            <span className={star <= rating ? 'text-yellow-500' : 'text-gray-300'}>★</span>
          </button>
        ))}
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Share Your Experience</h2>
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-200 text-green-800 rounded-md">
          Your review has been submitted successfully!
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-800 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="paymentTime">
              How long did they take to pay? (days) *
            </label>
            <input
              type="number"
              id="paymentTime"
              name="paymentTime"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 box-border"
              value={formData.paymentTime}
              onChange={handleChange}
              min="1"
              max="365"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="amount">
              Invoice amount (optional)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 box-border"
              value={formData.amount}
              onChange={handleChange}
              min="1"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-gray-700 font-medium mb-2">
            Rate your overall experience *
          </label>
          <StarRating
            rating={formData.rating}
            onRatingChange={handleRatingChange}
          />
        </div>
        
        <div className="mt-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="comment">
            Additional comments
          </label>
          <textarea
            id="comment"
            name="comment"
            rows="3"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 box-border"
            value={formData.comment}
            onChange={handleChange}
          ></textarea>
        </div>
        
        <div className="mt-4 flex items-center">
          <input
            type="checkbox"
            id="anonymous"
            name="anonymous"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={formData.anonymous}
            onChange={handleChange}
          />
          <label htmlFor="anonymous" className="ml-2 block text-gray-700">
            Submit anonymously
          </label>
        </div>
        
        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 cursor-pointer"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Submitting...
              </div>
            ) : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  );
}