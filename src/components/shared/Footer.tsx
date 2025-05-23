"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Award,
  ChevronRight,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Star,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useState } from "react";
import logo from "../../../public/favicon.png";
// import Title from "./Title"
import Image from "next/image";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribing email:", email);
    setEmail("");
  };

  const categories = [
    { name: "Conferences", count: 120 },
    { name: "Workshops", count: 85 },
    { name: "Networking", count: 64 },
    { name: "Concerts", count: 93 },
    { name: "Exhibitions", count: 72 },
    { name: "Webinars", count: 108 },
    { name: "Party", count: 128 },
    { name: "Meeting", count: 28 },
  ];

  return (
    <footer className="  bg-[#1E293B]">

      <div className="container flex flex-col items-center justify-center px-4 pb-2 mx-auto ">
        <div className="grid grid-cols-1 gap-10 pt-20 md:grid-cols-2 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-4">
            <div className="flex items-center space-x-2">
              <Image
                src={logo}
                alt="logo"
                width={5000}
                height={5000}
                quality={100}
                className="w-32 rounded-xl"
              />
            </div>
            <p className="leading-relaxed md:w-3/4 text-slate-300">
              Your premier platform for creating, discovering, and participating
              in events. From public gatherings to exclusive private functions,
              we make event management seamless.
            </p>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5" />
                <p className="text-sm text-slate-300">
                  House-103, Road-17, Sector 4,
                  <br />
                  Uttara, Dhaka
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <p className="text-sm text-slate-300">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <p className="text-sm text-slate-300">contact@eventhub.com</p>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-400" />
                <p className="text-sm text-slate-300">Mon-Fri: 9AM - 6PM</p>
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-2 ">
            <h3 className="text-slate-300  text-2xl font-semibold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-blue-400">
              Quick Links
            </h3>
            <ul className="flex-grow space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Browse Events", href: "/events" },
                { name: "Create Event", href: "/events/create" },
                { name: "Dashboard", href: "/dashboard" },
                { name: "My Invitations", href: "/dashboard/invitations" },
                { name: "Pricing", href: "/pricing" },
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="flex items-center font-medium transition-colors duration-200 text-slate-300 hover:text-blue-400 group"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-blue-400 transition-transform duration-200 transform group-hover:translate-x-1" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 lg:col-span-3">
            <h3 className="text-slate-300  text-2xl font-semibold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-blue-400">
              Event Categories
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="p-3 transition-all duration-200 rounded-lg bg-gradient-to-r from-white to-blue-300 decoration-transparent backdrop-blur-sm group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium transition-colors duration-200 group-hover:text-blue-600">
                      {category.name}
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20">
                      {category.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="flex items-center mb-4 text-2xl font-semibold text-slate-300">
                <Award className="w-5 h-5 mr-2 text-yellow-400 " />
                Our Awards
              </h3>
              <div className="flex gap-3">
                <div className="flex items-center p-3 space-x-2 rounded-lg bg-slate-200 backdrop-blur-sm">
                  <div className="p-1 bg-yellow-500 rounded-full">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm">Best Event Platform 2023</span>
                </div>
                <div className="flex items-center p-3 space-x-2 rounded-lg bg-slate-200 backdrop-blur-sm">
                  <div className="p-1 bg-blue-500 rounded-full">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm">Top Tech Startup 2022</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-3">
            <h3 className="text-slate-300  text-2xl font-semibold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-blue-400">
              Newsletter
            </h3>
            <p className="text-sm text-slate-300">
              Subscribe to our newsletter to receive updates on new events,
              special offers, and exclusive content.
            </p>
            <form onSubmit={handleSubscribe} className="relative mt-4">
              <Input
                type="email"
                placeholder="Your email address"
                className="pr-12 text-white bg-slate-200 border-slate-700 focus:ring-blue-400 focus:border-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                size="icon"
                className="absolute top-0 right-0 text-white bg-blue-500 rounded-md w-[35px] h-[35px] hover:bg-blue-600"
              >
                <Send className="w-5 h-5" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>

            <div className="pt-4">
              <h4 className="mb-3 text-2xl font-semibold text-slate-300">
                Follow Us
              </h4>
              <div className="flex flex-wrap justify-center gap-4 mt-6 md:justify-start lg:gap-3">
                {[
                  { icon: Facebook, href: "#", label: "Facebook" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Youtube, href: "#", label: "YouTube" },
                ].map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={index}
                      href={social.href}
                      className="p-4 text-white transition-colors duration-200 bg-[#1E3A8A]
                      hover:bg-[#3B82F6] rounded-full"
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between pt-3 mt-16 border-t border-slate-700 md:flex-row">
          <p className="mb-4 text-sm text-slate-400 md:mb-0">
            &copy; {new Date().getFullYear()} Next Event. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center pl-4 text-sm gap-x-6 gap-y-2 text-slate-400">
            <Link
              href="/terms"
              className="transition-colors duration-200 hover:text-white"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="transition-colors duration-200 hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookies"
              className="transition-colors duration-200 hover:text-white"
            >
              Cookie Policy
            </Link>
            <Link
              href="/accessibility"
              className="transition-colors duration-200 hover:text-white"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
