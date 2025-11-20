

# Flight Lookup App

> [!NOTE]
> This project was created using Antigravity's Agent-Assisted Development feature.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Scaling

### 1. Performance & Data Optimization
*   **Caching Layer (Redis)**: Flight data doesn't change every second. Implementing caching (e.g., with Vercel KV or Redis) would significantly reduce API costs and improve response times for frequently searched flights.
*   **Database Integration**: Add a database (PostgreSQL/Supabase) to store:
    *   User search history.
    *   "Watchlisted" flights for price or status alerts.
    *   Cached flight data to minimize external API hits.

### 2. Feature Expansion
*   **Interactive Maps**: Integrate **Mapbox** or **Leaflet** to visualize the flight path on a globe, showing the live position of the aircraft.
*   **User Accounts**: Implement **NextAuth.js** to allow users to save their trips and preferences.
*   **Flight Status Alerts**: Use background jobs (Cron) to poll flight status and send email/SMS notifications (via Twilio/Resend) when a flight is delayed or landed.

### 3. Infrastructure & Quality
*   **Internationalization (i18n)**: Scale to a global audience by adding multi-language support.
*   **End-to-End Testing**: Add **Playwright** or **Cypress** tests to ensure critical flows (like search and API fallback) never break as the app grows.
*   **Monitoring**: Integrate **Sentry** or **LogRocket** to track client-side errors and API failures in production.