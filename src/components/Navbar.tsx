"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isToursOpen, setIsToursOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="text-2xl font-black text-blue-900 tracking-tighter uppercase">
          Make My <span className="text-yellow-500">Adventure</span>
        </Link>

        {/* MENU LINKS */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-[11px] font-black uppercase tracking-widest text-slate-600 hover:text-blue-900 transition-colors">Home</Link>
          <Link href="/about" className="text-[11px] font-black uppercase tracking-widest text-slate-600 hover:text-blue-900 transition-colors">About Us</Link>
          
          {/* TOURS DROPDOWN */}
          <div 
            className="relative group"
            onMouseEnter={() => setIsToursOpen(true)}
            onMouseLeave={() => setIsToursOpen(false)}
          >
            <button className="text-[11px] font-black uppercase tracking-widest text-slate-600 group-hover:text-blue-900 transition-colors flex items-center gap-1">
              Tours
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 transition-transform ${isToursOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isToursOpen && (
              <div className="absolute top-full -left-4 w-56 bg-white shadow-2xl rounded-2xl border border-slate-50 p-2 mt-0 animate-in fade-in slide-in-from-top-2 duration-200">
                <Link href="/tours/domestic" className="block px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-blue-50 hover:text-blue-900 rounded-xl transition-all">
                   🇵🇰 Domestic Tours
                </Link>
                <Link href="/tours/international" className="block px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-blue-50 hover:text-blue-900 rounded-xl transition-all border-t border-slate-50">
                   🌍 International Tours
                </Link>
                <Link href="/book" className="block px-4 py-3 text-[10px] font-black uppercase tracking-widest text-blue-900 bg-yellow-50 hover:bg-yellow-100 rounded-xl transition-all border-t border-slate-50">
                   ✨ Customise Tour
                </Link>
              </div>
            )}
          </div>

          <Link href="/gallery" className="text-[11px] font-black uppercase tracking-widest text-slate-600 hover:text-blue-900 transition-colors">Gallery</Link>
          <Link href="/profile" className="text-[11px] font-black uppercase tracking-widest text-slate-600 hover:text-blue-900 transition-colors">Our Profile</Link>
          <Link href="/blog" className="text-[11px] font-black uppercase tracking-widest text-slate-600 hover:text-blue-900 transition-colors">Blog</Link>
          <Link href="/contact" className="text-[11px] font-black uppercase tracking-widest text-slate-600 hover:text-blue-900 transition-colors">Contact Us</Link>
        </div>

        {/* CTA BUTTON */}
        <Link 
          href="/book" 
          className="bg-blue-900 text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3 rounded-full hover:bg-yellow-400 hover:text-blue-900 transition-all shadow-lg shadow-blue-100"
        >
          Book Now
        </Link>
      </div>
    </nav>
  );
}