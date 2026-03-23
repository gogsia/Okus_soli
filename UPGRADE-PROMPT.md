
# Okus Soli — Full Project Analysis & Upgrade Prompt

Paste this into Claude Code to run a comprehensive analysis and upgrade of the entire project.

---

## The Prompt

```
You are upgrading the Okus Soli project at m:\Repo\Okus Soli\okus-soli\.

BEFORE writing any code, read the Next.js docs at node_modules/next/dist/docs/ — this version has breaking changes from what you know. Also read the project brief at "m:\Repo\Okus Soli\🌾 THE HEARTH & HARVEST — ULTIMATE.txt" to understand the full vision.

Read EVERY file in src/ and all config files. Then execute the following upgrade plan IN ORDER, committing after each phase.

---

## PHASE 1: STABILIZE (Fix what's broken)

### 1.1 Build Health
- Run `npm run build` and fix ALL TypeScript errors, type mismatches, and warnings
- Remove all `any` types — replace with proper types or generics
- Fix missing/unused imports
- Ensure zero build warnings

### 1.2 Runtime Safety
- Fix SSR/hydration issues (window/document access outside useEffect/client guards)
- Add proper cleanup to ALL useEffect hooks (event listeners, intervals, observers, GSAP contexts)
- Add null checks and optional chaining where refs or DOM elements may be undefined
- Fix race conditions in async operations (abort controllers for fetch, cleanup for stale closures)
- Ensure no state updates on unmounted components

### 1.3 Security Hardening
- Audit API routes — validate inputs, sanitize outputs, never expose secrets
- Check for XSS vectors (dangerouslySetInnerHTML, unescaped user input)
- Ensure all environment variables are properly scoped (NEXT_PUBLIC_ only for client)
- Add rate limiting consideration to API routes
- Review CORS headers on API endpoints

---

## PHASE 2: OPTIMIZE (Make it fast)

### 2.1 Bundle & Loading
- Code-split heavy libraries (Three.js, GSAP) with next/dynamic — they should NOT be in the initial bundle
- Lazy-load below-the-fold sections (Terrace 360°, Gallery, Instagram feed)
- Audit imports: ensure no barrel exports are pulling in unused code
- Convert CSS background-image usage to next/image where applicable
- Add proper fetchPriority="high" to hero/LCP image, loading="lazy" to everything else

### 2.2 Rendering Performance
- Identify and fix unnecessary re-renders:
  - Inline object/array/function creation in JSX props
  - Context values that change too often (memoize context values)
  - Components that re-render but don't need to (React.memo where measured)
- Ensure all CSS animations use transform/opacity only (no layout/paint triggers)
- Optimize Framer Motion: use `layout` prop sparingly, prefer CSS transitions where possible
- GSAP: ensure ScrollTrigger instances are killed on unmount, use context.revert()

### 2.3 Asset Optimization
- Ensure all images use next/image with proper width/height/sizes attributes
- Verify video assets have poster frames and are lazily loaded
- Check font loading strategy — preload critical fonts, subset where possible
- SVGs: inline critical ones, lazy-load decorative ones

### 2.4 Core Web Vitals Targets
- LCP < 2.5s: hero must load fast — preload hero video/image, no render-blocking resources
- FID/INP < 200ms: defer non-critical JS, no long tasks on main thread
- CLS < 0.1: reserve space for dynamic content, set explicit dimensions on media

---

## PHASE 3: ACCESSIBILITY (Make it usable for everyone)

### 3.1 WCAG 2.1 AA Compliance
- Every image: meaningful alt text (not "image" or "photo") or aria-hidden if decorative
- Every interactive element: keyboard accessible (focus styles, Enter/Space handlers)
- Every modal/overlay: focus trap, Escape to close, restore focus on dismiss
- Every form input: associated <label> or aria-label
- Heading hierarchy: single h1 per page, sequential h2→h3→h4
- Landmark regions: header, nav, main, footer with proper roles
- Skip-to-content link as first focusable element

### 3.2 Motion & Sensory
- Respect prefers-reduced-motion: disable GSAP timelines, Framer Motion, smooth scroll, particle effects
- Ensure the useReducedMotion hook is actually wired into ALL animation code
- Audio: never autoplay, provide visible play/pause controls with aria-labels
- Color contrast: verify ALL text/background combos meet 4.5:1 (normal) or 3:1 (large text)
- Don't rely on color alone to convey information

### 3.3 Screen Reader Experience
- Test logical reading order (DOM order matches visual order)
- aria-live regions for dynamic content updates (mood changes, gallery loading)
- Meaningful link text (no "click here" or "read more" without context)
- Status messages for async operations (loading, error states)

---

## PHASE 4: SEO & METADATA (Make it discoverable)

### 4.1 Per-Page Metadata
- Every page needs unique: title, description, Open Graph (og:title, og:description, og:image), Twitter cards
- Add canonical URLs to all pages
- Implement JSON-LD structured data:
  - Organization schema on homepage
  - LocalBusiness schema with address, hours, geo coordinates
  - BreadcrumbList on subpages
  - Menu/Restaurant schema on menu page
  - ImageGallery schema on gallery page

### 4.2 Technical SEO
- Verify semantic HTML: proper heading levels, no div-soup, use <article>, <section>, <aside> meaningfully
- Ensure all pages are server-rendered (not client-only) for crawlability
- Add sitemap.xml generation
- Add robots.txt
- Ensure internal links use next/link (not <a> tags) for client-side navigation

---

## PHASE 5: CODE QUALITY (Make it maintainable)

### 5.1 Architecture
- Extract shared constants (mood names, breakpoints, animation durations) into a constants file
- Eliminate magic numbers and hardcoded strings
- Remove dead code, unused exports, commented-out blocks
- Ensure consistent patterns: all components use the same styling approach (Tailwind + CSS vars)

### 5.2 Type Safety
- Create proper interfaces for all component props
- Type all event handlers, refs, and context values explicitly
- Create union types for mood states instead of raw strings
- Ensure API response types match actual API shape

### 5.3 Error Handling
- Add error boundaries around sections that use Three.js, GSAP, or external APIs
- Implement proper loading and error states for async components
- Handle Instagram API failures gracefully (show fallback content)
- Add not-found and error pages for all route segments

---

## PHASE 6: FEATURE COMPLETENESS (Build what's missing)

Compare the current implementation against the brief at "m:\Repo\Okus Soli\🌾 THE HEARTH & HARVEST — ULTIMATE.txt" and implement missing features in priority order:

### Priority 1 — Core Experience
- [ ] Hero: flour dust particle system (Three.js or Canvas)
- [ ] Hero: cinematic video background with mood-aware variants
- [ ] Menu: sensory category tabs with smooth transitions
- [ ] Menu: coffee origin interactive globe (Three.js)
- [ ] Terrace: 360° panorama viewer with clickable hotspots
- [ ] Exit-intent overlay with emotional copy

### Priority 2 — Engagement
- [ ] Gallery: thematic chapter organization with lightbox
- [ ] Gallery: "Behind the Lens" photographer notes
- [ ] Story: 6-chapter scroll-driven narrative with parallax
- [ ] Audio: ambient bakery soundscape with mood-aware tracks
- [ ] Easter eggs (Konami code, hidden interactions)
- [ ] Newsletter signup with CTA

### Priority 3 — Polish
- [ ] Micro-interactions on all interactive elements (hover, focus, active states)
- [ ] Page transitions between routes (Framer Motion AnimatePresence)
- [ ] Custom cursor on desktop
- [ ] Scroll progress indicator
- [ ] Back-to-top button with smooth scroll
- [ ] 404 page with on-brand personality

For each feature, check if it already exists (partially or fully) before implementing from scratch.

---

## RULES FOR ALL PHASES

1. **Read before writing**: Read every file you plan to modify. Read the Next.js docs in node_modules for any API you use.
2. **Commit after each phase**: One commit per phase with a descriptive message.
3. **Don't break existing work**: Run `npm run build` after each phase to verify nothing is broken.
4. **Mobile-first**: Every component must work on 320px–2560px viewports.
5. **Performance budget**: Initial JS bundle < 200KB gzipped. Lazy-load everything else.
6. **No new dependencies** unless absolutely necessary — prefer built-in Next.js/React features.
7. **Test the mood engine**: Verify all 4 mood states render correctly across all components.
8. **Preserve the emotional design philosophy**: This is an artisan, sensory-first experience — never sacrifice beauty for utility.

---

## OUTPUT

After completing all phases, provide a summary report:

- Changes made per phase (file list + one-line description each)
- Before/after build output comparison
- Remaining known issues or TODOs
- Lighthouse score estimates (Performance, Accessibility, Best Practices, SEO)
- Recommended next steps beyond this upgrade
```
