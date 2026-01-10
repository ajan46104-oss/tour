import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function HomePage() {
  const tours = await prisma.tour.findMany();

  return (
    <div className="bg-white min-h-screen font-sans text-slate-900">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Dummy Background Image - Professional Landscape */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
            Make My <span className="text-yellow-400">Adventure</span>
          </h1>
          <p className="text-white text-lg md:text-xl max-w-2xl mx-auto font-medium opacity-90 mb-8">
            Experience the breathtaking beauty of Pakistan. From the peaks of Karakoram to the culture of Lahore, we plan your perfect escape.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/book" className="bg-yellow-400 text-blue-900 px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl">
              Start Planning
            </Link>
            <Link href="#services" className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-blue-900 transition-all">
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section id="services" className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-xs font-black text-blue-900 uppercase tracking-[0.3em] mb-2">Exclusive Services</h2>
          <h3 className="text-4xl font-black text-slate-900 uppercase">What We Offer</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="group bg-slate-50 p-10 rounded-[2rem] hover:bg-blue-900 transition-all duration-500">
            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">🏔️</div>
            <h4 className="text-xl font-bold mb-4 group-hover:text-white uppercase tracking-tight">Mountain Expeditions</h4>
            <p className="text-slate-500 group-hover:text-blue-100 text-sm leading-relaxed">
              Guided tours to Skardu, Hunza, and Fairy Meadows with expert local guides and 4x4 logistics.
            </p>
          </div>

          {/* Service 2 */}
          <div className="group bg-slate-50 p-10 rounded-[2rem] hover:bg-blue-900 transition-all duration-500">
            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">👩‍❤️‍👨</div>
            <h4 className="text-xl font-bold mb-4 group-hover:text-white uppercase tracking-tight">Honeymoon Specials</h4>
            <p className="text-slate-500 group-hover:text-blue-100 text-sm leading-relaxed">
              Romantic getaways with luxury hotel stays, private transport, and personalized surprises.
            </p>
          </div>

          {/* Service 3 */}
          <div className="group bg-slate-50 p-10 rounded-[2rem] hover:bg-blue-900 transition-all duration-500">
            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">🏢</div>
            <h4 className="text-xl font-bold mb-4 group-hover:text-white uppercase tracking-tight">Corporate & Groups</h4>
            <p className="text-slate-500 group-hover:text-blue-100 text-sm leading-relaxed">
              Efficient group logistics for university trips, school tours, and corporate team building.
            </p>
          </div>
        </div>
      </section>

      {/* 3. TRENDING TOURS (Dynamic from DB) */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-xs font-black text-blue-900 uppercase tracking-[0.3em] mb-2">Trending Now</h2>
              <h3 className="text-4xl font-black text-slate-900 uppercase">Popular Packages</h3>
            </div>
            <Link href="/admin" className="text-[10px] font-bold text-slate-300 uppercase hover:text-blue-900">Admin Portal</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {tours.map((tour) => {
              const finalPrice = Math.round(Number(tour.netCost) * 1.15);
              return (
                <div key={tour.id} className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 group">
                  <div className="h-64 relative overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt={tour.title}
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-[10px] font-black uppercase text-blue-900">
                      Best Seller
                    </div>
                  </div>
                  <div className="p-8">
                    <h2 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight leading-none">{tour.title}</h2>
                    <p className="text-slate-400 text-sm line-clamp-2 mb-6 font-medium italic">"{tour.description}"</p>
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-black text-blue-900">Rs. {finalPrice.toLocaleString()}</div>
                      <Link href="/book" className="bg-blue-900 text-white p-4 rounded-2xl hover:bg-yellow-400 hover:text-blue-900 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-900 py-12 text-center">
        <p className="text-white/50 text-[10px] font-bold uppercase tracking-[0.5em]">
          Make My Adventure — Powered by XAMPP & Prisma
        </p>
      </footer>
    </div>
  );
}