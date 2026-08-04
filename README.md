# Ropost — landing page

Single-page marketing site. React + TypeScript + Vite, no UI framework.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
```

## Where things live

| What | File |
| --- | --- |
| Page order | [src/App.tsx](src/App.tsx) |
| Design tokens (color, type, spacing) | [src/index.css](src/index.css) — the `:root` block |
| Section layout | [src/app.css](src/app.css) |
| Headline + subhead | [src/components/Hero.tsx](src/components/Hero.tsx) |
| "Porch gap" copy | [src/components/PorchGap.tsx](src/components/PorchGap.tsx) |
| Four-step loop | [src/components/HowItWorks.tsx](src/components/HowItWorks.tsx) |
| Capability list | [src/components/System.tsx](src/components/System.tsx) |
| Contact email | `CONTACT_EMAIL` in [src/components/Contact.tsx](src/components/Contact.tsx) |

Copy in the section files is plain data at the top of each module — edit the arrays, not the JSX.

## Notes

- **The contact form has no backend.** Submitting builds a `mailto:` link and hands off to the
  visitor's mail client. Swap `handleSubmit` in `Contact.tsx` when there's somewhere to POST to.
- `hello@Ropost.ai` is a placeholder; it appears in `Contact.tsx` and flows to the footer.
- Type is Fraunces (display) + Inter (body), loaded from Google Fonts in `index.html`.
