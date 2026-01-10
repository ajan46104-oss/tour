"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function submitAdventureForm(formData: FormData) {
  try {
    const rawData = {
  tourId: formData.get("tourId") ? Number(formData.get("tourId")) : null, // Handle the link
  tourCategory: formData.get("tourCategory") as string,
  fullName: formData.get("fullName") as string,
  email: formData.get("email") as string || null,
  whatsapp: formData.get("whatsapp") as string,
  passportType: formData.get("passportType") as string || "Pakistani",
  departureCity: formData.get("departureCity") as string,
  travelMode: formData.get("travelMode") as string,
  tripType: formData.get("tripType") as string || null,
  departureDate: formData.get("departureDate") as string || null,
  returnDate: formData.get("returnDate") as string || null,
  duration: Number(formData.get("duration")) || 0,
  adults: Number(formData.get("adults")) || 0,
  children: Number(formData.get("children")) || 0,
  infants: Number(formData.get("infants")) || 0,
  destinations: formData.get("destinations") as string,
  hotelType: formData.get("hotelType") as string || null,
  roomType: formData.get("roomType") as string || null,
  noOfRooms: formData.get("noOfRooms") as string || null,
  requirements: formData.get("requirements") as string || null,
};

    await prisma.booking.create({
      data: rawData,
    });
    
  } catch (error) {
    console.error("Database Error:", error);
    throw error; // Let Next.js handle the error state
  }

  // Next.js requires redirect to be called outside of try-catch in some versions, 
  // but here it is placed after the logic to ensure data is saved first.
  revalidatePath("/admin");
  redirect("/success"); 
}