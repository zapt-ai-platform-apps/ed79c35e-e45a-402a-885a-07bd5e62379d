import { supabase } from '@/supabaseClient';
import * as Sentry from '@sentry/browser';

export const api = {
  getCompanies: async (options = {}) => {
    const { search, sort, order, limit = 20, offset = 0 } = options;
    
    try {
      const { data: session } = await supabase.auth.getSession();
      
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (sort) params.append('sort', sort);
      if (order) params.append('order', order);
      if (limit) params.append('limit', limit.toString());
      if (offset) params.append('offset', offset.toString());
      
      const response = await fetch(`/api/companies?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${session?.session?.access_token}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch companies');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching companies:', error);
      Sentry.captureException(error, {
        extra: { context: 'getCompanies' }
      });
      throw error;
    }
  },
  
  getCompany: async (companyId) => {
    try {
      console.log(`Requesting company with ID: ${companyId}`);
      const { data: session } = await supabase.auth.getSession();
      
      const response = await fetch(`/api/companies?id=${companyId}`, {
        headers: {
          Authorization: `Bearer ${session?.session?.access_token}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error(`API error response:`, errorData);
        throw new Error(errorData.error || 'Failed to fetch company');
      }
      
      const data = await response.json();
      console.log(`Successfully fetched company data:`, data);
      return data;
    } catch (error) {
      console.error(`Error fetching company with ID ${companyId}:`, error);
      Sentry.captureException(error, {
        extra: { companyId, context: 'getCompany' }
      });
      throw error;
    }
  },
  
  addCompany: async (companyData) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch('/api/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`
        },
        body: JSON.stringify(companyData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add company');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding company:', error);
      Sentry.captureException(error, {
        extra: { companyData, context: 'addCompany' }
      });
      throw error;
    }
  }
};