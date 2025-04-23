import React, { useState } from 'react';
import { api as reviewsApi } from '../api';
import * as Sentry from '@sentry/browser';

export const ReviewForm = ({ companyId, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [paymentTime, setPaymentTime] = useState('');
  const [comment, setComment] = useState('');
  const [amount, setAmount] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitSuccess(false);
    
    if (!rating) {
      setError('Please provide a rating');
      return;
    }
    
    if (!paymentTime) {
      setError('Please enter how many days it took to get paid');
      return;
    }
    
    try {
      setLoading(true);
      
      const reviewData = {
        companyId,
        rating,
        paymentTime: parseInt(paymentTime),
        comment: comment.trim() || null,
        amount: amount ? parseInt(amount) : null,
        anonymous
      };
      
      console.log('Submitting review for company:', companyId);
      const newReview = await reviewsApi.addReview(reviewData);
      
      // Reset form
      setRating(0);
      setPaymentTime('');
      setComment('');
      setAmount('');
      setAnonymous(false);
      setSubmitSuccess(true);
      
      if (onReviewAdded) {
        onReviewAdded(newReview);
      }
      
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
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Share Your Experience</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {submitSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          Your review has been submitted successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Rating
          </label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="text-2xl focus:outline-none cursor-pointer"
              >
                <span className={star <= rating ? 'text-yellow-500' : 'text-gray-300'}>
                  ★
                </span>
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {rating ? `${rating} stars` : 'Select rating'}
            </span>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="paymentTime">
            Days to Payment
          </label>
          <input
            type="number"
            id="paymentTime"
            value={paymentTime}
            onChange={(e) => setPaymentTime(e.target.value)}
            className="w-full px-3 py-2 border box-border rounded-md"
            placeholder="e.g. 30, 60, 90"
            min="0"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="amount">
            Invoice Amount (optional)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
              $
            </span>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-8 pr-3 py-2 border box-border rounded-md"
              placeholder="Amount in USD"
              min="0"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="comment">
            Comments (optional)
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 border box-border rounded-md"
            rows="3"
            placeholder="Share your experience with this company's payment practices"
          ></textarea>
        </div>
        
        <div className="mb-5">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Post anonymously</span>
          </label>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};