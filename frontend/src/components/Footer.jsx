import React, { useState } from 'react';
import { 
  Vote, 
  Mail, 
  Send, 
  CheckCircle2,
  FileText,
  ShieldCheck
} from 'lucide-react';

export const Footer = ({ setActiveTab, openLegalModal }) => {
  const [supportEmail, setSupportEmail] = useState('');
  const [supportMsg, setSupportMsg] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    if (!supportEmail || !supportMsg) return;
    setSentSuccess(true);
    setSupportEmail('');
    setSupportMsg('');
    setTimeout(() => setSentSuccess(false), 4000);
  };

  return (
    <footer className="bg-[#F6F8EF] text-[#4B5563] border-t-4 border-[#0F5C33] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-[#D1D5DB]">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('hero')}>
              <img 
                src="/logo.jpg" 
                alt="VotePulse Official Seal" 
                loading="eager"
                decoding="async"
                className="w-12 h-12 rounded-full object-cover border-2 border-[#0F5C33] bg-white p-0.5 shadow-sm"
              />
              <div>
                <span className="text-xl font-black tracking-tight leading-none block">
                  <span className="text-[#111827]">Vote</span>
                  <span className="text-[#0F5C33]">Pulse</span>
                </span>
                <p className="text-[10px] text-[#0F5C33] font-bold mt-0.5">Election Commission Portal</p>
              </div>
            </div>

            <p className="text-xs text-[#4B5563] leading-relaxed font-normal">
              Official E-Voting Engine designed for transparent, secure democratic elections using verified Government ID Card authentication.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-3.5 border-b border-[#D1D5DB] pb-2">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button 
                  onClick={() => setActiveTab('hero')} 
                  className="hover:text-[#0F5C33] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#0F5C33]">›</span> Home & Overview
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('candidates')} 
                  className="hover:text-[#0F5C33] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#0F5C33]">›</span> Ballot Candidates
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('results')} 
                  className="hover:text-[#0F5C33] transition-colors flex items-center gap-1.5 text-[#16A34A] font-bold"
                >
                  <span className="text-[#16A34A]">›</span> Live Election Results
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('profile')} 
                  className="hover:text-[#0F5C33] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#0F5C33]">›</span> Voter Profile & Status
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Policies */}
          <div>
            <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-3.5 border-b border-[#D1D5DB] pb-2">
              Legal & Guidelines
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button 
                  onClick={() => openLegalModal('terms')} 
                  className="hover:text-[#0F5C33] transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-[#0F5C33]" /> Terms & Conditions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openLegalModal('privacy')} 
                  className="hover:text-[#0F5C33] transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0F5C33]" /> Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Help & Support Mail Box */}
          <div className="bg-white border border-[#D1D5DB] rounded-xl p-4 space-y-3 shadow-sm">
            <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#0F5C33]" /> Help & Support Contact
            </h4>
            <p className="text-[11px] text-[#4B5563]">
              Need assistance with your voter account? Send a direct query to our election helpdesk.
            </p>

            {sentSuccess ? (
              <div className="p-2.5 rounded-xl bg-[#16A34A]/10 border border-[#16A34A]/30 text-[#16A34A] text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Query sent! Helpdesk will reply to your email.</span>
              </div>
            ) : (
              <form onSubmit={handleSupportSubmit} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Your Email Address"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F6F8EF] border border-[#D1D5DB] text-[#111827] text-xs placeholder:text-[#9CA3AF] focus:outline-none focus:bg-white focus:border-[#0F5C33]"
                />
                <textarea
                  required
                  rows="2"
                  placeholder="Describe your query..."
                  value={supportMsg}
                  onChange={(e) => setSupportMsg(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F6F8EF] border border-[#D1D5DB] text-[#111827] text-xs placeholder:text-[#9CA3AF] focus:outline-none focus:bg-white focus:border-[#0F5C33] resize-none"
                ></textarea>
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-[#0F5C33] hover:bg-[#0A3D22] text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Send Support Query
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#4B5563] font-normal">
          <p>&copy; 2026 VotePulse E-Voting Portal. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <button onClick={() => openLegalModal('terms')} className="hover:text-[#111827]">Terms of Election</button>
            <span>•</span>
            <button onClick={() => openLegalModal('privacy')} className="hover:text-[#111827]">Privacy Policy</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
