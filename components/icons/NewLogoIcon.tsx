import React from 'react';

const NewLogoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="new-logo-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#3b82f6' }} /> 
        <stop offset="50%" style={{ stopColor: '#a855f7' }} />
        <stop offset="100%" style={{ stopColor: '#ef4444' }} />
      </linearGradient>
    </defs>
    <rect 
      x="10" 
      y="10" 
      width="80" 
      height="80" 
      rx="15" 
      ry="15" 
      fill="none" 
      stroke="url(#new-logo-gradient)" 
      strokeWidth="10" 
    />
    <path 
      d="M 50,30 L 55,45 L 70,50 L 55,55 L 50,70 L 45,55 L 30,50 L 45,45 Z"
      fill="url(#new-logo-gradient)"
    />
  </svg>
);

export default NewLogoIcon;