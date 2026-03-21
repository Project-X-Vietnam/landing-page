# CV Portfolio Survival Kit (SFP2026)

This is the CV Builder tool integrated directly into the Project X Vietnam Landing Page.
Original Design (Figma): [CV-Portfolio-Survival-Kit](https://www.figma.com/design/lBbHDRw0eNyvxx263Ne9oQ/CV-Portfolio-Survival-Kit)

## 🚀 How to Run the Project (Development)

This toolkit is now integrated as a route in the main Next.js project. You no longer need to run this folder independently using Vite.

Instead, run the main project from the root directory of the repository:

`ash
# Install dependencies using pnpm at the repository root (/landing-page-repo)
pnpm install

# Start the development server
pnpm dev
`

Once the server is running, navigate to: http://localhost:3000/sfp2026/cv-builder to view the UI.

---

## 📊 PostHog Analytics Guide

PostHog is used to track user actions (e.g., button clicks, template selection). This helps the team understand user behavior to improve the product.

### When to add a PostHog event?
- When a user clicks **"Start"**, **"Download PDF"**, or **"Preview"**.
- When a user selects or changes a Template.
- When an error occurs.

### How to use in code (For React Client Components):

Use the usePostHog() hook provided by PostHog inside a Client Component (ensure 'use client' is at the top of the file):

`	sx
'use client';

import { usePostHog } from 'posthog-js/react';

export default function DownloadCVButton() {
  const posthog = usePostHog();

  const handleDownload = () => {
    // Step 1: Send the tracking event to PostHog
    // Syntax: posthog.capture('Event Name', { properties })
    posthog.capture('cv_download_clicked', {
      button_name: 'Download PDF',
      template_id: 'template_01', 
    });

    // Step 2: Execute your normal logic
    // ...
  };

  return (
    <button onClick={handleDownload}>
      Download CV
    </button>
  );
}
`

## 📂 Important Notes
- Since this is a sub-module, **only modify code and assets within:** pp/sfp2026/ or specifically pp/sfp2026/cv-builder/ to avoid conflicts with the rest of the generic landing page project.
