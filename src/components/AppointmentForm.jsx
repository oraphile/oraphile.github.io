import { Loader2, ShieldCheck, Smile, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { sendAppointmentRequest } from '../utils/EmailService';

const AppointmentForm = ({ isOpen, onClose }) => {
  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);
  const [age, setAge] = useState('');
  const [minDate, setMinDate] = useState('');

  // Calculate today's date and set as minimum for preferred date
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    setMinDate(`${year}-${month}-${day}`);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Calculate age from date of birth
  const handleDobChange = (e) => {
    const dob = new Date(e.target.value);
    const today = new Date();
    let calculatedAge = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      calculatedAge--;
    }
    
    setAge(calculatedAge > 0 ? calculatedAge.toString() : '');
  };

  // Validate phone number - only numbers, max 10 digits
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    e.target.value = value;
  };

  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());

    // Validate email
    if (!isValidEmail(data.email)) {
      alert("❌ Please enter a valid email address.");
      return;
    }

    // Validate phone number length
    if (data.phone.length < 10) {
      alert("❌ Phone number must be exactly 10 digits.");
      return;
    }

    setIsSending(true);
    
    try {
      // Send the email and wait for the response
      await sendAppointmentRequest(data);
      
      // Success!
      alert("✅ Appointment request sent successfully! We will contact you shortly.");
      onClose(); // Close the modal
      formRef.current.reset(); // Clear the form
      setAge(''); // Reset age
    } catch (error) {
      // Error
      console.error("EmailJS Error:", error);
      alert("❌ Failed to send request. Please try again or call us directly.");
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] overflow-y-auto bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center p-4">
        
        <div 
          className="relative w-full max-w-4xl transform rounded-xl bg-white p-8 text-left shadow-2xl transition-all animate-in zoom-in-95 duration-300 z-[10000]"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            disabled={isSending}
            className="absolute top-4 right-4 z-[10001] p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-full transition-colors disabled:opacity-50"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Smile className="w-6 h-6 text-[#2eacc9]" />
              <span className="font-bold text-gray-800">Oraphile Dental Clinic</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Book an Appointment</h2>
            <p className="text-sm text-gray-500">Please provide your details below so we can prepare for your visit.</p>
          </div>

          <form ref={formRef} className="space-y-8" onSubmit={handleSubmit}>
            
            {/* --- Section 1: Personal Details --- */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Full Name</label>
                  <input name="fullName" type="text" placeholder="John Doe" required className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2eacc9] focus:border-transparent outline-none bg-gray-50 text-sm" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Date of Birth</label>
                  <input name="dob" type="date" onChange={handleDobChange} required className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2eacc9] focus:border-transparent outline-none bg-gray-50 text-sm text-gray-600" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Age</label>
                  <input name="age" type="number" value={age} readOnly placeholder="Auto-calculated" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2eacc9] focus:border-transparent outline-none bg-gray-100 text-sm cursor-not-allowed" />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Gender</label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input type="radio" name="gender" value="Male" className="text-[#2eacc9] focus:ring-[#2eacc9]" /> Male
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input type="radio" name="gender" value="Female" className="text-[#2eacc9] focus:ring-[#2eacc9]" /> Female
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input type="radio" name="gender" value="Non-binary" className="text-[#2eacc9] focus:ring-[#2eacc9]" /> Non-binary
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input type="radio" name="gender" value="Prefer not to say" className="text-[#2eacc9] focus:ring-[#2eacc9]" /> Prefer not to say
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* --- Section 2: Contact Information --- */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">Contact Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Phone Number</label>
                  <input name="phone" type="tel" placeholder="(123) 456-7890" maxLength="10" onInput={handlePhoneChange} required className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2eacc9] focus:border-transparent outline-none bg-gray-50 text-sm" />
                  <p className="text-xs text-gray-500 mt-1">10 digits maximum</p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Email Address</label>
                  <input name="email" type="email" placeholder="john@example.com" required className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2eacc9] focus:border-transparent outline-none bg-gray-50 text-sm" />
                  <p className="text-xs text-gray-500 mt-1">Must be a valid email address</p>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Home Address</label>
                  <input name="address" type="text" placeholder="123 Main St, City, Zip Code" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2eacc9] focus:border-transparent outline-none bg-gray-50 text-sm" />
                </div>
              </div>
            </div>

            {/* --- Section 3: Appointment Details --- */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">Appointment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Service Required</label>
                  <select name="service" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2eacc9] focus:border-transparent outline-none bg-gray-50 text-sm text-gray-600">
                    <option>General Checkup</option>
                    <option>Dental Cleaning</option>
                    <option>Cavity Filling</option>
                    <option>Root Canal</option>
                    <option>Teeth Whitening</option>
                    <option>Braces / Orthodontics</option>
                    <option>Emergency Pain Relief</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Preferred Date & Time</label>
                  <div className="flex gap-2">
                    <input name="preferredDate" type="date" min={minDate} required className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2eacc9] focus:border-transparent outline-none bg-gray-50 text-sm text-gray-600" />
                    <select name="preferredTime" className="w-1/3 px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2eacc9] focus:border-transparent outline-none bg-gray-50 text-sm text-gray-600">
                      <option>Morning</option>
                      <option>Afternoon</option>
                      <option>Evening</option>
                    </select>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Only future dates are available</p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Last Dental Visit</label>
                  <select name="lastVisit" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2eacc9] focus:border-transparent outline-none bg-gray-50 text-sm text-gray-600">
                    <option>First Time</option>
                    <option>Less than 6 months ago</option>
                    <option>6-12 months ago</option>
                    <option>More than 1 year ago</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Emergency Contact (Name & Phone)</label>
                  <input name="emergencyContact" type="text" placeholder="Jane Doe - (555) 123-4567" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2eacc9] focus:border-transparent outline-none bg-gray-50 text-sm" />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Additional Notes</label>
                  <textarea name="notes" rows="2" placeholder="Any allergies, current medications, or specific symptoms?" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2eacc9] focus:border-transparent outline-none bg-gray-50 text-sm resize-none"></textarea>
                </div>
              </div>
            </div>

            <div className="bg-blue-50/50 rounded-lg p-3 flex items-start gap-3 border border-blue-100">
              <ShieldCheck className="w-5 h-5 text-[#2eacc9] shrink-0 mt-0.5" />
              <p className="text-xs text-gray-600 leading-relaxed">
                By submitting, you agree to share this information with our clinic for scheduling. Your data is secure.
              </p>
            </div>

            <button 
              type="submit" 
              disabled={isSending}
              className="w-full bg-[#2eacc9] hover:bg-[#3b9acb] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg active:scale-[0.98] flex justify-center items-center gap-2"
            >
              {isSending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending Request...
                </>
              ) : (
                "Confirm Request"
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;