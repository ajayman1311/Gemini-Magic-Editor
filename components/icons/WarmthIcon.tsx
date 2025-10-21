import React from 'react';

const WarmthIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M10.5 3.75a.75.75 0 00-1.5 0v5.034a3.75 3.75 0 00-1.5 2.966c0 2.069 1.681 3.75 3.75 3.75s3.75-1.681 3.75-3.75a3.75 3.75 0 00-1.5-2.966V3.75a.75.75 0 00-1.5 0zM12 12a2.25 2.25 0 00-2.25 2.25c0 1.24 1.01 2.25 2.25 2.25s2.25-1.01 2.25-2.25A2.25 2.25 0 0012 12z" />
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM3.75 12a8.25 8.25 0 1116.5 0 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" opacity="0.3" />
  </svg>
);

export default WarmthIcon;