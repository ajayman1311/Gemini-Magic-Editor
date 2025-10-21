import React from 'react';

const AlpacaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path fillRule="evenodd" d="M11.22 5.093a.75.75 0 011.06 0l7.5 7.5a.75.75 0 01-1.06 1.06L12 6.71l-6.72 6.943a.75.75 0 01-1.06-1.06l7.5-7.5z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M11.22 11.093a.75.75 0 011.06 0l7.5 7.5a.75.75 0 01-1.06 1.06L12 12.71l-6.72 6.943a.75.75 0 01-1.06-1.06l7.5-7.5z" clipRule="evenodd" opacity="0.5"/>
  </svg>
);

export default AlpacaIcon;
