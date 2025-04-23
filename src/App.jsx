import React from 'react';
import { Navbar } from '@/shared/components/Navbar';
import { AppProviders } from './app/AppProviders';
import { AppRoutes } from './app/routes';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <AppProviders>
        <header>
          <Navbar />
        </header>
        <main>
          <AppRoutes />
        </main>
        <footer className="bg-white p-6 text-center text-sm text-gray-600 border-t">
          <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 flex items-center justify-center gap-2">
            <span>Made on</span>
            <span className="font-semibold text-blue-600">ZAPT</span>
          </a>
        </footer>
      </AppProviders>
    </div>
  );
}