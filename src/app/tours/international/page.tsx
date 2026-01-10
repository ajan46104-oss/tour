import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function InternationalToursPage() {
  // We can filter for international tours if you add a 'type' column, 
  // for now, we'll show your premium offerings from XAMPP.
  const tours = await prisma.tour.findMany();

  return (
    <div className="bg-[#000d1a] min-h-screen pt-32 pb-20 text-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Page Header */}
        <div className="relative mb-20">
          <div className="absolute -top-10 left-0 w-40 h-40 bg-blue-600/20 blur-[100px]"></div>
          <h2 className="text-[11px] font-black text-yellow-500 uppercase tracking-[0.6em] mb-4">Global Expeditions</h2>
          <h1 className="text-6xl font-black uppercase tracking-tighter leading-none">
            International <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Gateways</span>
          </h1>
          <p className="text-slate-400 mt-8 max-w-xl text-lg font-medium leading-relaxed">
            From the historic streets of Istanbul to the futuristic skyline of Dubai. Luxury travel experiences curated for the global citizen.
          </p>
        </div>

        {/* International Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {tours.map((tour) => {
            const displayPrice = Math.round(Number(tour.netCost) * 1.25); // Slightly higher margin for International
            
            return (
              <div key={tour.id} className="group relative bg-white/5 backdrop-blur-md rounded-[3rem] overflow-hidden border border-white/10 hover:border-yellow-500/50 transition-all duration-700">
                <div className="flex flex-col lg:flex-row h-full">
                  
                  {/* Image Part */}
                  <div className="lg:w-1/2 h-72 lg:h-auto overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80&w=800" 
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000d1a] via-transparent to-transparent opacity-60"></div>
                  </div>

                  {/* Content Part */}
                  <div className="lg:w-1/2 p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-yellow-500 text-[10px] font-black uppercase tracking-widest border border-yellow-500/30 px-3 py-1 rounded-full">
                          All Inclusive
                        </span>
                        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">5 Star Stay</span>
                      </div>
                      <h3 className="text-3xl font-black uppercase tracking-tight mb-4 group-hover:text-yellow-400 transition-colors">
                        {tour.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 font-medium">
                        {tour.description}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Package Starts</p>
                        <div className="text-2xl font-black text-white">
                          Rs. {displayPrice.toLocaleString()}
                        </div>
                      </div>
                      <Link 
                        href="/book" 
                        className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center text-blue-900 hover:bg-white hover:scale-110 transition-all shadow-xl shadow-yellow-500/20"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Support Info */}
        <div className="mt-20 p-12 rounded-[4rem] bg-gradient-to-br from-blue-900/40 to-transparent border border-white/5 text-center">
          <h4 className="text-2xl font-black uppercase mb-4">International Visa Support</h4>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8 font-medium italic">
            "We provide complete documentation, LOI, and interview guidance for our international tour members."
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-40 grayscale">
             {/* Simple text icons representing global reach */}
             <span className="font-black">DUBAI</span>
             <span className="font-black">TURKEY</span>
             <span className="font-black">BAKU</span>
             <span className="font-black">THAILAND</span>
          </div>
        </div>

      </div>
    </div>
  );
}