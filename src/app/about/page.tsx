import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. CINEMATIC HEADER */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&q=80&w=2000" 
          alt="High Altitude Landscape" 
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
            Our <span className="text-yellow-400">Story</span>
          </h1>
          <p className="text-white/80 mt-4 max-w-xl mx-auto font-medium uppercase tracking-[0.2em] text-sm">
            Defining Adventure in Pakistan Since 2015
          </p>
        </div>
      </section>

      {/* 2. THE VISION SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-xs font-black text-blue-900 uppercase tracking-[0.4em]">Who We Are</h2>
          <h3 className="text-4xl font-black text-slate-900 leading-tight uppercase">
            We don't just book tours; <br />
            <span className="text-blue-900">We craft life-long memories.</span>
          </h3>
          <p className="text-slate-600 leading-relaxed">
            Make My Adventure was born out of a passion for the untamed beauty of the North. From the hidden valleys of Skardu to the turquoise waters of Attabad Lake, we believe Pakistan is a world-class destination that deserves world-class service.
          </p>
          <div className="grid grid-cols-2 gap-8 pt-6">
            <div>
              <div className="text-4xl font-black text-blue-900">500+</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Successful Tours</div>
            </div>
            <div>
              <div className="text-4xl font-black text-blue-900">10k+</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Happy Travelers</div>
            </div>
          </div>
        </div>
        <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&q=80&w=1000" 
            className="w-full h-full object-cover" 
            alt="Adventure Traveler"
          />
        </div>
      </section>

      {/* 3. CORE VALUES GRID */}
      <section className="bg-slate-50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 uppercase">Why Choose Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 group hover:bg-blue-900 transition-all duration-500">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-white/10 group-hover:scale-110 transition-all">🛡️</div>
              <h4 className="text-xl font-bold mb-4 group-hover:text-white uppercase">Safety First</h4>
              <p className="text-slate-500 text-sm group-hover:text-blue-100">Certified local guides and well-maintained 4x4 vehicles for every mountain terrain.</p>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 group hover:bg-blue-900 transition-all duration-500">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-white/10 group-hover:scale-110 transition-all">💰</div>
              <h4 className="text-xl font-bold mb-4 group-hover:text-white uppercase">Fair Pricing</h4>
              <p className="text-slate-500 text-sm group-hover:text-blue-100">Transparent costs with no hidden fees. We provide luxury experiences at competitive rates.</p>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 group hover:bg-blue-900 transition-all duration-500">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-white/10 group-hover:scale-110 transition-all">🌍</div>
              <h4 className="text-xl font-black mb-4 group-hover:text-white uppercase">Expertise</h4>
              <p className="text-slate-500 text-sm group-hover:text-blue-100">Our team consists of travelers who have explored every inch of Pakistan personally.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="py-24 text-center px-6">
        <div className="max-w-3xl mx-auto bg-blue-900 p-16 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <h2 className="text-4xl font-black uppercase mb-6">Ready for your next adventure?</h2>
          <p className="opacity-70 mb-10 text-lg">Join us and discover the hidden gems of the Karakoram.</p>
          <a href="/book" className="inline-block bg-yellow-400 text-blue-900 px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl">
            Book My Trip
          </a>
        </div>
      </section>
    </div>
  );
}