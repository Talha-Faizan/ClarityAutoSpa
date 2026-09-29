"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function SettingsTab() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/settings`);
      if (res.ok) {
        setSettings(await res.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/settings`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("admin_token")}`
        },
        body: JSON.stringify(settings)
      });
      alert("Settings saved!");
    } catch (err) {
      console.error(err);
      alert("Failed to save settings");
    }
  };

  if (!settings) return <div>Loading...</div>;

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Site Settings</h2>

      <div className="bg-cream p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="font-bold text-lg mb-4">Badges</h3>
        <label className="flex items-center gap-2 mb-2">
          <input 
            type="checkbox" 
            checked={settings.showBlackOwnedBadge} 
            onChange={e => setSettings({...settings, showBlackOwnedBadge: e.target.checked})}
          />
          Show "Black-Owned Business" badge
        </label>
        <label className="flex items-center gap-2">
          <input 
            type="checkbox" 
            checked={settings.showLgbtqBadge} 
            onChange={e => setSettings({...settings, showLgbtqBadge: e.target.checked})}
          />
          Show "LGBTQ+ Friendly" badge
        </label>
      </div>

      <div className="bg-cream p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="font-bold text-lg mb-4">Contact Info</h3>
        <label className="block mb-2 font-medium">Address</label>
        <input 
          className="w-full border rounded p-2 mb-4" 
          value={settings.address} 
          onChange={e => setSettings({...settings, address: e.target.value})} 
        />
        
        <label className="block mb-2 font-medium">Phone</label>
        <input 
          className="w-full border rounded p-2 mb-4" 
          value={settings.phone} 
          onChange={e => setSettings({...settings, phone: e.target.value})} 
        />
        
        <label className="block mb-2 font-medium">Email</label>
        <input 
          className="w-full border rounded p-2 mb-4" 
          value={settings.email} 
          onChange={e => setSettings({...settings, email: e.target.value})} 
        />
      </div>

      <div className="bg-cream p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="font-bold text-lg mb-4">Reviews Section</h3>
        <label className="block mb-2 font-medium">Google Reviews URL</label>
        <input 
          className="w-full border rounded p-2 mb-4" 
          value={settings.googleReviewsUrl} 
          onChange={e => setSettings({...settings, googleReviewsUrl: e.target.value})} 
        />
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium">Rating</label>
            <input 
              type="number" step="0.1"
              className="w-full border rounded p-2" 
              value={settings.rating} 
              onChange={e => setSettings({...settings, rating: parseFloat(e.target.value)})} 
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Review Count</label>
            <input 
              type="number"
              className="w-full border rounded p-2" 
              value={settings.reviewCount} 
              onChange={e => setSettings({...settings, reviewCount: parseInt(e.target.value)})} 
            />
          </div>
        </div>
      </div>

      <button onClick={handleSave} className="bg-[#DDA325] text-cream px-6 py-2 rounded-lg font-bold hover:bg-gold-hover">
        Save Settings
      </button>
    </div>
  );
}
