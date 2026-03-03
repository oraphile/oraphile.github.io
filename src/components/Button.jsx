import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-6 py-2 rounded-md font-medium transition-all duration-300 transform active:scale-95";
  const variants = {
    primary: "bg-[#2eacc9] text-white hover:bg-[#3b9acb] shadow-md hover:shadow-lg",
    outline: "border-2 border-[#2eacc9] text-[#2eacc9] hover:bg-[#2eacc9] hover:text-white",
    ghost: "text-gray-600 hover:text-[#2eacc9] hover:bg-blue-50",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;