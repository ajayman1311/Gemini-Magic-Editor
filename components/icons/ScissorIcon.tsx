
import React from 'react';

const ScissorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M6.353 3.647a.75.75 0 011.06 0l6.5 6.5a.75.75 0 01-1.06 1.06L6.353 4.707a.75.75 0 010-1.06zm11.294 0a.75.75 0 00-1.06 0L9.47 10.763a.75.75 0 001.06 1.06l7.118-7.118a.75.75 0 000-1.06z"
      clipRule="evenodd"
    />
    <path d="M4.5 7.5a3 3 0 013-3h.001c.485 0 .954.12 1.36.339l-4.25 4.25A2.985 2.985 0 014.5 7.5zm15 0a3 3 0 00-3-3h-.001a2.986 2.986 0 00-1.36.339l4.25 4.25c.219-.406.339-.875.339-1.36V7.5z" />
    <path
      fillRule="evenodd"
      d="M8.56 14.53a.75.75 0 011.06 0l4.25 4.25a.75.75 0 01-1.06 1.06l-4.25-4.25a.75.75 0 010-1.06z"
      clipRule="evenodd"
    />
    <path d="M4.5 16.5a3 3 0 013 3h.001c.485 0 .954-.12 1.36-.339l-4.25-4.25A2.985 2.985 0 014.5 16.5zm15 0a3 3 0 00-3 3h-.001a2.986 2.986 0 00-1.36-.339l4.25-4.25c.219.406.339.875.339 1.36v.001z" />
  </svg>
);

export default ScissorIcon;
