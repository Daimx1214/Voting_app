import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { 
  BarChart3, 
  RefreshCw, 
  Trophy
} from 'lucide-react';

const candidatePhotos = {
  'imran khan': '/candidates/imran_khan.jpg',
  'shehbaz sharif': '/candidates/shehbaz_sharif.jpg',
  'nawaz sharif': '/candidates/nawaz_sharif.jpg',
  'bilawal bhutto zardari': '/candidates/bilawal_bhutto.jpg',
  'maryam nawaz': '/candidates/maryam_nawaz.jpg',
  'siraj-ul-haq': '/candidates/siraj_ul_haq.jpg',
  'mustafa kamal': '/candidates/mustafa_kamal.jpg',
  'saad hussain rizvi': '/candidates/saad_rizvi.jpg',
  'fazal-ur-rehman': '/candidates/fazal_ur_rehman.jpg',
  'ali zaidi': '/candidates/ali_zaidi.jpg',
  'asad umar': '/candidates/asad_umar.jpg'
};

const getPhoto = (cand) => {
  if (cand.image && cand.image.trim() !== '') return cand.image;
  const name = cand.name || '';
  const key = name.toLowerCase().trim();
  for (const [candName, photoUrl] of Object.entries(candidatePhotos)) {
    if (key.includes(candName) || candName.includes(key)) {
      return photoUrl;
    }
  }
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0F5C33&color=ffffff&bold=true`;
};

export const LiveResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchResults = async () => {
    setRefreshing(true);
    try {
      const data = await api.getVoteCounts();
      setResults(data.voteCounts || []);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to fetch live vote counts.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchResults();
    const interval = setInterval(fetchResults, 10000);
    return () => clearInterval(interval);
  }, []);

  const totalVotes = results.reduce((acc, curr) => acc + (curr.count || curr.votes || 0), 0);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Header Card */}
      <div className="merged-card p-6 sm:p-8 mb-6 bg-white border border-[#D1D5DB] rounded-xl shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/30 text-xs font-bold mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]"></span>
              Live Election Tally
            </div>
            <h2 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-[#0F5C33]" />
              Live Election Results Leaderboard
            </h2>
            <p className="text-xs text-[#4B5563] mt-1 font-normal">Real-time candidate vote standings sorted by verified total votes.</p>
          </div>

          <div className="flex items-center gap-5">
            <div className="text-center sm:text-right">
              <span className="text-3xl font-black text-[#111827]">{totalVotes}</span>
              <span className="block text-[10px] text-[#4B5563] font-bold uppercase tracking-wider">Total Votes Cast</span>
            </div>
            <button
              onClick={fetchResults}
              disabled={refreshing}
              className="p-3 rounded-xl bg-[#F3F6F4] hover:bg-[#E5E7EB] text-[#4B5563] hover:text-[#111827] border border-[#D1D5DB] transition-colors"
              title="Refresh Leaderboard"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Results List */}
      {loading ? (
        <div className="py-12 text-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#0F5C33] border-t-transparent animate-spin mx-auto mb-2"></div>
          <p className="text-xs text-[#4B5563] font-medium">Loading live standings...</p>
        </div>
      ) : error ? (
        <div className="p-4 rounded-xl bg-[#DC2626]/10 border border-[#DC2626]/30 text-[#DC2626] text-center text-xs font-bold">
          {error}
        </div>
      ) : results.length === 0 ? (
        <div className="merged-card p-10 text-center rounded-xl bg-white border border-[#D1D5DB]">
          <BarChart3 className="w-10 h-10 text-[#4B5563] mx-auto mb-2" />
          <h3 className="text-base font-bold text-[#111827]">No Votes Recorded Yet</h3>
          <p className="text-xs text-[#4B5563] mt-1 font-normal">Vote totals will update automatically as votes are cast.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {results.map((candidate, index) => {
            const count = candidate.count || candidate.votes || 0;
            const percentage = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
            const photoUrl = getPhoto(candidate);

            return (
              <div
                key={candidate.candidateId || candidate._id || index}
                className="merged-card p-5 bg-white border border-[#D1D5DB] rounded-xl shadow-sm hover:border-[#0F5C33] transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#F3F6F4] border border-[#D1D5DB] flex items-center justify-center font-bold text-xs text-[#111827]">
                      #{index + 1}
                    </div>

                    <img
                      src={photoUrl}
                      alt={candidate.name}
                      loading="eager"
                      decoding="async"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.name || 'C')}&background=0F5C33&color=ffffff&bold=true`;
                      }}
                      className="w-10 h-10 rounded-lg object-cover border border-[#D1D5DB] bg-[#F3F6F4]"
                    />

                    <div>
                      <h4 className="text-base font-bold text-[#111827] flex items-center gap-2">
                        {candidate.name || candidate.party}
                        {index === 0 && (
                          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#C99A2E]/15 text-[#C99A2E] font-bold border border-[#C99A2E]/30 flex items-center gap-1">
                            <Trophy className="w-3 h-3 text-[#C99A2E]" /> Leader
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-[#0F5C33] font-semibold">Party: {candidate.party}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-2xl font-bold text-[#111827]">{count}</span>
                    <span className="text-xs text-[#4B5563] font-mono font-bold block">{percentage}%</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-3 bg-[#F3F6F4] rounded-full overflow-hidden border border-[#D1D5DB]">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      index === 0 ? 'bg-[#0F5C33]' : 'bg-[#9CA3AF]'
                    }`}
                    style={{ width: `${Math.max(percentage, 2)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
