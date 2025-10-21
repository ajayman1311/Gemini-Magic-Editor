import React from 'react';

const PlayaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path fillRule="evenodd" d="M12 1.5c4.686 0 8.78 2.946 10.151 7.025a.75.75 0 01-1.3 1.101A8.25 8.25 0 0012 3a8.25 8.25 0 00-8.851 6.626.75.75 0 01-1.3-1.101C3.22 4.446 7.314 1.5 12 1.5z" clipRule="evenodd" opacity="0.8"/>
    <path d="M12 22.5c-4.686 0-8.78-2.946-10.151-7.025a.75.75 0 011.3-1.101A8.25 8.25 0 0012 21a8.25 8.25 0 008.851-6.626.75.75 0 011.3 1.101C20.78 19.554 16.686 22.5 12 22.5z" />
  </svg>
);

export default PlayaIcon;
