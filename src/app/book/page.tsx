"use client";
import { useState, useEffect } from "react";
import { createBooking, getDestinations } from "../admin/admin-actions";

export default function AdventureForm() {
  const [estimate, setEstimate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [destList, setDestList] = useState<{name: string}[]>([]);

  useEffect(() => {
    async function loadData() {
      const list = await getDestinations();
      setDestList(list);
    }
    loadData();
  }, []);

  async function handleAction(formData: FormData) {
    setLoading(true);
    const res = await createBooking(formData);
    if (res.success) setEstimate(res.price || 0);
    setLoading(false);
  }

  if (estimate !== null) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="bg-[#ffcc00] p-10 rounded-[40px] shadow-xl">
            <h2 className="text-2xl font-black uppercase italic mb-2">Estimated Total</h2>
            <p className="text-5xl font-black">PKR {estimate.toLocaleString()}</p>
          </div>
          <button onClick={() => setEstimate(null)} className="font-bold uppercase tracking-widest text-sm underline">Back to Editor</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-20 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-[32px] shadow-2xl overflow-hidden border border-slate-100">
        <div className="p-12 bg-[#1a1a1a] text-white text-center">
          <h1 className="text-4xl font-black uppercase tracking-tight">Customize Your Tour</h1>
          <div className="w-20 h-1 bg-[#ffcc00] mx-auto mt-4"></div>
        </div>

        <form action={handleAction} className="p-10 space-y-10">
          {/* PERSONAL INFO */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Full Name</label>
              <input name="fullName" placeholder="Ikram Ali" className="w-full p-4 bg-slate-50 border rounded-xl outline-none focus:border-[#ffcc00]" required />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">WhatsApp</label>
              <input name="whatsapp" placeholder="+92 300 1234567" className="w-full p-4 bg-slate-50 border rounded-xl outline-none focus:border-[#ffcc00]" required />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Departure City</label>
              <input name="departureCity" placeholder="e.g. Islamabad" className="w-full p-4 bg-slate-50 border rounded-xl outline-none focus:border-[#ffcc00]" required />
            </div>
          </div>

          {/* TOUR DETAILS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Destination</label>
              <select name="destinations" className="w-full p-4 bg-slate-50 border rounded-xl outline-none" required>
                <option value="">Choose Destination</option>
                {destList.map((d, i) => <option key={i} value={d.name}>{d.name}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Tour Date</label>
              <input name="departureDate" type="date" className="w-full p-4 bg-slate-50 border rounded-xl outline-none" required />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Total Nights</label>
              <input name="duration" type="number" defaultValue="5" className="w-full p-4 bg-slate-50 border rounded-xl outline-none" />
            </div>
          </div>

          {/* PASSENGERS */}
          <div className="grid grid-cols-3 gap-6 bg-slate-50 p-6 rounded-2xl">
            <div className="text-center">
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-2">Adults</label>
              <input name="adults" type="number" defaultValue="2" className="w-full text-center font-bold bg-white p-3 rounded-lg border" />
            </div>
            <div className="text-center">
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-2">Children (2-11)</label>
              <input name="children" type="number" defaultValue="0" className="w-full text-center font-bold bg-white p-3 rounded-lg border" />
            </div>
            <div className="text-center">
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-2">Infants ({"<"}2)</label>
              <input name="infants" type="number" defaultValue="0" className="w-full text-center font-bold bg-white p-3 rounded-lg border" />
            </div>
          </div>

          {/* CATEGORIES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <select name="travelMode" className="p-4 bg-white border-2 border-slate-900 rounded-xl font-bold">
              <option value="Road">Transport: By Road (Sedan)</option>
              <option value="Air">Transport: By Air</option>
            </select>
            <select name="hotelType" className="p-4 bg-white border-2 border-slate-900 rounded-xl font-bold">
              <option value="Deluxe">Hotel: Deluxe</option>
              <option value="Executive">Hotel: Executive</option>
              <option value="Luxury">Hotel: Luxury</option>
            </select>
            <select name="roomType" className="p-4 bg-white border-2 border-slate-900 rounded-xl font-bold">
              <option value="Double">Room: Double</option>
              <option value="Master">Room: Master</option>
              <option value="Triple">Room: Triple</option>
            </select>
          </div>

          <button disabled={loading} className="w-full bg-[#ffcc00] text-black font-black py-6 rounded-2xl uppercase tracking-[4px] shadow-xl hover:bg-black hover:text-white transition-all">
            {loading ? "Calculating Price..." : "Generate My Quote"}
          </button>
        </form>
      </div>
    </div>
  );
}