import React from 'react';

const ClothChangerIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12.94 4.31a.75.75 0 00-1.06 0l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06a.75.75 0 000-1.06zM9.06 8.19a.75.75 0 00-1.06 0L6.94 9.25a.75.75 0 101.06 1.06l1.06-1.06a.75.75 0 000-1.06z" />
    <path
      fillRule="evenodd"
      d="M15.992 2.49a.75.75 0 00-1.06.02L7.04 10.4a.75.75 0 000 1.06l5.89 5.891a.75.75 0 001.06 0l8.06-8.06a.75.75 0 00-.02-1.06l-6-6.002zM15.5 4.02l4.47 4.47-5.53 5.53-4.47-4.47 5.53-5.53z"
      clipRule="evenodd"
    />
    <path
      d="M5.596 4.005a2.25 2.25 0 012.04-1.505 2.25 2.25 0 012.23 1.505l.3 1.503a.75.75 0 001.48-.298l-.3-1.503a3.75 3.75 0 00-3.71-2.505 3.75 3.75 0 00-3.52 2.505l-.3 1.503a.75.75 0 101.48.298l.3-1.503z"
      opacity=".4"
    />
    <path
      fillRule="evenodd"
      d="M6 5.25a.75.75 0 01.75-.75H12v2.25a.75.75 0 001.5 0V4.5h3.75a.75.75 0 01.75.75V19.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V5.25z"
      clipRule="evenodd"
      opacity=".4"
    />
  </svg>
);

export default ClothChangerIcon;
