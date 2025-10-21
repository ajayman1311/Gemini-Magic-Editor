import React from 'react';

const GoogleGIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="gemini-g-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#4285F4' }} />
        <stop offset="50%" style={{ stopColor: '#9333ea' }} />
        <stop offset="100%" style={{ stopColor: '#F4B400' }} />
      </linearGradient>
    </defs>
    <path
      fill="url(#gemini-g-gradient)"
      d="M12.15,12.55c-1.84,0-3.33-1.49-3.33-3.33s1.49-3.33,3.33-3.33c1.02,0,1.9,.46,2.52,1.19l-1.11,1.11c-.38-.36-.91-.62-1.41-.62c-1.12,0-2.03,.91-2.03,2.03s.91,2.03,2.03,2.03c1.29,0,1.78-.96,1.87-1.47h-1.87v-1.45h3.39c.04,.18,.06,.36,.06,.57c0,2.05-1.38,3.48-3.45,3.48M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2Z"
    />
  </svg>
);

export default GoogleGIcon;
