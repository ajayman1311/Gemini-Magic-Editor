import React from 'react';

const DesertIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path fillRule="evenodd" d="M15.115 2.825a.75.75 0 01.53 1.28l-4.5 4.5a.75.75 0 01-1.06-1.06l4.5-4.5a.75.75 0 01.53-.22zM19.5 21.75a.75.75 0 01-1.06 0l-1.5-1.5a.75.75 0 011.06-1.06l1.5 1.5a.75.75 0 010 1.06z" clipRule="evenodd" />
    <path d="M3 21.75a.75.75 0 001.06 0l16.5-16.5a.75.75 0 00-1.06-1.06L3 20.69V21.75z" />
  </svg>
);

export default DesertIcon;
