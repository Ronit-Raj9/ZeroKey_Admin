# Zerokey Admin

Admin dashboard for **Zerokey / AdShell** on **[Monad testnet](https://docs.monad.xyz/)**. Connect a wallet, inspect on-chain pool metrics (AdPool, USDC), and view telemetry backed by Prisma (impressions, users, activity feed).

## Stack

- **Next.js** (App Router) · **wagmi** + **RainbowKit** · **viem**
- **Prisma** + PostgreSQL for server-side telemetry
- Optional **Supabase** client vars for client integrations

## Prerequisites

- Node 20+ or **Bun**
- A PostgreSQL database URL for Prisma (telemetry)
- Deployed contract addresses on Monad testnet (or defaults where noted)

## Environment variables

Create `.env.local` in this directory (see `.gitignore` — env files are not committed).

### Database (server — required for telemetry / dashboards with live DB data)

| Variable        | Description |
|----------------|-------------|
| `DATABASE_URL` | PostgreSQL connection string (Prisma) |
| `DIRECT_URL`   | Optional; if set, preferred over `DATABASE_URL` for the Prisma adapter |

### WalletConnect (client)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | [WalletConnect Cloud](https://cloud.walletconnect.com/) project ID. Falls back to `"demo"` if unset (fine for local dev; use a real ID for production). |

### Monad RPC (client)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_MONAD_RPC` | Defaults to `https://testnet-rpc.monad.xyz` |

### Contract & app URLs (client, `NEXT_PUBLIC_*`)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_ADPOOL_ADDRESS` | AdPool contract |
| `NEXT_PUBLIC_ADREGISTRY_ADDRESS` | AdRegistry contract |
| `NEXT_PUBLIC_REVENUE_DISTRIBUTOR_ADDRESS` | Revenue distributor (if used) |
| `NEXT_PUBLIC_REPUTATION_ADDRESS` | Reputation oracle (if used) |
| `NEXT_PUBLIC_USDC_ADDRESS` | USDC token; defaults to Monad testnet USDC if unset |
| `NEXT_PUBLIC_PROXY_URL` | AdShell proxy base URL; defaults to `http://localhost:4021` |

### Optional — Supabase

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |

## Development

Install dependencies, then start the dev server:

```bash
bun install
bun dev
```

Or with npm:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root path redirects to `/dashboard`.

Other scripts:

```bash
bun run build   # production build
bun run start   # run production server
bun run lint    # ESLint
```

## Prisma

Migrations and client generation follow your existing Prisma setup (`prisma.config.ts`, `lib/prisma.ts`). Ensure `DATABASE_URL` / `DIRECT_URL` is set before running Prisma CLI commands against this app.

## Security note

Never commit `.env`, `.env.local`, or private keys. This repo ignores `.env*` by default.

## End-user OpenCode setup (optional)

To point OpenCode’s global config at a deployed **adshell-proxy** (OpenAI key on the server only), publish or use the CLI package **`@ronii/zerokey`** from `zerokey/packages/zerokey`: run `npx @ronii/zerokey init` and set `ZEROKEY_PROXY_URL` or `--proxy` to your proxy URL. This admin app does not host inference; the proxy does.
