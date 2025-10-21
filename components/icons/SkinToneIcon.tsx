import React from 'react';

const SkinToneIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M7.5 3a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0V3z" />
    <path d="M6.375 5.625a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zM9.375 8.625a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zM12.375 11.625a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75z" />
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm1.823 11.458a.75.75 0 01-.41 1.264l-4.5 1.5a.75.75 0 01-.913-.913l1.5-4.5a.75.75 0 111.423.474l-.87 2.612 2.87-.956a.75.75 0 011.264.41l.127.382z" clipRule="evenodd" />
  </svg>
);

export default SkinToneIcon;