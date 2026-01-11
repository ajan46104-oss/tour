"use client";

<form action={submitAdventureForm}>
import { useState } from "react";

export default function BookingForm({ tourId, tourTitle }: { tourId: number, tourTitle: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-bold transition"
      >
        Book Now
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">Booking: {tourTitle}</h2>
            
            <form action={async (formData) => {
              await createBooking(formData);
              alert("Booking Successful!");
              setIsOpen(false);
            }}>
              <input type="hidden" name="tourId" value={tourId} />
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input name="name" required className="w-full border p-2 rounded mt-1" placeholder="Enter name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">CNIC Number</label>
                  <input name="cnic" required className="w-full border p-2 rounded mt-1" placeholder="e.g. 4210112345678" />
                </div>
                
                <div className="flex gap-2 pt-4">
                  <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded font-bold">Confirm Booking</button>
                  <button type="button" onClick={() => setIsOpen(false)} className="flex-1 bg-gray-200 py-2 rounded">Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}