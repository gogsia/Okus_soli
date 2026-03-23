# Okus Soli — Full Website Audit Prompt

Paste this into Claude Code to run a comprehensive audit of the project.

---

## The Prompt

```
Perform a thorough audit of the Okus Soli Next.js website at m:\Repo\Okus Soli\okus-soli\. Read every file in src/ and report findings across ALL of the following categories. Do NOT fix anything — only report.

### 1. BUILD & TYPE ERRORS
- Run `npm run build` and report any TypeScript errors, warnings, or build failures
- Check for missing imports, unused imports, undefined variables
- Check for type mismatches or `any` usage

### 2. RUNTIME ERRORS & EDGE CASES
- Components that will crash on SSR (window/document access outside useEffect)
- Missing null checks or optional chaining where needed
- Event listeners not cleaned up in useEffect return
- State updates on unmounted components
- Race conditions in async operations (fetch calls)

### 3. ACCESSIBILITY (WCAG 2.1 AA)
- Missing alt text, aria-labels, or roles
- Interactive elements without keyboard support (onClick without onKeyDown)
- Missing focus management (modals, overlays)
- Color contrast issues (check all text/background combinations against 4.5:1 ratio)
- Missing landmark regions, heading hierarchy issues
- Form inputs without associated labels
- Skip link functionality

### 4. PERFORMANCE ISSUES
- Large components that should be code-split with dynamic()
- Images using CSS background-image instead of next/image (loses optimization)
- Missing loading="lazy" or fetchPriority hints
- Unnecessary re-renders (inline objects/functions in JSX, missing useMemo/useCallback)
- Bundle size concerns (heavy libraries imported in initial load)
- CSS animations triggering layout/paint (should use transform/opacity only)

### 5. SEO ISSUES
- Missing or duplicate metadata across pages
- Missing Open Graph / Twitter card meta tags per page
- Semantic HTML issues (wrong heading levels, div soup)
- Missing canonical URLs
- Structured data (JSON-LD) accuracy and completeness

### 6. SECURITY CONCERNS
- API routes exposing sensitive data
- Missing input validation/sanitization
- XSS vectors (dangerouslySetInnerHTML usage)
- Environment variables exposed to client
- CORS or CSP considerations

### 7. CODE QUALITY
- Duplicated code that should be abstracted
- Inconsistent patterns (some components use inline styles, others use Tailwind)
- Props that should be typed more strictly
- Magic strings/numbers that should be constants
- Dead code or unused exports

### 8. RESPONSIVE & CROSS-BROWSER
- Components that will break on mobile (fixed positioning, overflow, viewport units)
- Missing responsive breakpoints
- CSS features that need vendor prefixes or fallbacks
- Touch interactions missing for mobile (hover-only interactions)

### 9. CONTENT & COPY
- Placeholder text that needs to be replaced
- Typos, grammar issues, or inconsistent tone
- Lorem ipsum or sample data references
- Hardcoded data that should come from CMS

### 10. MISSING FEATURES (vs. the brief)
- Read the brief at `m:\Repo\Okus Soli\🌾 THE HEARTH & HARVEST — ULTIMATE.txt`
- List every feature from the brief that is NOT yet implemented
- Rate each as: CRITICAL (breaks core experience), IMPORTANT (should have), NICE-TO-HAVE

## Output Format

For each finding, report:
- **File**: exact path and line number
- **Category**: which of the 10 categories above
- **Severity**: 🔴 Critical / 🟡 Warning / 🔵 Info
- **Issue**: one-line description
- **Details**: explanation and suggested fix approach

At the end, provide:
- Total count per severity level
- Top 5 most impactful issues to fix first
- Overall health score (0-100)
```
