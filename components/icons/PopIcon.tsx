import React from 'react';

const PopIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071 1.071l9 9a.75.75 0 001.071-1.071l-9-9zM12 3a.75.75 0 01.75.75v6a.75.75 0 01-1.5 0v-6A.75.75 0 0112 3zm.22 19.5a.75.75 0 01-1.071 0l-9-9a.75.75 0 011.071-1.071l9 9a.75.75 0 010 1.071zM12 21a.75.75 0 01-.75-.75v-6a.75.75 0 011.5 0v6A.75.75 0 0112 21zm3.75-12a.75.75 0 00-1.071 0l-9 9a.75.75 0 001.071 1.071l9-9a.75.75 0 000-1.071zM21 12a.75.75 0 01-.75-.75h-6a.75.75 0 010-1.5h6A.75.75 0 0121 12zm-3.28 9.963a.75.75 0 01-1.071-1.071l9-9a.75.75 0 011.071 1.071l-9 9zM3 12a.75.75 0 01.75.75h6a.75.75 0 010 1.5H3.75A.75.75 0 013 12z" clipRule="evenodd" />
  </svg>
);

export default PopIcon;