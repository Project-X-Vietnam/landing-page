# CV Builder Change Recap (Handover)

Tai lieu nay tong hop day du cac thay doi da lam tren branch `feat/sfp2026-cv-toolkit` de dev khac co the recreate **y het**.

## 1) Scope chinh da thay doi

Co 3 nhom thay doi:

1. **Content-role alignment fixes (sang gio)**  
   - Fix summary khong bi lech role (dac biet AI PM khong bi roi ve copy ML chung).
   - Chuan hoa title Experience theo seniority (`Intern/Fresher/Trainee`) de tranh hieu nham.
   - Chinh mapping canonical role de tranh map nham `Data Engineering`.


2. **Finish screen CTA**  
   - Chuyen tu CTA download PDF sang flow `Copy whole-CV prompt`.

3. **PostHog funnel + tracking docs**  
   - Them event funnel theo tung step trong CV Builder.

---

## 2) File thay doi theo tung nhom

### A. Content-role alignment

- `components/cv-builder/Screen3Workspace.tsx`
- `lib/cv-builder/data/roleCvOverrides.ts` (new)

### B. Finish CTA: Download -> Copy prompt

- `components/cv-builder/Screen4Finish.tsx`

### C. Tracking funnel

- `app/sfp2026/cv-builder/page.tsx`
- `lib/cv-builder/utils/analytics.ts`
- `lib/cv-builder/utils/posthog.ts` (new)
- `lib/cv-builder/utils/posthogFunnel.ts` (new)
- `docs/posthog-funnel-tracking.md` (doc)

---

## 3) Recreate y het: content-role alignment

### 3.1 Tao file override data

Tao file `lib/cv-builder/data/roleCvOverrides.ts` voi logic:

- `LEVEL_ROLE_SUFFIX`
  - `starter -> Intern`
  - `developing -> Fresher`
  - `ready -> Trainee`
- `withLevelSuffix(...)`
  - Tu dong bo prefix senior conflicted (`senior/sr/lead/principal/staff/mid-level/mid`) truoc khi gan suffix.
  - Neu role da co marker seniority (`intern/fresher/trainee/junior/early-career`) thi giu nguyen.
- `normalizeExperienceRoles(...)`
  - Chuan hoa role cho item experience dau tien.
- `OVERRIDES_BY_ROLE`
  - Co entries cho:
    - `AI Product Manager`
    - `AI Product Management`
  - Summary phai theo huong AI PM (khong dung copy ML fresher).
- Export `getRoleCvOverride(...)`
  - Merge override vao base CV.
  - Dam bao role experience dau tien duoc gan suffix seniority dung level.

### 3.2 Noi vao Screen3Workspace

Trong `components/cv-builder/Screen3Workspace.tsx`:

1. Import:
   - `getRoleCvOverride` tu `@/lib/cv-builder/data/roleCvOverrides`
2. Canonical role mapping:
   - Them explicit map cho `"AI Product Management"`
   - Sua fallback:
     - `if (safeRole.includes("Data Engineering")) return "Data Engineering";`
     - Sau do moi check `AI/Machine Learning`
3. Build CV data:
   - Dung `cvBase` tu `EXPANDED_CV_TEMPLATES`
   - Apply `override = getRoleCvOverride(selectedRole, cvKey, level, cvBase)`
   - Tao `cv` merge:
     - `...cvBase`
     - `...(override ?? {})`
     - `experience: override?.experience ?? cvBase.experience`
     - `projects: override?.projects ?? cvBase.projects`
4. Role data source:
   - Doi `getRoleLevelData(selectedRole, level)` -> `getRoleLevelData(cvKey, level)`
5. Summary render:
   - Dung `cv.summary || roleData.cvSummary`
6. Experience title render:
   - Dung `withExperienceLevelTag(entry.role, level)` (da co trong file)

---

## 4) Recreate y het: finish screen

File: `components/cv-builder/Screen4Finish.tsx`

Thay doi chinh:

- Import icon:
  - bo `Download`
  - them `Copy`
- Them state:
  - `copied`
- Them computed prompt:
  - `masterPrompt` (`useMemo`)
- Them handler:
  - `handleCopyMaster` (copy clipboard + state `Copied`)
- UI:
  - bo nut download PDF
  - thay bang:
    - card mo ta whole-CV prompt
    - `textarea` readOnly hien prompt
    - button `Copy whole-CV prompt`
    - state display `Copied` sau khi copy

---

## 5) Recreate y het: PostHog funnel

### 5.1 Env

Su dung:

- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`

### 5.2 Utility files

- `lib/cv-builder/utils/posthog.ts`
  - `initPostHog()`
  - `capturePostHogEvent(...)`
- `lib/cv-builder/utils/posthogFunnel.ts`
  - Event names:
    - `funnel_landing_viewed`
    - `funnel_start_clicked`
    - `funnel_role_selected`
    - `funnel_workspace_viewed`
    - `funnel_bullet_generated`
    - `funnel_finish_viewed`
    - `funnel_restart_clicked`

### 5.3 Wiring

- `app/sfp2026/cv-builder/page.tsx`
  - init posthog + call funnel events theo step.
- `lib/cv-builder/utils/analytics.ts`
  - giu `trackEvent(...)` cu
  - gui them sang PostHog qua `capturePostHogEvent(...)`

---

## 6) Commit landmarks (tham khao)

Nhung commit lien quan tren branch:

- `b1cc5bc` — fix(cv-builder): port morning content-role alignment fixes
- `e6e3841` — feat: replace finish download CTA with copy whole-CV prompt
- `86ca3ba` — feat(cv-builder): add tracking for master prompt copy event
- `7c86965` — feat(cv-builder): enhance funnel tracking and analytics
- `294e824` — feat(cv-builder): add PostHog funnel tracking flow and docs

Luu y: branch co the co them commit moi cua nguoi khac (vi du `ui update`), nhung cac commit tren la core patch can recreate.

---

## 7) Verification checklist (bat buoc)

Sau khi recreate, verify:

1. Chon role `AI Product Manager`:
   - Summary khong duoc hien noi dung `ML fresher ... PyTorch ...`
2. Muc Experience:
   - Role title item dau tien co suffix dung level (`Intern/Fresher/Trainee`)
3. Role map:
   - `Data Engineering` khong roi sang canonical AI/ML
4. Finish screen:
   - Hien textarea prompt + nut `Copy whole-CV prompt`, khong con CTA download PDF
5. Tracking:
   - Co event funnel names nhu danh sach o muc 5.2
6. Lint:
   - Khong co lint errors o cac file da thay doi

---

## 8) Luu y de tranh push nham

- Lam viec trong dung repo: `Project-X-Vietnam/landing-page`
- Branch: `feat/sfp2026-cv-toolkit`
- Truoc khi push:
  - check `git remote -v`
  - check `git branch -vv`
  - check `git show --name-only -1`

