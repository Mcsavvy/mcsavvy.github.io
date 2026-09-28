# David John · Portfolio

Fractional CTO & Software Architect. Live at https://mcsavvy.is-a.dev

## Develop

```bash
npm install
npm run dev
```

## Edit content

All copy lives in `src/content.ts`: projects, proof points, process steps, about text and contact links.
Every figure is real and verifiable. Keep it that way.

- **Project screenshots:** add an image to `public/` (16:10) and set `image: '/your-file.png'` on the project.
- **Booking link:** replace `contact.bookingUrl` with your Calendly or Cal.com link.
- **Hero video:** `public/hero-motion.mp4` / `.webm`, with `public/hero-poster.jpg` as the still.

## Deploy

```bash
npm run deploy   # builds and publishes dist/ to the gh-pages branch
```
