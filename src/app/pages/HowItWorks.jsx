import React from 'react';
import { Link } from 'react-router-dom';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">How PaymentLens Works</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Why We Created PaymentLens
            </h2>
            <p className="text-gray-700 mb-4">
              Late payments are a significant issue for freelancers and small businesses. According to studies, 
              freelancers spend an average of 20 days per year chasing late payments, and 43% of invoices are paid late.
            </p>
            <p className="text-gray-700">
              PaymentLens provides transparency around payment practices, helping you make informed decisions about 
              which clients to work with and how to structure your payment terms.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              How to Use PaymentLens
            </h2>
            
            <div className="space-y-6">
              <div className="flex">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                  <span className="font-semibold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Search for Companies</h3>
                  <p className="text-gray-700">
                    Before working with a new client, search for them on PaymentLens to see their payment history. 
                    You can browse companies or use our search function to find specific businesses.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                  <span className="font-semibold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Check Payment Metrics</h3>
                  <p className="text-gray-700">
                    Each company profile shows average payment times, ratings, and detailed reviews from other 
                    freelancers and businesses. This gives you insight into what to expect when working with them.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                  <span className="font-semibold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Share Your Experience</h3>
                  <p className="text-gray-700">
                    After working with a company, share your experience by submitting a review. Include details 
                    like payment time, rating, and comments about your experience. You can post anonymously if you prefer.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                  <span className="font-semibold">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Add New Companies</h3>
                  <p className="text-gray-700">
                    If a company isn't in our database yet, you can add them. This helps build our community 
                    resource and allows others to share their experiences with that company.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Using Payment Data to Protect Yourself
            </h2>
            
            <p className="text-gray-700 mb-4">
              Based on the data you find on PaymentLens, here are some strategies to protect yourself:
            </p>
            
            <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-4">
              <li>Request upfront deposits from companies with poor payment histories</li>
              <li>Set shorter payment terms (Net 15 instead of Net 30)</li>
              <li>Include late payment fees in your contracts</li>
              <li>Consider payment schedules tied to project milestones</li>
              <li>Use legally binding contracts with clear payment terms</li>
            </ul>
            
            <p className="text-gray-700">
              By making data-driven decisions, you can reduce your risk of late payments and improve your cash flow.
            </p>
          </div>
          
          <div className="text-center">
            <Link 
              to="/companies" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 cursor-pointer"
            >
              Start Exploring Companies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}