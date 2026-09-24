'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'News', path: '/news' },
  { name: 'Projects', path: '/projects' },
  { name: 'Publications', path: '/publications' },
  { name: 'Activities', path: '/activities' },
  { name: 'Datasets', path: '/datasets' },
  { name: 'Staff', path: '/staff' },
  { name: 'Join Us', path: '/join-us' },
  { name: 'Contact Us', path: '/contact-us' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#002147]/95 backdrop-blur-xl shadow-lg border-b border-[#002147]/10">
      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-0">
          <div className="flex-shrink-0 flex items-center space-x-4 sm:space-x-8 mr-8">
            <a href="https://knu.edu.iq" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <Image src="/knu-logo.png" alt="Knowledge University Logo" width={100} height={100} className="w-auto h-20 object-contain hover:scale-105 transition-transform brightness-0 invert" priority />
            </a>
            <div className="h-14 w-px bg-white/30 hidden sm:block"></div>
            <Link href="/" className="flex items-center">
              <Image src="/logo-full.svg" alt="Artificial Intelligence & Innovation Centre Logo" width={200} height={60} className="w-auto h-10 object-contain hover:opacity-80 transition-opacity brightness-0 invert" priority />
            </Link>
          </div>
          
          <nav className="hidden xl:flex relative items-stretch self-stretch">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`relative px-5 flex items-center justify-center text-sm font-bold transition-colors z-10 rounded-xl ${
                    isActive ? 'text-[#002147]' : 'text-blue-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="relative z-20">{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-white z-10 rounded-xl shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="xl:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-blue-200 focus:outline-none"
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-[#001530]"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-bold transition-colors ${
                    pathname === link.path ? 'bg-white text-[#002147]' : 'text-blue-100 hover:bg-[#002147] hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
