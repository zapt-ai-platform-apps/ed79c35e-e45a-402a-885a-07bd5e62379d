import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchBar = ({ initialValue = '', onSearch }) => {
  const [search, setSearch] = useState(initialValue);
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(search);
    } else {
      navigate(`/search?q=${encodeURIComponent(search)}`);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for companies..."
          className="w-full pl-10 pr-4 py-2 border box-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-gray-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button
          type="submit"
          className="absolute inset-y-0 right-0 px-4 text-white bg-blue-600 rounded-r-lg hover:bg-blue-700 cursor-pointer"
        >
          Search
        </button>
      </div>
    </form>
  );
};