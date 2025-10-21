import React from 'react';

const SlidersIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path fillRule="evenodd" d="M3.75 3A.75.75 0 003 3.75v16.5a.75.75 0 001.5 0V3.75A.75.75 0 003.75 3zM8.25 3A.75.75 0 007.5 3.75v16.5a.75.75 0 001.5 0V3.75A.75.75 0 008.25 3zM12.75 3A.75.75 0 0012 3.75v16.5a.75.75 0 001.5 0V3.75A.75.75 0 0012.75 3zM17.25 3A.75.75 0 0016.5 3.75v16.5a.75.75 0 001.5 0V3.75A.75.75 0 0017.25 3zM21.75 3A.75.75 0 0021 3.75v16.5a.75.75 0 001.5 0V3.75A.75.75 0 0021.75 3z" clipRule="evenodd" />
    <path d="M14.25 9.75a.75.75 0 000-1.5H1.5a.75.75 0 000 1.5h12.75zM5.25 15.75a.75.75 0 000-1.5H1.5a.75.75 0 000 1.5h3.75zM18.75 15.75a.75.75 0 000-1.5h-3.75a.75.75 0 000 1.5h3.75z" />
  </svg>
);

export default SlidersIcon;