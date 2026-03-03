import React from 'react';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-8 pb-8 px-4 md:px-6">
      <div className="flex items-center gap-2 mb-4">
              <img 
                src={logo} 
                alt="Oraphile Clinic Logo" 
                className="h-8 w-auto object-contain"
              />
              <span className="text-xl font-bold text-gray-900">Oraphile Dental Clinic</span>
            </div>
            <p className="text-gray-500 text-sm mb-6 max-w-xs">
              Your partner in dental health. We provide top-tier dental services with a focus on patient comfort and satisfaction.
            </p>
            
      <div className="max-w-6xl mx-auto">
        <div className="border-t border-gray-100 pt-8 text-center">
          <p className="text-xs text-gray-400">
            © 2025 aashikmajhi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;