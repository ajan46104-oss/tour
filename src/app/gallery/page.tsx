"use client";
import { useState } from "react";

const galleryImages = [
  { id: 1, category: "Pakistan", url: "https://images.unsplash.com/photo-1582234372722-50d7ccc30e51?q=80&w=1000", title: "Hunza Valley" },
  { id: 2, category: "International", url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1000", title: "Dubai Skyline" },
  { id: 3, category: "Pakistan", url: "https://images.unsplash.com/photo-1544077960-604201fe74bc?q=80&w=1000", title: "Skardu Mountains" },
  { id: 4, category: "International", url: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1000", title: "Istanbul, Turkey" },
  { id: 5, category: "Pakistan", url: "https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?q=80&w=1000", title: "Attabad Lake" },
  { id: 6, category: "International", url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000", title: "Baku, Azerbaijan" },
  { id: 7, category: "Pakistan", url: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=1000", title: "Fairy Meadows" },
  { id: 8, category: "International", url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000", title: "Bali, Indonesia" },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState("All");

  const filteredImages = filter === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-[11px] font-black text-blue-900 uppercase tracking-[0.5em] mb-4 text-center">Visual Diary</p>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter mb-8">
            Our <span className="text-blue-900">Adventures</span>
          </h1>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {["All", "Pakistan", "International"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-10 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === cat 
                  ? "bg-blue-900 text-white shadow-xl scale-105" 
                  : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid Layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.map((image) => (
            <div 
              key={image.id} 
              className="relative break-inside-avoid rounded-[2rem] overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <img 
                src={image.url} 
                alt={image.title} 
                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <p className="text-yellow-400 text-[9px] font-black uppercase tracking-widest mb-1">{image.category}</p>
                <h3 className="text-white text-xl font-bold uppercase tracking-tight">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center bg-slate-50 p-16 rounded-[4rem]">
          <h2 className="text-3xl font-black uppercase text-slate-900 mb-6">Want to be in these photos?</h2>
          <p className="text-slate-500 mb-10 max-w-xl mx-auto font-medium">Join our next fixed departure or customize your own private luxury trip today.</p>
          <a href="/book" className="bg-blue-900 text-white px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-yellow-400 hover:text-blue-900 transition-all shadow-2xl">
            Start Your Journey
          </a>
        </div>
      </div>
    </div>
  );
}