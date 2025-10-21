import React from 'react';

const FilterIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 1.5a.75.75 0 01.75.75V7.5h4.922a.75.75 0 01.53 1.28l-4.155 4.155a.75.75 0 000 1.06l4.155 4.155a.75.75 0 01-.53 1.28H12.75V21.75a.75.75 0 01-1.5 0v-5.968a.75.75 0 000-1.06L7.097 10.57a.75.75 0 01-.212-.53v-2.29a.75.75 0 01.75-.75h3.115V2.25A.75.75 0 0112 1.5z" />
    <path
      fillRule="evenodd"
      d="M2.25 9.75A.75.75 0 013 9h3.75a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zm0 4.5a.75.75 0 01.75-.75H6a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75z"
      clipRule="evenodd"
    />
  </svg>
);

export default FilterIcon;
