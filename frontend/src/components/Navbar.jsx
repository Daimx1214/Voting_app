import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, 
  User as UserIcon, 
  LogOut, 
  BarChart3, 
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, openAuthModal }) => {
  const { user, logout, isAdmin, hasVoted } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#F6F8EF] border-b border-[#D1D5DB] border-t-4 border-t-[#0F5C33] sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Circular Emblem Logo + VotePulse Wordmark */}
          <div 
            onClick={() => setActiveTab('hero')}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <img 
              src="/logo.jpg" 
              alt="VotePulse Official Emblem" 
              loading="eager"
              decoding="async"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-[#0F5C33] bg-white p-0.5 shadow-sm"
            />
            <span className="text-xl sm:text-2xl font-black tracking-tight leading-none">
              <span className="text-[#111827]">Vote</span>
              <span className="text-[#0F5C33]">Pulse</span>
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 bg-white p-1 rounded-xl border border-[#D1D5DB] shadow-sm">
            <button
              onClick={() => setActiveTab('hero')}
              className={`px-4 py-2 rounded-lg font-bold text-xs transition-colors ${
                activeTab === 'hero'
                  ? 'bg-[#0F5C33] text-white shadow-sm'
                  : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F6F8EF]'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setActiveTab('candidates')}
              className={`px-4 py-2 rounded-lg font-bold text-xs transition-colors ${
                activeTab === 'candidates'
                  ? 'bg-[#0F5C33] text-white shadow-sm'
                  : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F6F8EF]'
              }`}
            >
              Candidates
            </button>

            <button
              onClick={() => setActiveTab('results')}
              className={`px-4 py-2 rounded-lg font-bold text-xs transition-colors flex items-center gap-1.5 ${
                activeTab === 'results'
                  ? 'bg-[#0F5C33] text-white shadow-sm'
                  : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F6F8EF]'
              }`}
            >
              <BarChart3 className={`w-4 h-4 ${activeTab === 'results' ? 'text-white' : 'text-[#16A34A]'}`} />
              Live Results
            </button>

            {isAdmin && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-4 py-2 rounded-lg font-bold text-xs transition-colors flex items-center gap-1.5 ${
                  activeTab === 'admin'
                    ? 'bg-[#0F5C33] text-white shadow-sm'
                    : 'text-[#0F5C33] hover:bg-[#F6F8EF]'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                Admin Panel
              </button>
            )}
          </div>

          {/* User Controls */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center space-x-2.5 px-3 py-1.5 rounded-xl bg-white border border-[#D1D5DB] hover:border-[#0F5C33] transition-colors shadow-sm ${
                    activeTab === 'profile' ? 'ring-2 ring-[#0F5C33]' : ''
                  }`}
                >
                  <div className="w-7 h-7 rounded-full bg-[#0F5C33] text-white flex items-center justify-center font-bold text-xs">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#111827] truncate max-w-[110px]">
                        {user.name}
                      </span>
                      {isAdmin ? (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#C99A2E]/15 text-[#C99A2E] font-bold border border-[#C99A2E]/30">
                          ADMIN
                        </span>
                      ) : hasVoted ? (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#16A34A]/10 text-[#16A34A] font-bold border border-[#16A34A]/30 flex items-center gap-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Voted
                        </span>
                      ) : null}
                    </div>
                  </div>
                </button>

                <button
                  onClick={logout}
                  title="Logout"
                  className="p-2 rounded-xl bg-white hover:bg-[#DC2626]/10 text-[#4B5563] hover:text-[#DC2626] border border-[#D1D5DB] transition-colors shadow-sm"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="px-5 py-2.5 rounded-xl bg-[#0F5C33] hover:bg-[#0A3D22] text-white font-bold text-xs transition-colors shadow-sm"
              >
                Sign In / Register
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white text-[#4B5563] hover:text-[#111827] border border-[#D1D5DB] shadow-sm"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#D1D5DB] px-4 pt-2 pb-4 space-y-1">
          <button
            onClick={() => { setActiveTab('hero'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold ${
              activeTab === 'hero' ? 'bg-[#0F5C33] text-white' : 'text-[#4B5563] hover:bg-[#F6F8EF] hover:text-[#111827]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => { setActiveTab('candidates'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold ${
              activeTab === 'candidates' ? 'bg-[#0F5C33] text-white' : 'text-[#4B5563] hover:bg-[#F6F8EF] hover:text-[#111827]'
            }`}
          >
            Candidates
          </button>
          <button
            onClick={() => { setActiveTab('results'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold ${
              activeTab === 'results' ? 'bg-[#0F5C33] text-white' : 'text-[#4B5563] hover:bg-[#F6F8EF] hover:text-[#111827]'
            }`}
          >
            Live Results
          </button>
          {isAdmin && (
            <button
              onClick={() => { setActiveTab('admin'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold ${
                activeTab === 'admin' ? 'bg-[#0F5C33] text-white' : 'text-[#0F5C33] hover:bg-[#F6F8EF]'
              }`}
            >
              Admin Panel
            </button>
          )}
          {user ? (
            <div className="pt-2 border-t border-[#D1D5DB] space-y-1">
              <button
                onClick={() => { setActiveTab('profile'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-bold text-[#0F5C33] hover:bg-[#F6F8EF]"
              >
                Profile ({user.name})
              </button>
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-bold text-[#DC2626] hover:bg-[#F6F8EF] flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => { openAuthModal(); setMobileMenuOpen(false); }}
              className="w-full mt-2 py-2.5 rounded-xl bg-[#0F5C33] hover:bg-[#0A3D22] text-white font-bold text-center text-xs shadow-sm"
            >
              Sign In / Register
            </button>
          )}
        </div>
      )}
    </nav>
  );
};
