import React, { useState } from 'react';

// Import Custom Components
import AppointmentForm from './components/AppointmentForm'; // Import the form
import Button from './components/Button';
import ContactUs from './components/ContactUs';
import DoctorCard from './components/DoctorCard';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ServiceCard from './components/ServiceCard'; // Fixed typo: Servicecard -> ServiceCard

// Import Data
// Ensure your file names in 'src/data/' match these exactly (Case Sensitive on some OS)
import { doctors } from './data/Doctors';
import { services } from './data/Services';

export default function App() {
  // 1. State to manage form visibility
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* 2. Pass the open handler to Navbar (in case you add a button there later) */}
      <Navbar onBookClick={() => setIsFormOpen(true)} />

      {/* 3. Render the Form. It handles its own visibility via the 'isOpen' prop. */}
      <AppointmentForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-100 rounded-full blur-3xl opacity-30 -z-10 pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Modern Dentistry,<br />
            <span className="text-[#2eacc9]">Exceptional Care.</span>
          </h1>
          <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
            Your partner in dental health. We provide top-tier dental services with a focus on patient comfort and satisfaction.
          </p>
          {/* 4. Trigger the form on click */}
          <Button 
            className="px-8 py-3 text-lg shadow-blue-200 shadow-xl"
            onClick={() => setIsFormOpen(true)}
          >
            Book Your Appointment Today
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Services</h2>
            <p className="text-gray-500">Comprehensive care for your dental health.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Book Appointment CTA Section */}
      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto bg-[#2eacc9] rounded-2xl p-8 md:p-12 shadow-lg flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <div className="flex items-center gap-3 mb-2">
              {/* Optional: Add Calendar icon here if needed */}
              <h3 className="text-2xl font-bold text-white">Book a Visit</h3>
            </div>
            <p className="text-blue-100 max-w-md">Ready for your checkup? Schedule your appointment with our expert team today.</p>
          </div>
          {/* 5. Trigger the form on click */}
          <button 
            className="bg-white text-[#2eacc9] px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-sm whitespace-nowrap"
            onClick={() => setIsFormOpen(true)}
          >
            Book Appointment
          </button>
        </div>
      </section>

      {/* Meet Our Dentists */}
      <section id="doctors" className="py-20 px-4 md:px-6 bg-gray-50/80">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Meet Our Dentists</h2>
            <p className="text-gray-500">Experienced professionals dedicated to your smile.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {doctors.map((doctor, index) => (
              <DoctorCard key={index} {...doctor} />
            ))}
          </div>
        </div>
      </section>

      <ContactUs />

      <Footer />
    </div>
  );
}