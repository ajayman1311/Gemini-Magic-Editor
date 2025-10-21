import React from 'react';

const PortraitIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
      clipRule="evenodd"
      opacity="0.9"
    />
    <circle cx="4" cy="4" r="2" opacity="0.2" />
    <circle cx="20" cy="6" r="1.5" opacity="0.2" />
    <circle cx="5" cy="15" r="2.5" opacity="0.2" />
    <circle cx="19" cy="18" r="2" opacity="0.2" />
  </svg>
);

export default PortraitIcon;
