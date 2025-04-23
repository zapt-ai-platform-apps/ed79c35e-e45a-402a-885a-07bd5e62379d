import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserMenu } from '@/modules/auth/ui/UserMenu';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">PaymentLens</span>
            </Link>
            
            <div className="hidden md:flex ml-10 space-x-8">
              <Link to="/companies" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                Companies
              </Link>
              <Link to="/add-company" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                Add Company
              </Link>
              <Link to="/how-it-works" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                How It Works
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex items-center">
            <UserMenu />
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none cursor-pointer"
            >
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            to="/companies"
            className="block px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Companies
          </Link>
          <Link 
            to="/add-company"
            className="block px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Add Company
          </Link>
          <Link 
            to="/how-it-works"
            className="block px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            How It Works
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="px-4">
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};