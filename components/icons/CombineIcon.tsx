
import React from 'react';

const CombineIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12.75 11.25L9 7.5l3.75-3.75M12.75 11.25L16.5 15l-3.75 3.75M12.75 11.25L21 3M12.75 11.25L3 21" />
    <path
      fillRule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM3.75 12a8.25 8.25 0 1116.5 0 8.25 8.25 0 01-16.5 0z"
      clipRule="evenodd"
    />
  </svg>
);

export default CombineIcon;
