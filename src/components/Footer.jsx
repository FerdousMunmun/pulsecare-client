"use client"

import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { LiaLinkedin } from "react-icons/lia";
import { usePathname } from "next/navigation";

export default function Footer() {

   const pathname = usePathname()
    if(pathname.includes('dashboard')){
      return null;
    }
  
  return (
    <footer className="bg-red-600 text-white py-12">
  <div className="max-w-7xl mx-auto px-6">

    <div className="grid md:grid-cols-4 gap-8">

      <div>
        <h3 className="text-2xl font-bold mb-4">
          PulseCare
        </h3>

        <p className="text-white">
          Connecting blood donors with recipients
          to save lives across Bangladesh.
        </p>
      </div>

      <div>
        <h4 className="font-semibold mb-4">
          Quick Links
        </h4>

        <ul className="space-y-2">
          <li><a href="/">Home</a></li>
          <li><a href="/registration">Become a Donor</a></li>
          <li><a href="/signin">Login</a></li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold mb-4">
          Services
        </h4>

        <ul className="space-y-2">
          <li>Find Donors</li>
          <li>Blood Requests</li>
          <li>Emergency Support</li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold mb-4">
          Contact
        </h4>

        <ul className="space-y-2">
          <li>Dhaka, Bangladesh</li>
          <li>support@pulsecare.com</li>
          <li>+880 1712-345678</li>
        </ul>
      </div>

    </div>

    <hr className="my-8 border-gray-700" />

    <p className="text-center text-gray-400">
      © 2026 PulseCare. All Rights Reserved.
    </p>

  </div>
</footer>
  );
}