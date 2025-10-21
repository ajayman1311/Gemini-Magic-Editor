import React from 'react';

const VintageIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-1.424-2.5-2.333-4.378-2.333H9c-2.761 0-5 2.239-5 5v.5A2.25 2.25 0 006.25 14h.341c.214 1.933 1.83 3.425 3.759 3.659A5.25 5.25 0 0015 12.25v-1.5a.75.75 0 00-.75-.75h-1.5a.75.75 0 00-.75.75v.008c0 .826-.348 1.583-.913 2.106-.576.533-1.34.836-2.159.836H9.25a.75.75 0 01-.75-.75 2.5 2.5 0 012.5-2.5h2.378c.414 0 .75-.336.75-.75z"
      clipRule="evenodd"
    />
  </svg>
);

export default VintageIcon;
