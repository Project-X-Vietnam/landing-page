import React from 'react';

// Uses the actual ProjectX favicon.svg from the public/ folder
export const ProjectXLogo = ({
  size = 24,
}: {
  size?: number;
  color?: string; // kept for API compat, ignored since we use the image
}) => (
  <img
    src="/favicon.svg"
    alt="ProjectX"
    width={size}
    height={size}
    style={{ display: "block", objectFit: "contain" }}
  />
);
