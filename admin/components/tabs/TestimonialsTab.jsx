"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { MessageSquare, RefreshCw, Trash2, Edit2, Plus, Star } from "lucide-react";

export default function TestimonialsTab() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    quote: "",
    rating: 5,
    isFeatured: false,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials?t=${Date.now()}`, {
        cache: 'no-store'
      });
      if (res.ok) {
        setTestimonials(await res.json());
      }
    } catch (error) {
      console.error("Failed to fetch testimonials", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSyncGoogle = async () => {
    setSyncing(true);
    try {
      const token = Cookies.get("admin_token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials/sync-google`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        fetchTestimonials();
      } else {
        alert(data.error || "Failed to sync reviews");
      }
    } catch (error) {
      alert("Network error");
    } finally {
      setSyncing(false);
    }
  };

  const handleOpenModal = (review = null) => {
    if (review) {
      setEditingId(review._id);
      setFormData({
        customerName: review.customerName,
        quote: review.quote,
        rating: review.rating,
        isFeatured: review.isFeatured || false,
      });
    } else {
      setEditingId(null);
      setFormData({
        customerName: "",
        quote: "",
        rating: 5,
        isFeatured: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = Cookies.get("admin_token");

    try {
      const url = editingId
        ? `${process.env.NEXT_PUBLIC_API_URL}/testimonials/${editingId}`
        : `${process.env.NEXT_PUBLIC_API_URL}/testimonials`;

      const res = await fetch(url, {
        method: editingId ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          rating: Number(formData.rating),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save testimonial");
      }

      setIsModalOpen(false);
      fetchTestimonials();
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this testimonial?")) return;
    // Optimistic UI: remove immediately
    setTestimonials(prev => prev.filter(t => t._id !== id));
    try {
      const token = Cookies.get("admin_token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to delete");
      fetchTestimonials();
    } catch (error) {
      alert("Failed to delete");
      fetchTestimonials(); // Re-fetch to restore if delete failed
    }
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2 text-primary font-bold text-[10px] tracking-widest uppercase mb-2">
          <MessageSquare className="w-3 h-3" /> Workspace
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Testimonials</h1>
            <p className="text-sm text-gray-500">Google reviews sync in automatically — publish, hide, or add the occasional manual one.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleSyncGoogle}
              disabled={syncing}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${syncing ? 'animate-spin' : ''}`} /> 
              {syncing ? 'Syncing...' : 'Sync Google reviews'}
            </button>
            <button 
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark"
            >
              <Plus className="w-4 h-4" /> Add Manual Review
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <button className="px-4 py-1.5 rounded-full bg-primary text-white text-xs font-medium">All ({testimonials.length})</button>
      </div>

      {loading ? (
        <div className="text-gray-500 font-bold uppercase tracking-widest">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map(review => (
            <div key={review._id} className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex text-primary">
                  {Array(review.rating).fill("★").map((star, i) => <span key={i}>{star}</span>)}
                  {Array(5 - review.rating).fill("☆").map((star, i) => <span key={i} className="text-gray-300">{star}</span>)}
                </div>
                <div className="flex items-center gap-2">
                  {review.isFeatured && (
                    <span className="text-[10px] font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                      ★ Featured
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-[10px] font-bold text-primary bg-primary-light px-2 py-1 rounded-full">
                    <MessageSquare className="w-3 h-3"/> Review
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-6 font-medium">&ldquo;{review.quote}&rdquo;</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {review.photoUrl ? (
                    <img src={review.photoUrl} alt={review.customerName} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                      {review.customerName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-bold text-gray-900">{review.customerName}</p>
                    <p className="text-[10px] text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleOpenModal(review)} 
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(review._id)} 
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 text-sm font-medium rounded-md hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {testimonials.length === 0 && (
            <div className="col-span-2 p-8 text-center text-gray-500 font-medium border border-dashed rounded-xl">No testimonials found.</div>
          )}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {editingId ? "Edit Testimonial" : "Add Manual Review"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Customer Name</label>
                <input 
                  required 
                  type="text" 
                  value={formData.customerName} 
                  onChange={e => setFormData({...formData, customerName: e.target.value})} 
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
                  placeholder="e.g. John Doe" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Review</label>
                <textarea 
                  required 
                  rows={4} 
                  value={formData.quote} 
                  onChange={e => setFormData({...formData, quote: e.target.value})} 
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none" 
                  placeholder="What did the customer say?" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({...formData, rating: star})}
                      className={`text-2xl transition-colors ${
                        star <= formData.rating ? 'text-primary' : 'text-gray-300'
                      } hover:text-primary`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-500 self-center">{formData.rating}/5</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.isFeatured} 
                    onChange={e => setFormData({...formData, isFeatured: e.target.checked})} 
                    className="sr-only peer" 
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
                <span className="text-sm font-medium text-gray-900">Featured review</span>
              </div>

              <div className="pt-4 flex gap-3 justify-end mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg font-medium text-sm bg-gray-100 text-gray-700 hover:bg-gray-200">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm bg-primary text-white hover:bg-primary-dark disabled:opacity-50">
                  {isSubmitting ? "Saving..." : <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> {editingId ? "Save Changes" : "Add Review"}</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
