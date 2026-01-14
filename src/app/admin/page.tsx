import { 
  getPricingSettings, 
  getDestinations, 
  getBookings, 
  addDestination, 
  updatePricing, 
  deleteDestination,
  logout 
} from "./admin-actions";

export default async function AdminDashboard() {
  const pricing = await getPricingSettings();
  const destinations = await getDestinations();
  const bookings = await getBookings();

  return (
    <div className="min-h-screen bg-[#f4f7f6] p-4 md:p-10 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* HEADER SECTION */}
        <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight italic">Admin Control Panel</h1>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Travel With Moeen • Tour Manager</p>
          </div>
          <form action={logout}>
            <button className="px-6 py-2 bg-red-50 text-red-600 rounded-full font-bold text-xs hover:bg-red-600 hover:text-white transition-all">
              LOGOUT
            </button>
          </form>
        </div>

        {/* 1. GLOBAL PRICING & 2. ADD DESTINATION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
            <h2 className="text-lg font-black uppercase italic mb-6 border-b pb-4">Global Rate Settings</h2>
            <form action={updatePricing} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Daily Food Rate (Per Person)</label>
                <input name="foodPerDay" type="number" defaultValue={pricing?.foodPerDay} className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-none outline-none focus:ring-2 focus:ring-[#ffcc00]" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-blue-600 uppercase ml-1 italic">Global Base Fare (Per Person)</label>
                <input name="baseFareIslamabad" type="number" defaultValue={pricing?.baseFareIslamabad} className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-none outline-none focus:ring-2 focus:ring-[#ffcc00]" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Deluxe Room Price (Double)</label>
                <input name="hotelDouble" type="number" defaultValue={pricing?.hotelDouble} className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-none outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Executive Room Price (Master)</label>
                <input name="hotelMaster" type="number" defaultValue={pricing?.hotelMaster} className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-none outline-none" />
              </div>
              <div className="space-y-1 col-span-full">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Luxury Room Price (Triple)</label>
                <input name="hotelTriple" type="number" defaultValue={pricing?.hotelTriple} className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-none outline-none" />
              </div>
              <button className="col-span-full bg-black text-[#ffcc00] font-black py-4 rounded-2xl uppercase tracking-widest hover:bg-[#ffcc00] hover:text-black transition-all">
                Update Global Rates
              </button>
            </form>
          </div>

          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
            <h2 className="text-lg font-black uppercase italic mb-6 border-b pb-4">Add New City</h2>
            <form action={addDestination} className="space-y-5">
              <input name="name" placeholder="City Name" className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-none outline-none" required />
              <input name="basePrice" type="number" placeholder="Base Per Person Cost" className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-none outline-none" required />
              <input name="roadTransport" type="number" placeholder="Sedan Fare (Full Car)" className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-none outline-none" required />
              <input name="airTransport" type="number" placeholder="Air Fare (Per Person)" className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-none outline-none" required />
              <button className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl uppercase tracking-widest hover:bg-black transition-all">
                Save Destination
              </button>
            </form>
          </div>
        </div>

        {/* 3. DESTINATION LIST WITH RATES */}
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
          <h2 className="text-lg font-black uppercase italic mb-6">Active Destinations</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {destinations.map((dest) => (
              <div key={dest.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 relative group">
                <p className="font-black text-sm uppercase text-slate-900 border-b pb-2 mb-3">{dest.name}</p>
                <div className="flex flex-col gap-2 text-[10px] font-bold">
                  <div className="flex justify-between text-slate-500"><span>BASE:</span><span>{dest.basePrice.toLocaleString()}</span></div>
                  <div className="flex justify-between text-blue-600"><span>SEDAN:</span><span>{dest.roadTransport.toLocaleString()}</span></div>
                  <div className="flex justify-between text-emerald-600"><span>AIR:</span><span>{dest.airTransport.toLocaleString()}</span></div>
                </div>
                <form action={deleteDestination} className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <input type="hidden" name="id" value={dest.id} />
                  <button className="w-7 h-7 bg-red-500 text-white rounded-full text-[10px] font-bold shadow-lg hover:bg-black transition-colors">✕</button>
                </form>
              </div>
            ))}
          </div>
        </div>

        {/* 4. INQUIRY PIPELINE */}
        <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-8 bg-black text-white flex justify-between items-center">
            <h2 className="text-xl font-black uppercase italic">Inquiry Pipeline</h2>
            <span className="bg-[#ffcc00] text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{bookings.length} New Leads</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-black uppercase text-slate-400">
                  <th className="p-6">Customer</th>
                  <th className="p-6">Tour</th>
                  <th className="p-6">Guests</th>
                  <th className="p-6">Travel / Hotel</th>
                  <th className="p-6 text-right">Quote</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-6"><p className="font-black text-slate-900">{b.fullName}</p><p className="text-xs text-blue-600 font-bold">{b.whatsapp}</p></td>
                    <td className="p-6 uppercase text-[10px] font-black">{b.destinations}</td>
                    <td className="p-6 text-[10px] font-bold">A:{b.adults} C:{b.children}</td>
                    <td className="p-6 text-[10px] font-bold uppercase">{b.travelMode} | {b.hotelType}</td>
                    <td className="p-6 text-right font-black text-emerald-600">PKR {b.totalEstimate?.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}