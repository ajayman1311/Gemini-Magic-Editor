import React from 'react';

const RotateRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M12.77 4.408a.75.75 0 00-.72-.184L5.47 7.328a.75.75 0 000 1.344l6.582 3.104a.75.75 0 00.72-.184l3.53-4.706a.75.75 0 000-1.008l-3.53-4.706zm.124 1.054L15.56 10.17l-3.05-4.066 1.384-.652z"
      clipRule="evenodd"
    />
    <path d="M18.88 7.006a.75.75 0 00-.914-.515A8.25 8.25 0 0011.711 14.4a.75.75 0 001.498.114 6.75 6.75 0 015.12-6.492.75.75 0 00.55-.92z" />
  </svg>
);

export default RotateRightIcon;
