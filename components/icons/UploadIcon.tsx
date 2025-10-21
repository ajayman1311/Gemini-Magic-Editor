import React from 'react';

const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M11.25 10.5V18a.75.75 0 001.5 0v-7.5l1.06 1.06a.75.75 0 001.06-1.06l-2.25-2.25a.75.75 0 00-1.06 0l-2.25 2.25a.75.75 0 001.06 1.06l1.06-1.06z"
      clipRule="evenodd"
    />
    <path d="M5.625 15a3.75 3.75 0 106.341 2.275.75.75 0 00-1.013-1.105 2.25 2.25 0 11-4.04-1.923.75.75 0 00-1.288-.65A3.75 3.75 0 005.625 15z" />
    <path d="M18.375 15a3.75 3.75 0 00-3.41-2.275.75.75 0 00-1.013 1.105 2.25 2.25 0 114.04 1.923.75.75 0 001.288.65A3.75 3.75 0 0018.375 15z" />
  </svg>
);

export default UploadIcon;