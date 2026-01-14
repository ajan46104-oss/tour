"use client";
import { useState, useEffect } from "react";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    foodPerDay: 1500,
    transportAir: 25000,
    transportRoad: 5000,
    hotelDeluxe: 5000,
    hotelExecutive: 8000,
    hotelLuxury: 15000,
  });

  // Load settings from database on mount
  useEffect(() => {
    fetch("/api/settings").then(res => res.json()).then(data => {
      if (data) setSettings(data);
    });
  }, []);

  const handleSave = async () => {
    const res = await fetch("/api/settings", {
      method: "POST",
      body: JSON.stringify(settings),
    });
    if (res.ok) alert("Settings updated successfully!");
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 mt-10">
      <h1 className="text-2xl font-black text-blue-900 mb-6 uppercase tracking-tight">Calculator Price Settings</h1>
      
      <div className="grid gap-4">
        <div>
          <label className="text-[10px] font-bold uppercase text-slate-400">Food Per Person / Day (PKR)</label>
          <input type="number" value={settings.foodPerDay} 
            onChange={(e) => setSettings({...settings, foodPerDay: Number(e.target.value)})}
            className="w-full p-3 bg-slate-50 rounded-xl border-none mt-1" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold uppercase text-slate-400">Base Transport (Air)</label>
            <input type="number" value={settings.transportAir} 
              onChange={(e) => setSettings({...settings, transportAir: Number(e.target.value)})}
              className="w-full p-3 bg-slate-50 rounded-xl border-none mt-1" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase text-slate-400">Base Transport (Road)</label>
            <input type="number" value={settings.transportRoad} 
              onChange={(e) => setSettings({...settings, transportRoad: Number(e.target.value)})}
              className="w-full p-3 bg-slate-50 rounded-xl border-none mt-1" />
          </div>
        </div>

        <h2 className="text-sm font-black text-blue-900 mt-4 uppercase">Hotel Room Prices (Per Night)</h2>
        <div className="grid grid-cols-3 gap-2">
           <input type="number" placeholder="Deluxe" value={settings.hotelDeluxe} onChange={(e) => setSettings({...settings, hotelDeluxe: Number(e.target.value)})} className="p-3 bg-slate-50 rounded-xl border-none" />
           <input type="number" placeholder="Executive" value={settings.hotelExecutive} onChange={(e) => setSettings({...settings, hotelExecutive: Number(e.target.value)})} className="p-3 bg-slate-50 rounded-xl border-none" />
           <input type="number" placeholder="Luxury" value={settings.hotelLuxury} onChange={(e) => setSettings({...settings, hotelLuxury: Number(e.target.value)})} className="p-3 bg-slate-50 rounded-xl border-none" />
        </div>

        <button onClick={handleSave} className="mt-6 bg-blue-900 text-white font-black uppercase tracking-widest py-4 rounded-xl hover:bg-yellow-500 transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  );
}