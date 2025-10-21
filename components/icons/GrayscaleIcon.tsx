import React from 'react';

const GrayscaleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 3.003a9.004 9.004 0 018.997 8.997A9.004 9.004 0 0112.75 21a9.004 9.004 0 01-8.997-8.997A9.004 9.004 0 0112.75 3.003z"
      clipRule="evenodd"
    />
  </svg>
);

export default GrayscaleIcon;
