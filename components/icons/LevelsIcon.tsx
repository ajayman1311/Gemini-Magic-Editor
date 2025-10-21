import React from 'react';

const LevelsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M5.25 20.25h3v-9h-3v9zM10.5 20.25h3V3.75h-3v16.5zM15.75 20.25h3v-12h-3v12z" />
  </svg>
);

export default LevelsIcon;