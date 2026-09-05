import React from 'react';
import { 
  ShieldCheck, 
  Vote, 
  Lock, 
  Users, 
  BarChart3, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const HeroSection = ({ setActiveTab, openAuthModal }) => {
  const { user, hasVoted, isAdmin } = useAuth();

  return (
    <div className="py-12 md:py-16 border-b border-[#D1D5DB] bg-[#E4EDD4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center space-y-6">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#D1D5DB] text-[#0F5C33] text-xs font-bold shadow-sm">
            <img src="/logo.jpg" alt="VotePulse Seal" className="w-5 h-5 rounded-full object-cover border border-[#0F5C33]" />
            <span>Election Commission of Pakistan — E-Voting System</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] tracking-tight leading-tight">
            Transparent, Secure & <br className="hidden sm:inline" />
            <span className="text-[#0F5C33]">Encrypted Democratic Voting</span>
          </h1>

          {/* Description */}
          <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            Cast your vote securely using your registered 13-digit National Identity Card (CNIC). Authenticated via cryptographic verification, strict single-vote protection, and real-time result tallying.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {user ? (
              hasVoted ? (
                <button
                  onClick={() => setActiveTab('results')}
                  className="px-6 py-3 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs shadow-sm transition-colors flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Vote Casted — View Live Results
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab('candidates')}
                  className="px-7 py-3 rounded-xl bg-[#0F5C33] hover:bg-[#0A3D22] text-white font-bold text-xs shadow-sm transition-colors flex items-center gap-2"
                >
                  <Vote className="w-4 h-4" />
                  Cast Your Official Vote
                  <ArrowRight className="w-4 h-4" />
                </button>
              )
            ) : (
              <button
                onClick={openAuthModal}
                className="px-7 py-3 rounded-xl bg-[#0F5C33] hover:bg-[#0A3D22] text-white font-bold text-xs shadow-sm transition-colors flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Sign In To Vote
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => setActiveTab('results')}
              className="px-6 py-3 rounded-xl bg-white border border-[#D1D5DB] text-[#111827] font-bold text-xs hover:bg-[#F6F8EF] transition-colors flex items-center gap-2 shadow-sm"
            >
              <BarChart3 className="w-4 h-4 text-[#0F5C33]" />
              View Live Results
            </button>
          </div>

          {/* Feature Mini-cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 max-w-3xl mx-auto">
            <div className="p-4 rounded-xl merged-card text-left bg-white border border-[#D1D5DB] shadow-sm">
              <div className="flex items-center gap-2 text-[#0F5C33] font-bold text-xs mb-1">
                <ShieldCheck className="w-4 h-4 text-[#0F5C33]" /> CNIC Security
              </div>
              <p className="text-xs text-[#4B5563] font-normal">Encrypted 13-Digit ID Verification & JWT Security</p>
            </div>

            <div className="p-4 rounded-xl merged-card text-left bg-white border border-[#D1D5DB] shadow-sm">
              <div className="flex items-center gap-2 text-[#0F5C33] font-bold text-xs mb-1">
                <Users className="w-4 h-4 text-[#0F5C33]" /> Single Vote Guard
              </div>
              <p className="text-xs text-[#4B5563] font-normal">Strict 1 Vote per Registered Citizen</p>
            </div>

            <div className="p-4 rounded-xl merged-card text-left bg-white border border-[#D1D5DB] shadow-sm">
              <div className="flex items-center gap-2 text-[#0F5C33] font-bold text-xs mb-1">
                <BarChart3 className="w-4 h-4 text-[#0F5C33]" /> Realtime Tally
              </div>
              <p className="text-xs text-[#4B5563] font-normal">Instant Official Election Leaderboard</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
