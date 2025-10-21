import React from 'react';

const PhotoCombinerIcon: React.FC<{ className?: string }> = ({
  className,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V17.625c0 1.036.84 1.875 1.875 1.875h12.75A1.875 1.875 0 0018 17.625V6.375A1.875 1.875 0 0016.125 4.5H3.375z"
      opacity="0.4"
    />
    <path d="M20.625 2.25A1.875 1.875 0 0018.75.375h-12.75A1.875 1.875 0 004.125 2.25v.375h12.75c1.035 0 1.875.84 1.875 1.875v11.25h.375A1.875 1.875 0 0022.5 14V3.75A1.5 1.5 0 0021 2.25h-.375z" />
    <path d="M10.5 8.25a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0v-4.5z" />
    <path d="M8.25 10.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5z" />
  </svg>
);

export default PhotoCombinerIcon;
