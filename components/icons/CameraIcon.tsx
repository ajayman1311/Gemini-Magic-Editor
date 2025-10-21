
import React from 'react';

const CameraIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
    <path
      fillRule="evenodd"
      d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.946V16.5a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.673c0-1.453 1-2.707 2.43-2.946l1.152-.177a1.884 1.884 0 001.11-.71l.821-1.317A3.373 3.373 0 019.344 3.07zM15 12.75a3 3 0 11-6 0 3 3 0 016 0z"
      clipRule="evenodd"
    />
  </svg>
);

export default CameraIcon;
