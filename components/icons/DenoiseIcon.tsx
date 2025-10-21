import React from 'react';

const DenoiseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 3.75a.75.75 0 01.75.75v15a.75.75 0 01-1.5 0V4.5a.75.75 0 01.75-.75z" />
    <path d="M4.5 9a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v6a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75V9z" />
    <circle cx="15" cy="7.5" r="0.75" />
    <circle cx="17.25" cy="9" r="0.75" />
    <circle cx="15" cy="11.25" r="0.75" />
    <circle cx="17.25" cy="12.75" r="0.75" />
     <circle cx="15" cy="14.25" r="0.75" />
    <circle cx="17.25" cy="15.75" r="0.75" />
     <circle cx="15" cy="17.25" r="0.75" />
  </svg>
);

export default DenoiseIcon;