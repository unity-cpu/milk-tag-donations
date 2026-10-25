# Game Cosmetics Store

A simple Next.js + Stripe store for selling in-game packages.

## Packages

| Package | Price | What they get |
|---------|-------|---------------|
| Basic   | $5    | Donator Stick + 5 cosmetics |
| Plus    | $10   | Donator Stick + Add you back + 10 cosmetics |
| Full    | $20   | Every cosmetic + Add you back |

## Setup (Local)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the example env file:
   ```bash
   cp .env.example .env.local
   ```

3. Add your Stripe keys to `.env.local`:
   - Go to https://dashboard.stripe.com/apikeys
   - Copy **Secret key** → `STRIPE_SECRET_KEY`
   - Copy **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

4. Enable **Cash App Pay**:
   - Stripe Dashboard → Settings → Payment methods
   - Turn on **Cash App Pay**

5. Run the site:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

## Deploy to Vercel

1. Push this folder to a GitHub repo (or use Vercel CLI)
2. Go to https://vercel.com → New Project → Import the repo
3. Add the same environment variables in Vercel:
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_BASE_URL` = your Vercel URL (e.g. `https://your-store.vercel.app`)
4. Deploy

## How money reaches you

- Buyers pay via Stripe (cards, Cash App Pay, Apple Pay, Google Pay, etc.)
- Money goes into your Stripe account
- You withdraw from Stripe to your bank account
- From your bank you can instantly transfer to Cash App

## After a sale

The success page shows the buyer’s username + package.
You can also see every payment (with the username in metadata) in the Stripe Dashboard → Payments.
