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
      {/* Tooth Body: Friendly, rounded shape with roots */}
      <path d="M7 20L9.5 18L12 20L14.5 18L17 20V10C17 6.5 14.8 4 12 4C9.2 4 7 6.5 7 10V20Z" />
      
      {/* Sparkle: Subtle 4-point star at top right */}
      <path d="M20 2L20.5 3.5L22 4L20.5 4.5L20 6L19.5 4.5L18 4L19.5 3.5L20 2Z" />
    </svg>
  );
};
