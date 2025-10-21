import React from 'react';

const BwFilmIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h15a3 3 0 003-3v-9a3 3 0 00-3-3h-15z" opacity="0.2"/>
    <path d="M6 6.75A.75.75 0 016.75 6h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 6.75zm.75 3.75a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H6.75zm0 4.5a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H6.75z" />
  </svg>
);

export default BwFilmIcon;
