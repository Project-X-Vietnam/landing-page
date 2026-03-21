# CV Builder - Content Role Alignment Details

Tai lieu nay chi tap trung vao nhom thay doi:

- Fix summary khong bi lech role (dac biet AI PM khong bi roi ve copy ML chung)
- Chuan hoa title Experience theo seniority (`Intern/Fresher/Trainee`)
- Chinh canonical mapping de khong map nham `Data Engineering`

---

## 1) Muc tieu content can dat

1. **Summary dung role user chon**
   - Neu user chon `AI Product Manager`/`AI Product Management`, summary phai theo narrative AI PM.
   - Khong duoc hien summary MLE generic kieu `ML fresher ... PyTorch ...`.

2. **Experience title dung seniority**
   - Role title o experience item dau tien phai co seniority ro rang theo level:
     - `starter` -> `Intern`
     - `developing` -> `Fresher`
     - `ready` -> `Trainee`
   - Loai bo prefix khong hop ngu canh (vd `Senior`) truoc khi gan suffix.

3. **Canonical mapping dung**
   - `Data Engineering` phai map ve `Data Engineering` (khong roi sang AI/ML).
   - `AI Product Management` phai map ve canonical AI/ML bucket.

---

## 2) File code lien quan

- `components/cv-builder/Screen3Workspace.tsx`
- `lib/cv-builder/data/roleCvOverrides.ts` (new)

---

## 3) Thay doi code cu the

## 3.1 `lib/cv-builder/data/roleCvOverrides.ts` (new)

### A. Tao data override theo role/level

- Tao `OVERRIDES_BY_ROLE` cho:
  - `AI Product Manager`
  - `AI Product Management`

- Noi dung summary override:
  - `starter`: AI PM intern narrative
  - `developing`: AI PM fresher narrative
  - `ready`: strong-fresher AI PM narrative

=> Muc tieu: dam bao khi role la AI PM thi co summary dung ngu canh san pham AI.

### B. Chuan hoa seniority cho experience role

- Tao constants:
  - `LEVEL_ROLE_SUFFIX`
  - `SENIORITY_MARKERS`
  - `CONFLICTING_SENIORITY_PREFIX`

- Tao helper:
  - `withLevelSuffix(roleLabel, level)`
    - xoa prefix senior conflict (`senior`, `sr`, `lead`, ...)
    - giu nguyen neu role da co marker (`intern/fresher/trainee/junior/early-career`)
    - neu chua co marker -> gan suffix theo level

  - `normalizeExperienceRoles(base, selectedRole, canonicalRole, level)`
    - chuan hoa role cho entry dau tien trong experience

### C. Merge override vao CV data

- Export `getRoleCvOverride(selectedRole, canonicalRole, level, base)`
  - tao `baseExperience` da normalize seniority
  - uu tien `bySelected` > `byCanonical`
  - neu khong co override summary thi van tra ve `experience` da normalize
  - merge `experience` co dieu kien de khong mat company/dates/bullets

---

## 3.2 `components/cv-builder/Screen3Workspace.tsx`

### A. Noi override vao flow build CV

- Import `getRoleCvOverride` tu `@/lib/cv-builder/data/roleCvOverrides`
- Tach `cvBase` va apply:
  - `override = getRoleCvOverride(selectedRole, cvKey, level, cvBase)`
  - `cv = { ...cvBase, ...(override ?? {}), experience, projects }`

### B. Canonical mapping updates

Trong `getCVTemplateKey(...)`:

- Them explicit map:
  - `"AI Product Management": "Artificial Intelligence (AI) / Machine Learning (ML)"`

- Sua fallback order:
  - check `Data Engineering` truoc AI keyword:
    - `if (safeRole.includes("Data Engineering")) return "Data Engineering";`
    - sau do moi check `AI`/`Machine Learning`

### C. Dung roleData theo canonical key

- Doi:
  - `getRoleLevelData(selectedRole, level)`
- Thanh:
  - `getRoleLevelData(cvKey, level)`

=> roleData/checklist/hr quote dong nhat theo canonical bucket.

### D. Summary render uu tien override

- Render summary:
  - `cv.summary || roleData.cvSummary`

=> Neu co override (AI PM) thi summary hien dung override.

### E. Experience title render theo seniority

- Render role title:
  - `withExperienceLevelTag(entry.role, level)`

=> title tren canvas luon co intern/fresher/trainee dung level.

---

## 4) Before vs After (content behavior)

### Case 1: AI Product Manager (developing)

- **Before**:
  - Co the hien summary MLE generic (`ML fresher ... PyTorch ...`)
- **After**:
  - Summary theo AI PM fresher:
    - "AI product manager fresher owning scoped AI features ..."

### Case 2: Project Management (Tech Projects) (developing)

- **Before**:
  - Experience role title co the hien dang trien khai mo (`Project Manager`), de gay hieu nham seniority
- **After**:
  - Role title duoc chuan hoa co suffix:
    - `Project Manager (Tech Projects) Fresher` (hoac role equivalent sau normalize)

### Case 3: Data Engineering mapping

- **Before**:
  - Co nguy co map nham sang AI/ML fallback neu keyword check khong dung thu tu
- **After**:
  - `Data Engineering` map dung bucket `Data Engineering`

---

## 5) Dieu kien verify bat buoc (manual QA)

1. Chon role `AI Product Manager`, level `developing`
   - Summary hien AI PM narrative, khong co chuoi `ML fresher ... PyTorch`.

2. Chon cac role khac nhau va doi level:
   - `starter`: title experience co `Intern`
   - `developing`: title experience co `Fresher`
   - `ready`: title experience co `Trainee`

3. Chon `Data Engineering`
   - Noi dung checklist/summary theo Data Engineering, khong theo AI/ML.

4. Chon `AI Product Management`
   - Hanh vi nhu `AI Product Manager` (mapping + summary override dung).

---

## 6) Lint + code safety

- Sau khi patch, lint phai clean o:
  - `components/cv-builder/Screen3Workspace.tsx`
  - `lib/cv-builder/data/roleCvOverrides.ts`

- Khong commit file tam/local scripts:
  - `apply_roles.cjs`, `do_roles.cjs`, `dynamicData.json`, ...

---

## 7) Commit tham chieu cho nhom thay doi nay

- `b1cc5bc`  
  `fix(cv-builder): port morning content-role alignment fixes`

Files trong commit:

- `components/cv-builder/Screen3Workspace.tsx`
- `lib/cv-builder/data/roleCvOverrides.ts`

