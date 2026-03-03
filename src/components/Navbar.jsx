import { Menu, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        
        {/* Left Side: Logo + Desktop Nav */}
        <div className="flex items-center gap-12">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img 
              src={logo} 
              alt="Oraphile Clinic Logo" 
              className="h-16 w-auto object-contain"
            />
            <span className="text-xl font-bold text-gray-900">Oraphile </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-600 hover:text-[#2eacc9] font-medium transition-colors">Home</a>
            <a href="#services" className="text-gray-600 hover:text-[#2eacc9] font-medium transition-colors">Services</a>
            <a href="#doctors" className="text-gray-600 hover:text-[#2eacc9] font-medium transition-colors">Doctors</a>
            <a href="#contact" className="text-gray-600 hover:text-[#2eacc9] font-medium transition-colors">Contact</a>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-gray-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
          <a href="#" className="text-gray-600 py-2 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
          <a href="#services" className="text-gray-600 py-2 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
          <a href="#doctors" className="text-gray-600 py-2 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Doctors</a>
          <a href="#contact" className="text-gray-600 py-2 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;