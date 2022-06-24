import React from 'react';
import { useThemeUI } from 'theme-ui';

export default function ImgOk() {
  const { theme } = useThemeUI();
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 21.25C6.89136 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25Z"
        stroke={theme.rawColors.primary as string}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 9.125L11 14.5101L8 11.5101"
        stroke={theme.rawColors.primary as string}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
