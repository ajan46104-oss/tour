"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// --- AUTH ---
export async function logout() {
  const c = await cookies();
  c.delete("admin_session");
  redirect("/admin/login");
}

// --- SETTINGS ---
export async function getPricingSettings() {
  return await prisma.pricingSetting.findFirst({ where: { id: 1 } });
}

export async function updatePricing(formData: FormData) {
  const data = {
    foodPerDay: parseFloat(formData.get("foodPerDay") as string) || 0,
    hotelDouble: parseFloat(formData.get("hotelDouble") as string) || 0,
    hotelMaster: parseFloat(formData.get("hotelMaster") as string) || 0,
    hotelTriple: parseFloat(formData.get("hotelTriple") as string) || 0,
    baseFareIslamabad: parseFloat(formData.get("baseFareIslamabad") as string) || 0,
  };

  await prisma.pricingSetting.upsert({
    where: { id: 1 },
    update: data,
    create: { id: 1, ...data },
  });
  revalidatePath("/admin");
}

// --- DESTINATIONS ---
export async function getDestinations() {
  return await prisma.destination.findMany({ orderBy: { name: "asc" } });
}

export async function addDestination(formData: FormData) {
  await prisma.destination.create({
    data: {
      name: formData.get("name") as string,
      basePrice: parseFloat(formData.get("basePrice") as string) || 0,
      roadTransport: parseFloat(formData.get("roadTransport") as string) || 0,
      airTransport: parseFloat(formData.get("airTransport") as string) || 0,
    },
  });
  revalidatePath("/admin");
}

export async function deleteDestination(formData: FormData) {
  const id = Number(formData.get("id"));
  await prisma.destination.delete({ where: { id } });
  revalidatePath("/admin");
}

// --- BOOKING ENGINE ---
export async function getBookings() {
  return await prisma.booking.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createBooking(formData: FormData) {
  const adults = parseInt(formData.get("adults") as string) || 1;
  const children = parseInt(formData.get("children") as string) || 0;
  const infants = parseInt(formData.get("infants") as string) || 0;
  const totalPeople = adults + children;
  const duration = parseInt(formData.get("duration") as string) || 1;
  
  const destName = formData.get("destinations") as string;
  const dest = await prisma.destination.findFirst({ where: { name: destName } });
  const pricing = await prisma.pricingSetting.findFirst({ where: { id: 1 } });

  if (!dest) return { success: false, message: "Destination Required" };

  // 1. TRANSPORT LOGIC (1-4 People = 1 Sedan)
  let transportTotal = 0;
  const travelMode = formData.get("travelMode") as string;
  if (travelMode === "Road") {
    const carsNeeded = Math.ceil(totalPeople / 4); 
    transportTotal = (dest.roadTransport) * carsNeeded;
  } else {
    transportTotal = (dest.airTransport) * totalPeople;
  }

  // 2. HOTEL LOGIC
  const hotelType = formData.get("hotelType") as string;
  let roomBasePrice = 0;
  if (hotelType === "Luxury") roomBasePrice = pricing?.hotelTriple || 0;
  else if (hotelType === "Executive") roomBasePrice = pricing?.hotelMaster || 0;
  else roomBasePrice = pricing?.hotelDouble || 0;

  const roomsNeeded = Math.ceil(totalPeople / 2);
  const hotelTotal = roomBasePrice * roomsNeeded * duration;

  // 3. FOOD & BASE PERSON COSTS
  const foodTotal = (pricing?.foodPerDay || 0) * (adults + (children * 0.9)) * duration;
  const globalBaseTotal = (pricing?.baseFareIslamabad || 0) * totalPeople;
  const destinationBaseTotal = (dest.basePrice) * totalPeople;

  const finalEstimate = transportTotal + hotelTotal + foodTotal + destinationBaseTotal + globalBaseTotal;

  // 4. SAVE TO DATABASE
  await prisma.booking.create({
    data: {
      fullName: formData.get("fullName") as string,
      whatsapp: formData.get("whatsapp") as string,
      departureCity: formData.get("departureCity") as string,
      destinations: dest.name,
      travelMode: travelMode,
      duration: duration,
      adults: adults,
      children: children,
      infants: infants,
      hotelType: hotelType,
      tourCategory: hotelType,
      totalEstimate: finalEstimate,
    },
  });

  revalidatePath("/admin");
  return { success: true, price: finalEstimate };
}