import React from 'react';

const BackgroundRemoverIcon: React.FC<{ className?: string }> = ({
  className,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path
      d="M12 2a5 5 0 0 0-5 5c0 1.5.6 2.8 1.5 3.7-1 .9-1.5 2.2-1.5 3.3 0 2.8 2.2 5 5 5s5-2.2 5-5c0-1.1-.5-2.4-1.5-3.3.9-.9 1.5-2.2 1.5-3.7a5 5 0 0 0-5-5z"
      fill="currentColor"
      stroke="none"
    />
    <path
      d="M2 15s2-2 6-2 6 2 6 2"
      stroke="currentColor"
      fill="none"
      opacity="0.5"
      strokeDasharray="3 2"
    />
    <path
      d="M16 13s2-2 6-2"
      stroke="currentColor"
      fill="none"
      opacity="0.5"
      strokeDasharray="3 2"
    />
  </svg>
);

export default BackgroundRemoverIcon;
