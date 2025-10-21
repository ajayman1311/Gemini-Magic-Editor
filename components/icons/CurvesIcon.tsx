import React from 'react';

const CurvesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v16.5h16.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 20.25L20.25 3.75" opacity="0.3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 15.75C9.75 15.75 14.25 8.25 20.25 8.25" />
  </svg>
);

export default CurvesIcon;