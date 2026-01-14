"use client";
import { useState, useEffect } from "react";
// FIXED PATH: Using the absolute alias '@/' to point directly to the admin folder
import { createBooking } from "@/app/admin/admin-actions";

export default function BookingForm({ tourId, tourTitle }: { tourId: number, tourTitle: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    whatsapp: "",
    adults: 1,
    children: 0,
    duration: 3, 
    travelMode: "Road", 
    hotelType: "Deluxe", 
    noOfRooms: 1,
  });

  const [estimate, setEstimate] = useState(0);

  useEffect(() => {
    const foodRate = 1500; 
    const transportRate = formData.travelMode === "Air" ? 25000 : 5000;
    const hotelRate = formData.hotelType === "Luxury" ? 8000 : 4000;

    const total = 
      ((formData.adults + formData.children) * foodRate * formData.duration) + 
      (transportRate * (formData.travelMode === "Air" ? (formData.adults + formData.children) : 1)) +
      (formData.noOfRooms * hotelRate * formData.duration);

    setEstimate(total);
  }, [formData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const val = ["fullName", "whatsapp", "travelMode", "hotelType"].includes(name) ? value : Number(value);
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="bg-blue-900 text-white px-8 py-3 rounded-full font-black uppercase tracking-widest hover:bg-yellow-500 hover:text-blue-900 transition-all shadow-lg">
        Book Now
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white p-8 rounded-3xl max-w-lg w-full shadow-2xl my-8 border border-slate-100">
            <h2 className="text-2xl font-black text-blue-900 mb-6 uppercase tracking-tight">Trip to {tourTitle}</h2>
            
            {/* WRAPPED ACTION: Ensures the form behaves correctly with server actions */}
            <form action={async (formDataPayload: FormData) => {
                await createBooking(formDataPayload);
                setIsOpen(false);
            }} className="space-y-4">
              <input type="hidden" name="tourId" value={tourId} />
              <input type="hidden" name="tourCategory" value={tourTitle} />
              <input type="hidden" name="totalEstimate" value={estimate} />
              <input type="hidden" name="travelMode" value={formData.travelMode} />

              <div className="space-y-3">
                <input required type="text" name="fullName" placeholder="Your Full Name" onChange={handleChange} className="w-full border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none border" />
                <input required type="text" name="whatsapp" placeholder="WhatsApp Number (e.g. 0300...)" onChange={handleChange} className="w-full border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none border" />
              </div>

              <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
                <button type="button" onClick={() => setFormData({...formData, travelMode: "Road"})} className={`flex-1 py-2 rounded-lg font-bold text-xs uppercase ${formData.travelMode === "Road" ? "bg-white text-blue-900 shadow-sm" : "text-slate-500"}`}>🚐 Road</button>
                <button type="button" onClick={() => setFormData({...formData, travelMode: "Air"})} className={`flex-1 py-2 rounded-lg font-bold text-xs uppercase ${formData.travelMode === "Air" ? "bg-white text-blue-900 shadow-sm" : "text-slate-500"}`}>✈️ Air</button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Adults</label>
                  <input type="number" name="adults" value={formData.adults} onChange={handleChange} className="w-full border-slate-200 p-3 rounded-xl border" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Children</label>
                  <input type="number" name="children" value={formData.children} onChange={handleChange} className="w-full border-slate-200 p-3 rounded-xl border" />
                </div>
              </div>

              <div className="bg-blue-900 p-5 rounded-2xl text-center">
                <p className="text-blue-300 text-[10px] font-black uppercase tracking-widest">Estimated Price</p>
                <p className="text-3xl font-black text-white">PKR {estimate.toLocaleString()}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 bg-yellow-500 text-blue-900 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-blue-900 hover:text-white transition-all">Confirm Booking</button>
                <button type="button" onClick={() => setIsOpen(false)} className="px-6 bg-slate-100 text-slate-500 py-4 rounded-xl font-bold uppercase text-xs">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
