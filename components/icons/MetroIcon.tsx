import React from 'react';

const MetroIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M6.375 3a.75.75 0 00-.75.75v16.5a.75.75 0 001.5 0V3.75A.75.75 0 006.375 3z" />
    <path d="M12 3a.75.75 0 00-.75.75v16.5a.75.75 0 001.5 0V3.75A.75.75 0 0012 3z" />
    <path d="M17.625 3a.75.75 0 00-.75.75v16.5a.75.75 0 001.5 0V3.75a.75.75 0 00-.75-.75z" />
  </svg>
);

export default MetroIcon;
