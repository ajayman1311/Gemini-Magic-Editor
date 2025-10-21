import React from 'react';

const VignetteIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <defs>
      <radialGradient id="vignette-gradient">
        <stop offset="50%" stopOpacity="0" />
        <stop offset="100%" stopOpacity="0.5" />
      </radialGradient>
    </defs>
    <path d="M3.75 3.75h16.5v16.5H3.75z" opacity="0.3" />
    <rect width="24" height="24" fill="url(#vignette-gradient)" />
  </svg>
);

export default VignetteIcon;