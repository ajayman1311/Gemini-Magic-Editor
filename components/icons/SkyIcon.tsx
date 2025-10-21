import React from 'react';

const SkyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M11.93 3.424a.75.75 0 01.14.026 5.25 5.25 0 014.288 5.922 6.75 6.75 0 011.39 4.102.75.75 0 01-1.499.044 5.25 5.25 0 00-1.127-3.322 3.75 3.75 0 00-5.46-3.113 5.25 5.25 0 01-3.663 3.663 3.75 3.75 0 003.113 5.46 5.25 5.25 0 003.322 1.127.75.75 0 01-.044 1.5 6.75 6.75 0 01-4.102-1.39 5.25 5.25 0 01-5.922-4.288.75.75 0 011.474-.216 3.75 3.75 0 002.576 2.576A3.75 3.75 0 0011.93 3.424z" />
    <path fillRule="evenodd" d="M15.53 8.47a.75.75 0 010 1.06l-6 6a.75.75 0 01-1.06-1.06l6-6a.75.75 0 011.06 0z" clipRule="evenodd" opacity="0.3"/>
  </svg>
);

export default SkyIcon;
