import React from 'react';

const IslaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2.25a.75.75 0 01.75.75v18a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75z" opacity="0.3"/>
    <path fillRule="evenodd" d="M11.25 3.53a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v1.652a.75.75 0 01-1.5 0V3.53zm-3 3.626a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v8.188a.75.75 0 01-1.5 0V7.156zm6 0a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v5.188a.75.75 0 01-1.5 0V7.156zM20.25 8.625a.75.75 0 00-1.5 0v3.375a.75.75 0 001.5 0V8.625zM3.75 8.625a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v5.188a.75.75 0 01-1.5 0V8.625z" clipRule="evenodd" />
  </svg>
);

export default IslaIcon;
