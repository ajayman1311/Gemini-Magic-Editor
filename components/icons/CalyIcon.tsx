import React from 'react';

const CalyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75S21.75 17.385 21.75 12 17.385 2.25 12 2.25z" opacity="0.3"/>
    <path d="M12 2.25c-2.28 0-4.398.78-6.113 2.096a.75.75 0 00.926 1.168A8.252 8.252 0 0112 3.75a8.25 8.25 0 018.25 8.25c0 1.905-.648 3.68-1.745 5.122a.75.75 0 10-1.168.926c1.317-1.714 2.096-3.832 2.096-6.11A9.75 9.75 0 0012 2.25z" />
  </svg>
);

export default CalyIcon;
