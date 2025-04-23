import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '@/modules/search/ui/SearchBar';
import { useAuth } from '@/modules/auth/internal/state';

export default function HomePage() {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Know Before You Invoice
            </h1>
            <p className="text-xl mb-8">
              Find companies that pay their invoices on time and avoid those that don't
            </p>
            
            <div className="max-w-xl mx-auto">
              <SearchBar />
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/companies"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 cursor-pointer"
              >
                Browse Companies
              </Link>
              {!user && (
                <Link
                  to="/login"
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 cursor-pointer"
                >
                  Sign Up to Review
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How PaymentLens Works</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Find Companies</h3>
            <p className="text-gray-600">
              Search for companies you're considering working with to see their payment history
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Review Payment Experience</h3>
            <p className="text-gray-600">
              Share your experiences with getting paid by companies you've worked with
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Make Informed Decisions</h3>
            <p className="text-gray-600">
              Use real payment data to decide which clients to take on and how to protect yourself
            </p>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-4">
              <div className="text-4xl font-bold text-blue-600 mb-2">30+</div>
              <div className="text-gray-600">Days average payment time</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-blue-600 mb-2">45%</div>
              <div className="text-gray-600">Of invoices paid late</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Companies reviewed</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Made on ZAPT Badge */}
      <div className="text-center py-8">
        <a 
          href="https://www.zapt.ai" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block text-gray-600 hover:text-gray-800"
        >
          Made on ZAPT
        </a>
      </div>
    </div>
  );
}