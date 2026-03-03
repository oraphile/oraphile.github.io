import emailjs from "@emailjs/browser";

/**
 * Handles sending the appointment request.
 * Currently uses 'mailto' for a client-side email trigger.
 * * @param {Object} data - The form data object containing user inputs.
 */
export const sendAppointmentRequest = (data) => {
  // --- OPTION 1: THE "ZERO SETUP" WAY (MAILTO) ---
//   const subject = `New Appointment Request: ${data.fullName}`;
  
//   const body = `
// New Appointment Request from Website:

// PERSONAL DETAILS
// ----------------
// Name: ${data.fullName}
// Age: ${data.age || 'N/A'}
// Gender: ${data.gender || 'N/A'}
// DOB: ${data.dob}

// CONTACT INFO
// ------------
// Phone: ${data.phone}
// Email: ${data.email}
// Address: ${data.address || 'N/A'}

// APPOINTMENT DETAILS
// -------------------
// Service: ${data.service}
// Preferred Date: ${data.preferredDate}
// Time Slot: ${data.preferredTime}
// Last Visit: ${data.lastVisit}

// Emergency Contact: ${data.emergencyContact || 'N/A'}

// Notes:
// ${data.notes || 'None'}
//   `;

//   window.location.href = `mailto:dev.flutter.1995@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const SERVICE_ID = 'service_oraphile';   // e.g., 'service_xyz'
  const TEMPLATE_ID = 'template_nj8w2bm'; // e.g., 'template_abc'
  const PUBLIC_KEY = 'k2d8fiw2awBav9ycz';   // e.g., 'user_123abc'

  // Initialize EmailJS with your public key
  emailjs.init(PUBLIC_KEY);

  // Map the form data to your EmailJS template variables.
  // The keys on the LEFT (e.g., to_name, from_name) must match 
  // the {{variables}} in your EmailJS template.
  const templateParams = {
    patient_name: data.fullName,
    patient_age: data.age,
    patient_gender: data.gender,
    patient_dob: data.dob,
    patient_phone: data.phone,
    patient_email: data.email,
    patient_address: data.address,
    service_requested: data.service,
    preferred_date: data.preferredDate,
    preferred_time: data.preferredTime,
    last_visit: data.lastVisit,
    emergency_contact: data.emergencyContact,
    notes: data.notes,
    to_name: 'Oraphile Clinic Team', // Optional: Use in template as "Dear {{to_name}}"
  };

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
};
 