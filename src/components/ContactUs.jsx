import React from 'react';
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';

const ContactUs = () => {
  return (
    <section id="contact" className="bg-white border-t border-gray-200 pt-16 pb-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Left Side: Contact Info and Social Media */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4 text-lg">Contact Us</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#2eacc9] mt-0.5 shrink-0" />
                  <span>Buddhanagar - 10, New Baneshwor</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#2eacc9] shrink-0" />
                  <span>+977-01-5522002</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#2eacc9] shrink-0" />
                  <span>+977-9822770960</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#2eacc9] shrink-0" />
                  <span>contact@oraphiledentalclinic.com.np</span>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4 text-lg">Follow Us</h4>
              <div className="flex flex-col gap-4">
                <a href="#" className="text-gray-400 hover:text-[#2eacc9] transition-colors"><Facebook className="w-5 h-5"/></a>
                <a href="#" className="text-gray-400 hover:text-[#2eacc9] transition-colors"><Instagram className="w-5 h-5"/></a>
                <a href="#" className="text-gray-400 hover:text-[#2eacc9] transition-colors"><Twitter className="w-5 h-5"/></a>
              </div>
            </div>
          </div>

          {/* Right Side: Map Section */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-lg">Find Us</h4>
            <div className="w-full h-64 bg-gray-100 rounded-lg shadow-sm border border-gray-100 relative z-0">
              <iframe 
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=Buddhanagar%2010%20New%20Baneshwor&t=m&z=14&output=embed&iwloc=near"
                title="Oraphile Dental Clinic Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
