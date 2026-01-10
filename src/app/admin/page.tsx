import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function AdminDashboard() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
  });

  async function deleteBooking(formData: FormData) {
    "use server";
    const id = Number(formData.get("id"));
    await prisma.booking.delete({ where: { id } });
    revalidatePath("/admin");
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen text-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-blue-900 uppercase">Adventure Inquiries</h1>
          <div className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-bold">
            Total: {bookings.length}
          </div>
        </div>
        
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1100px]">
              <thead className="bg-slate-900 text-white text-xs uppercase tracking-widest">
                <tr>
                  <th className="p-5">Customer Details</th>
                  <th className="p-5">Travel Mode</th>
                  <th className="p-5">Trip Info</th>
                  <th className="p-5">Group Size</th>
                  <th className="p-5">Preferences</th>
                  <th className="p-5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-blue-50/50 transition-colors">
                    <td className="p-5">
                      <div className="font-bold text-lg leading-none">{b.fullName}</div>
                      <div className="text-blue-600 font-mono text-sm mt-1">{b.whatsapp}</div>
                      <div className="text-xs text-slate-400 mt-1">{b.email || 'No Email'}</div>
                    </td>
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                        b.travelMode === 'By Air' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'
                      }`}>
                        {b.travelMode === 'By Air' ? '✈️ Air' : '🚐 Road'}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="font-bold text-slate-700">{b.tourCategory}</div>
                      <div className="text-xs text-slate-500">From: {b.departureCity}</div>
                      <div className="text-xs italic text-blue-800 font-medium truncate w-40">{b.destinations}</div>
                    </td>
                    <td className="p-5">
                      <div className="flex gap-2 text-xs font-bold">
                        <span title="Adults">A:{b.adults}</span>
                        <span title="Children">C:{b.children}</span>
                        <span title="Infants">I:{b.infants}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase mt-1">{b.duration} Days Trip</div>
                    </td>
                    <td className="p-5 text-xs space-y-1">
                      <div className="font-semibold text-slate-600">🏨 {b.hotelType}</div>
                      <div className="text-slate-500">🛏️ {b.roomType} ({b.noOfRooms})</div>
                    </td>
                    <td className="p-5 text-center">
                      <form action={deleteBooking}>
                        <input type="hidden" name="id" value={b.id} />
                        <button className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-600 hover:text-white transition group">
                          <span className="font-bold text-xs uppercase">Delete</span>
                        </button>
                      </form>
                    </td>
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