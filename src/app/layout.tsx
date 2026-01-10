import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Make My Adventure | Premium Pakistan Tours",
  description: "Experience the breathtaking beauty of Pakistan with expert guides.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased pt-20"> {/* pt-20 added to prevent content from hiding under the fixed menu */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}