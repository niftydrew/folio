# Kredentic

### Automated Google Maps Fraud Detection for Businesses

`Next.js 15` `Python` `Supabase` `PostgreSQL` `Playwright` `SerpApi` `Twilio` `RapidFuzz` `TypeScript`

---

## Overview

Kredentic is a B2B SaaS platform that monitors Google Maps 24/7, detects fraudulent business listings impersonating real companies, and alerts owners before customers are defrauded. It is a three-part system: a Python watchtower service that runs scans and scores threats, a Next.js dashboard where business owners manage incidents, and a marketing site that handles lead capture and product communication.

The platform is built for the Ghanaian market, where Google Maps impersonation is an active and growing form of consumer fraud. A scammer creates a listing using a real company's name, logo, and address, but swaps in a different phone number. Customers search for the business, find the fake listing, call the fraudulent number, and are deceived. Kredentic gives the legitimate business the visibility and evidence to catch this and act on it.

---

## The Problem

Google Maps impersonation works precisely because it exploits trust. When a customer sees a business name they recognize, with a legitimate-looking address and photos, they assume the phone number is correct. The scam requires almost no technical skill and is difficult to detect without systematically monitoring the listings that appear when someone searches for your brand.

For a business, the damage is twofold. Customers are defrauded in their name, and the business has no idea it is happening until complaints start coming in weeks later. By then the fake listing has been active for days or weeks, and the business has no evidence, no documentation, and no clear path to getting it taken down by Google.

Kredentic solves this by automating the monitoring, doing the detection, capturing the evidence, and walking the business through the takedown process.

---

## System Architecture

The platform is split into three distinct codebases with clearly separated responsibilities.

```
kredentic-landing-v.0.1.1    Marketing site + lead capture (Next.js 15)
kred-watch                   Watchtower detection engine (Python)
kred-dashboard               Business owner dashboard (Next.js 15)
```

All three share a single Supabase PostgreSQL database. The watchtower writes scan results and incident records. The dashboard reads and acts on them. The landing site handles top-of-funnel lead routing.

### Data Flow

```
Google Maps (via SerpApi)
        |
        v
 Confidence Scoring Engine
 (phone mismatch + name similarity + verification badge)
        |
        v
 Supabase Database
 (incident record created, scan log updated)
        |
        +---------> Playwright screenshot capture
        |           (headless Chromium, uploaded to Supabase Storage)
        |
        +---------> Twilio WhatsApp alert
                    (owner notified with evidence URL)
                            |
                            v
                     Dashboard (real-time via Supabase Realtime)
                     (owner reviews, claims, reports, tracks resolution)
```

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | Next.js 15 + React 19 | Dashboard and marketing site |
| Language | TypeScript 5 (strict) | End-to-end type safety |
| Styling | Tailwind CSS v4 | Component styling |
| Auth | Supabase Auth (OTP) | Passwordless email authentication |
| Database | Supabase PostgreSQL | All persistent data |
| Realtime | Supabase Realtime | Live incident and scan updates |
| Storage | Supabase Storage | Screenshot evidence bucket |
| Detection Engine | Python 3.10+ | Scam detection and scanning loop |
| Maps Data | SerpApi | Google Maps search results |
| Fuzzy Matching | RapidFuzz | Brand name similarity scoring |
| Screenshots | Playwright (Chromium) | Headless evidence capture |
| Notifications | Twilio WhatsApp | Owner alerts |
| Email | Resend | Lead routing and OTP delivery |
| Validation | Zod | Runtime schema validation |
| PDF Export | pdf-lib | Incident evidence report generation |
| Animations | Motion | Landing page interactions |

---

## The Detection Engine

The watchtower (`kred-watch`) is the core of the platform. It is a Python service that loops through every registered business and every active district in the system, queries Google Maps via SerpApi for listings matching the business name, and scores each result for fraud likelihood.

### Confidence Scoring

Each listing is evaluated against three signals, and a score from 0 to 100 is computed:

**Phone number mismatch (+70 points).** The most reliable fraud signal. Kredentic stores every verified phone number associated with a business. If the listing's phone number is not in that set, 70 points are added. If the listing has no phone number at all, 20 points are added. Phone swapping is the primary mechanism of the scam, which is why this signal carries the most weight.

**Name similarity (+20 points).** RapidFuzz's `token_sort_ratio` is used to compare the listing name to the official business name. Token sort ratio normalizes word order before comparing, which handles the common case where a scammer lists "MTN Ghana Accra Central" when the official name is "MTN Ghana." A score of 90 or above on this fuzzy match adds 20 points to the confidence score. This threshold is high enough to exclude generic name overlaps while catching deliberate impersonation.

**Missing verification badge (+10 points).** Google-verified listings display a verification checkmark. Fraudulent listings are almost never claimed and verified because claiming requires the actual business to respond to a Google postcard or phone call. An unverified listing is not proof of fraud on its own, but it is a reliable supporting signal.

A total score of 80 or above triggers a scam incident. The threshold was chosen to minimize false positives: a listing needs the phone number wrong plus either a matching name or a missing badge to cross it.

```python
def calculate_confidence_score(listing, official_name, verified_numbers):
    score = 0

    if listing.phone not in verified_numbers:
        score += 70 if listing.phone else 20

    similarity = rapidfuzz.fuzz.token_sort_ratio(
        normalize(listing.name), normalize(official_name)
    )
    if similarity >= 90:
        score += 20

    if not listing.verified:
        score += 10

    return score  # >= 80 = scam detected
```

### Branch Discovery

The engine also handles a legitimate-but-unknown listing case: a listing that scores below the threshold but does not match any of the business's registered branches. Rather than discarding it, the engine checks whether it matches by normalized name or Google Place ID and, if not, auto-creates it as a pending branch for the owner to review. This turns the scan into a discovery tool for branches the business may not have registered yet, not just a fraud detector.

### Scan Execution

Each scan run creates a `scan_log` record with `status: running` before any queries are made, and updates it to `completed` or `failed` when the loop finishes. This gives the dashboard a reliable record of when the system last checked and what it found. A one-second sleep between district scans prevents SerpApi rate limiting without meaningfully slowing down the overall cycle.

---

## Automated Evidence Collection

When a scam is detected, Kredentic needs to capture proof before the listing is taken down or modified. Playwright handles this automatically.

A headless Chromium instance navigates to the Google Maps place URL for the fraudulent listing, waits 5 seconds for the page to fully render, and takes a full-page screenshot. That screenshot is uploaded to a Supabase Storage bucket and the public URL is attached to the incident record. The WhatsApp alert sent to the business owner includes this URL so they have immediate visual confirmation of what was found.

This matters for the takedown process. Google's report forms ask for evidence, and a timestamped screenshot of the fraudulent listing is the most direct form of proof. Kredentic captures it automatically at the moment of detection, before anything changes.

---

## Database Design

The schema reflects the full lifecycle of a fraud incident and the business context that makes detection possible.

**businesses** stores company identity: name, registration number, official logo, website, and a verification status that gates access to the dashboard.

**verified_contacts** is the ground truth for phone number validation. Each record stores a phone number, the Ghanaian mobile network it belongs to (MTN, Telecel, or AT), whether it is MoMo-enabled, and a label describing its purpose (general inquiry, MoMo payment, delivery hotline, support). This granularity matters: a business might have five phone numbers for different purposes, and the scanner needs to recognize all of them as legitimate.

**official_branches** maps a business to its real physical locations, each tied to a Ghanaian district and optionally to a Google Place ID. When a branch has a confirmed Place ID, the scanner can match against it directly without relying on name similarity alone.

**scam_incidents** is the central table. Each record captures everything about a detected fraudulent listing: the name, phone number, address, and Google Place ID of the fake listing; its coordinates; a link to the listing; the confidence score; the evidence screenshot URL; and the current status in the incident lifecycle.

**scan_logs** tracks every watchtower run, recording when it started, when it finished, how many listings were examined, and how many scams were found. This powers the dashboard's monitoring timeline and gives owners visibility into scan frequency.

**districts** is pre-populated with 22 Ghanaian geographic zones (Accra Central, Kumasi, Tema, and others), each with a priority level that will eventually drive scan frequency. High-priority districts are scanned more often.

---

## Incident Lifecycle

Incidents move through a defined workflow from discovery to resolution:

```
detected -> notified_owner -> reported_to_google -> delisted
```

The dashboard surfaces all four stages and lets owners move incidents through them. The `reported_to_google` status records that the formal takedown request has been submitted. The `delisted` status closes the loop: the fake listing is gone.

### Claim as Legit

False positives are handled through a dedicated feature. If a detected listing turns out to be a legitimate branch the business had not registered, the owner can click "Claim as Legitimate." This action:

1. Creates a new `official_branch` record from the listing's address and coordinates
2. Creates a new `verified_contact` record from the listing's phone number
3. Links the incident to the newly created branch
4. Updates the incident status so it no longer appears in the active threats list

This is a transactional operation. If any step fails, the partial changes are rolled back so the database does not end up in an inconsistent state. After completion, Next.js `revalidatePath` is called to invalidate cached pages that depend on branch and contact counts.

---

## Real-Time Dashboard

The dashboard uses Supabase Realtime to keep the UI current without polling. Supabase's `postgres_changes` channel is subscribed to two tables: `scam_incidents` and `scan_logs`.

When the watchtower creates a new incident, the dashboard receives the event and refreshes the incident list and metrics without a page reload. When a scan is running, the dashboard shows a live green pulsing indicator. When the scan completes, the indicator updates automatically and the scan log reflects the new run.

This is particularly important for the threat intelligence view. The dashboard displays an incident heatmap and running metrics, and owners want those to reflect the current state of their protection, not a snapshot from when they last loaded the page.

---

## Analytics and Metrics

The overview dashboard computes metrics across user-selectable time periods: last week, last month, last quarter, last year, and all time. For each period, the queries run in parallel using `Promise.all()` rather than sequentially, which keeps the response time flat regardless of how many metrics are being computed.

The metrics include total scams detected, incidents resolved, incidents pending, active monitoring districts, and a performance score. The performance score is computed as `(resolved / detected) * 100`, clamped to the 0-100 range, and gives owners a single number representing how effectively they have worked through their incident backlog.

Each metric also carries a delta value comparing the current period to the equivalent prior period, so the dashboard can show whether the threat environment is getting better or worse over time.

---

## Authentication and Authorization

Authentication uses Supabase's OTP email flow. There are no passwords. When a user enters their email on the login page, a one-time link is sent to their inbox. Clicking it confirms the session and redirects to the dashboard.

Access is restricted to an allowlist. Before sending the OTP, the server checks whether the email exists in the `users` table. If it does not, the request is rejected silently. This means the platform is invite-only: no one can self-register without being added to the database first.

Authorization is enforced at the query level. Every data fetch in the dashboard filters by `owner_id = current_user.id`. A business owner can only see their own business's incidents, branches, contacts, and scan logs. This is not a UI restriction that can be bypassed; it is enforced in the server-side action that runs the database query. The Supabase service role key, which bypasses row-level security, is used only in the watchtower backend and never exposed to the browser.

Next.js middleware handles route protection. Any request to a path outside the public allowlist (`/login`, `/auth/confirm`, `/auth/signout`, static assets) is redirected to the login page if no valid session is present.

---

## Landing Page and Lead Pipeline

The landing site handles product communication and lead capture for two conversion paths: demo requests and pilot program applications.

Both forms are protected by three layers of defense. A Zod schema validates the shape and content of every submission before it is processed. A rate limiter allows a maximum of 10 requests per IP per 60-second window, implemented without any external dependency by tracking request timestamps in memory. A honeypot field named `website` is included in the HTML but hidden with CSS. If it is filled in, the form returns a success response without processing the lead, defeating the most common form-filling bots without alerting them that they have been caught.

Leads that pass all three checks are emailed to the team via Resend. The email template HTML-escapes all submitted content before embedding it, preventing injection through form fields.

---

## PDF Evidence Export

Each incident can be exported as a standalone PDF report. The export is generated server-side by a Next.js API route using `pdf-lib`.

The route fetches the full incident record and the associated business details, then fetches the evidence screenshot from Supabase Storage and embeds it as a binary blob into the PDF. The document is formatted with a multi-column layout that includes the incident metadata (scam name, phone number, address, confidence score, detection date, current status) alongside the screenshot. The confidence score is rendered as a human-readable percentage. Status values are formatted from their database enum representation into display-friendly labels.

The completed PDF is returned as a file attachment with a filename of `incident-{id}.pdf`. This gives business owners a professional, shareable document they can attach to a Google report form or send to their legal team.

---

## Ghana-Specific Implementation

Several parts of the system are built specifically for the Ghanaian market rather than being generic.

The district system covers 22 named areas across Ghana, each with region metadata and a priority level. This is not a generic geographic grid: it reflects the actual business distribution in the country, with Accra Central, Kumasi, and Tema as high-priority zones.

The `verified_contacts` schema tracks which Ghanaian mobile network each phone number belongs to: MTN, Telecel, or AT. This matters because Mobile Money (MoMo) is a primary payment method in Ghana, and MoMo-enabled numbers are labelled and tracked separately. A scammer who swaps in a number that does not support MoMo on a listing that should have one is a strong fraud signal that the scoring engine can incorporate.

The contact label system (`general_inquiry`, `momo_payment`, `delivery_hotline`, `support`) reflects the way Ghanaian businesses typically publish multiple numbers for different purposes, and ensures the scanner recognizes all of them as legitimate.

---

## Security Design

The security model was built with the assumption that the platform handles commercially sensitive fraud evidence and that business owners need to trust it completely.

**Passwordless auth** removes the risk of credential stuffing and weak passwords. OTP links expire and cannot be reused.

**Invite-only access** means the attack surface is limited to accounts that have been explicitly provisioned. No registration endpoint exists for an attacker to abuse.

**Server-side authorization** ensures that data access is governed by code the client cannot influence, not by UI guards that can be bypassed.

**API protection on the landing site** combines origin validation, content-type enforcement, rate limiting, and honeypot detection to prevent the lead forms from being spammed or abused.

**RPC and key isolation** keeps the Supabase service role key exclusively in server environments. The dashboard uses the publishable (anon) key in the browser, which is safe to expose. All privileged operations run in server actions or API routes where the service key is never sent to the client.

---

## Key Engineering Decisions

**Confidence scoring over binary rules.** A rule-based system that flags any listing with an unrecognized phone number would produce too many false positives for businesses with multiple branches. The weighted scoring system lets genuine edge cases (a legitimate branch with a new number not yet registered) fall below the threshold, while a true scam with the phone swapped and no verification badge hits 80 or above reliably.

**Fuzzy matching with token sort ratio.** Scammers rarely use the exact official business name. They add city names, change word order, or use abbreviations. `token_sort_ratio` normalizes word order before comparing, making it robust to the reordering tricks that would defeat a simple string comparison.

**Supabase Realtime over polling.** The dashboard is the owner's window into an active threat. Polling on a fixed interval creates an inconsistent experience: sometimes the update comes quickly, sometimes it takes a full interval. Realtime subscriptions deliver the update the moment the database changes, which is the right behavior for a security monitoring tool.

**Playwright for evidence capture.** Screenshots could be taken at any point during a scan, but capturing them via a real browser rendering the actual Google Maps page produces the most credible evidence. The screenshot shows the listing exactly as a customer would see it, which is what matters for a Google report submission.

**Transactional claim-as-legit.** The claim operation touches three tables. Doing it as three sequential operations without rollback would leave the database in a partial state if the second or third step failed. Wrapping it in a transactional pattern with cleanup on failure ensures the system stays consistent even when something goes wrong mid-operation.

---

## What is Next

The platform's current architecture supports several natural extensions. Dynamic scan frequency based on district priority is already modeled in the schema: the `priority_level` column exists, the logic just needs to be wired into the scan loop. Multi-channel notifications (SMS in addition to WhatsApp) are already modeled in `notification_preferences`. Automated Google report submission would close the loop entirely, moving incidents from `reported_to_google` to `delisted` without requiring manual owner action. Expanding beyond Ghana would require adding new district datasets and potentially adjusting the confidence scoring weights for markets where phone-based scams have different patterns.

---

## Summary

Kredentic is a production-ready fraud detection system built around a specific, well-understood problem in a specific market. The technical implementation reflects the requirements of that problem: a confidence scoring engine that handles edge cases rather than simple rules, automated evidence collection that produces court-ready screenshots, a real-time dashboard that gives owners an accurate view of their threat environment, and a security model built around the sensitivity of the data it handles.

The three-codebase architecture keeps concerns cleanly separated without over-engineering the system. The Python watchtower does one thing well. The dashboard gives owners full visibility and control. The landing site handles acquisition. Each part is independently deployable and replaceable, which is the right shape for a product at this stage.

Building a platform that genuinely protects businesses from fraud, in a market where that protection is urgently needed, required thinking carefully about what the real threat looks like, what evidence is actually useful, and what workflow a business owner can realistically follow when they get an alert at 2am. Those product decisions are as much a part of the engineering as the confidence scoring algorithm.
