import React from 'react';

const DoctorCard = ({ name, specialty, image }) => (
  <div className="flex flex-col items-center text-center group">
    <div className="relative mb-4 overflow-hidden rounded-full w-32 h-32 border-4 border-white shadow-lg">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        onError={(e) => {
          e.target.src = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300";
        }}
      />
    </div>
    <h3 className="text-lg font-bold text-gray-900">{name}</h3>
    <p className="text-[#2eacc9] text-sm font-medium">{specialty}</p>
  </div>
);

export default DoctorCard;