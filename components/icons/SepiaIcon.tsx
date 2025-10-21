import React from 'react';

const SepiaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M21.53 11.22l-4.5-4.5a.75.75 0 00-1.06 1.06l1.72 1.72-4.22 4.22a.75.75 0 000 1.06l4.22 4.22-1.72 1.72a.75.75 0 101.06 1.06l4.5-4.5a.75.75 0 000-1.06z"
      clipRule="evenodd"
    />
    <path
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75c2.054 0 3.96-.639 5.592-1.745a.75.75 0 00-.915-1.185A8.25 8.25 0 0112 20.25a8.25 8.25 0 010-16.5 8.28 8.28 0 013.9.963.75.75 0 00.916-1.185A9.704 9.704 0 0012 2.25z"
    />
  </svg>
);

export default SepiaIcon;
