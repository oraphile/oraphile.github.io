import React from 'react';

const ServiceCard = ({ title, description, icon: Icon }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col items-start text-left">
    <div className="p-3 bg-blue-50 rounded-full mb-4">
      {/* Added a check to ensure Icon exists before rendering it */}
      {Icon && <Icon className="w-6 h-6 text-[#2eacc9]" />}
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
  </div>
);

export default ServiceCard;