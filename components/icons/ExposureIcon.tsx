import React from 'react';

const ExposureIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM9.5 8.5a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5zm.5 4a.5.5 0 000 1h4a.5.5 0 000-1h-1.5v-1.5a.5.5 0 00-1 0V12.5H10z" clipRule="evenodd" />
    <path d="M12 18a6 6 0 100-12 6 6 0 000 12z" opacity="0.2" />
  </svg>
);

export default ExposureIcon;