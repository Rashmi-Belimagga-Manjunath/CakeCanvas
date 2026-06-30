# CakeCanvas AI Chatbot — Octopus Agent Discussion

**Project:** AI-powered pre-qualification & inspiration-image chatbot for CakeCanvas
**Date:** 2026-06-30
**Facilitator:** Octopus Orchestrator

---

## Participants

| Agent | Role |
|---|---|
| **Product Manager** | Business goals, priorities, stakeholder management |
| **Bakery Domain Expert** | Customer behaviour, bakery operations, domain constraints |
| **AI Architect** | Model selection, RAG pipeline, image analysis, cost/ latency |
| **UX Designer** | Conversation flows, mobile-first, accessibility, error recovery |
| **Frontend Engineer** | GitHub Pages architecture, static site constraints, build tooling |
| **QA Engineer** | Testing strategy, edge cases, performance, risk mitigation |

---

## Round 1 — Opening Statements

### Product Manager

> **"We lose 4 out of 5 potential orders because of poor-quality inspiration images. Customers take a photo on their phone, upload it to our contact form, and then wait 24–48 hours for a designer to tell them it's unusable. By then, enthusiasm has cooled and many never reply. We need a chatbot that rejects bad images instantly, guides the customer to capture a better one, and captures structured requirements — all before a human designer ever gets involved."**

**Key business goals:**
- Reduce designer time spent on image triage by 70%
- Increase quote-completion rate from 20% to 60%
- Collect structured requirements (size, flavour, dietary, event date, delivery) before hand-off
- Zero additional cloud cost — must run on GitHub Pages
- Ship in 6 weeks

### Bakery Domain Expert

> **"Our customers are not tech-savvy. They're mums planning a child's first birthday, or couples organising a wedding — they're stressed and time-poor. A blurry photo isn't laziness; it's bad lighting in a kitchen at 10pm, or a screenshot from Pinterest that was already low-res. The chatbot needs to be forgiving but firm: tell them *why* the image is bad and give them a concrete fix. Also, 30% of our orders involve dietary restrictions (eggless, gluten-free, nut-free) — the chatbot must capture these because a designer re-quoting after discovery is a huge friction point."**

**Customer pain points:**
1. No feedback loop — upload a photo and hear nothing for days
2. No guidance — "I want a cake like this" is vague, but customers don't know what designers need
3. Dietary requirements discovered too late
4. Delivery date conflicts — customer assumes 2 weeks is enough, but we need 21 days for custom fondant work
5. Abandonment during multi-email thread

### AI Architect

> **"We cannot run inference on GitHub Pages — no server, no API keys in client-side code. Every model call must go through a proxy or be done via inference APIs with token-based auth. For image quality assessment, I recommend a two-stage approach: client-side heuristics (blur detection via Laplacian variance, resolution check, brightness histogram) for instant rejection, then a server-side vision model (GPT-4o or Claude 3.5 Sonnet via a lightweight Cloudflare Worker proxy) for semantic description. The RAG pipeline for knowledge retrieval (flavours, pricing, policies) must be client-side — embed text chunks as JSON and use BM25 or a tiny TF-IDF index that ships with the static site."**

**Architecture constraints:**
- No server = no session state. Use `localStorage` with a session ID.
- No native file system. Images must be handled client-side via `FileReader` + Canvas.
- Model inference requires a proxy — Cloudflare Workers (free tier) as auth gate.
- RAG must be fully client-side (MiniSearch or Lunr.js) — ~500KB compressed.
- Image upload to object storage (R2 or Cloudflare Images) with signed URLs.

### UX Designer

> **"The chatbot must feel like a helpful bakery assistant, not a form. Conversations should be guided but not rigid. We start with 'What's the occasion?' — a single, warm question. Then we branch. If they mention a photo, we guide image capture with real-time feedback. If they skip the photo, we ask structured questions instead. Mobile is primary — 90% of our traffic is on phones. The entire flow must work in a WhatsApp-like single-window chat interface. Accessibility: all image feedback must have non-visual alternatives (text descriptions of what's wrong). Error states must be conversational, not technical."**

**User journey (happy path):**
1. Customer clicks "Chat with us" → chatbot opens
2. "What's the occasion?" → "Birthday"
3. "Got an inspiration photo? Snap one or upload." → Customer takes photo in-browser
4. Instant feedback: "Great lighting! But the cake is a bit far away — could you zoom in?" OR "This photo is too blurry. Try holding your phone steady and tapping the screen to focus."
5. "What size? Any dietary needs? When's the party?"
6. Summary + "We'll be in touch within 24 hours with a quote."
7. Structured data sent to CRM via webhook (Cloudflare Worker).

### Frontend Engineer

> **"GitHub Pages serves only static files — no server-side rendering, no API routes, no backend. This means: (1) the chatbot UI is a vanilla JS or Preact SPA, (2) all routing is hash-based, (3) the knowledge base is a static JSON blob fetched at load time, (4) image uploads go directly from the browser to R2 via a signed URL obtained from a Worker. I recommend a Preact + TypeScript build with Vite. Total bundle target: under 100KB gzipped. The conversation engine is a state machine — every message maps to a node in a directed graph. This makes testing trivial because state transitions are deterministic."**

**Architecture decisions:**
- Build tool: Vite + Preact + TypeScript
- State management: XState (lightweight state machine) — not Redux
- Styling: CSS custom properties + mobile-first design system
- Image handling: Canvas API for client-side analysis
- Storage: `localStorage` for session persistence
- Knowledge retrieval: MiniSearch (client-side full-text search, ~15KB)
- Hosting: GitHub Pages with custom domain + Cloudflare DNS
- API proxy: Cloudflare Workers (free tier: 100k requests/day)
- Analytics: Plausible (privacy-friendly, script loads from GitHub Pages)
- CI/CD: GitHub Actions → build → deploy to `gh-pages` branch

### QA Engineer

> **"Our biggest risk is silent failure — the chatbot says 'I'll pass this along' but the data never reaches the CRM. Every submission must have an end-to-end confirmation loop. I also worry about the image quality heuristic producing false positives/negatives — we need a labelled test set of at least 200 images (good, blurry, dark, cropped, low-res). The state machine approach is great for testing: we can write unit tests for every transition. For accessibility, we must test with VoiceOver, keyboard-only navigation, and high-contrast mode. Mobile testing on 3-year-old Android devices is critical because that's our actual user base."**

**Testing strategy:**
- Unit tests: Vitest for state machine transitions and utility functions
- Image heuristic tests: 200-image benchmark suite in CI
- Integration tests: Playwright for full conversation flows
- Accessibility: axe-core + manual VoiceOver audit
- Performance: Lighthouse CI with 90+ scores
- E2E submission test: verify Cloudflare Worker receives correct payload
- Regression: screenshot comparison for UI changes
- Load test: 50 concurrent users against the Worker (artillery)

---

## Round 2 — Debate

### AI Architect → Frontend Engineer

> **"Preact is fine, but why a state machine instead of a more flexible intent-based NLP approach? If we use a simple classifier (even a few dozen if-else rules keyed off keywords), we can handle unexpected customer inputs more gracefully. A fixed state graph will feel robotic when customers go off-script."**

### Frontend Engineer → AI Architect

> **"An NLP classifier introduces non-determinism into the conversation flow. A state machine guarantees every path is defined, tested, and accounted for. We can still handle off-script input by having a 'free text' state that uses the client-side BM25 index to map utterances to the closest intent — but the conversation scaffolding remains deterministic. If the customer says something we truly can't map, we fall back to 'I'm not sure — let me connect you with a designer' and escalate. That's safer than a black-box classifier hallucinating a response."**

### UX Designer → AI Architect

> **"The two-stage image approach (client heuristics + server vision model) creates latency. If the user uploads an image on a slow 3G connection, they'll wait for the heuristics check, then wait again for the vision model. Why not do both in parallel, or let the user continue filling in details while the vision model processes?"**

### AI Architect → UX Designer

> **"We can parallelise: the client heuristics run instantly (sub-100ms) and display a pass/fail badge. Simultaneously, we upload the image to R2 and fire the vision model request. While the model runs, the chatbot asks the remaining questions (size, dietary, date). By the time the user finishes answering, the vision model's description is ready and we can confirm: 'I can see you're going for a pastel-coloured two-tier cake with fresh flowers — is that right?' This keeps the conversation flowing without dead air."**

### Bakery Domain Expert → Product Manager

> **"Six weeks is aggressive. The dietary requirements branching alone is a minefield — nut-free prep, eggless recipes, halal gelatin, etc. If we get this wrong and a customer with an allergy receives bad advice, that's a legal risk. We need a subject-matter expert review of the dietary knowledge base before launch."**

### Product Manager → Bakery Domain Expert

> **"Agreed. But we scope the dietary handling to the top 4 categories (eggless, gluten-free, nut-free, vegan) and explicitly disclaim: 'We've noted your requirements and a designer will confirm suitability before production.' No medical or safety advice — just data collection. The legal team has already signed off on the disclaimer language."**

### QA Engineer → All

> **"I have a concern about the fallback — 'I'll connect you with a designer.' If the chatbot escalates too eagerly, we've just added an extra step instead of removing one. We need a metric: escalation rate. If >20% of conversations escalate, the chatbot is failing. That should be a launch-blocking criterion."**

### Product Manager → QA Engineer

> **"Good point. I'll add escalation rate (<20%) to the launch checklist alongside quote-completion rate (>50%) and average designer-triage-time reduction (>60%). We gate the launch on all three."**

### UX Designer → Frontend Engineer

> **"Accessibility: if image quality feedback is visual only ('Your photo is blurry — see the red indicator'), we exclude blind and low-vision users. Every image quality check must produce a text explanation that screen readers can announce: 'The photo appears blurry. The camera may have moved while taking the picture.' Also, the canvas-based image analysis must have a fallback for users who disable JavaScript, though given this is a chatbot, JS is required — but we should show a graceful degradation message."**

### Frontend Engineer → UX Designer

> **"Agreed. Every feedback message will be text-based first, visual as supplement. The image analysis runs in a Web Worker so the main thread stays responsive. For JS-disabled users, we'll server-render a static message: 'Our chatbot requires JavaScript. Please enable it or email us at hello@cakecanvas.com.' We can do this with a `<noscript>` tag in the HTML shell."**

---

## Round 3 — Risk Analysis & Mitigation

| Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|
| Image heuristics reject good images (FP) | Medium | High (frustration) | Calibrate on 200-image labelled dataset; allow manual override ("It's better in person") | AI Architect |
| Cloudflare Worker hits free-tier limit | Medium | High (submission lost) | Queue submissions in `localStorage` and retry; show "Saved offline" confirmation | Frontend Engineer |
| GitHub Pages downtime | Low | Medium | Cloudflare always-on DNS + CNAME fallback; static site works offline via Service Worker | Frontend Engineer |
| Customer enters conflicting dietary info | Medium | Medium | Designer reviews all submissions; chatbot flags conflicts ("You selected vegan and dairy — these are compatible, noted!") | Bakery Domain Expert |
| Accessibility audit fails | Low | High (legal risk) | Audit in sprint 3; fix before launch; axe-core in CI | UX Designer |
| Escalation rate >20% | Medium | High (product fails) | Tune BM25 intent mapping; add more state transitions for common off-script paths; delay launch until <20% | All |
| Vision model describes image incorrectly | Medium | Medium | Always phrase as question ("Is this a two-tier cake?"), never assertion; user confirms or corrects | AI Architect / UX Designer |

---

## Round 4 — Trade-off Reconciliation

| Tension | Resolution | Vote |
|---|---|---|
| State machine vs NLP | **Hybrid**: XState for scaffolding, MiniSearch BM25 for free-text intent mapping, deterministic fallback | Unanimous |
| Image analysis: client-only vs full AI | **Two-stage**: client heuristics for instant pass/fail, parallel vision model for semantic description | Unanimous |
| Dietary: comprehensive vs v1 scope | **Top 4 categories only** (eggless, GF, nut-free, vegan) with strong disclaimers; expand post-launch | Unanimous |
| Session state: localStorage vs cookies | **localStorage** (larger quota, no auto-expiry); session ID synced to submission payload for CRM dedup | Unanimous |
| Mobile-first vs desktop parity | **Mobile-first**; desktop uses single-column constrained-width layout (max 480px chat pane) | Unanimous |
| Free-tier Workers vs paid plan | **Free tier**; implement localStorage retry queue for rate-limit resilience; upgrade to $5 plan if traffic exceeds 80k req/day | Unanimous |

---

## Round 5 — Agreed Implementation Plan

### Phase 1 — Foundation (Sprint 1, Days 1–7)

1. **Repository setup**
   - Create `cakecanvas-chatbot` repo
   - Vite + Preact + TypeScript scaffold
   - GitHub Pages workflow (`.github/workflows/deploy.yml`)
   - Configure custom domain + Cloudflare DNS
   - Base CSS design system (custom properties, mobile-first breakpoints)

2. **Conversation engine**
   - XState state machine with all happy-path states (occasion → photo → requirements → summary → submit)
   - MiniSearch knowledge base (flavours, dietary categories, pricing ranges, policies)
   - BM25 intent mapper for free-text handling
   - Fallback escalation transition

3. **HTML shell**
   - Static landing page with chatbot launcher
   - `<noscript>` fallback message
   - Service Worker for offline capability
   - Manifest.json for PWA install prompt

### Phase 2 — Image Pipeline (Sprint 2, Days 8–14)

4. **Client-side image analysis (Web Worker)**
   - Laplacian variance (blur)
   - Resolution check (min 800×600)
   - Brightness histogram (underexposed / overexposed)
   - Cropping detection (edge-content ratio)
   - Text-based feedback generation for each failure mode

5. **Upload pipeline**
   - Cloudflare Worker: `POST /signed-url` → returns R2 signed URL
   - Client-side upload directly to R2 via `fetch` with signed URL
   - Cloudflare Worker: `POST /describe` → forwards image to GPT-4o mini, returns description
   - Progress indicator while upload/analysis runs

6. **Conversation hook**
   - Wire state machine to image analysis results
   - Branch: pass → continue, fail → guidance + retry, skip → structured questions

### Phase 3 — Submission & CRM (Sprint 3, Days 15–21)

7. **Submission endpoint**
   - Cloudflare Worker: `POST /submit`
   - Validates payload (occasion, image URL or description, size, dietary, date, contact)
   - Forwards to CRM (email via SendGrid API or webhook to Maker)
   - Returns confirmation token
   - Client stores token in `localStorage` as proof of submission

8. **Admin notification**
   - Designer receives structured email with image, description, and all fields
   - Clear CTA: "Reply to this email to contact the customer"
   - Automated acknowledgement email to customer with order reference

9. **Error recovery**
   - `localStorage` submission queue with retry (exponential backoff, max 5 retries)
   - "Saved offline" banner if submission fails
   - Manual retry button

### Phase 4 — Quality & Testing (Sprint 4, Days 22–28)

10. **Image benchmark suite**
    - 200 labelled images (50 good, 50 blurry, 50 dark, 25 cropped, 25 low-res)
    - CI job runs heuristics against every PR
    - Precision/recall gates: >90% precision, >85% recall

11. **Test automation**
    - Vitest: state machine transitions, MiniSearch queries, utility functions
    - Playwright: full conversation flows, mobile viewport, slow network simulation
    - axe-core: accessibility regression in CI
    - Lighthouse CI: performance budget (90+ all categories)

12. **Manual QA**
    - VoiceOver audit (macOS Safari)
    - Keyboard-only navigation
    - High-contrast mode
    - 3-year-old Android device (Chrome on Moto G6 or similar)
    - Slow 3G throttle test

### Phase 5 — Launch Preparation (Sprint 5, Days 29–35)

13. **Content finalisation**
    - Bakery Domain Expert reviews all knowledge-base entries
    - Legal review of dietary disclaimers
    - Copywriting pass on all chatbot messages (tone: warm, helpful, concise)

14. **Analytics instrumentation**
    - Plausible: conversation start, completion, abandonment, escalation, image failure types
    - No PII in analytics

15. **Staged rollout**
    - Week 1: internal team (5 users)
    - Week 2: friendly customers (50 users)
    - Week 3: 10% of traffic via feature flag
    - Week 4: 100% rollout if all three launch criteria met

### Launch Criteria

| Metric | Target |
|---|---|
| Quote-completion rate | >50% |
| Designer triage-time reduction | >60% |
| Escalation rate | <20% |
| Image heuristic precision | >90% |
| Image heuristic recall | >85% |
| Lighthouse Performance | ≥90 |
| Lighthouse Accessibility | ≥95 |
| Lighthouse Best Practices | ≥90 |

### Post-Launch (Sprint 6+)

- Expand dietary categories based on usage data
- A/B test image guidance copy
- Vision model fine-tuning on CakeCanvas-specific cake styles
- Multi-language support (Spanish #1 by volume)
- Abandoned-conversation re-engagement via email

---

## Sign-off

| Agent | Status |
|---|---|
| Product Manager | ✅ Approved |
| Bakery Domain Expert | ✅ Approved |
| AI Architect | ✅ Approved |
| UX Designer | ✅ Approved |
| Frontend Engineer | ✅ Approved |
| QA Engineer | ✅ Approved |

> *The plan above reflects the unanimous agreement of all six agents after three rounds of structured debate and one round of trade-off reconciliation. All dissenting positions and their resolutions are documented in Round 4.*
