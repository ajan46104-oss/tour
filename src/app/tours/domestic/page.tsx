import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DomesticToursPage() {
  // Fetch tours from your XAMPP MySQL database
  const tours = await prisma.tour.findMany();

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <h2 className="text-[11px] font-black text-blue-900 uppercase tracking-[0.5em] mb-3">Explore Pakistan</h2>
          <h1 className="text-5xl font-black text-slate-900 uppercase tracking-tighter">
            Domestic <span className="text-blue-900 underline decoration-yellow-400 decoration-4 underline-offset-8">Tours</span>
          </h1>
          <p className="text-slate-500 mt-6 max-w-2xl mx-auto font-medium">
            From the majestic peaks of the Karakoram to the serene valleys of Swat, discover the best of Pakistan with our curated travel packages.
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {tours.map((tour) => {
            // Calculator for price (Net Cost + 15% service fee)
            const displayPrice = Math.round(Number(tour.netCost) * 1.15);
            
            return (
              <div key={tour.id} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col">
                
                {/* Image Container */}
                <div className="h-64 relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1582234372722-50d7ccc30e51?auto=format&fit=crop&q=80&w=800" 
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-5 left-5 flex gap-2">
                    <span className="bg-blue-900/90 backdrop-blur-md text-white text-[9px] font-black px-3 py-1 rounded-full uppercase">Fixed Departure</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-3">
                    {tour.title}
                  </h3>
                  <p className="text-slate-400 text-sm font-medium line-clamp-3 mb-6 flex-grow">
                    {tour.description}
                  </p>
                  
                  {/* Price & Action */}
                  <div className="flex items-center justify-between border-t border-slate-50 pt-6 mt-auto">
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Starting From</p>
                      <div className="text-2xl font-black text-blue-900">
                        Rs. {displayPrice.toLocaleString()}
                      </div>
                    </div>
                    <Link 
                      href="/book" 
                      className="bg-yellow-400 hover:bg-blue-900 text-blue-900 hover:text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-yellow-100"
                    >
                      View Tour
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {tours.length === 0 && (
          <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-slate-200">
            <div className="text-5xl mb-4">🏔️</div>
            <h3 className="text-xl font-bold text-slate-400 uppercase">No Domestic Tours Found</h3>
            <p className="text-slate-300 text-sm mt-2">Add new tours in your Admin Dashboard.</p>
          </div>
        )}
      </div>
    </div>
  );
}