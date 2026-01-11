"use client";
import { createBooking } from "../actions";
import { useState } from "react";

export default function AdventureForm() {
  const [days, setDays] = useState(5);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  return (
    <div className="bg-slate-100 min-h-screen py-10 px-4 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-[2.5rem] overflow-hidden border border-white">
        
        {/* Header Section */}
        <div className="bg-blue-900 p-8 text-white text-center">
          <h1 className="text-4xl font-black uppercase tracking-tighter">Make My Adventure</h1>
          <p className="opacity-80 mt-2 font-medium">THE BEST TOUR AGENCY — We give you the best of us</p>
        </div>

        <form action={createBooking} className="p-8 md:p-12 space-y-10">
          
          {/* 1. MAIN CATEGORY HEADINGS */}
          <div className="space-y-4">
            <h3 className="text-sm font-black text-blue-900 uppercase tracking-widest text-center">Plan My Adventure For:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Family', 'Couple Honeymoon', 'Corporate Trip', 'Student Group'].map((cat) => (
                <label key={cat} className="flex items-center justify-center border-2 border-slate-100 p-4 rounded-2xl cursor-pointer hover:border-blue-900 transition-all has-[:checked]:bg-blue-900 has-[:checked]:text-white">
                  <input type="radio" name="tourCategory" value={cat} className="hidden" required />
                  <span className="text-xs font-bold uppercase">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 2. PERSONAL INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase">Full Name *</label>
              <input name="fullName" required className="w-full bg-slate-50 p-4 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none" placeholder="Enter Full Name" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase">WhatsApp Number *</label>
              <input name="whatsapp" required className="w-full bg-slate-50 p-4 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none" placeholder="+92 XXX XXXXXXX" />
            </div>
          </div>

          {/* 3. TOUR DETAILS (Departure, Trip Type, Mode) */}
          <div className="bg-blue-50/50 p-8 rounded-[2rem] border border-blue-100 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-blue-900 uppercase">Departure City *</label>
                <select name="departureCity" className="w-full bg-white p-4 rounded-xl shadow-sm outline-none font-bold">
                  <option>Islamabad</option><option>Lahore</option><option>Karachi</option><option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-blue-900 uppercase">Trip Type *</label>
                <select name="tripType" className="w-full bg-white p-4 rounded-xl shadow-sm outline-none font-bold">
                  <option>Sightseeing</option>
                  <option>Hiking & Trekking</option>
                  <option>Food & Culture</option>
                  <option>Honeymoon</option>
                  <option>Safari</option>
                  <option>Adventure + Sightseeing</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-blue-900 uppercase">Date of Departure</label>
                <input type="date" name="departureDate" required className="w-full bg-white p-3 rounded-xl shadow-sm outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-blue-900 uppercase">Date of Return</label>
                <input type="date" name="returnDate" required className="w-full bg-white p-3 rounded-xl shadow-sm outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-blue-900 uppercase">Travel By</label>
                <div className="flex gap-4 pt-2">
                  <label className="flex items-center space-x-2 cursor-pointer font-bold text-sm"><input type="radio" name="travelMode" value="By Air" required className="accent-blue-900" /> <span>✈️ Air</span></label>
                  <label className="flex items-center space-x-2 cursor-pointer font-bold text-sm"><input type="radio" name="travelMode" value="By Road" required className="accent-blue-900" /> <span>🚐 Road</span></label>
                </div>
              </div>
            </div>
          </div>

          {/* 4. INTERACTIVE SLIDERS (Persons & Days) */}
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex justify-between items-center"><label className="text-xs font-black text-slate-400 uppercase">Total Tour Duration</label><span className="text-blue-900 font-black text-xl">{days} Days</span></div>
              <input type="range" name="duration" min="1" max="25" value={days} onChange={(e) => setDays(parseInt(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-900" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="flex justify-between items-center"><label className="text-xs font-black text-slate-400 uppercase">No. of Adults</label><span className="text-blue-900 font-black text-xl">{adults}</span></div>
                <input type="range" name="adults" min="1" max="50" value={adults} onChange={(e) => setAdults(parseInt(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-900" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center"><label className="text-xs font-black text-slate-400 uppercase">No. of Children</label><span className="text-blue-900 font-black text-xl">{children}</span></div>
                <input type="range" name="children" min="0" max="30" value={children} onChange={(e) => setChildren(parseInt(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-900" />
              </div>
            </div>
          </div>

          {/* 5. DESTINATION & ACCOMMODATION */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase">Destinations (Skardu, Hunza, Swat...)</label>
              <textarea name="destinations" required className="w-full bg-slate-50 p-4 rounded-2xl h-24 focus:ring-2 focus:ring-blue-900 outline-none" placeholder="Where do you want to go?" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select name="hotelType" className="bg-slate-50 p-4 rounded-xl outline-none font-bold text-sm"><option>Deluxe Hotel</option><option>Executive Hotel</option><option>Luxury Hotel</option></select>
              <select name="roomType" className="bg-slate-50 p-4 rounded-xl outline-none font-bold text-sm"><option>Master Bed</option><option>Twin Beds</option><option>Triple Beds</option></select>
              <select name="noOfRooms" className="bg-slate-50 p-4 rounded-xl outline-none font-bold text-sm"><option>1 Room</option><option>2 Rooms</option><option>3+ Rooms</option></select>
            </div>
          </div>

          {/* 6. SUBMIT */}
          <div className="space-y-6">
            <textarea name="requirements" className="w-full bg-slate-50 p-4 rounded-2xl h-24 focus:ring-2 focus:ring-blue-900 outline-none" placeholder="Any additional requirements or special requests?" />
            <button type="submit" className="w-full bg-blue-900 text-white font-black py-6 rounded-[2.5rem] text-xl hover:bg-black transition-all shadow-2xl uppercase tracking-widest">
              Plan My Adventure
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}