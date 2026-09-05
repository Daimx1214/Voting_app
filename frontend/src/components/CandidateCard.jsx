import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';
import { 
  Vote, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle
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

export const CandidateCard = ({ candidate, onVoteSuccess, openAuthModal }) => {
  const { user, isAdmin, hasVoted, refreshProfile } = useAuth();
  const [voting, setVoting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [voteError, setVoteError] = useState('');

  const getCandidatePhoto = (candidateObj) => {
    if (candidateObj.image && candidateObj.image.trim() !== '') {
      return candidateObj.image;
    }
    const name = candidateObj.name || '';
    const key = name.toLowerCase().trim();
    for (const [candName, photoUrl] of Object.entries(candidatePhotos)) {
      if (key.includes(candName) || candName.includes(key)) {
        return photoUrl;
      }
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0F5C33&color=ffffff&bold=true`;
  };

  const photo = getCandidatePhoto(candidate);

  const handleVote = async () => {
    setVoting(true);
    setVoteError('');
    try {
      await api.voteCandidate(candidate._id);
      await refreshProfile();
      if (onVoteSuccess) onVoteSuccess();
      setShowConfirmModal(false);
    } catch (err) {
      setVoteError(err.message || 'Failed to cast vote.');
    } finally {
      setVoting(false);
    }
  };

  return (
    <>
      <div className="merged-card p-5 flex flex-col justify-between overflow-hidden bg-white border border-[#D1D5DB] rounded-xl shadow-sm hover:border-[#0F5C33] transition-colors">
        
        <div>
          {/* Candidate Portrait Header */}
          <div className="flex items-center space-x-3.5 mb-4">
            <div className="relative flex-shrink-0">
              <img
                src={photo}
                alt={candidate.name}
                loading="eager"
                decoding="async"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.name)}&background=0F5C33&color=ffffff&bold=true`;
                }}
                className="w-16 h-16 rounded-xl object-cover border border-[#D1D5DB] bg-[#F6F8EF]"
              />
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded bg-[#0F5C33] text-white font-bold text-[10px] flex items-center justify-center border border-white">
                {candidate.party ? candidate.party.substring(0, 5).toUpperCase() : 'ECP'}
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#111827] tracking-tight">
                {candidate.name}
              </h3>
              <p className="text-xs text-[#0F5C33] font-bold mt-0.5">
                Political Party: {candidate.party}
              </p>
              <span className="text-[11px] text-[#4B5563] font-mono">
                Age: {candidate.age} Years
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-3 border-t border-[#D1D5DB]">
          {!user ? (
            <button
              onClick={openAuthModal}
              className="w-full py-2.5 rounded-xl bg-[#F6F8EF] hover:bg-[#E5E7EB] text-[#111827] font-bold text-xs border border-[#D1D5DB] transition-colors flex items-center justify-center gap-2"
            >
              <Vote className="w-4 h-4 text-[#0F5C33]" />
              Sign In To Vote
            </button>
          ) : isAdmin ? (
            <button
              disabled
              className="w-full py-2.5 rounded-xl bg-[#C99A2E]/10 border border-[#C99A2E]/30 text-[#C99A2E] font-bold text-xs cursor-not-allowed flex items-center justify-center gap-2"
            >
              <ShieldAlert className="w-4 h-4" />
              Administrator Account (Exempt)
            </button>
          ) : hasVoted ? (
            <button
              disabled
              className="w-full py-2.5 rounded-xl bg-[#16A34A]/10 border border-[#16A34A]/30 text-[#16A34A] font-bold text-xs cursor-not-allowed flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Vote Casted
            </button>
          ) : (
            <button
              onClick={() => setShowConfirmModal(true)}
              className="w-full py-2.5 rounded-xl bg-[#0F5C33] hover:bg-[#0A3D22] text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <Vote className="w-4 h-4" />
              Vote For Candidate
            </button>
          )}
        </div>

      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-sm bg-white border border-[#D1D5DB] rounded-2xl p-6 shadow-xl">
            <div className="flex items-center space-x-3 mb-3">
              <img
                src={photo}
                alt={candidate.name}
                className="w-12 h-12 rounded-xl object-cover border border-[#D1D5DB]"
              />
              <div>
                <h4 className="text-base font-bold text-[#111827]">{candidate.name}</h4>
                <p className="text-xs text-[#0F5C33] font-bold">Party: {candidate.party}</p>
              </div>
            </div>

            <p className="text-xs text-[#4B5563] mt-2 leading-relaxed">
              Are you sure you want to cast your official vote for candidate <strong className="text-[#111827] font-bold">{candidate.name}</strong> ({candidate.party})?
            </p>
            <p className="text-[11px] text-[#C99A2E] font-bold mt-3 bg-[#C99A2E]/10 p-2.5 rounded-xl border border-[#C99A2E]/20 text-center leading-relaxed">
              ⚠️ Election Laws Notice: As per Article 225 of the Constitution of Pakistan & Elections Act 2017, votes committed cannot be revoked or altered.
            </p>

            {voteError && (
              <div className="mt-3 p-2.5 bg-[#DC2626]/10 border border-[#DC2626]/30 text-[#DC2626] text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{voteError}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 mt-5">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="py-2.5 rounded-xl bg-[#F6F8EF] hover:bg-[#E5E7EB] text-[#4B5563] font-bold text-xs border border-[#D1D5DB] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleVote}
                disabled={voting}
                className="py-2.5 rounded-xl bg-[#0F5C33] hover:bg-[#0A3D22] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                {voting ? (
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Confirm Vote
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
