"use client";
import { useState } from 'react';

export default function CalculatorModal({ pricing, booking }: { pricing: any, booking: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [transportType, setTransportType] = useState('Road'); 
  const [hotelLevel, setHotelLevel] = useState('Deluxe');

  // 1. INDIVIDUAL CALCULATIONS
  const transportCost = transportType === 'Air' ? (pricing?.transportAir || 0) : (pricing?.transportRoad || 0);
  
  const hotelCostPerNight = 
    hotelLevel === 'Luxury' ? (pricing?.hotelLuxury || 0) : 
    hotelLevel === 'Executive' ? (pricing?.hotelExecutive || 0) : 
    (pricing?.hotelDeluxe || 0);
  
  const totalHotelCost = hotelCostPerNight * (booking.duration || 1);
  
  const totalFoodCost = (pricing?.foodPerDay || 0) * (booking.adults || 1) * (booking.duration || 1);

  // 2. FINAL TOTAL
  const finalTotal = transportCost + totalHotelCost + totalFoodCost;

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="bg-blue-600 text-white px-3 py-2 rounded-lg text-[10px] font-black uppercase hover:bg-blue-700 transition-all"
      >
        Calculate
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 text-slate-900">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-xl font-black text-blue-900 uppercase tracking-tighter">Live Quote Engine</h2>
               <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-red-600 text-2xl">✕</button>
            </div>
            
            <div className="space-y-4">
              {/* COST BREAKDOWN CARD */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Transport ({transportType}):</span>
                  <span className="font-bold text-slate-700">PKR {transportCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Accommodation ({hotelLevel}):</span>
                  <span className="font-bold text-slate-700">PKR {totalHotelCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Food ({booking.adults} Pers x {booking.duration} Days):</span>
                  <span className="font-bold text-slate-700">PKR {totalFoodCost.toLocaleString()}</span>
                </div>
              </div>

              {/* CONTROLS */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Transport</label>
                  <select 
                    value={transportType} 
                    onChange={(e) => setTransportType(e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm"
                  >
                    <option value="Road">By Road</option>
                    <option value="Air">By Air</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Hotel Class</label>
                  <select 
                    value={hotelLevel} 
                    onChange={(e) => setHotelLevel(e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm"
                  >
                    <option value="Deluxe">Deluxe</option>
                    <option value="Executive">Executive</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>
              </div>

              {/* FINAL DISPLAY */}
              <div className="bg-blue-900 p-6 rounded-2xl text-center shadow-lg">
                <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-1">Grand Total Quote</p>
                <h3 className="text-3xl font-black text-white">PKR {finalTotal.toLocaleString()}</h3>
              </div>

              <button 
                onClick={() => {
                   const text = `*Tour Quote for ${booking.fullName}*%0A%0A- Transport: PKR ${transportCost}%0A- Hotel: PKR ${totalHotelCost}%0A- Food: PKR ${totalFoodCost}%0A-------------------%0A*Total: PKR ${finalTotal}*%0A%0A_Generated via Tour Platform_`;
                   window.open(`https://wa.me/${booking.whatsapp.replace(/\D/g, '')}?text=${text}`, '_blank');
                }}
                className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-emerald-700 transition-all shadow-md"
              >
                Send Quote to WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}