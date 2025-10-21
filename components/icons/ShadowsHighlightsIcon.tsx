import React from 'react';

const ShadowsHighlightsIcon: React.FC<{ className?: string }> = ({
  className,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25z" opacity="0.2"/>
    <path d="M12 2.25a9.75 9.75 0 00-7.832 15.24L21.99 4.26A9.704 9.704 0 0012 2.25z" />
  </svg>
);
export default ShadowsHighlightsIcon;