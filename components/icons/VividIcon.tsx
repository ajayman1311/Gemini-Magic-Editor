import React from 'react';

const VividIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 1.5a.75.75 0 01.75.75V6h3.25a.75.75 0 010 1.5H12.75v3.25a.75.75 0 01-1.5 0V7.5H8.001a.75.75 0 010-1.5H11.25V2.25a.75.75 0 01.75-.75zM7.5 12.75a.75.75 0 00-1.5 0V18H2.75a.75.75 0 000 1.5H6v3.25a.75.75 0 001.5 0V19.5h3.25a.75.75 0 000-1.5H7.5V12.75zM12 12.75a.75.75 0 01.75.75V18h3.25a.75.75 0 010 1.5H12.75v3.25a.75.75 0 01-1.5 0V19.5H8.001a.75.75 0 010-1.5H11.25V13.5a.75.75 0 01.75-.75zM16.5 6.75a.75.75 0 00-1.5 0V12h-3.25a.75.75 0 000 1.5H15v3.25a.75.75 0 001.5 0V13.5h3.25a.75.75 0 000-1.5H16.5V6.75z" />
  </svg>
);

export default VividIcon;
