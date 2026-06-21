import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Landmark, LayoutDashboard, History, ClipboardCheck, LogOut, User as UserIcon } from 'lucide-react';
import { api } from '../services/api';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    // Check local storage session periodically or on mount
    const activeUser = api.getUserSession();
    setUser(activeUser);
  }, [location]);

  const handleLogout = () => {
    api.clearUserSession();
    setUser({ name: '', email: '' });
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 text-indigo-400 font-extrabold text-xl tracking-tight">
              <Landmark className="h-6 w-6 text-indigo-400" />
              <span>Fin<span className="text-emerald-400">Advisor</span></span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/') ? 'bg-indigo-600/10 text-indigo-400' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Home
            </Link>
            
            {user.email && (
              <>
                <Link
                  to="/assessment"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/assessment') ? 'bg-indigo-600/10 text-indigo-400' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <ClipboardCheck className="h-4 w-4" />
                  New Assessment
                </Link>

                <Link
                  to="/dashboard"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/dashboard') ? 'bg-indigo-600/10 text-indigo-400' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>

                <Link
                  to="/history"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/history') ? 'bg-indigo-600/10 text-indigo-400' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <History className="h-4 w-4" />
                  History
                </Link>
              </>
            )}
          </div>

          {/* User Profile / Login indicator */}
          <div className="flex items-center gap-4">
            {user.email ? (
              <div className="flex items-center gap-3 bg-slate-800/60 pl-3 pr-2 py-1.5 rounded-full border border-slate-700">
                <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                  <UserIcon className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="max-w-[100px] truncate">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1 rounded-full text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/assessment"
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-indigo-500/20"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
