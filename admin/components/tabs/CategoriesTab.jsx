"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Plus, Trash2, Tag, Car } from "lucide-react";
import ConfirmModal from "../ui/ConfirmModal";

export default function CategoriesTab() {
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null, type: null, customText: null });
  const [serviceCategories, setServiceCategories] = useState([]);
  const [carCategories, setCarCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [newServiceCat, setNewServiceCat] = useState("");
  const [newCarCat, setNewCarCat] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      
      // We need the raw category objects for delete, so fetch them with IDs
      const rawRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/raw`).catch(() => null);
      
      // If raw endpoint doesn't exist, we'll work with what we have
      // For now, re-fetch to get IDs — we'll use the names to match
      setServiceCategories(data.serviceCategories || []);
      setCarCategories(data.carCategories || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (type) => {
    const name = type === "service" ? newServiceCat.trim() : newCarCat.trim();
    if (!name) return;

    setIsSubmitting(true);
    try {
      const token = Cookies.get("admin_token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ type, name }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add category");
      }

      if (type === "service") setNewServiceCat("");
      else setNewCarCat("");
      
      fetchCategories();
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (type, name) => {
    

    try {
      const token = Cookies.get("admin_token");
      // Use name-based delete
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/by-name`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ type, name }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete category");
      }

      fetchCategories();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2 text-primary font-bold text-[10px] tracking-widest uppercase mb-2">
          <Tag className="w-3 h-3" /> Configuration
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Categories</h1>
          <p className="text-sm text-gray-500">Manage service categories and car types used across your website.</p>
        </div>
      </div>

      {error && <div className="text-red-600 mb-4 font-bold">{error}</div>}

      {loading ? (
        <div className="text-gray-500 font-bold uppercase tracking-widest">Loading categories...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Categories */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-gray-900">Service Categories</span>
              </div>
              <div className="text-[10px] font-bold text-gray-700 bg-gray-200 px-2 py-1 rounded-full uppercase tracking-widest">
                {serviceCategories.length} categories
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {serviceCategories.map((cat) => (
                <div key={cat} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary-light rounded-lg flex items-center justify-center">
                      <Tag className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium text-gray-900 text-sm">{cat}</span>
                  </div>
                  <button
                    onClick={() => handleDelete("service", cat)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 text-xs font-medium rounded-md hover:bg-red-100"
                  >
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                </div>
              ))}
              {serviceCategories.length === 0 && (
                <div className="p-6 text-center text-gray-500 text-sm">No service categories yet.</div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newServiceCat}
                  onChange={(e) => setNewServiceCat(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAdd("service")}
                  placeholder="New service category..."
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                />
                <button
                  onClick={() => handleAdd("service")}
                  disabled={isSubmitting || !newServiceCat.trim()}
                  className="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
            </div>
          </div>

          {/* Car Categories */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-gray-900">Car Types</span>
              </div>
              <div className="text-[10px] font-bold text-gray-700 bg-gray-200 px-2 py-1 rounded-full uppercase tracking-widest">
                {carCategories.length} types
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {carCategories.map((cat) => (
                <div key={cat} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary-light rounded-lg flex items-center justify-center">
                      <Car className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium text-gray-900 text-sm">{cat}</span>
                  </div>
                  <button
                    onClick={() => handleDelete("car", cat)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 text-xs font-medium rounded-md hover:bg-red-100"
                  >
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                </div>
              ))}
              {carCategories.length === 0 && (
                <div className="p-6 text-center text-gray-500 text-sm">No car types yet.</div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCarCat}
                  onChange={(e) => setNewCarCat(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAdd("car")}
                  placeholder="New car type..."
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                />
                <button
                  onClick={() => handleAdd("car")}
                  disabled={isSubmitting || !newCarCat.trim()}
                  className="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
          <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, id: null, type: null, customText: null })}
        onConfirm={() => {
          if (confirmModal.type === 'Delete Service Category') {
             handleDelete('service', confirmModal.id);
          } else if (confirmModal.type === 'Delete Car Category') {
             handleDelete('car', confirmModal.id);
          }
        }}
        title={confirmModal.type}
        message={confirmModal.customText}
      />
    </div>
  );
}
