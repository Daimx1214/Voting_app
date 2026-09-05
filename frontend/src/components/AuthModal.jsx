import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  X, 
  Lock, 
  User, 
  CreditCard, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  AlertCircle,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const AuthModal = ({ isOpen, onClose, defaultMode = 'login' }) => {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState(defaultMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    mobile: '',
    address: '',
    Id_Card: '',
    password: '',
    roles: 'voter',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (mode === 'login') {
        if (!formData.Id_Card || !formData.password) {
          throw new Error('Please enter your 13-Digit CNIC Number and Password.');
        }
        await login({
          Id_Card: Number(formData.Id_Card),
          password: formData.password,
        });
        setSuccess('Signed in successfully.');
        setTimeout(() => onClose(), 600);
      } else {
        if (!formData.name || !formData.email || !formData.Id_Card || !formData.password) {
          throw new Error('Please complete all required voter registration fields.');
        }

        await signup({
          name: formData.name,
          age: Number(formData.age || 20),
          email: formData.email,
          mobile: formData.mobile || '03001234567',
          address: formData.address || 'Default Address',
          Id_Card: Number(formData.Id_Card),
          password: formData.password,
          roles: formData.roles,
        });

        setSuccess('Voter account registered successfully.');
        setTimeout(() => onClose(), 800);
      }
    } catch (err) {
      setError(err.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative w-full max-w-md bg-white border border-[#D1D5DB] rounded-2xl p-6 sm:p-8 shadow-xl">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#F6F8EF] text-[#4B5563] hover:text-[#111827] border border-[#D1D5DB]"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#0F5C33]/10 text-[#0F5C33] border border-[#0F5C33]/20 mx-auto mb-3 flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black text-[#111827]">
            {mode === 'login' ? 'Sign In To ECP Portal' : 'Register Citizen Voter Account'}
          </h2>
          <p className="text-xs text-[#4B5563] mt-1 font-normal">
            {mode === 'login'
              ? 'Enter your registered 13-digit CNIC number & password'
              : 'Register your National Identity Card for official voting'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex p-1 mb-5 rounded-xl bg-[#F6F8EF] border border-[#D1D5DB]">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); }}
            className={`flex-1 py-2 rounded-lg font-bold text-xs transition-colors ${
              mode === 'login' ? 'bg-[#0F5C33] text-white shadow-sm' : 'text-[#4B5563] hover:text-[#111827]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setError(''); }}
            className={`flex-1 py-2 rounded-lg font-bold text-xs transition-colors ${
              mode === 'signup' ? 'bg-[#0F5C33] text-white shadow-sm' : 'text-[#4B5563] hover:text-[#111827]'
            }`}
          >
            Register Voter
          </button>
        </div>

        {/* Alerts */}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          
          {mode === 'signup' && (
            <>
              <div>
                <label className="block text-xs font-bold text-[#111827] mb-1">Citizen Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-[#9CA3AF]" />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Muhammad Ali"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#F6F8EF] border border-[#D1D5DB] text-[#111827] text-xs placeholder:text-[#9CA3AF] focus:outline-none focus:bg-white focus:border-[#0F5C33]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#111827] mb-1">Age (Years)</label>
                  <input
                    type="number"
                    name="age"
                    required
                    min="18"
                    placeholder="25"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F6F8EF] border border-[#D1D5DB] text-[#111827] text-xs placeholder:text-[#9CA3AF] focus:outline-none focus:bg-white focus:border-[#0F5C33]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#111827] mb-1">Mobile No</label>
                  <input
                    type="text"
                    name="mobile"
                    required
                    placeholder="03001234567"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F6F8EF] border border-[#D1D5DB] text-[#111827] text-xs placeholder:text-[#9CA3AF] focus:outline-none focus:bg-white focus:border-[#0F5C33]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111827] mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#9CA3AF]" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="citizen@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#F6F8EF] border border-[#D1D5DB] text-[#111827] text-xs placeholder:text-[#9CA3AF] focus:outline-none focus:bg-white focus:border-[#0F5C33]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111827] mb-1">Residential Address (City / Constituency)</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-[#9CA3AF]" />
                  <input
                    type="text"
                    name="address"
                    required
                    placeholder="House No, Street, City"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#F6F8EF] border border-[#D1D5DB] text-[#111827] text-xs placeholder:text-[#9CA3AF] focus:outline-none focus:bg-white focus:border-[#0F5C33]"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-[#111827] mb-1">13-Digit CNIC Number (Without Dashes)</label>
            <div className="relative">
              <CreditCard className="absolute left-3.5 top-3 w-4 h-4 text-[#9CA3AF]" />
              <input
                type="number"
                name="Id_Card"
                required
                placeholder="4210112345671"
                value={formData.Id_Card}
                onChange={handleChange}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#F6F8EF] border border-[#D1D5DB] text-[#111827] text-xs font-mono placeholder:text-[#9CA3AF] focus:outline-none focus:bg-white focus:border-[#0F5C33]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#111827] mb-1">Account Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-[#9CA3AF]" />
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#F6F8EF] border border-[#D1D5DB] text-[#111827] text-xs placeholder:text-[#9CA3AF] focus:outline-none focus:bg-white focus:border-[#0F5C33]"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-[#111827] mb-1">Account Category</label>
              <div className="grid grid-cols-2 gap-2">
                <label className={`flex items-center justify-center p-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-colors ${
                  formData.roles === 'voter'
                    ? 'border-[#0F5C33] bg-[#0F5C33]/10 text-[#0F5C33]'
                    : 'border-[#D1D5DB] bg-[#F6F8EF] text-[#4B5563]'
                }`}>
                  <input
                    type="radio"
                    name="roles"
                    value="voter"
                    checked={formData.roles === 'voter'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  Citizen Voter
                </label>

                <label className={`flex items-center justify-center p-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-colors ${
                  formData.roles === 'admin'
                    ? 'border-[#0F5C33] bg-[#0F5C33]/10 text-[#0F5C33]'
                    : 'border-[#D1D5DB] bg-[#F6F8EF] text-[#4B5563]'
                }`}>
                  <input
                    type="radio"
                    name="roles"
                    value="admin"
                    checked={formData.roles === 'admin'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  Electoral Admin
                </label>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#0F5C33] hover:bg-[#0A3D22] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50 mt-4 shadow-sm"
          >
            {loading ? (
              <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
            ) : (
              <>
                <span>{mode === 'login' ? 'Sign In & Proceed' : 'Register Voter Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
