import React from 'react';

const HoneyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 1.5a4.5 4.5 0 00-4.5 4.5v12a4.5 4.5 0 004.5 4.5h.094a4.5 4.5 0 004.406-4.5v-12a4.5 4.5 0 00-4.5-4.5h-.094z" opacity="0.3"/>
    <path d="M12 1.5a4.5 4.5 0 014.5 4.5v3.134a.75.75 0 01-1.5 0V6a3 3 0 00-3-3h-.094a3 3 0 00-2.906 3v12a3 3 0 002.906 3h.094a3 3 0 003-3v-3.134a.75.75 0 011.5 0V18a4.5 4.5 0 01-4.406 4.5h-.094a4.5 4.5 0 01-4.5-4.5v-12a4.5 4.5 0 014.5-4.5h.094z" />
  </svg>
);

export default HoneyIcon;
