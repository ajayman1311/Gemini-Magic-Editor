import React from 'react';

const PalmaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18 6.375a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z" />
    <path fillRule="evenodd" d="M18.82 11.082a.75.75 0 00-1.06-.02l-4.5 4.34a.75.75 0 001.038 1.082l4.5-4.34a.75.75 0 00.022-1.062zM9.918 11.104a.75.75 0 00-1.058 1.06l4.47 4.53a.75.75 0 001.082-1.038l-4.494-4.552z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M12.75 2.25a.75.75 0 00-1.5 0v18a.75.75 0 001.5 0v-18z" clipRule="evenodd" />
    <path d="M5.152 11.104a.75.75 0 00.022 1.06l4.5 4.34a.75.75 0 001.038-1.082l-4.5-4.34a.75.75 0 00-1.06.022zM14.082 11.104a.75.75 0 00-1.06-.022l-4.5 4.34a.75.75 0 101.038 1.082l4.5-4.34a.75.75 0 00.022-1.06z" />
  </svg>
);

export default PalmaIcon;
