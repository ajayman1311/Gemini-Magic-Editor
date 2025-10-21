import React from 'react';

const RotateLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M11.23 4.408c.16-.22.476-.298.72-.184l6.582 3.104a.75.75 0 010 1.344l-6.582 3.104a.75.75 0 01-.72-.184l-3.53-4.706a.75.75 0 010-1.008l3.53-4.706zm-.124 1.054L8.44 10.17l3.05-4.066-1.384-.652z"
      clipRule="evenodd"
    />
    <path d="M5.12 7.006a.75.75 0 01.914-.515 8.25 8.25 0 016.255 7.913.75.75 0 01-1.498.114 6.75 6.75 0 00-5.12-6.492.75.75 0 01-.55-.92z" />
  </svg>
);

export default RotateLeftIcon;
