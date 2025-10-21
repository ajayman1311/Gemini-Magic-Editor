import React from 'react';

const EraserIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M12.964 2.274a.75.75 0 011.056 0l6.45 6.45a.75.75 0 010 1.056l-8.25 8.25a.75.75 0 01-1.056 0l-6.45-6.45a.75.75 0 010-1.056l8.25-8.25zm.919 1.43L6.323 11.263l6.45 6.45 7.569-7.569-6.45-6.45z"
      clipRule="evenodd"
    />
    <path d="M11.94 13.81a.75.75 0 01-1.06-1.06l-2.25-2.25a.75.75 0 011.06-1.06l2.25 2.25a.75.75 0 01-1.06 1.06z" />
  </svg>
);

export default EraserIcon;
