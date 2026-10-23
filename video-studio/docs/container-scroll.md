# ContainerScroll integration

Status: component prepared; content and visual preview pending real user copy/media.

- Component: `components/ui/container-scroll-animation.tsx`.
- Styles: `styles/motion.css`; Tailwind entry: `styles/globals.css`.
- React + strict TypeScript already existed. Tailwind v4 and its Vite plugin added.
- `components.json` establishes the shadcn-style folder convention and aliases. `/components/ui` is a convention for imports and component generators, not a React requirement.
- Uses existing `motion/react` (the Motion package), providing the donor's `useScroll`, `useTransform` and `motion`. No duplicate `framer-motion` dependency needed.
- No Next.js dependency, context provider, external state store, icon package, or stock image required.
- Use `<ContainerScroll titleComponent={realTitle}>{realContent}</ContainerScroll>` in a React page; import `styles/globals.css` at the page entry for Tailwind utilities. Alias `@/` resolves to video-studio root.
- The supplied component is driven by browser scrolling, not Remotion frame time. Do not insert live scroll hooks into an offline Remotion composition. A video adaptation must drive the same geometry deterministically from frame progress.
- Mobile retains original scale range 0.7–0.9; desktop 1.05–1.0. Perspective and geometric movement retained. Colors, font, radius, thin edge and single soft shadow adapted to the draft MOTION.md. Shadow dimensions implement its qualitative soft-shadow instruction; they are not approved brand tokens.
- Reduced motion removes scroll transforms. Original unused Card.translate argument and `any` types removed.
- No demonstration copy, remote screenshot, or Unsplash substitute supplied. Await real title and media before creating/showing the content preview.
