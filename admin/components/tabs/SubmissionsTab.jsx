"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import ConfirmModal from "../ui/ConfirmModal";

export default function SubmissionsTab() {
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null, type: null, customText: null });
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submissions`, {
        headers: { Authorization: `Bearer ${Cookies.get("admin_token")}` }
      });
      if (res.ok) {
        setSubmissions(await res.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteSubmission = async (id) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submissions/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${Cookies.get("admin_token")}` }
      });
      fetchSubmissions();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Quote Submissions</h2>
      <div className="space-y-4">
        {submissions.map(sub => (
          <div key={sub._id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative">
            <button onClick={() => setConfirmModal({ isOpen: true, id: sub._id, type: "Delete Submission", customText: "Are you sure you want to delete this submission?" })} className="absolute top-4 right-4 text-red-500 font-bold hover:underline">Delete</button>
            <h3 className="font-bold text-lg">{sub.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{sub.email} | {sub.phone}</p>
            <p className="font-medium mb-1"><span className="text-gray-500">Vehicle:</span> {sub.vehicle}</p>
            <p className="font-medium mb-2"><span className="text-gray-500">Service:</span> {sub.serviceNeeded}</p>
            {sub.message && (
              <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 italic mb-2">"{sub.message}"</div>
            )}
            {sub.photos && sub.photos.length > 0 && (
              <div className="flex gap-2 mt-2">
                {sub.photos.map(photo => (
                  <a key={photo.id} href={photo.url} target="_blank" rel="noopener noreferrer">
                    <img src={photo.url} alt="Uploaded" className="w-16 h-16 object-cover rounded-md border" />
                  </a>
                ))}
              </div>
            )}
            <p className="text-xs text-gray-400 mt-3">{new Date(sub.createdAt).toLocaleString()}</p>
          </div>
        ))}
        {submissions.length === 0 && <p className="text-gray-500">No submissions found.</p>}
      </div>
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, id: null, type: null, customText: null })}
        onConfirm={() => deleteSubmission(confirmModal.id)}
        title={confirmModal.type}
        message={confirmModal.customText}
      />
    </div>
  );
}
