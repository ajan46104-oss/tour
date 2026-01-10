import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-3xl p-10 text-center border border-gray-100">
        <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">Inquiry Sent!</h1>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Your adventure request has been received. Our team at <span className="font-bold text-blue-900">Make My Adventure</span> will contact you on WhatsApp shortly.
        </p>

        <Link 
          href="/" 
          className="block w-full bg-blue-900 text-white font-bold py-4 rounded-2xl hover:bg-black transition-all shadow-xl uppercase tracking-widest text-sm"
        >
          Return to Home
        </Link>
        
        <p className="mt-6 text-[10px] text-slate-400 uppercase font-bold tracking-widest">
          Available 24/7 for your support
        </p>
      </div>
    </div>
  );
}