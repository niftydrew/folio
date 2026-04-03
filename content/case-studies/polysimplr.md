# Polysimplr

### AI-Powered Prediction Markets for Everyone

`Next.js 15` `NestJS` `PostgreSQL` `Redis` `OpenAI` `Privy` `Docker` `TypeScript`

---

## Overview

Polymarket is one of the largest prediction market platforms in the world. It is powerful, liquid, and data-rich. It is also built for people who already understand orderbooks, liquidity mechanics, and decentralized finance. For anyone without that context, it is effectively inaccessible.

Polysimplr is my answer to that gap. It is a full-stack web application layered on top of Polymarket's infrastructure that makes prediction markets genuinely usable for people who are new to the space. Users can browse live events, build personal watchlists, and ask an AI assistant plain-language questions about any market. Instead of decoding a liquidity curve, a user can type "What is driving the price on this market?" and get a sourced, context-aware answer in seconds.

The platform is live and in active use.

---

## Production Metrics

| Metric | Value |
|---|---|
| Total registered users | **1,184** |
| Active users (March 2026) | **40** |
| New signups (March 2026) | **34** |
| Deployment | Live (Vercel + Dockerized backend) |

These are real numbers from the Privy dashboard. The product has been running in production with organic user growth and no paid acquisition.

---

## The Problem

Polymarket exposes a powerful dataset but provides no onboarding layer for non-traders. The interface assumes familiarity with orderbooks, YES/NO token mechanics, and liquidity pools. There is no explanation of what a market means, no context for why prices move, and no guided way to explore events.

Polysimplr's job is to sit between Polymarket's raw infrastructure and someone curious about prediction markets for the first time, and make that entry point feel natural.

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend Framework | Next.js 15 (App Router) | Server components, API routes, edge caching |
| Backend Framework | NestJS 11 | Modular REST API with dependency injection |
| Language | TypeScript (both runtimes) | End-to-end type safety |
| Database | PostgreSQL 15 + TypeORM | Relational persistence with ORM |
| Cache | Redis 7 + ioredis | Sub-millisecond read acceleration |
| Authentication | Privy | Wallet login + embedded wallet fallback |
| AI | OpenAI GPT-4o-mini | Natural language market Q&A |
| Web Search | Tavily Search API | Real-time news augmentation |
| Markets Data | Polymarket Gamma + CLOB APIs | Live events, orderbook, and trade data |
| Styling | Tailwind CSS v4 + shadcn/ui | Component system built on Radix primitives |
| Containers | Docker + Docker Compose | Orchestrates API, PostgreSQL, and Redis |

---

## Architecture

The system is split into two TypeScript codebases: a Next.js 15 frontend and a NestJS backend. Each has a clearly defined responsibility boundary, and both are containerized for consistent deployment.

### Frontend (Next.js 15 + App Router)

The frontend uses the App Router, which provides server components, co-located API routes, and fine-grained caching control. I treated those API routes as a Backend-for-Frontend (BFF) layer: they handle auth token proxying, shape payloads for the UI, and call the NestJS service server-side so sensitive API keys never touch the browser.

The main layout follows a responsive grid design with the markets explorer and news feed on the left and a collapsible AI chat panel on the right. On smaller screens the chat slides into a drawer with a floating toggle so the core browsing experience is not disrupted.

### Backend (NestJS + Modular Monolith)

The backend is a modular NestJS application. Each domain has its own module with a controller, service, and DTOs:

```
src/
├── auth/         Privy JWT verification + guards
├── markets/      Polymarket API integration
├── events/       Event aggregation and trending
├── portfolio/    User positions and trade history
├── orders/       Trade placement and cancellation
├── watchlist/    Persistent user watchlists (DB + cache)
├── agent/        AI agent endpoints
├── system/       Health checks and readiness probes
└── polymarket/   Raw Polymarket API wrapper
```

This keeps the codebase navigable and makes it straightforward to extract individual modules into separate services later if the load demands it.

---

## Authentication Design

Authentication was one of the first design decisions I made, and I deliberately chose Privy over a standard Web3 Sign-In With Ethereum (SIWE) flow.

A pure SIWE implementation would have excluded anyone without an existing wallet. Privy auto-provisions an embedded wallet for users who do not have one installed, which means someone with zero crypto experience can create an account, build a watchlist, and interact with markets without ever touching MetaMask or any extension.

The token lifecycle:

1. Privy issues a JWT on the client after the user authenticates
2. The frontend passes that token as a `Bearer` header to the BFF layer and through to NestJS
3. A custom `AuthGuard` calls Privy's `verifyAuthToken()` on every protected request
4. The `userId` and `sessionId` are extracted from claims and attached to the request object for downstream use

No session cookies, no custom token issuance, no rotation logic to maintain. The 1,184 registered users on the platform authenticated through this flow.

> **Why Privy over SIWE:** Requiring MetaMask would have excluded the majority of the target audience before they saw a single market. Privy's silent wallet provisioning lets Polysimplr feel like a Web2 product to anyone who wants it to, while still being fully non-custodial underneath.

---

## AI Agent with Search Augmentation

The AI chat feature is the most technically involved part of the frontend. Users can select any event from the markets explorer, open the chat panel, and ask questions about it in plain English. The agent has access to the full event context, live web search results, and a structured system prompt that gives it the vocabulary to discuss prediction markets accurately.

### Retrieval-Augmented Generation via Tavily

Rather than relying on the model's training data, each chat request triggers a Tavily Search API call server-side. The route extracts the market name from the Polymarket URL slug, queries for recent headlines, and injects both the summary and individual source links into the system prompt before calling OpenAI. The agent is working with information published in the last few hours, not just what it learned during pre-training.

Tavily is called with an 8-second timeout, and results are gracefully omitted if the call fails. A network hiccup never breaks the user experience.

### Token Budget Management

Long conversations can exceed GPT-4o-mini's context window. I implemented a token estimation and truncation strategy that runs before each API call:

- Estimates token count at approximately 4 characters per token
- Maintains a 120,000-token budget
- Trims the oldest conversation turns first
- Always preserves the system prompt, the current event context, and the most recent user message

This keeps the conversation coherent in extended sessions without hard-cutting to an error.

### Streaming with Server-Sent Events

AI responses are streamed to the browser via Server-Sent Events (SSE), giving users a real-time typewriter effect instead of a loading spinner. The stream carries three distinct event types:

- `text` delta for the main response
- `sources` carrying Tavily result links the user can follow
- `follow_ups` carrying GPT-structured suggested next questions

The follow-up questions are generated through OpenAI function calling with `tool_choice` forced to always return structured output, which guarantees the UI always has relevant next steps to surface.

---

## Watchlist Service and Caching Strategy

The watchlist feature looks straightforward from the outside: let users save events they want to track. The engineering challenge is that displaying a watchlist requires resolving each saved event ID against Polymarket's API to fetch current metadata, and doing that naively creates an N+1 request problem.

### Eliminating N+1 Requests

Without optimization, loading a 20-item watchlist requires 1 database query plus 20 separate Polymarket API calls, totaling 21 round trips. I solved this in two ways:

**Write-through cache on add:** When a user adds an event to their watchlist, the full event object is immediately stored in Redis with a 15-minute TTL.

**Redis PIPELINE on read:** When the watchlist loads, a single PIPELINE command attempts to retrieve all IDs in one network round trip. Only cache misses trigger an external API call, and those are batched together into a single request.

| Scenario | Without Caching | With Redis Pipeline |
|---|---|---|
| Cold cache (all misses) | 21 round trips | 2 round trips |
| Warm cache (all hits) | 21 round trips | 1 round trip |
| Partial cache hit | 21 round trips | 2 round trips |

### Graceful Degradation

Cache failures are silently caught so a Redis outage never surfaces as a user-facing error. The service falls through to direct API calls automatically. Batch event fetches use `Promise.allSettled()` rather than `Promise.all()`, meaning a single failed Polymarket API call does not discard the rest of the results. The user sees a slightly incomplete list rather than a broken page.

### API Design

The watchlist exposes clean REST endpoints with deliberate tradeoffs between completeness and payload size:

```
GET  /watchlist           Full event summaries for the dashboard view
GET  /watchlist/ids       Array of event IDs only (lightweight presence checks)
GET  /watchlist/check/:id Boolean membership check for heart-icon state
GET  /watchlist/stats     Count and aggregate volume
POST /watchlist/:eventId  Add to watchlist (also populates cache)
DEL  /watchlist/:eventId  Remove from watchlist (also evicts cache)
```

---

## Database Design

The current schema is intentionally lean. A single `Watchlist` entity acts as a junction table between a Privy `userId` and a Polymarket `eventId`. A unique composite index on `(userId, eventId)` enforces the constraint at the database level and accelerates membership queries. A separate index on `userId` alone speeds up the full-list fetch.

Connection pooling is configured with a minimum of 2 and a maximum of 10 connections, keeping idle overhead low while providing headroom for traffic spikes.

The schema is designed to grow. A documented extension plan covers `Users`, `Markets`, `Portfolios`, `Comments`, and `KYC` tables, each with JSONB columns for flexible metadata.

---

## Security

Security was layered in from the start rather than added later.

- **JWT Validation:** Every request to a protected endpoint is verified against Privy's token introspection. The `userId` is extracted from claims and never trusted from the request body.
- **Content Security Policy:** Next.js middleware sets comprehensive CSP headers that restrict script execution to `self`, allow only Privy and WalletConnect frames, and block all other cross-origin iframes.
- **API Key Isolation:** OpenAI and Tavily keys live exclusively in Next.js server-side route handlers. They are never referenced in client components and are not exposed in the browser bundle.
- **Payload Validation:** Zod schemas provide runtime type checking on all incoming request bodies before they reach business logic.
- **Error Sanitization:** Error responses return a message string without internal stack traces or database query details.

---

## Performance Engineering

| Optimization | Mechanism | Impact |
|---|---|---|
| Redis pipelining | Batch cache reads in single round trip | Eliminates N+1 on watchlist loads |
| DTO projection | `EventSummaryDto` returns only needed fields | ~80% payload reduction on list endpoints |
| Selective DB queries | `select: ['eventId']` on ID-only fetches | Avoids full row scans |
| Token budget management | Truncate history before context overflow | No failed AI requests in extended sessions |
| Lazy market loading | Offset pagination triggered by scroll | Initial page load not blocked by full dataset |
| Preemptive cache population | Cache event on watchlist add | Guaranteed cache hit on next list load |

---

## Deployment

The backend uses a multi-stage Dockerfile. The development stage uses pnpm with hot reload. The production stage runs a pruned build with only runtime dependencies, keeping the image lean.

Docker Compose orchestrates three services: the NestJS API, PostgreSQL 15, and Redis 7. Volume mounts persist database state across restarts. A health check module exposes a readiness endpoint that verifies connectivity to all three services, making it easy to integrate with container orchestration platforms.

The frontend is deployed on Vercel, which handles optimized builds, edge caching of static assets, and serverless execution of the API routes.

---

## Key Engineering Decisions

**Privy over SIWE.** This was the single highest-leverage decision. It let Polysimplr ship as a Web3 product that feels like a Web2 product, and the 1,184-user signup count reflects that the friction of a wallet requirement never blocked anyone.

**RAG over fine-tuning.** Fine-tuning a model on Polymarket data would be expensive and quickly stale. Tavily-powered RAG is cheap, always current, and produces answers the user can verify by following the source links. For a product where trust in the information matters, that transparency is a feature.

**`Promise.allSettled()` for resilience.** Batch operations that use `Promise.all()` treat any failure as a total failure. In a system aggregating data from an external API you do not control, that creates fragile user experiences. `Promise.allSettled()` means one bad market response does not break the watchlist for the other 19 items.

**Modular monolith over microservices.** NestJS's module system gives clean separation of concerns without the operational overhead of separate deployments at this scale. The module boundaries are defined clearly enough that extraction later is straightforward.

---

## What is Next

The foundation supports several planned extensions:

- **Semantic search:** A vector database integration (Weaviate or Pinecone via LangChain) would enable similarity queries like "show me markets similar to this one"
- **Live orderbook updates:** WebSocket support is scaffolded to push real-time price changes to the UI without polling
- **Trade execution:** EIP-712 signature integration with the Polymarket CLOB API, with the portfolio module already in place to track positions
- **Social layer:** Market comments, user following, and reputation scoring

---

## Summary

Polysimplr is a production application with 1,184 registered users built on a full-stack TypeScript architecture. The engineering decisions throughout, from the caching layer to the auth design to the streaming AI pipeline, were made to serve real users rather than demonstrate technical complexity for its own sake.

The problem was that prediction markets are inaccessible. The measure of success is that people are signing up and using the product.
