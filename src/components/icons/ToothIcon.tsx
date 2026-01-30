import React from 'react';

export const ToothIcon = ({ className }: { className?: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      role="img"
      aria-label="Tooth icon with sparkle representing children’s dental care"
    >
      {/* Tooth Body: Clean, healthy molar shape with smooth rounded edges and two roots */}
      <path d="M12 3c2.76 0 5 2.24 5 5v7l-2 5-3-3-3 3-2-5V8c0-2.76 2.24-5 5-5z" />
      
      {/* Sparkle: Subtle 4-point star at top right */}
      <path d="M20 2L20.5 3.5L22 4L20.5 4.5L20 6L19.5 4.5L18 4L19.5 3.5L20 2Z" />
    </svg>
  );
};
