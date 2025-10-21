import React from 'react';

const SharpenIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.926 0L2.22 17.53a.75.75 0 00.963 1.22l8.817-4.409a.75.75 0 01.75 0l8.817 4.409a.75.75 0 00.963-1.22L12.963 2.286z" clipRule="evenodd" />
  </svg>
);

export default SharpenIcon;