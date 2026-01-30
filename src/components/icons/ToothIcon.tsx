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
      {/* Tooth Body: Molar shape with distinct roots and crown */}
      <path d="M7 9c0-4 2.5-6 5-6s5 2 5 6v4c0 2 0 3-1 4.5l-1 2.5h-2l-1-3c-.5-1-1.5-1-2 0l-1 3H7l-1-2.5C5 16 5 15 5 13V9z" />
      
      {/* Sparkle: Subtle 4-point star at top right */}
      <path d="M20 2L20.5 3.5L22 4L20.5 4.5L20 6L19.5 4.5L18 4L19.5 3.5L20 2Z" />
    </svg>
  );
};
