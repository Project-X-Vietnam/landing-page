import React from 'react';

export const ProjectXLogo = ({ size = 24, color = "#FFFFFF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Top chevron */}
    <path d="M12 9.5L7.5 4H10.5L12 6L13.5 4H16.5L12 9.5Z" fill={color} />
    {/* Bottom chevron */}
    <path d="M12 14.5L7.5 20H10.5L12 18L13.5 20H16.5L12 14.5Z" fill={color} />
    {/* Left chevron */}
    <path d="M9.5 12L4 7.5V10.5L6 12L4 13.5V16.5L9.5 12Z" fill={color} />
    {/* Right chevron */}
    <path d="M14.5 12L20 7.5V10.5L18 12L20 13.5V16.5L14.5 12Z" fill={color} />
  </svg>
);
