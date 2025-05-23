"use client";

import { motion, AnimatePresence } from "framer-motion";
import {  CalendarCheck2 , Contact, Handshake, Home, Mail, Plus, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import img from "../../../public/favicon.png";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const links = [
  { label: "Home", href: "/", icon: Home },
  { label: "Events", href: "/events", icon: CalendarCheck2  },
  { label: "About", href: "/about", icon: Handshake },
  { label: "Contact", href: "/contact", icon: Contact },
  { label: "Profile", href: "/profile", icon: User },
];

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
    
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm "
            onClick={onClose}
          />

       
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative z-50 bg-[#322f2f] w-72 text-white p-5 shadow-xl h-screen"
      >
            <div className="flex items-center justify-between pb-3 mb-6 border-b">
              <Image src={img} alt="Logo" width={40} height={40} />
              <motion.button
                onClick={onClose}
                whileTap={{ rotate: 90, scale: 0.9 }}
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>
            </div>

         
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.07,
                  },
                },
              }}
              className="space-y-4 text-base font-medium"
            >
              {links.map(({ label, href, icon: Icon }) => (
                <motion.li
                  key={href}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href={href}
                    onClick={onClose}
                    className="flex items-center gap-3 px-2 py-2 text-white rounded-md hover:bg-gray-100"
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
