# Package CV Portfolio - Guidelines Architecture & Blueprint

This document defines the data architecture and the blueprint for how we handle dynamic CV guidelines based on User Track and Role/Industry. 

## 1. Goal
To standardize unstructured data from `data raw/PJX_CV_Guide_2026.pdf` into structured JSON formats. This allows the application contextually provide ATS-friendly Action Verbs, Do's & Don'ts, and Format Tips based on what Track and Role the user selects.

## 2. Data Flow Blueprint

1. **User Input:** User selects `Track` (e.g., Technology) and `Role` (e.g., Frontend Engineer) in the UI.
2. **Data Fetching:** The App uses these selections to load the corresponding `RoleGuideline` object from our structured JSON data store (`src/data/guidelines/[track].json`).
3. **UI Rendering:** A "Guideline Panel" component reads the `RoleGuideline` object and displays tailored suggestions next to the CV text editor.
    *   *Action Verbs*: Suggests industry-specific strong verbs.
    *   *Structure Tips*: Suggests formats like STAR (Situation, Task, Action, Result) or XYZ.
    *   *Do's and Don'ts*: Highlights common pitfalls for that specific role.

## 3. Data Schema (TypeScript Definition)

All guidelines extracted from the raw data must conform to this schema:

```typescript
// src/types/guideline.ts

export interface RoleGuideline {
  /** The broad career track (e.g., "Technology", "Business", "Creative") */
  track: string;
  
  /** The specific industry/domain (e.g., "Software Development", "Marketing") */
  industry: string;
  
  /** The target role (e.g., "Frontend Engineer", "Product Manager") */
  role: string;
  
  /** High-level summary of expectations for this role */
  overview: string;
  
  /** Power words ATS scanners look for in this role */
  actionVerbs: string[];
  
  /** Must-have hard/soft skills to list */
  keySkills: string[];
  
  /** Section-by-section advice */
  resumeStructure: {
    summaryTips: string[];
    experienceTips: string[]; // e.g., Focus on STAR/XYZ formats
    projectTips?: string[];   // Optional, highly relevant for Tech/Creative
    educationTips?: string[];
  };
  
  /** General Do's and Don'ts for this specific role */
  dosAndDonts: {
    dos: string[];
    donts: string[];
  };
}
```

## 4. Directory Structure

```text
src/
├── types/
│   └── guideline.ts          # TypeScript interfaces
├── data/
│   └── guidelines/           # Structured JSON output from the PDF
│       ├── tech.json         # Array of RoleGuideline for Tech track
│       ├── business.json     # Array of RoleGuideline for Business track
│       └── creative.json     # Array of RoleGuideline for Creative track
├── components/
│   └── cv/
│       └── GuidelinePanel.tsx # UI Component to display the loaded guidelines
```

## 5. Next Steps for Implementation
1. Manually (or via script) extract representative data from the `PJX_CV_Guide_2026.pdf` for a few key roles.
2. Create standard JSON files in `src/data/guidelines/`.
3. Implement `src/types/guideline.ts`.
4. Integrate the JSON data into the global state context (Zustand/Redux/Context API).
5. Build the UI components to select Track/Role and display the `GuidelinePanel`.
