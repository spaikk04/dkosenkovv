# GradientMenu

Structural adaptation of the user-supplied 21st.dev component.

- UI: `components/ui/gradient-menu.tsx`; styles: `styles/gradient-menu.css`.
- Uses existing React/TypeScript, lucide-react icons, shadcn folder convention and Tailwind v4 setup. No extra react-icons dependency, providers or stock photography required.
- Props: `items`, `ariaLabel`, optional controlled `activeId` / `onActiveChange`. Items supply a stable `id`, real `title`, `accessibleLabel`, Lucide `icon`, and optional `onSelect` action.
- Placement: a navigation/action area in a React page. Pass real callbacks; preview has no application navigation. For link navigation use actual anchor semantics when destination URLs are provided.
- Vite preview: run `npx vite --host 0.0.0.0 --port 3005`, open `/gradient-menu.html`. Import `styles/globals.css` at page entry for Tailwind.
- `/components/ui` is a generator/import convention, not a React requirement. Alias `@/` points to the video-studio root; styles live in `/styles`.
- Preserves expansion and icon/title exchange. Keyboard focus and touch activate items; Escape collapses. Layout wraps at narrow widths. Reduced motion removes animated resizing/scaling.
- MOTION.md draft palette, local DejaVu font, thin edge, one soft shadow, .4s entrance / .3s exit and .1s text offset replace donor styling. No decorative glow. 16px web labels correspond to 32px at 2× video scale.
- Visible preview is explicitly a structural test. No supplied real menu titles/actions yet: icons remain visible when title is absent. English donor labels are not used. Title swap is implemented but not demonstrated with fabricated content.
- Validation: TypeScript, Vite production build, Chromium desktop expansion, mobile overflow, focus, Escape, reduced motion and browser error checks passed. Recorded GIF is a timed capture of actual browser CSS animation, not a frame-accurate video export.
