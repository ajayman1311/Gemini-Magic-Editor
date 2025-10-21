
import React from 'react';

const ShirtIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M5.596 4.005a2.25 2.25 0 012.04-1.505 2.25 2.25 0 012.23 1.505l.3 1.503a.75.75 0 001.48-.298l-.3-1.503a3.75 3.75 0 00-3.71-2.505 3.75 3.75 0 00-3.52 2.505l-.3 1.503a.75.75 0 101.48.298l.3-1.503z" />
    <path
      fillRule="evenodd"
      d="M6 5.25a.75.75 0 01.75-.75H17.25a.75.75 0 01.75.75V19.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V5.25zm3.75 1.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0V7.5h-1.5v2.25a.75.75 0 01-1.5 0v-3z"
      clipRule="evenodd"
    />
  </svg>
);

export default ShirtIcon;
