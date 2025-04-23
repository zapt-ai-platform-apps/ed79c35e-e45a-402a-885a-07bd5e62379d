import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '@/modules/search/ui/SearchBar';
import { useAuth } from '@/modules/auth/internal/state';

export default function HomePage() {
  const { user } = useAuth();
  
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0">
            <path fill="#fff" fillOpacity="1" d="M0,224L60,229.3C120,235,240,245,360,234.7C480,224,600,192,720,192C840,192,960,224,1080,218.7C1200,213,1320,171,1380,149.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </div>
        <div className="absolute inset-0">
          <svg className="absolute right-0 top-0 h-full w-1/2 translate-x-1/2 transform opacity-20" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)" fill="#FFFFFF" stroke="none">
              <path d="M1720 4574 c-19 -14 -67 -57 -107 -95 -40 -39 -91 -86 -114 -105 -23 -19 -81 -73 -130 -120 -49 -47 -121 -114 -159 -149 -39 -35 -93 -86 -120 -113 -28 -27 -73 -72 -100 -99 -28 -28 -73 -77 -100 -110 -28 -33 -73 -87 -100 -119 -58 -67 -110 -150 -110 -175 0 -25 29 -60 51 -60 15 0 35 18 67 60 24 33 65 87 92 120 26 33 73 89 104 125 31 36 89 99 130 140 41 41 107 106 146 145 40 38 93 88 119 110 25 22 79 71 119 110 40 38 96 89 124 113 28 24 66 58 85 75 39 37 109 77 135 77 25 0 58 -36 58 -62 0 -14 -21 -42 -57 -78 -32 -31 -86 -84 -120 -117 -35 -33 -93 -90 -130 -126 -38 -37 -97 -94 -133 -128 -36 -34 -97 -94 -136 -133 -39 -40 -95 -97 -124 -127 -50 -53 -114 -124 -195 -217 -25 -28 -54 -63 -66 -77 -11 -14 -43 -50 -70 -80 -27 -30 -67 -77 -89 -105 -22 -27 -53 -65 -70 -83 -16 -19 -33 -42 -36 -50 -9 -24 13 -67 38 -74 31 -8 56 9 153 107 48 49 107 107 131 130 24 22 76 71 115 110 40 38 92 89 116 112 25 23 77 73 116 111 40 39 92 89 116 112 24 23 76 73 116 111 39 38 90 86 112 107 22 20 73 68 113 105 86 80 103 89 149 76 45 -14 57 -41 36 -84 -8 -17 -43 -57 -76 -89 -84 -81 -113 -110 -198 -193 -43 -41 -105 -102 -138 -135 -33 -32 -86 -84 -118 -115 -31 -31 -84 -83 -117 -115 -33 -32 -83 -81 -111 -110 -29 -29 -76 -76 -105 -105 -29 -29 -72 -74 -96 -100 -24 -26 -69 -77 -100 -113 -41 -48 -63 -82 -73 -115 -13 -45 -13 -49 6 -70 25 -28 66 -42 99 -34 13 4 68 49 123 102 54 52 121 117 149 144 28 27 74 71 102 98 28 28 84 80 124 117 39 37 93 88 118 114 26 25 81 76 122 114 41 37 93 85 115 105 22 21 74 69 115 106 41 38 95 87 118 109 24 22 75 67 113 100 86 75 123 93 161 77 32 -13 43 -42 31 -82 -4 -15 -45 -61 -94 -104 -47 -42 -98 -90 -114 -105 -15 -16 -70 -70 -120 -120 -51 -50 -111 -111 -134 -135 -22 -24 -73 -78 -112 -120 -40 -41 -99 -104 -132 -139 -33 -35 -78 -88 -101 -117 -58 -75 -69 -134 -28 -160 49 -33 76 -15 188 121 101 123 162 195 211 250 28 30 201 207 273 280 28 28 76 73 108 100 31 28 83 73 115 100 70 61 139 114 180 137 46 26 78 17 127 -36 35 -38 36 -40 36 -120 -1 -73 -4 -87 -33 -134 -44 -72 -91 -121 -257 -268 -198 -176 -197 -175 -300 -274 -54 -52 -122 -120 -152 -152 -42 -44 -59 -71 -72 -114 -24 -82 -12 -127 45 -168 36 -27 38 -27 177 -27 170 0 193 7 372 105 166 91 256 150 315 205 62 59 113 123 160 204 50 87 71 153 76 248 4 60 10 90 25 113 27 42 25 102 -5 151 -13 22 -49 64 -79 93 -69 67 -98 71 -153 21 -21 -19 -63 -50 -93 -68 -45 -28 -64 -33 -125 -36 -65 -4 -75 -2 -105 21 -19 14 -51 47 -72 74 -35 46 -39 56 -42 120 -2 45 1 84 11 112 14 42 40 78 53 78 5 0 27 -24 50 -52 50 -62 99 -83 177 -76 92 7 139 31 238 119 109 96 120 114 120 198 0 89 -44 121 -175 128 -116 6 -229 -11 -317 -49 -54 -23 -209 -120 -213 -134 -5 -13 -6 -12 -13 1 -4 8 -14 15 -22 15 -31 0 -114 -91 -148 -162 -32 -66 -58 -180 -51 -227 5 -35 40 -91 62 -98 11 -4 17 -1 17 9 0 8 14 40 30 70 50 93 90 118 232 147 50 10 85 12 146 4 94 -11 154 -44 188 -102 45 -78 28 -155 -47 -211 -55 -41 -129 -70 -194 -76 -105 -10 -158 35 -220 187 -26 63 -72 108 -129 125 -72 21 -143 5 -240 -54 -91 -55 -116 -78 -116 -107 0 -26 27 -45 61 -45 19 0 54 16 100 45 96 62 143 71 211 42 19 -8 36 -24 44 -41 12 -25 12 -30 -5 -52 -24 -31 -114 -82 -192 -108 -84 -28 -215 -25 -291 7 -59 26 -130 74 -158 108 -18 23 -19 28 -7 65 19 58 63 98 155 139 131 60 171 69 292 70 61 0 122 -4 135 -8 52 -18 115 -71 142 -120 15 -27 35 -62 45 -77 23 -37 77 -60 133 -60 62 0 101 13 158 53 55 39 77 93 77 190 0 141 -42 281 -121 407 -19 30 -94 114 -119 134 -27 21 -60 8 -100 -40 -54 -64 -60 -63 -12 3 58 80 58 147 0 205 -52 52 -118 58 -169 15z"></path>
            </g>
          </svg>
        </div>
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-500 bg-opacity-30 text-white text-sm font-medium">
                <span className="mr-2 flex h-2 w-2">
                  <span className="animate-ping absolute h-2 w-2 rounded-full bg-white opacity-75"></span>
                  <span className="relative rounded-full h-2 w-2 bg-white"></span>
                </span>
                The payment insights platform for freelancers & businesses
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Know <span className="text-yellow-300">Before</span> You Invoice
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light">
              Find companies that pay their invoices on time and avoid those that don't. 
              Real payment data from real experiences.
            </p>
            
            <div className="max-w-2xl mx-auto mb-10 rounded-xl shadow-2xl bg-white bg-opacity-10 backdrop-blur-sm p-2">
              <SearchBar />
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              <Link
                to="/companies"
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-medium hover:bg-blue-50 transform transition hover:scale-105 shadow-lg cursor-pointer flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Browse Companies
              </Link>
              {!user && (
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transform transition hover:scale-105 shadow-lg cursor-pointer flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                  </svg>
                  Sign Up to Review
                </Link>
              )}
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#fff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,165.3C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How PaymentLens Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Empowering freelancers and businesses with real payment insights</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center transform transition hover:scale-105 border border-gray-100">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Find Companies</h3>
            <p className="text-gray-600 leading-relaxed">
              Search for companies you're considering working with to see their payment history and reviews from other professionals.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center transform transition hover:scale-105 border border-gray-100 md:translate-y-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Share Your Experience</h3>
            <p className="text-gray-600 leading-relaxed">
              Add your own payment experiences with clients and help build a transparent community of payment data.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center transform transition hover:scale-105 border border-gray-100">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Make Informed Decisions</h3>
            <p className="text-gray-600 leading-relaxed">
              Use real payment data to decide which clients to take on and set appropriate payment terms to protect your business.
            </p>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to get paid on time?</h2>
            <p className="text-xl mb-10">
              Join PaymentLens today and make informed decisions about who you work with.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                to="/companies"
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-medium hover:bg-blue-50 transform transition hover:scale-105 shadow-lg cursor-pointer"
              >
                Browse Companies
              </Link>
              {!user && (
                <Link
                  to="/login"
                  className="bg-indigo-500 text-white px-8 py-4 rounded-lg font-medium hover:bg-indigo-600 transform transition hover:scale-105 shadow-lg border border-indigo-400 cursor-pointer"
                >
                  Sign Up Free
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* ZAPT Badge - only needed in App.jsx, removed duplicate here */}
    </div>
  );
}