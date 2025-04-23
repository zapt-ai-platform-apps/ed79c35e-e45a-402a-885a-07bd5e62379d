import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CompanyCard } from '@/modules/companies/ui/CompanyCard';
import { SearchBar } from '@/modules/search/ui/SearchBar';
import { api as companiesApi } from '@/modules/companies/api';
import * as Sentry from '@sentry/browser';

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const fetchCompanies = async (search = '') => {
    try {
      setLoading(true);
      const data = await companiesApi.getCompanies({ search });
      
      // TODO: Remove this mock data once backend is fully implemented
      const processedCompanies = data.length > 0 ? data : [
        {
          id: 1,
          name: "Acme Corporation",
          industry: "Technology",
          website: "https://example.com",
          averageRating: 4.2,
          averagePaymentTime: 45,
          reviewCount: 24
        },
        {
          id: 2,
          name: "Global Industries",
          industry: "Manufacturing",
          website: "https://example.com",
          averageRating: 3.5,
          averagePaymentTime: 65,
          reviewCount: 18
        },
        {
          id: 3,
          name: "Innovate Solutions",
          industry: "Consulting",
          website: "https://example.com",
          averageRating: 4.7,
          averagePaymentTime: 15,
          reviewCount: 32
        }
      ];
      
      setCompanies(processedCompanies);
    } catch (err) {
      console.error('Error fetching companies:', err);
      Sentry.captureException(err);
      setError('Failed to load companies. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchCompanies();
  }, []);
  
  const handleSearch = (term) => {
    setSearchTerm(term);
    fetchCompanies(term);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Companies</h1>
          
          <div className="mb-8">
            <SearchBar initialValue={searchTerm} onSearch={handleSearch} />
          </div>
          
          {loading ? (
            <div className="text-center py-10">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading companies...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center text-red-700">
              {error}
            </div>
          ) : companies.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h2 className="text-xl font-semibold mb-2">No companies found</h2>
              <p className="text-gray-600 mb-4">
                {searchTerm 
                  ? `No companies matching "${searchTerm}" were found.` 
                  : "There are no companies in our database yet."}
              </p>
              <Link 
                to="/add-company" 
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
              >
                Add a Company
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {companies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}