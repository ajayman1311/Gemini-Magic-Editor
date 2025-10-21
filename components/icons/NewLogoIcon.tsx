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
       <linearGradient id="pencil-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#f97316' }} />
        <stop offset="100%" style={{ stopColor: '#ef4444' }} />
      </linearGradient>
    </defs>
    <path 
      d="M 85 50 A 35 35 0 0 1 50 85"
      fill="none"
      stroke="url(#new-logo-gradient)"
      strokeWidth="10"
      strokeLinecap="round"
    />
    <path 
      d="M 15 50 A 35 35 0 0 1 50 15"
      fill="none"
      stroke="url(#new-logo-gradient)"
      strokeWidth="10"
      strokeLinecap="round"
    />
    <path 
      d="M 65,35 C 50,35 50,65 35,65"
      fill="none"
      stroke="url(#new-logo-gradient)"
      strokeWidth="10"
      strokeLinecap="round"
    />
    <path
      d="M 60 25 L 80 45 L 70 55 L 50 35 Z"
      fill="url(#pencil-gradient)"
    />
     <path
      d="M 50 35 L 55 40 L 70 25 L 65 20 Z"
      fill="#f97316"
    />
     <path
      d="M 80 45 L 75 50 L 70 55 Z"
      fill="#facc15"
    />

  </svg>
);

export default NewLogoIcon;
