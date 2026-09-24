import { Archivo_Black, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const archivoBlack = Archivo_Black({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Clarity Auto Spa | Premium 24/7 Car Wash & Detailing",
  description: "Experience the best car detailing and exterior washing at Clarity Auto Spa. Open 24/7 with expert staff and premium service.",
  icons: {
    icon: "/clarity.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${archivoBlack.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <SmoothScroll>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
