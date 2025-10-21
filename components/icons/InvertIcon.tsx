import React from 'react';

const InvertIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 16.5A6.75 6.75 0 015.25 12 6.75 6.75 0 0112 5.25v13.5z"
      clipRule="evenodd"
    />
  </svg>
);

export default InvertIcon;
