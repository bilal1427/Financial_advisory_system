import React from 'react';
import Navbar from '../components/Navbar';

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4">
          <p>© {new Date().getFullYear()} FinAdvisor AI. Professional Personal Finance Advisory System.</p>
          <p className="mt-1 text-slate-600">Built with React 19, Spring Boot 3, and OpenAI GPT-4o.</p>
        </div>
      </footer>
    </div>
  );
}
