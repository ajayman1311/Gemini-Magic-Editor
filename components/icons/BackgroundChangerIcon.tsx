import React from 'react';

const BackgroundChangerIcon: React.FC<{ className?: string }> = ({
  className,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={className}
  >
    <path
      d="M12.7 6.3c0-1.2-1.2-2-2.7-2s-2.7.9-2.7 2c0 .9.6 1.6 1.5 1.9-.9.4-1.5 1.2-1.5 2.2 0 1.7 1.4 3.1 3.1 3.1s3.1-1.4 3.1-3.1c0-1-.6-1.8-1.5-2.2.9-.3 1.5-1 1.5-1.9z"
      stroke="none"
      fill="currentColor"
      opacity="0.9"
    />
    <path
      d="M19.7 12.3c-.5-3-3-5.3-5.9-5.8"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M18.8 17.8c-1-1.2-2.6-1.9-4.3-1.9"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M2.5 19.5v-7.2c0-2.1 1.6-3.8 3.6-3.8h11.8c2 0 3.6 1.7 3.6 3.8v7.2c0 2-1.6 3.8-3.6 3.8H6.1c-2 0-3.6-1.7-3.6-3.8z"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="currentColor"
      opacity="0.2"
    />
    <path
      d="M15.4 15.6l-3.3-3.3c-.4-.4-1-.4-1.4 0l-5.3 5.3"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M16.5 13.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default BackgroundChangerIcon;
