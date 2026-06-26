import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navber";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "PulseCare",
  description:
    "A modern blood donation management platform for donors, recipients, volunteers, and administrators.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      
      className={`${poppins.className}  h-full antialiased`}
    >
      <body>
        <Navbar/>
        <main className="px-2 min-h-screen">{children}</main>
        <Footer/>
        </body>
    </html>
  );
}
