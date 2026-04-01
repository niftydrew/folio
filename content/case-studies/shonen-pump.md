# Shonen Pump

### A Web3 Manga Reader with On-Chain Token Burn Monetization

`Next.js 15` `Solana` `SPL Tokens` `React 19` `Redis` `MangaDex API` `Jupiter API` `TypeScript`

---

## Overview

Shonen Pump is a manga reading platform built on Solana that replaces traditional subscriptions with a token-based credit system. Users get 50 free credits daily to read chapters, and when those run out, they can burn a custom SPL token to unlock more. Every burn is permanent and deflationary: the tokens are gone from circulation forever.

The project sits at the intersection of content distribution and blockchain tokenomics. It pulls live manga data from MangaDex, handles real Solana transactions through Phantom and Solflare wallets, and uses Redis to persist user credits and chapter unlock history across sessions.

---

## The Problem

Manga platforms typically monetize through subscriptions or per-chapter microtransactions tied to a payment processor. Both models have friction: subscriptions feel wasteful for casual readers, and payment processors add latency, fees, and geographic restrictions. For a token project looking to create genuine utility beyond speculation, neither model fits.

Shonen Pump uses the token itself as the payment rail. Readers who want more than their daily allocation burn tokens directly from their wallet. The app calculates how many tokens to burn based on the live USD price fetched from Jupiter, so the cost in tokens stays consistent in dollar terms even as the token price fluctuates. The burn reduces circulating supply, which creates a mechanical connection between platform usage and token economics.

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend Framework | Next.js 15.5 (App Router) | Server components, API routes, ISR caching |
| UI | React 19 + Tailwind CSS v4 | Component rendering and styling |
| Component Primitives | Radix UI + CVA | Accessible modals and variant-based styling |
| Blockchain Network | Solana Mainnet | Token burns and wallet interactions |
| Wallet Adapters | Phantom + Solflare | Transaction signing |
| Solana SDK | `@solana/web3.js` + `@solana/spl-token` | RPC calls, burn instructions, token accounts |
| Content API | MangaDex API | Manga metadata, chapters, cover images |
| Token Pricing | Jupiter Lite API | Real-time USD token price |
| Market Data | DexScreener API | Price, volume, market cap, supply stats |
| Persistence | Redis via Vercel KV | Credits balances and unlocked chapters |
| Dev Fallback | In-memory Map | Local development without Redis |
| Deployment | Vercel | Serverless functions + KV storage |

---

## Architecture

The application is structured in four layers with clear boundaries between them.

The **UI layer** is entirely React client components. Components like `CreditGatedReader` and `BurnTokensModal` handle user interaction but hold no business logic around transactions or credit accounting.

The **state layer** is a `CreditsContext` that wraps the entire app and exposes a single source of truth for the user's credit balance and unlocked chapters list. All mutations flow through API calls back to the context, which prevents local state from drifting out of sync with the server.

The **API layer** is a set of Next.js route handlers that proxy every sensitive operation: credit reads and writes, chapter unlock tracking, token metadata fetching, Solana RPC calls, and image delivery. Nothing sensitive touches the client bundle.

The **integration layer** covers MangaDex, Jupiter, DexScreener, and the Solana RPC. All of these are called server-side only, either in route handlers or in server components marked `"server-only"`.

---

## Token Burn Flow

This is the most technically involved part of the application and the feature that differentiates it from a standard manga reader.

### Price Calculation

The number of tokens to burn is computed dynamically at the time the user opens the burn modal:

```
tokens_to_burn = (credits_wanted / 10) * 0.01 / token_price_usd
```

The formula prices each chapter read at $0.01. The live token price comes from the Jupiter API, so the dollar cost stays stable as the token price moves. If the token doubles in price, users burn half as many tokens for the same number of chapter reads.

### Transaction Construction

The burn transaction is assembled client-side using `@solana/web3.js` and `@solana/spl-token`:

1. Look up the user's Associated Token Account for the custom mint
2. Fetch the latest blockhash from the RPC proxy endpoint
3. Build a `createBurnInstruction` with the token amount converted to the correct decimal units (6 decimal places)
4. Set the fee payer and attach the blockhash
5. Hand the transaction to the wallet adapter for signing
6. Broadcast the signed transaction via `sendRawTransaction`

The Solana RPC endpoint is never exposed to the client. All RPC calls from the wallet adapter are routed through `/api/rpc`, which injects the API key server-side and forwards the request. This keeps the Helius API key out of the browser bundle entirely.

### Confirmation Polling

After broadcasting, the modal polls `getSignatureStatus` once per second for up to 30 seconds, waiting for `confirmationStatus === 'confirmed'`. Once confirmed, it calls `POST /api/credits` to credit the user's balance in Redis. If the poll times out, the user is shown an error and the credits are not added. The design favors correctness over speed: the on-chain confirmation is always the source of truth before any off-chain state changes.

---

## Credit System

The credit model is designed to be generous for casual readers and economical for heavy ones.

Every wallet gets 50 free credits per day, automatically claimed on the first API call after UTC midnight. Each chapter read costs 10 credits, so the daily allowance covers 5 chapters. Readers who want more burn tokens for additional credits in packages of 100, 500, 1,000, and 5,000 credits (10, 50, 100, and 500 chapters respectively).

Once a chapter is unlocked it stays unlocked. The `unlocked-chapters` list in Redis is append-only per wallet. If a user revisits a chapter they already paid for, the reader checks the list and skips the credit deduction. This is a deliberate product decision: readers should feel like they own what they have paid for, not that they are renting access.

---

## Content Pipeline

MangaDex is called exclusively from server-side code. The `mangadex` library is imported with a `"server-only"` marker, which causes a build error if it is ever accidentally referenced in a client component.

Manga listings are fetched with Next.js ISR at a 5-minute revalidation interval in production. The fetch function supports filtering by genre tags, search query, and sort order (latest update, follower count, title), all passed through URL search params that the server component reads directly.

One non-obvious challenge with MangaDex is that a manga can appear in search results with a listed language but have zero actual chapters available in that language. To handle this, the fetch function optionally requests 3x the desired count of results and then verifies each one by checking whether at least one chapter exists, discarding the ones that fail. This is slower but eliminates dead links in the grid.

### Image Delivery

Chapter images are never requested directly from the client. Each image URL is wrapped in `/api/image-proxy?url=...`. The proxy handler:

- Injects the `Referer: https://mangadex.org` header that MangaDex requires
- Sets a one-year immutable cache header on the response
- Streams the image body through without buffering it in memory

This gives a single point of control over caching behavior and prevents CORS issues that would arise from the browser making requests directly to MangaDex's image CDN.

---

## State Management

`CreditsContext` follows a unidirectional data flow pattern. The component holds credits and unlocked chapters as React state but never mutates them directly. Every change flows through a `fetch` call to the API, and the response becomes the new state. This means the UI always reflects what the server has persisted, not an optimistic guess.

```
User action
    -> fetch /api/credits or /api/unlocked-chapters
    -> server updates Redis
    -> response returns new state
    -> setState(response)
    -> UI re-renders
```

The wallet address is the only identifier. There are no user accounts, no passwords, and no sessions. The wallet is both the identity and the payment mechanism.

---

## Security Design

**RPC proxy:** All Solana RPC calls are routed through `/api/rpc`. The wallet adapter is configured to point at this endpoint instead of the Helius URL directly. The API key never leaves the server.

**No private keys:** The server never sees or stores a private key. The wallet adapter handles all signing locally. The server receives only a signed, serialized transaction and the public key of the signer.

**Server-only content fetching:** MangaDex API calls happen exclusively in server components and route handlers. No content API keys or raw MangaDex URLs are ever sent to the browser.

**Credit verification:** Credits are verified server-side on every chapter read request. The client cannot self-report its credit balance. The Redis record is the only value that matters.

---

## Redis and Graceful Degradation

In production, Vercel KV (Redis) stores two keys per wallet: a credit balance and a list of unlocked chapter IDs. In development, both fall back to an in-memory Map. The two implementations sit behind the same interface, so the application code does not need to branch.

The fallback matters for developer experience: spinning up a Redis instance locally to work on the UI is an unnecessary step. The tradeoff is that in-memory state resets on server restart, which is acceptable in development but would be a bug in production. The environment variable presence of `REDIS_URL` is the switch between the two.

---

## Token Statistics Dashboard

The token stats surface combines data from two sources. Supply information (total minted, decimals) comes from the Solana RPC via the mint account. Price, volume, and market cap come from DexScreener. The number of burned tokens is derived by subtracting the current total supply from the initial max supply, giving a running count of how many tokens have been destroyed through platform usage.

This is displayed on the frontend and refreshes every 3 minutes client-side, giving holders a live view of the deflationary pressure the platform generates.

---

## Key Engineering Decisions

**Token price as the pricing oracle.** Hardcoding a token-to-credit rate would create a bad experience as the token price changes. Using Jupiter's live price to dynamically calculate the burn amount keeps the dollar cost of reading stable and makes the platform viable at different points in the token's price history.

**Permanent unlocks over rental.** Most streaming platforms charge on access, meaning the same content costs money every time a subscription lapses. Shonen Pump unlocks chapters permanently. This is a more reader-friendly model and also means the Redis unlock list only ever grows, simplifying the access control logic considerably.

**Polling over WebSockets for confirmation.** WebSocket connections can be blocked by corporate networks, browser extensions, and restrictive firewalls. Polling `getSignatureStatus` once per second is less elegant but works in every environment. The 30-second timeout covers the typical Solana confirmation window with room to spare.

**Chapter verification on fetch.** Pulling 3x items and filtering is slower than a clean paginated fetch. But the alternative is a grid full of manga titles the user clicks on only to find no chapters exist. The verification pass is a product quality decision, not a performance one.

---

## What is Next

Several extensions fit naturally onto the current architecture. A creator reward mechanism could distribute a percentage of token burns back to wallets associated with content contributors, tying platform revenue to the community. Reading lists and bookmarks would extend the existing Redis schema with minimal new infrastructure. A comments system could be built on top of wallet identity without needing traditional accounts. Integration with additional content sources beyond MangaDex would broaden the catalog while the credit system remains unchanged.

---

## Summary

Shonen Pump demonstrates how blockchain primitives can serve a genuine product purpose rather than existing as decoration. The token burn is not a gimmick: it is the revenue model, the tokenomics mechanism, and the monetization layer all in one. The technical implementation handles the sharp edges of real Solana transactions, live price oracles, and external content APIs while keeping the reading experience fast and the interface simple.

The architecture choices, particularly the RPC proxy, the server-only content layer, and the unidirectional credit state, reflect the kinds of decisions that matter in a production Web3 application where correctness and security cannot be compromised for convenience.
