"use client";
import Link from "next/link";
export default function ProfilePage() {
  const totalPages = 10;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        
        {/* Clean Header */}
        <div className="text-center mb-16">
          <h2 className="text-[11px] font-black text-blue-900 uppercase tracking-[0.5em] mb-3">Make My Adventure</h2>
          <h1 className="text-5xl font-black text-slate-900 uppercase tracking-tighter">
            Company <span className="text-blue-900">Profile</span>
          </h1>
          <div className="h-1 w-20 bg-yellow-400 mx-auto mt-6"></div>
        </div>

        {/* The Image Stack - No Page Numbers */}
        <div className="space-y-8">
          {pages.map((pageNum) => (
            <div 
              key={pageNum} 
              className="bg-white p-1 md:p-2 rounded-xl md:rounded-[1rem] shadow-xl border border-slate-100"
            >
              <img 
                src={`/profile-images/page-${pageNum}.jpg`} 
                alt="Make My Adventure Profile" 
                className="w-full h-auto rounded-lg"
                loading="lazy" 
              />
            </div>
          ))}
        </div>

        {/* Updated Bottom Action Bar */}
        <div className="mt-20 bg-blue-900 rounded-[3rem] p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          
          <h3 className="text-3xl font-black uppercase mb-4">Work With Us</h3>
          <p className="text-blue-100/70 mb-10 max-w-md mx-auto text-sm font-medium">
            Interested in collaborating or booking a corporate adventure? Let's connect.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-yellow-400 text-blue-900 px-12 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl"
            >
              Get In Touch
            </Link>
            <a 
              href="/profile.pdf" 
              download 
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-12 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-blue-900 transition-all"
            >
              Save Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}