import React from 'react';

const BlackPointIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z" opacity="0.3" />
    <path fillRule="evenodd" d="M12 1.5a.75.75 0 01.75.75v.008c0 .313.023.622.068.928a6.002 6.002 0 014.587 4.587c.306.045.615.068.928.068h.008a.75.75 0 01.75.75v12a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008c0-.313-.023-.622-.068-.928a6.002 6.002 0 01-4.587-4.587c-.306-.045-.615-.068-.928-.068h-.008a.75.75 0 01-.75-.75V3a.75.75 0 01.742-.75z" clipRule="evenodd" />
  </svg>
);

export default BlackPointIcon;