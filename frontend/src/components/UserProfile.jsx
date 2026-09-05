import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';
import { 
  User, 
  CreditCard, 
  Mail, 
  Phone, 
  MapPin, 
  Key, 
  CheckCircle2, 
  XCircle,
  AlertCircle
} from 'lucide-react';

export const UserProfile = () => {
  const { user, hasVoted, isAdmin } = useAuth();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-12 text-center">
        <div className="merged-card p-6 rounded-xl bg-white border border-[#D1D5DB]">
          <User className="w-10 h-10 text-[#4B5563] mx-auto mb-2" />
          <h3 className="text-base font-bold text-[#111827]">Not Signed In</h3>
          <p className="text-xs text-[#4B5563] mt-1 font-normal">Sign in to view your voter profile dashboard.</p>
        </div>
      </div>
    );
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!oldPassword || !newPassword) {
        throw new Error('Please enter both current and new passwords.');
      }
      const res = await api.changePassword({ oldPassword, newPassword });
      setSuccess(res.message || 'Password updated successfully.');
      setOldPassword('');
      setNewPassword('');
    } catch (err) {
      setError(err.message || 'Failed to update password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Profile Info */}
        <div className="md:col-span-6">
          <div className="merged-card p-6 sm:p-8 bg-white border border-[#D1D5DB] rounded-xl shadow-sm">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-[#0F5C33] text-white flex items-center justify-center font-bold text-2xl shadow-sm">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#111827]">{user.name}</h3>
                <span className="text-xs font-bold text-[#0F5C33]">
                  {isAdmin ? 'Administrator' : 'Registered Voter'}
                </span>
              </div>
            </div>

            {/* Status Badge */}
            <div className="mb-5 p-3.5 rounded-xl bg-[#F3F6F4] border border-[#D1D5DB] flex items-center justify-between">
              <span className="text-xs font-bold text-[#4B5563]">Voting Status:</span>
              {hasVoted ? (
                <span className="px-3 py-1 rounded-full bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/30 text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Vote Casted
                </span>
              ) : isAdmin ? (
                <span className="px-3 py-1 rounded-full bg-[#C99A2E]/15 text-[#C99A2E] border border-[#C99A2E]/30 text-xs font-bold">
                  Admin Exempt
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-[#0F5C33]/10 text-[#0F5C33] border border-[#0F5C33]/20 text-xs font-bold flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> Eligible (Not Voted)
                </span>
              )}
            </div>

            {/* Details Table */}
            <div className="space-y-2.5 text-xs text-[#4B5563]">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F3F6F4] border border-[#D1D5DB]">
                <span className="flex items-center gap-2 text-[#4B5563] font-medium">
                  <CreditCard className="w-4 h-4 text-[#0F5C33]" /> National ID Card
                </span>
                <span className="font-mono font-bold text-[#111827]">#{user.Id_Card}</span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F3F6F4] border border-[#D1D5DB]">
                <span className="flex items-center gap-2 text-[#4B5563] font-medium">
                  <Mail className="w-4 h-4 text-[#0F5C33]" /> Email Address
                </span>
                <span className="font-bold text-[#111827]">{user.email}</span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F3F6F4] border border-[#D1D5DB]">
                <span className="flex items-center gap-2 text-[#4B5563] font-medium">
                  <Phone className="w-4 h-4 text-[#0F5C33]" /> Mobile Number
                </span>
                <span className="font-mono font-bold text-[#111827]">{user.mobile || 'N/A'}</span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F3F6F4] border border-[#D1D5DB]">
                <span className="flex items-center gap-2 text-[#4B5563] font-medium">
                  <MapPin className="w-4 h-4 text-[#0F5C33]" /> Residence Address
                </span>
                <span className="font-bold text-[#111827] max-w-[180px] truncate">{user.address || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="md:col-span-6">
          <div className="merged-card p-6 sm:p-8 bg-white border border-[#D1D5DB] rounded-xl shadow-sm">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="p-2.5 rounded-xl bg-[#0F5C33]/10 text-[#0F5C33] border border-[#0F5C33]/20">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#111827]">Security Credentials</h3>
                <p className="text-xs text-[#4B5563] font-normal">Update account access password</p>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-[#DC2626]/10 border border-[#DC2626]/30 text-[#DC2626] text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 rounded-xl bg-[#16A34A]/10 border border-[#16A34A]/30 text-[#16A34A] text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#111827] mb-1">Current Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D1D5DB] text-[#111827] text-xs placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#0F5C33]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111827] mb-1">New Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D1D5DB] text-[#111827] text-xs placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#0F5C33]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#0F5C33] hover:bg-[#0A3D22] text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                ) : (
                  'Update Password'
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};
