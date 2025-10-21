import React from 'react';

const BrightnessIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M12 2.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM12 19.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM21.75 12a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM4.5 12a.75.75 0 01-.75.75H2.25a.75.75 0 010-1.5H3.75a.75.75 0 01.75.75zM12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z"
      clipRule="evenodd"
    />
  </svg>
);

export default BrightnessIcon;
