"use client";
import { useState } from "react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    const MY_SECRET_PASSWORD = "admin123"; 

    if (password === MY_SECRET_PASSWORD) {
      // 1. Set the session cookie
      document.cookie = "admin_session=authenticated; path=/; max-age=86400";
      
      // 2. Save the "Last Login" time (New Line)
      const now = new Date().toLocaleString();
      document.cookie = `last_login=${now}; path=/; max-age=31536000`; // Saves for 1 year
      
      window.location.href = "/admin";
    } else {
      alert("Wrong password!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 px-4">
      <div className="p-10 bg-white rounded-3xl shadow-2xl w-full max-w-sm border border-slate-200">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-blue-50 rounded-2xl mb-4">
            <span className="text-3xl">🔐</span>
          </div>
          <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Admin Portal</h1>
          <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-widest">Adventure Travels</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1 mb-1 block">Security Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              className="w-full border-2 border-slate-100 p-4 rounded-xl focus:border-blue-500 outline-none transition-all text-slate-900 bg-slate-50 pr-12" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            {/* Show/Hide Password Toggle */}
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[38px] text-slate-400 hover:text-blue-600 transition-colors"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          
          <button 
            onClick={handleLogin} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg transition-all uppercase tracking-widest text-sm"
          >
            Enter Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}