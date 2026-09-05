import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';
import { 
  ShieldCheck, 
  Plus, 
  Edit, 
  Trash2, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  ShieldAlert
} from 'lucide-react';

export const AdminPanel = ({ onCandidatesUpdated }) => {
  const { isAdmin } = useAuth();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState(null);
  const [deletingCandidateId, setDeletingCandidateId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    party: '',
    age: '',
    image: '',
  });

  const fetchCandidates = async () => {
    try {
      const data = await api.getCandidates();
      setCandidates(data.candidates || data || []);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load candidates.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchCandidates();
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto py-12 text-center">
        <div className="merged-card p-6 rounded-xl bg-white border border-[#D1D5DB]">
          <ShieldAlert className="w-10 h-10 text-[#DC2626] mx-auto mb-2" />
          <h3 className="text-base font-bold text-[#111827]">Access Restricted</h3>
          <p className="text-xs text-[#4B5563] mt-1 font-normal">This administrative panel is strictly restricted to Admin users.</p>
        </div>
      </div>
    );
  }

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.addCandidate({
        name: formData.name,
        party: formData.party,
        age: Number(formData.age),
        image: formData.image || '',
      });
      setSuccess('Candidate added successfully.');
      setShowAddModal(false);
      setFormData({ name: '', party: '', age: '', image: '' });
      fetchCandidates();
      if (onCandidatesUpdated) onCandidatesUpdated();
    } catch (err) {
      setError(err.message || 'Failed to add candidate.');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingCandidate) return;
    setError('');
    setSuccess('');
    try {
      await api.updateCandidate(editingCandidate._id, {
        name: formData.name,
        party: formData.party,
        age: Number(formData.age),
        image: formData.image || '',
      });
      setSuccess('Candidate updated successfully.');
      setEditingCandidate(null);
      setFormData({ name: '', party: '', age: '', image: '' });
      fetchCandidates();
      if (onCandidatesUpdated) onCandidatesUpdated();
    } catch (err) {
      setError(err.message || 'Failed to update candidate.');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingCandidateId) return;
    setError('');
    setSuccess('');
    try {
      await api.deleteCandidate(deletingCandidateId);
      setSuccess('Candidate deleted successfully.');
      setDeletingCandidateId(null);
      fetchCandidates();
      if (onCandidatesUpdated) onCandidatesUpdated();
    } catch (err) {
      setError(err.message || 'Failed to delete candidate.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Header */}
      <div className="merged-card p-6 sm:p-8 mb-6 bg-white border border-[#D1D5DB] rounded-xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F6F4] border border-[#D1D5DB] text-[#0F5C33] text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0F5C33]" /> Administrative Access
          </div>
          <h2 className="text-2xl font-black text-[#111827]">Candidate Ballot Management</h2>
          <p className="text-xs text-[#4B5563] font-normal mt-0.5">Add, update, or remove election candidates from the ballot.</p>
        </div>

        <button
          onClick={() => {
            setFormData({ name: '', party: '', age: '', image: '' });
            setShowAddModal(true);
          }}
          className="px-5 py-2.5 rounded-xl bg-[#0F5C33] hover:bg-[#0A3D22] text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Candidate
        </button>
      </div>

      {/* Alerts */}
      {error && (
        <div className="mb-4 p-3.5 rounded-xl bg-[#DC2626]/10 border border-[#DC2626]/30 text-[#DC2626] text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="mb-4 p-3.5 rounded-xl bg-[#16A34A]/10 border border-[#16A34A]/30 text-[#16A34A] text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Candidates List */}
      {loading ? (
        <div className="py-12 text-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#0F5C33] border-t-transparent animate-spin mx-auto mb-2"></div>
          <p className="text-xs text-[#4B5563] font-medium">Loading candidate records...</p>
        </div>
      ) : candidates.length === 0 ? (
        <div className="merged-card p-10 text-center rounded-xl bg-white border border-[#D1D5DB]">
          <p className="text-sm font-bold text-[#4B5563]">No candidates added yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {candidates.map((cand) => (
            <div key={cand._id} className="merged-card p-5 bg-white border border-[#D1D5DB] rounded-xl shadow-sm flex flex-col justify-between hover:border-[#0F5C33] transition-colors">
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={cand.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(cand.name)}&background=0F5C33&color=ffffff&bold=true`}
                    alt={cand.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(cand.name)}&background=0F5C33&color=ffffff&bold=true`;
                    }}
                    className="w-12 h-12 rounded-xl object-cover border border-[#D1D5DB] bg-[#F3F6F4]"
                  />
                  <div>
                    <h4 className="text-base font-black text-[#111827]">{cand.name}</h4>
                    <p className="text-xs text-[#0F5C33] font-bold">Party: {cand.party}</p>
                    <p className="text-[11px] text-[#4B5563] font-mono">Age: {cand.age}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-[#D1D5DB] mt-4">
                <button
                  onClick={() => {
                    setEditingCandidate(cand);
                    setFormData({ name: cand.name, party: cand.party, age: cand.age, image: cand.image || '' });
                  }}
                  className="flex-1 py-2 rounded-xl bg-[#F3F6F4] hover:bg-[#E5E7EB] text-[#111827] font-bold text-xs border border-[#D1D5DB] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Edit className="w-3.5 h-3.5 text-[#0F5C33]" /> Edit
                </button>

                <button
                  onClick={() => setDeletingCandidateId(cand._id)}
                  className="p-2 rounded-xl bg-[#DC2626]/10 hover:bg-[#DC2626]/20 text-[#DC2626] border border-[#DC2626]/30 transition-colors"
                  title="Delete Candidate"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Add Candidate */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-md bg-white border border-[#D1D5DB] rounded-2xl p-6 relative shadow-xl">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#F3F6F4] text-[#4B5563] hover:text-[#111827] border border-[#D1D5DB]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-black text-[#111827] mb-4">Add Candidate To Ballot</h3>

            <form onSubmit={handleAddSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#111827] mb-1">Candidate Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Imran Khan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D1D5DB] text-[#111827] placeholder:text-[#9CA3AF] text-xs focus:outline-none focus:border-[#0F5C33]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111827] mb-1">Political Party Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PTI / PML-N / PPP"
                  value={formData.party}
                  onChange={(e) => setFormData({ ...formData, party: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D1D5DB] text-[#111827] placeholder:text-[#9CA3AF] text-xs focus:outline-none focus:border-[#0F5C33]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111827] mb-1">Age</label>
                <input
                  type="number"
                  required
                  min="25"
                  placeholder="40"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D1D5DB] text-[#111827] placeholder:text-[#9CA3AF] text-xs focus:outline-none focus:border-[#0F5C33]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111827] mb-1">Image URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D1D5DB] text-[#111827] placeholder:text-[#9CA3AF] text-xs focus:outline-none focus:border-[#0F5C33]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#F3F6F4] text-[#4B5563] hover:text-[#111827] font-bold text-xs border border-[#D1D5DB]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#0F5C33] hover:bg-[#0A3D22] text-white font-bold text-xs shadow-sm transition-colors"
                >
                  Save Candidate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Candidate */}
      {editingCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-md bg-white border border-[#D1D5DB] rounded-2xl p-6 relative shadow-xl">
            <button
              onClick={() => setEditingCandidate(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#F3F6F4] text-[#4B5563] hover:text-[#111827] border border-[#D1D5DB]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-black text-[#111827] mb-4">Edit Candidate Details</h3>

            <form onSubmit={handleEditSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#111827] mb-1">Candidate Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D1D5DB] text-[#111827] text-xs focus:outline-none focus:border-[#0F5C33]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111827] mb-1">Party Name</label>
                <input
                  type="text"
                  required
                  value={formData.party}
                  onChange={(e) => setFormData({ ...formData, party: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D1D5DB] text-[#111827] text-xs focus:outline-none focus:border-[#0F5C33]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111827] mb-1">Age</label>
                <input
                  type="number"
                  required
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D1D5DB] text-[#111827] text-xs focus:outline-none focus:border-[#0F5C33]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111827] mb-1">Image URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D1D5DB] text-[#111827] text-xs focus:outline-none focus:border-[#0F5C33]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingCandidate(null)}
                  className="flex-1 py-2.5 rounded-xl bg-[#F3F6F4] text-[#4B5563] hover:text-[#111827] font-bold text-xs border border-[#D1D5DB]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#0F5C33] hover:bg-[#0A3D22] text-white font-bold text-xs shadow-sm transition-colors"
                >
                  Update Candidate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Delete Confirmation */}
      {deletingCandidateId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-sm bg-white border border-[#D1D5DB] rounded-2xl p-6 text-center shadow-xl">
            <h4 className="text-lg font-black text-[#111827]">Delete Candidate?</h4>
            <p className="text-xs text-[#4B5563] mt-2 font-normal">
              Are you sure you want to remove this candidate from the election ballot?
            </p>

            <div className="grid grid-cols-2 gap-3 mt-5">
              <button
                type="button"
                onClick={() => setDeletingCandidateId(null)}
                className="py-2.5 rounded-xl bg-[#F3F6F4] text-[#4B5563] hover:text-[#111827] font-bold text-xs border border-[#D1D5DB]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs shadow-sm transition-colors"
              >
                Delete Candidate
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
