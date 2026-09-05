import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CandidateCard } from './components/CandidateCard';
import { LiveResults } from './components/LiveResults';
import { UserProfile } from './components/UserProfile';
import { AdminPanel } from './components/AdminPanel';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { api } from './api';
import { 
  Vote, 
  Search, 
  RefreshCw,
  CheckCircle2
} from 'lucide-react';

const MainContent = () => {
  const { user, isAdmin, hasVoted } = useAuth();
  const [activeTab, setActiveTab] = useState('hero');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  // Legal Modal State
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState('terms'); // 'terms' or 'privacy'

  const [candidates, setCandidates] = useState([]);
  const [loadingCandidates, setLoadingCandidates] = useState(true);
  const [candidateError, setCandidateError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchCandidates = async () => {
    setLoadingCandidates(true);
    try {
      const data = await api.getCandidates();
      setCandidates(data.candidates || data || []);
      setCandidateError('');
    } catch (err) {
      setCandidateError(err.message || 'Could not connect to backend server.');
    } finally {
      setLoadingCandidates(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const openLegalModal = (type = 'terms') => {
    setLegalModalType(type);
    setLegalModalOpen(true);
  };

  const filteredCandidates = candidates.filter((c) =>
    c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.party?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#E4EDD4] text-[#111827]">
      <div>
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          openAuthModal={() => openAuthModal('login')}
        />

        <main className="pb-16">
          {activeTab === 'hero' && (
            <>
              <HeroSection
                setActiveTab={setActiveTab}
                openAuthModal={() => openAuthModal('login')}
              />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight flex items-center gap-2">
                      <Vote className="w-7 h-7 text-[#0F5C33]" />
                      Featured Ballot Candidates
                    </h2>
                    <p className="text-xs text-[#4B5563] font-normal mt-1">Select a candidate to view details and cast your vote</p>
                  </div>

                  <button
                    onClick={() => setActiveTab('candidates')}
                    className="px-5 py-2.5 rounded-xl bg-white border border-[#D1D5DB] hover:border-[#0F5C33] text-[#0F5C33] font-bold text-xs shadow-sm transition-colors"
                  >
                    View All Candidates ({candidates.length})
                  </button>
                </div>

                {loadingCandidates ? (
                  <div className="py-12 text-center">
                    <div className="w-8 h-8 rounded-full border-2 border-[#0F5C33] border-t-transparent animate-spin mx-auto mb-2"></div>
                    <p className="text-xs text-[#4B5563] font-medium">Loading candidates...</p>
                  </div>
                ) : candidateError ? (
                  <div className="p-4 rounded-xl bg-[#DC2626]/10 border border-[#DC2626]/30 text-[#DC2626] text-center text-xs font-bold">
                    {candidateError} (Check Node.js server on http://localhost:3000)
                  </div>
                ) : candidates.length === 0 ? (
                  <div className="merged-card p-8 text-center rounded-xl bg-white border border-[#D1D5DB] shadow-sm">
                    <p className="text-sm font-bold text-[#4B5563]">No candidates added yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {candidates.slice(0, 3).map((cand) => (
                      <CandidateCard
                        key={cand._id || cand.name}
                        candidate={cand}
                        onVoteSuccess={fetchCandidates}
                        openAuthModal={() => openAuthModal('login')}
                      />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'candidates' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight flex items-center gap-2">
                    <Vote className="w-7 h-7 text-[#0F5C33]" />
                    Official Election Ballot Candidates
                  </h2>
                  <p className="text-xs text-[#4B5563] font-normal mt-1">Official list of verified election candidates.</p>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#9CA3AF]" />
                    <input
                      type="text"
                      placeholder="Search candidate or party..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#D1D5DB] text-[#111827] text-xs placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#0F5C33] shadow-sm"
                    />
                  </div>

                  <button
                    onClick={fetchCandidates}
                    className="p-2.5 rounded-xl bg-white hover:bg-[#F6F8EF] text-[#4B5563] hover:text-[#111827] border border-[#D1D5DB] shadow-sm transition-colors"
                    title="Refresh List"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {user && (
                <div className="mb-6 p-4 rounded-xl bg-white border border-[#D1D5DB] flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#0F5C33] text-white flex items-center justify-center font-bold text-xs">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#111827]">Signed in as {user.name} (#{user.Id_Card})</h4>
                      <p className="text-[11px] text-[#4B5563] font-normal">
                        {isAdmin ? 'Admin Account (Voting Exempt)' : hasVoted ? 'Vote Casted' : 'Eligible to vote'}
                      </p>
                    </div>
                  </div>
                  {hasVoted && (
                    <span className="px-3 py-1 rounded-full bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/30 text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Vote Casted
                    </span>
                  )}
                </div>
              )}

              {loadingCandidates ? (
                <div className="py-12 text-center">
                  <div className="w-8 h-8 rounded-full border-2 border-[#0F5C33] border-t-transparent animate-spin mx-auto mb-2"></div>
                  <p className="text-xs text-[#4B5563] font-medium">Loading candidates list...</p>
                </div>
              ) : filteredCandidates.length === 0 ? (
                <div className="merged-card p-10 text-center rounded-xl bg-white border border-[#D1D5DB] max-w-md mx-auto">
                  <Vote className="w-10 h-10 text-[#4B5563] mx-auto mb-2" />
                  <h3 className="text-base font-bold text-[#111827]">No Matching Candidates Found</h3>
                  <p className="text-xs text-[#4B5563] mt-1 font-normal">Try adjusting your search filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCandidates.map((cand) => (
                    <CandidateCard
                      key={cand._id || cand.name}
                      candidate={cand}
                      onVoteSuccess={fetchCandidates}
                      openAuthModal={() => openAuthModal('login')}
                    />
                  ))}
                </div>
              )}

            </div>
          )}

          {activeTab === 'results' && <LiveResults />}

          {activeTab === 'profile' && <UserProfile />}

          {activeTab === 'admin' && (
            <AdminPanel onCandidatesUpdated={fetchCandidates} />
          )}
        </main>
      </div>

      {/* Official Election Footer */}
      <Footer 
        setActiveTab={setActiveTab} 
        openLegalModal={openLegalModal}
      />

      {/* Global Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode={authMode}
      />

      {/* Legal Modal (Terms & Conditions / Privacy Policy) */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        type={legalModalType}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}
