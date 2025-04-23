import { supabase } from '@/supabaseClient';

export const api = {
  getReviews: async (companyId) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(`/api/reviews?companyId=${companyId}`, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch reviews');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  },
  
  addReview: async (reviewData) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`
        },
        body: JSON.stringify(reviewData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add review');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  },
  
  deleteReview: async (reviewId) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(`/api/reviews?id=${reviewId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session?.access_token}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete review');
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting review:', error);
      throw error;
    }
  }
};