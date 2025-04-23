import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CompanyCard } from '@/modules/companies/ui/CompanyCard';
import { SearchBar } from '@/modules/search/ui/SearchBar';
import { api as companiesApi } from '@/modules/companies/api';
import * as Sentry from '@sentry/browser';

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchResults = async () => {
      if (!searchQuery.trim()) {
        setCompanies([]);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const data = await companiesApi.getCompanies({ search: searchQuery });
        setCompanies(data);
        setError(null);
      } catch (err) {
        console.error('Error searching companies:', err);
        Sentry.captureException(err, {
          extra: { searchQuery, context: 'searchResults' }
        });
        setError('Failed to load search results. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchResults();
  }, [searchQuery]);
  
  const handleSearch = (term) => {
    // This is handled by the form's native navigation
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {searchQuery ? `Results for "${searchQuery}"` : 'Search Results'}
          </h1>
          
          <div className="mb-8">
            <SearchBar initialValue={searchQuery} />
          </div>
          
          {loading ? (
            <div className="text-center py-10">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Searching companies...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center text-red-700">
              {error}
            </div>
          ) : companies.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h2 className="text-xl font-semibold mb-2">No companies found</h2>
              <p className="text-gray-600 mb-4">
                {searchQuery 
                  ? `No companies matching "${searchQuery}" were found.` 
                  : "Enter a search term to find companies."}
              </p>
              <div className="flex justify-center space-x-4">
                <Link 
                  to="/companies" 
                  className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 cursor-pointer"
                >
                  Browse All Companies
                </Link>
                <Link 
                  to="/add-company" 
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
                >
                  Add a Company
                </Link>
              </div>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-6">Found {companies.length} {companies.length === 1 ? 'company' : 'companies'}</p>
              <div className="grid md:grid-cols-2 gap-6">
                {companies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}