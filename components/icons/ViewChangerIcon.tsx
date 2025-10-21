import React from 'react';

const ViewChangerIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="m21.743 6.257-8.995-5.25a.75.75 0 0 0-.75 0l-9 5.25A.75.75 0 0 0 2.25 7v10.5a.75.75 0 0 0 .75.75H12a.75.75 0 0 0 0-1.5H3.75V7.81l8.245 4.81a.75.75 0 0 0 .75 0l8.25-4.811V16.5a.75.75 0 0 0 1.5 0V7a.75.75 0 0 0-.257-.557z" />
    <path
      d="M12.755 11.255a.75.75 0 0 0-.75 0l-8.25 4.813V7.81l8.25-4.811 8.25 4.81V11.19l-8.25 4.813z"
      opacity=".4"
    />
    <path d="M22.5 20.25a.75.75 0 0 0-1.5 0v.536l-2.03-1.185a.75.75 0 1 0-.75 1.299l2.75 1.604a.75.75 0 0 0 .75 0l2.75-1.604a.75.75 0 1 0-.75-1.3l-2.02 1.185v-.535z" />
  </svg>
);

export default ViewChangerIcon;
