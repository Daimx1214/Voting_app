import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

export const LegalModal = ({ isOpen, onClose, type = 'terms' }) => {
  if (!isOpen) return null;

  const isTerms = type === 'terms';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative w-full max-w-2xl bg-white border border-[#D1D5DB] rounded-2xl p-6 sm:p-8 text-[#111827] shadow-xl max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D1D5DB]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#0F5C33]/10 text-[#0F5C33] border border-[#0F5C33]/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#111827]">
                {isTerms ? 'Terms & Electoral Regulations' : 'Privacy & Data Security Policy'}
              </h3>
              <p className="text-xs text-[#4B5563]">Election Commission of Pakistan — Official Guidelines</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#F6F8EF] text-[#4B5563] hover:text-[#111827] border border-[#D1D5DB]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Document Content */}
        <div className="overflow-y-auto py-4 space-y-4 text-xs text-[#4B5563] leading-relaxed pr-2 font-normal">
          {isTerms ? (
            <>
              <h4 className="text-sm font-bold text-[#111827]">1. Constitutional Right & Single Vote Guarantee</h4>
              <p>
                Pursuant to Section 84 of the Elections Act, 2017 and Article 225 of the Constitution of Islamic Republic of Pakistan, every registered citizen holding a valid 13-digit Computerized National Identity Card (CNIC) is granted exactly one vote per election cycle. Double voting or impersonation is strictly barred by database constraints.
              </p>

              <h4 className="text-sm font-bold text-[#111827]">2. Voter Qualification & Neutrality</h4>
              <p>
                Voters must be at least 18 years of age and registered in the voter lists prepared by the Commission. Administrative & Electoral Officer accounts are exempt from voting to ensure strict election neutrality.
              </p>

              <h4 className="text-sm font-bold text-[#111827]">3. Candidate Vetting & Electoral Symbols</h4>
              <p>
                All political parties, candidates, and election symbols displayed on the official ballot have been scrutinized and approved by the Returning Officers (RO) in compliance with Articles 62 & 63 of the Constitution.
              </p>

              <h4 className="text-sm font-bold text-[#111827]">4. Irrevocability of Cast Votes</h4>
              <p>
                Once a ballot is cast and confirmed by a voter, the cryptographic record is permanently written to the secure database ledger. Cast votes cannot be altered, edited, or retracted.
              </p>
            </>
          ) : (
            <>
              <h4 className="text-sm font-bold text-[#111827]">1. Protection of Voter Credentials</h4>
              <p>
                In compliance with Pakistan Personal Data Protection frameworks, citizen credentials including National ID Numbers (CNIC), Mobile Numbers, and Passwords are encrypted using salted bcrypt hashing and JWT tokens.
              </p>

              <h4 className="text-sm font-bold text-[#111827]">2. Secret Ballot Confidentiality</h4>
              <p>
                Your individual voting selection is stored independently from identity records to guarantee 100% secret ballot integrity while updating aggregate real-time election result tallies.
              </p>

              <h4 className="text-sm font-bold text-[#111827]">3. Session Authentication & Security</h4>
              <p>
                JSON Web Tokens (JWT) manage secure session state during your portal visit. Tokens automatically expire to prevent unauthorized access.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#D1D5DB] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#0F5C33] hover:bg-[#0A3D22] text-white font-bold text-xs shadow-sm transition-colors"
          >
            I Understand & Agree
          </button>
        </div>

      </div>
    </div>
  );
};
