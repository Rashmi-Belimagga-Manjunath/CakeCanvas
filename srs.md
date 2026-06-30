# Software Requirements Specification

## CakeCanvas AI Chatbot

| Document | Information |
|---|---|
| **Project Name** | CakeCanvas AI Chatbot |
| **Document Type** | Software Requirements Specification (SRS) |
| **Version** | 1.0 |
| **Date** | 2026-06-30 |
| **Status** | Approved |
| **Deployment** | GitHub Pages (static site) |

---

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification defines the functional, non-functional, and behavioral requirements for the CakeCanvas AI Chatbot — a customer-facing conversational agent that pre-qualifies cake orders, validates inspiration images, captures structured requirements, and reduces designer triage workload. The chatbot is deployed as a static website on GitHub Pages with a Cloudflare Workers proxy layer for server-dependent operations.

### 1.2 Scope

The system encompasses:

- A full-screen or embedded chat interface accessible from the CakeCanvas website
- Client-side image quality analysis (blur, resolution, lighting, cropping)
- Server-side vision model integration (via Cloudflare Workers proxy) for semantic image description
- A static knowledge base for FAQs, pricing ranges, dietary information, and policies
- Structured data collection for order requirements (occasion, size, dietary, flavour, date, delivery, budget)
- CRM hand-off via webhook with email confirmation
- Human escalation with context preservation

Out of scope:

- Payment processing
- Inventory management
- Order fulfilment tracking beyond status lookup
- Direct designer-to-customer messaging within the chatbot
- Mobile native application (browser-based only)

### 1.3 Business Problem

Approximately 80% of customers upload blurry, cropped, poorly lit, or low-resolution inspiration images to the CakeCanvas contact form. Designers spend 25% of their working hours triaging these images — accepting, rejecting, or requesting retakes. The back-and-forth occurs over email with 24–48 hour response latency, causing customer enthusiasm to cool and abandonment rates to reach 80%. Additionally, 60% of submitted inquiries lack critical information (dietary requirements, event date, serving size), requiring 2–3 follow-up emails before a designer can quote.

### 1.4 Objectives

| Objective | Metric | Current Baseline | Target |
|---|---|---|---|
| Reduce designer image triage time | Minutes per order on intake | 45 min | 10 min |
| Increase quote-completion rate | % of inquiries that receive a quote | 20% | 50% |
| Improve data completeness at hand-off | % of orders with all required fields | 40% | 95% |
| Reduce first-response time | Time from submission to acknowledgement | 28 hours | <5 min (chatbot) |
| Lower escalation rate | % of conversations escalated to human | — | <20% |
| Maintain image heuristic accuracy | Precision and recall on labelled test set | — | >90% precision, >85% recall |

---

## 2. Company Overview

### 2.1 About CakeCanvas

CakeCanvas is a fictional online bakery specialising in fully customised celebration cakes. The bakery serves customers across a 25-mile delivery radius, offering handcrafted cakes for birthdays, weddings, anniversaries, baby showers, graduations, corporate events, and more. Every cake is made to order by a team of six designers and four bakers.

### 2.2 Mission

To make custom cake ordering as joyful as the celebrations they're made for — by combining artisan craftsmanship with thoughtful customer experience.

### 2.3 Target Customers

- **Primary:** Mothers aged 28–45 planning children's birthday parties (highest volume segment)
- **Secondary:** Engaged couples planning weddings (highest-value segment)
- **Tertiary:** Corporate event coordinators, graduation families, baby shower hosts

All segments share a common profile: time-poor, emotionally invested, non-expert in cake design, and primarily accessing the website via mobile devices (90% of traffic).

---

## 3. Problem Statement

### 3.1 The Image Quality Cascade

When a customer submits a poor-quality inspiration image, the following cascade occurs:

1. **Customer** takes a photo with their phone — often in bad lighting, at night, or as a screenshot of a Pinterest image that was already low-resolution. They upload it via the website contact form, believing they have provided sufficient information.

2. **24–48 hours pass** with no acknowledgement. The customer checks their email repeatedly. Enthusiasm fades. Some begin searching for other bakeries.

3. **Designer** opens the inquiry, sees an unusable image, and must draft a reply requesting a better photo, along with the 5–6 other missing details (size, dietary, date, etc.).

4. **Customer** receives the reply, feels discouraged that their photo was rejected, and may or may not follow up. If they do, the cycle repeats.

5. **Abandonment:** Approximately 80% of inquiries never result in a quote. The bakery has lost a potential order, and the customer has had a negative brand experience.

### 3.2 Information Asymmetry Gaps

Every frustration in the current process traces to one of four gaps:

| Gap | Description | Consequence |
|---|---|---|
| Acknowledgement | Customer doesn't know if the submission was received | Anxiety, distrust, duplicate submissions |
| Expectation | Customer doesn't know what's needed or what's possible | Wrong assumptions about price, timeline, feasibility |
| Interpretation | Designer interprets the customer's description differently | Rework, disappointment, "this isn't what I asked for" |
| Safety | Customer's dietary requirements aren't captured early | Allergic reactions, last-minute recipe changes, cancellations |

The chatbot must close all four gaps before a human designer ever sees the request.

---

## 4. Functional Requirements

### 4.1 FAQ Handling

| ID | Requirement | Priority |
|---|---|---|
| FR-1.1 | The chatbot shall answer the top 8 customer questions from a static knowledge base without human intervention | Critical |
| FR-1.2 | The knowledge base shall be searchable via client-side full-text search (BM25) | Critical |
| FR-1.3 | If the chatbot cannot match a question with >= 0.4 confidence, it shall escalate to a human | High |
| FR-1.4 | Answers to pricing questions shall provide ranges only (e.g. "$180-$350"), never exact quotes | Critical |
| FR-1.5 | Answers to timeline questions shall reference the 21-day standard lead time and flag <10-day requests for escalation | Critical |

Top 8 FAQ mappings:

| Customer Question | Knowledge Base Answer Type |
|---|---|
| "Can you make a cake like this photo?" | Image upload flow + gallery matching |
| "How much does a custom cake cost?" | Price range by size, complexity, and occasion |
| "How far in advance do I need to order?" | 21-day standard; 10–21 day rush (fee applies); <10 day escalation |
| "Do you do eggless/GF/vegan/nut-free?" | Top 4 dietary categories with explanations |
| "Can you deliver to my area?" | Postcode lookup against 25-mile radius list |
| "My party is in 10 days — is that enough?" | Timeline check with rush indicator |
| "What sizes do cakes come in?" | Size chart: 6" (8-10), 8" (12-16), 10" (20-25), multi-tier options |
| "Can I see examples?" | Gallery link + 3 matching portfolio items from tag-based index |

### 4.2 Cake Recommendation

| ID | Requirement | Priority |
|---|---|---|
| FR-2.1 | The chatbot shall recommend cake sizes based on guest count | Critical |
| FR-2.2 | The chatbot shall recommend flavours based on occasion (e.g., wedding: elegant flavours like vanilla bean; birthday: chocolate or funfetti) | High |
| FR-2.3 | The chatbot shall suggest dietary-compatible flavours (e.g., eggless -> Belgian dark chocolate) | High |
| FR-2.4 | The chatbot shall display up to 3 portfolio images matching the customer's style description | Medium |
| FR-2.5 | The chatbot shall offer "Surprise me" as an option for undecided customers | Medium |

### 4.3 Image Upload Guidance

| ID | Requirement | Priority |
|---|---|---|
| FR-3.1 | The chatbot shall accept image uploads via file picker and camera capture | Critical |
| FR-3.2 | The chatbot shall run client-side heuristics on the image: Laplacian variance (blur), resolution check (min 800x600), brightness histogram (underexposure/overexposure), edge-content ratio (cropping detection) | Critical |
| FR-3.3 | The chatbot shall display pass/fail results within 500ms of upload | Critical |
| FR-3.4 | On failure, the chatbot shall provide specific text-based guidance (e.g., "This photo is too dark — try taking it near a window with natural light") and offer retry or skip | Critical |
| FR-3.5 | On pass, the chatbot shall upload the image to R2 object storage via signed URL from Cloudflare Worker | Critical |
| FR-3.6 | The chatbot shall simultaneously send the image to a vision model (GPT-4o mini) for semantic description | High |
| FR-3.7 | While the vision model processes, the chatbot shall continue gathering other requirements (non-blocking) | High |
| FR-3.8 | The chatbot shall present the vision model's description as a question ("It looks like a two-tier cake with fresh flowers — is that right?") and accept corrections | High |

### 4.4 Price Estimation

| ID | Requirement | Priority |
|---|---|---|
| FR-4.1 | The chatbot shall ask the customer for a budget range ($100-$150, $150-$250, $250-$400, $400+, flexible) | Critical |
| FR-4.2 | Based on occasion, size, and dietary selections, the chatbot shall display a typical price range from historical data | Critical |
| FR-4.3 | The chatbot shall never quote an exact price — all pricing language shall use ranges and disclaimers | Critical |
| FR-4.4 | The chatbot shall communicate price-influencing factors (tier count, sugar flowers, hand-painting, delivery distance, rush fees) | Medium |

### 4.5 Delivery Information

| ID | Requirement | Priority |
|---|---|---|
| FR-5.1 | The chatbot shall accept postcode input and check against a predefined delivery zone (25-mile radius) | Critical |
| FR-5.2 | If the address is outside the delivery zone, the chatbot shall escalate to a designer with the customer's contact information | High |
| FR-5.3 | The chatbot shall communicate standard delivery window and any delivery fees if known | Medium |
| FR-5.4 | The chatbot shall capture delivery address as free text and pass to designer | High |

### 4.6 Order Tracking

| ID | Requirement | Priority |
|---|---|---|
| FR-6.1 | The chatbot shall accept a reference number and return order status from the CRM (via Cloudflare Worker proxy) | Medium |
| FR-6.2 | The chatbot shall display the assigned designer's name when available | Medium |
| FR-6.3 | The chatbot shall not modify orders — all modification requests shall escalate to a human | Medium |
| FR-6.4 | If order status is older than 48 hours since last sync, the chatbot shall disclose staleness and offer escalation | Medium |

### 4.7 Allergy Information

| ID | Requirement | Priority |
|---|---|---|
| FR-7.1 | The chatbot shall capture dietary requirements as structured data: eggless, gluten-free, nut-free, vegan (multi-select) | Critical |
| FR-7.2 | For each dietary category, the chatbot shall display an informational tooltip explaining what the bakery can and cannot guarantee | Critical |
| FR-7.3 | If a customer describes a specific allergy rather than a preference (e.g., "I have a peanut allergy"), the chatbot shall escalate to a human designer immediately | Critical |
| FR-7.4 | The chatbot shall include a disclaimer with every dietary selection: "We've noted your requirements. A designer will confirm suitability before production." | Critical |
| FR-7.5 | The chatbot shall not answer questions about cross-contamination risks in the kitchen | Critical |

### 4.8 Refund and Cancellation Policies

| ID | Requirement | Priority |
|---|---|---|
| FR-8.1 | The chatbot shall surface cancellation and refund policy text from the knowledge base when asked | High |
| FR-8.2 | Policy questions shall be answered with exact text from the approved policy document (no paraphrasing) | High |
| FR-8.3 | If a customer expresses intent to cancel, the chatbot shall escalate to a human support agent | Medium |
| FR-8.4 | The chatbot shall not process cancellations or refunds — it shall only communicate policy and escalate | Medium |

### 4.9 Human Escalation

| ID | Requirement | Priority |
|---|---|---|
| FR-9.1 | The chatbot shall escalate to a human in exactly these scenarios: customer explicitly asks to speak to a human; customer mentions a specific allergy; customer describes a structurally dangerous design; customer complains about a previous order; customer requests an order modification; customer is detected as distressed/angry via keyword + sentiment; query confidence below 0.4 threshold; delivery date is <10 days away | Critical |
| FR-9.2 | Escalation shall preserve full conversation context — all collected data, images, and notes shall be passed to the CRM ticket | Critical |
| FR-9.3 | The escalation message shall be warm and seamless: "I've sent everything to Sarah, one of our senior designers. You'll hear within 2 hours." | Critical |
| FR-9.4 | The chatbot shall remain available to the customer after escalation for additional information | High |

---

## 5. Non-Functional Requirements

### 5.1 Performance

| ID | Requirement | Target |
|---|---|---|
| NFR-1.1 | Chat interface initial load time (first paint) | < 2s on 4G |
| NFR-1.2 | Knowledge base search response time | < 100ms |
| NFR-1.3 | Client-side image heuristic execution | < 500ms |
| NFR-1.4 | Vision model description latency (via Cloudflare Worker) | < 5s |
| NFR-1.5 | Total bundle size (gzipped) | < 100KB |
| NFR-1.6 | Time to interactive | < 3s on 4G |
| NFR-1.7 | Lighthouse Performance score | >= 90 |

### 5.2 Usability

| ID | Requirement | Priority |
|---|---|---|
| NFR-2.1 | The chat interface shall follow a WhatsApp-like single-window design | Critical |
| NFR-2.2 | The chatbot shall display typing indicators during processing | High |
| NFR-2.3 | Messages requiring action shall use quick-select buttons where possible, not free text | Critical |
| NFR-2.4 | The chatbot shall support undo/back within the current conversation | Medium |
| NFR-2.5 | The chatbot shall save conversation state to localStorage on every message | Critical |
| NFR-2.6 | Returning customers shall see a continuation prompt ("Welcome back! We were discussing your birthday cake...") | Medium |
| NFR-2.7 | The chatbot shall have no timeout — customers can leave and return hours later | High |

### 5.3 Accessibility

| ID | Requirement | Standard |
|---|---|---|
| NFR-3.1 | All image quality feedback shall be provided as text first, visual supplement second | WCAG 2.1 AA |
| NFR-3.2 | The chat interface shall be fully navigable via keyboard | WCAG 2.1 AA |
| NFR-3.3 | All interactive elements shall have visible focus indicators | WCAG 2.1 AA |
| NFR-3.4 | Screen readers shall announce new messages automatically (aria-live region) | WCAG 2.1 AA |
| NFR-3.5 | Colour alone shall not be used to convey status (e.g., pass/fail shall include text and icon) | WCAG 2.1 AA |
| NFR-3.6 | The chat interface shall support high-contrast mode | WCAG 2.1 AA |
| NFR-3.7 | Touch targets shall be at least 44x44px | WCAG 2.1 AA |
| NFR-3.8 | A `<noscript>` fallback shall display contact email and phone number for users with JavaScript disabled | Critical |
| NFR-3.9 | Lighthouse Accessibility score | >= 95 |

### 5.4 Responsiveness

| ID | Requirement | Target |
|---|---|---|
| NFR-4.1 | The chat interface shall render on viewports from 320px to 1920px width | Critical |
| NFR-4.2 | On mobile (<= 768px), the chat pane shall occupy the full viewport | Critical |
| NFR-4.3 | On desktop (> 768px), the chat pane shall be constrained to a maximum width of 480px, centred or positioned as a bottom-right overlay | Critical |
| NFR-4.4 | The camera capture button shall invoke the native camera on mobile devices | High |
| NFR-4.5 | Portrait and landscape orientations shall both be supported | Medium |

### 5.5 Security

| ID | Requirement | Rationale |
|---|---|---|
| NFR-5.1 | No API keys or secrets shall be embedded in client-side code | All server communication shall go through Cloudflare Worker as authentication gate |
| NFR-5.2 | Image uploads shall use time-limited signed URLs from Cloudflare Worker | Prevents unauthorised uploads to R2 |
| NFR-5.3 | The Cloudflare Worker shall validate request origin via CORS and reject non-whitelisted domains | Prevents third-party abuse |
| NFR-5.4 | No PII shall be stored in localStorage beyond the current session | Customer data lives in CRM only |
| NFR-5.5 | The submission payload shall be validated server-side (Cloudflare Worker) before forwarding to CRM | Prevents injection and malformed data |
| NFR-5.6 | The chatbot shall not render unsanitised user input as HTML | Prevents XSS |
| NFR-5.7 | All communication to Cloudflare Workers shall be over HTTPS | In transit security |

### 5.6 GitHub Pages Compatibility

| ID | Requirement | Rationale |
|---|---|---|
| NFR-6.1 | The application shall be fully static — no server-side rendering, no backend API routes | GitHub Pages serves only static files |
| NFR-6.2 | All routing shall be hash-based (#/chat) | No server-side URL rewriting |
| NFR-6.3 | The knowledge base shall be a single static JSON file fetched at application load | Cannot query a database |
| NFR-6.4 | The Service Worker shall cache all static assets for offline capability | GitHub Pages has no dynamic response control |
| NFR-6.5 | The Cloudflare Worker (separate deployment) shall handle all server-dependent operations | API proxy, signed URLs, vision proxy, submission webhook |
| NFR-6.6 | Deployment shall use GitHub Actions to build and deploy to the gh-pages branch | Standard static site deployment |

---

## 6. User Personas

### Persona 1: Priya (Primary)

| Attribute | Detail |
|---|---|
| **Name** | Priya Sharma |
| **Age** | 34 |
| **Occupation** | Marketing Manager |
| **Device** | iPhone 12, mobile data (often 4G at home) |
| **Tech comfort** | Moderate — uses Instagram, WhatsApp, online shopping |
| **Scenario** | Planning her daughter's 5th birthday party. Has a vague idea of a unicorn cake but no photo. Stressed, browsing on her phone at 10pm after the kids are asleep. |
| **Goal** | Get a quick answer on whether the bakery can do unicorn cakes, roughly how much, and if 2 weeks is enough notice. |
| **Frustration** | Doesn't want to fill out a long form. Wants a human-like conversation. |
| **Quote** | "I just want to know if this is possible before I get my hopes up." |

### Persona 2: James & Emma (Secondary)

| Attribute | Detail |
|---|---|
| **Name** | James and Emma Chen |
| **Age** | 29 / 28 |
| **Occupation** | Software Engineer / Teacher |
| **Device** | Various — research together on a laptop, but Emma primarily uses an Android phone |
| **Tech comfort** | High (James), Moderate (Emma) |
| **Scenario** | Planning their wedding cake. Have a specific Pinterest board with 15 reference images. Need eggless options for Emma's mother. |
| **Goal** | Submit all inspiration images, confirm eggless is possible, get a price range for a 3-tier cake for 100 guests. |
| **Frustration** | Fear that the designer won't understand their vision from the photos. Want confirmation that details are captured correctly. |
| **Quote** | "I've spent hours on Pinterest. I need to know someone actually sees what I see." |

### Persona 3: Margaret (Tertiary)

| Attribute | Detail |
|---|---|
| **Name** | Margaret Okonkwo |
| **Age** | 52 |
| **Occupation** | Office Manager (corporate event planning) |
| **Device** | Samsung Galaxy A14 (budget Android) on 3G |
| **Tech comfort** | Low — uses phone for calls, texts, and basic web browsing |
| **Scenario** | Ordering a cake for the company's 10th anniversary. Has a logo image that needs to be reproduced in icing. |
| **Goal** | Upload the logo, explain what's needed, get a quote for 40 servings. |
| **Frustration** | Small screen, slow internet, easily confused by complex interfaces. Needs simple language and large buttons. |
| **Quote** | "I'm not good with computers. Just tell me what you need from me, one thing at a time." |

---

## 7. User Stories

### Phase 1 — Core Flow (Critical)

| ID | Story | Acceptance Criteria |
|---|---|---|
| US-1 | As a customer, I want to select my occasion from a list so that the chatbot can tailor its questions. | 8 occasion buttons displayed; selection sets context for all subsequent questions |
| US-2 | As a customer, I want to upload a photo and get instant feedback on its quality so that I know if my image is usable. | Heuristics run in <500ms; pass/fail displayed with text explanation; retry or skip available |
| US-3 | As a customer, I want to specify dietary requirements so that the bakery knows my restrictions from the start. | Multi-select for eggless, GF, nut-free, vegan; info tooltip per option; disclaimer shown |
| US-4 | As a customer, I want to enter my delivery postcode and learn if the bakery delivers to my area. | Postcode checked against zone list; in-zone = continue; out-of-zone = escalate with context |
| US-5 | As a customer, I want to see a summary of everything I've told the chatbot so that I can confirm it's correct. | Structured card view displayed; "Looks good" and "Make a change" options; change returns to specific step |
| US-6 | As a customer, I want to receive a confirmation with a reference number so that I know my request was received. | Confirmation displayed in chat; email sent within 60 seconds; reference number included |
| US-7 | As a designer, I want to receive a complete structured brief so that I don't need to chase missing information. | All fields populated; image attached; dietary info highlighted; no 0-confidence fields |

### Phase 2 — Intelligence (High)

| ID | Story | Acceptance Criteria |
|---|---|---|
| US-8 | As a customer, I want the chatbot to describe what it sees in my photo so that I can correct misinterpretations. | Vision model description presented as question; correction free-text field available |
| US-9 | As a customer, I want to see examples of similar cakes the bakery has made so that I can confirm my style choice. | 3 portfolio images displayed; tagged by style, colour, occasion; clickable for larger view |
| US-10 | As a customer, I want flavour suggestions based on my dietary selection so that I don't have to guess what's available. | Dietary-compatible flavours listed; most popular option highlighted |
| US-11 | As a customer, I want to see a green/yellow/red indicator for my event date so that I know if timing is tight. | Date picker greys out <10 day dates; <21 days shows yellow warning; >21 days shows green |

### Phase 3 — Delight (Medium)

| ID | Story | Acceptance Criteria |
|---|---|---|
| US-12 | As a returning customer, I want to enter my reference number and see my order status so that I don't need to call. | Reference number accepted; status displayed; designer name shown if assigned |
| US-13 | As a customer, I want a mood board emailed to me so that I can visualise what we discussed. | Email contains photo, description, flavour selections, and 3 portfolio examples |
| US-14 | As a customer, I want to see a subtle celebration animation when I mention my occasion so that the experience feels special. | Animation fires once per conversation on first occasion selection |

---

## 8. Customer Journey

```
┌─────────────────────────────────────────────────────────────────────┐
│                        STAGE 1: ENTRY                               │
│                                                                     │
│  Customer visits CakeCanvas website                                 │
│  -> Clicks "Chat with us" button (bottom-right, fixed position)     │
│  -> Chatbot opens with greeting message                             │
│  -> "Hi there! I'm the CakeCanvas assistant.                        │
│     What's the occasion?"                                           │
│  -> Quick-select buttons:                                           │
│     [Birthday] [Wedding] [Anniversary] [Baby Shower]                │
│     [Graduation] [Corporate] [Cupcakes] [Other]                     │
└───────────────────────┬─────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     STAGE 2: EXCITEMENT                             │
│                                                                     │
│  Customer selects "Birthday"                                        │
│  -> Chatbot responds with occasion-based animation (subtle)         │
│  -> "How many people?" [numeric input]                              │
│  -> "Do you have an inspiration photo?"                             │
│     [Upload from gallery] [Take a photo] [Skip]                     │
└───────────────────────┬─────────────────────────────────────────────┘
                        │
          ┌─────────────┼─────────────┐
          │             │             │
          ▼             ▼             ▼
┌─────────────────┐ ┌──────────┐ ┌───────────────────────────────────┐
│  UPLOAD / TAKE  │ │  SKIP    │ │    MODEL PROCESSING (parallel)     │
│                 │ │          │ │                                   │
│  Client heuristics│ Chatbot  │ │  Image uploaded to R2             │
│  run in Web Worker│ moves to │ │  Vision model called via Worker   │
│  (<500ms)        │ structured│ │  Model returns description         │
│                 │ │ questions│ │  (chatbot continues gathering      │
│  PASS ────────┐ │ │          │ │   requirements during wait)        │
│  FAIL ────┐   │ │ │          │ │                                   │
└───────────┼───┘ └──────────┘ └───────────────┬───────────────────┘
            │                                   │
            ▼                                   │
┌───────────────────────┐                      │
│  FAILURE GUIDANCE     │                      │
│                       │                      │
│  "This photo is a bit │                      │
│   blurry. Try resting │                      │
│   your phone on a     │                      │
│   table."             │                      │
│                       │                      │
│  [Retake] [Skip]      │                      │
└───────────────────────┘                      │
            │                                   │
            └───────────┬───────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────────┐
│                STAGE 3: REQUIREMENTS GATHERING                       │
│                                                                     │
│  -> "What size?" [6"/8"/10"/Two-tier/Three-tier/Surprise me]        │
│  -> "Any dietary needs?" [Eggless/GF/Nut-free/Vegan/None]           │
│     (multi-select with info tooltips + disclaimer)                  │
│  -> "Favourite flavour?" [Vanilla/Chocolate/Red Velvet/             │
│     Fruit/Coffee/Custom/Surprise me]                                │
│  -> "What's your event date?" [Date picker]                         │
│     (if <10 days: warning + escalation flag)                        │
│  -> "Delivery postcode?" [Short text]                               │
│     (if outside zone: escalation)                                   │
│  -> "Budget range?" [$100-150/$150-250/$250-400/$400+/Flexible]     │
│     (chatbot shows typical range for selection)                     │
└───────────────────────┬─────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────────┐
│               STAGE 4: VISION CONFIRMATION (if photo)               │
│                                                                     │
│  -> "I had our AI assistant look at your photo.                     │
│     Here's what I noticed:                                          │
│     'A two-tier white cake with fresh flowers on top,               │
│      likely for a spring birthday'                                  │
│     Does that sound right?"                                         │
│     [Looks good] [Actually, it's more like...]                      │
│                                                                     │
│  If correction: free text appended to designer brief                │
└───────────────────────┬─────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────────┐
│              STAGE 5: SUMMARY & CONFIRMATION                        │
│                                                                     │
│  -> "Here's what I've got for you:"                                 │
│     [Card-style summary with all collected fields]                  │
│                                                                     │
│  -> "Does everything look right?"                                   │
│     [Yes, submit!] [Make a change]                                  │
│                                                                     │
│  If change: return to specific stage (not restart)                  │
└───────────────────────┬─────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────────┐
│                  STAGE 6: HAND-OFF                                  │
│                                                                     │
│  -> "Perfect! I've sent this to our design team."                   │
│  -> "You'll hear from a designer within 24 hours."                  │
│  -> "Your reference number is #CC-1234."                            │
│  -> "Want a copy? Enter your email:" [optional]                     │
│                                                                     │
│  Behind the scenes:                                                 │
│  - Cloudflare Worker validates and forwards to CRM                  │
│  - Confirmation email sent (<60s)                                   │
│  - Mood board email sent (<1 hour)                                  │
│  - Designer notified with structured brief                          │
└───────────────────────┬─────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────────┐
│              ESCALATION PATH (any point in flow)                    │
│                                                                     │
│  Trigger detected (allergy, anger, <10 days, low confidence, etc.)  │
│                                                                     │
│  -> "This sounds like something my human colleagues should handle.  │
│     I've sent them everything you've told me.                       │
│     You'll hear from a designer within 2 hours.                     │
│     Is there anything else I can help with in the meantime?"        │
│                                                                     │
│  Full conversation context preserved in CRM ticket.                 │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 9. Conversation Flows

### 9.1 Happy Path (Photo Upload, All Requirements Complete)

```
Bot: Hi there! I'm the CakeCanvas assistant. What's the occasion?
User: Birthday
Bot: A birthday! [subtle animation]
Bot: How many people will the cake serve?
User: 12
Bot: Got it. Do you have an inspiration photo?
User: [Uploads photo]
Bot: [500ms] Great photo — the lighting looks lovely!
      I'm saving that now. Let's keep going while it processes.
Bot: What size cake are you thinking?
User: 8-inch two-tier
Bot: Any dietary requirements? (Multi-select)
User: Eggless
Bot: Noted! Our most popular eggless flavour is Belgian Dark Chocolate.
      Want me to include that as a preference?
User: Yes please
Bot: Amazing. What's the event date?
User: [Selects date > 21 days away]
Bot: May 15th looks good — plenty of time!
Bot: What's your delivery postcode?
User: SW1A 1AA
Bot: We deliver to that area!
Bot: What's your rough budget? (Quick-select)
User: $150-$250
Bot: For an 8" two-tier birthday cake with eggless option, most
      customers spend $180-$280. A designer will confirm the exact price.
Bot: [Vision model completes] I ran your photo through our AI
      assistant. Here's what I noticed: "A two-tier white cake with
      fresh flowers and gold accents." Does that sound right?
User: Looks good
Bot: Here's your summary:
     [Structured card with all fields]
     Does everything look right?
User: Yes, submit!
Bot: Perfect! Your reference is #CC-1234. A designer will reach out
      within 24 hours. Want an email copy?
User: [Provides email or skips]
Bot: You're all set! If you think of anything else, just type here.
```

### 9.2 Image Failure Path

```
Bot: Do you have an inspiration photo?
User: [Uploads dark, blurry photo]
Bot: Thanks for sharing that! A couple of things:
     1. The photo is a bit dark — try taking it near a window
        with natural light.
     2. It's also a little blurry — resting your phone on a
        table or using both hands can help.
     Want to try again, or shall we move on without a photo?
User: [Retakes photo, passes heuristics]
Bot: Much better! The details are clear now.
```

### 9.3 Allergy Escalation Path

```
Bot: Any dietary requirements?
User: I have a severe peanut allergy
Bot: Thank you for telling me. For specific allergies, I want
     to make sure you get accurate information directly from
     our kitchen team. I've noted this and will pass it to a
     designer who can discuss our procedures in detail.
     You'll hear from them within 2 hours. Let's continue
     with the other details in the meantime?
```

### 9.4 Out-of-Zone Escalation Path

```
Bot: What's your delivery postcode?
User: EX4 3AY
Bot: It looks like that's a bit far from our bakery (we deliver
     within 25 miles). I'll pass your information to a designer
     who can discuss options — we occasionally accommodate
     special delivery arrangements. A designer will be in touch
     within 2 hours. Let's finish up the other details!
```

### 9.5 Returning Customer Path

```
User: I have a reference number
Bot: Welcome back! Please enter your reference number.
User: CC-1234
Bot: Found you! Your order #CC-1234 is with designer Sarah.
     She's working on your quote. Anything else I can help
     with while you wait?
User: When will I hear back?
Bot: Sarah typically sends quotes within 24 hours of receiving
     a request. If it's been longer, I can flag it for you.
```

---

## 10. Knowledge Base Design

### 10.1 Structure

The knowledge base is a static JSON file (~500KB compressed to ~50KB via brotli) shipped with the static site and loaded at application initialisation.

```json
{
  "version": "1.0",
  "lastUpdated": "2026-06-30",
  "faq": [
    {
      "id": "faq-001",
      "question": "How much does a custom cake cost?",
      "answer": "Prices vary based on size, complexity, and occasion. Most single-tier cakes range $100-$250. Two-tier cakes range $180-$400. Complex designs, sugar flowers, and hand-painting may increase the price. A designer will confirm the exact quote.",
      "tags": ["price", "cost", "pricing", "how much", "budget"],
      "category": "pricing",
      "requiresExact": false
    }
  ],
  "dietaryInfo": [
    {
      "id": "diet-001",
      "name": "Eggless",
      "description": "Our eggless cakes use plant-based binders and alternative leavening. Most flavours available.",
      "popularFlavours": ["Belgian Dark Chocolate", "Vanilla Bean", "Lemon", "Carrot"],
      "disclaimer": "We use dedicated equipment for eggless preparation, but our kitchen handles eggs. Please confirm with your designer if cross-contamination is a concern."
    }
  ],
  "sizeChart": [
    { "name": "6-inch", "serves": "8-10", "description": "Perfect for intimate celebrations" },
    { "name": "8-inch", "serves": "12-16", "description": "Standard size for most parties" },
    { "name": "10-inch", "serves": "20-25", "description": "Generous portions for larger groups" },
    { "name": "Two-tier", "serves": "20-35", "description": "Combination of two sizes" },
    { "name": "Three-tier", "serves": "40-60", "description": "Statement piece for grand occasions" }
  ],
  "deliveryZone": ["postcode_prefixes": ["SW1", "SW2", "SW3", "W1", "W2", "NW1", ...]],
  "pricingRanges": [
    { "occasion": "birthday", "size": "single", "range": "$100-$180" },
    { "occasion": "birthday", "size": "two-tier", "range": "$180-$300" }
  ],
  "policies": {
    "cancellation": "Orders cancelled more than 14 days before the event receive a full refund. 7-14 days: 50% refund. Less than 7 days: non-refundable.",
    "delivery": "Standard delivery within 25-mile radius. Delivery fee based on distance. Minimum order $50 for delivery.",
    "rushFee": "Orders placed 10-21 days before event are subject to a $50 rush fee."
  },
  "portfolioIndex": {
    "styles": {
      "unicorn": ["cake-042", "cake-089", "cake-113"],
      "rustic": ["cake-023", "cake-067", "cake-091"],
      "modern": ["cake-034", "cake-078", "cake-102"]
    }
  }
}
```

### 10.2 Search Engine

MiniSearch (client-side full-text search library, ~15KB gzipped) indexes all knowledge base entries at load time. Configuration:

- **Tokenisation:** English-language stemmer
- **Boost fields:** question (x5), tags (x3), category (x2), answer (x1)
- **Threshold:** Minimum 0.4 BM25 score to answer; below threshold escalates
- **Fuzzy matching:** Enabled with prefix length 2 for typo tolerance

### 10.3 Content Governance

- All knowledge base content must be approved by the Bakery Domain Expert before deployment
- Policy text (cancellation, refunds, delivery) must match the legal-approved wording exactly — no paraphrasing
- Pricing ranges must be reviewed quarterly against actual order data
- Portfolio tags must be maintained by designers as new cakes are completed

---

## 11. System Architecture

### 11.1 High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                    GITHUB PAGES (Static Hosting)                  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Static Site (Vite + Preact)                  │   │
│  │                                                          │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐      │   │
│  │  │ Chat UI  │  │  State   │  │   Knowledge       │      │   │
│  │  │ (Preact) │  │ Machine  │  │   Base            │      │   │
│  │  │          │  │ (XState) │  │   (MiniSearch)    │      │   │
│  │  └──────────┘  └──────────┘  └──────────────────┘      │   │
│  │                                                          │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │         Web Worker (Image Analysis)               │   │   │
│  │  │  - Laplacian variance (blur)                     │   │   │
│  │  │  - Resolution check                              │   │   │
│  │  │  - Brightness histogram                          │   │   │
│  │  │  - Crop detection                                │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  │                                                          │   │
│  │  ┌──────────┐  ┌──────────┐                             │   │
│  │  │  Service │  │  local   │                             │   │
│  │  │  Worker  │  │ Storage  │                             │   │
│  │  │ (offline)│  │ (session)│                             │   │
│  │  └──────────┘  └──────────┘                             │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
                           │
                           │ HTTPS
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                 CLOUDFLARE WORKERS (API Proxy)                   │
│                                                                  │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────────────┐   │
│  │  POST      │  │  POST      │  │  POST /submit            │   │
│  │  /signed-  │  │  /describe │  │  (validate + forward     │   │
│  │  url       │  │            │  │   to CRM via webhook)    │   │
│  │            │  │  Forwards  │  │                          │   │
│  │  Returns   │  │  image to  │  │  ┌──────────────────┐    │   │
│  │  time-     │  │  GPT-4o    │  │  │ Submission Queue │    │   │
│  │  limited   │  │  mini via  │  │  │ (Durable Objects)│    │   │
│  │  R2 URL    │  │  OpenAI   │  │  └──────────────────┘    │   │
│  └────────────┘  └────────────┘  └──────────────────────────┘   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  POST /track (order status lookup from CRM)              │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                             │
│                                                                  │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────────────┐   │
│  │  R2 Object │  │  OpenAI    │  │  CRM (e.g., HubSpot/     │   │
│  │  Storage   │  │  GPT-4o    │  │  Make.com webhook)       │   │
│  │  (images)  │  │  mini API  │  │                          │   │
│  └────────────┘  └────────────┘  └──────────────────────────┘   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  SendGrid (Transactional Email)                          │   │
│  │  - Confirmation to customer                              │   │
│  │  - Notification to designer                              │   │
│  │  - Mood board email                                      │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

### 11.2 Component Descriptions

| Component | Technology | Responsibility |
|---|---|---|
| Chat UI | Preact + TypeScript | Renders message list, input controls, quick-select buttons, image uploader, typing indicator |
| State Machine | XState 5 | Manages conversation state transitions; each message maps to a deterministic state node |
| Knowledge Base | MiniSearch (BM25) | Client-side full-text search across FAQ, policies, dietary info, portfolio tags |
| Image Analysis | Web Worker (Canvas API) | Blur, resolution, brightness, cropping heuristics; runs off main thread |
| Local Storage | Browser localStorage | Session persistence across page refreshes; submission retry queue |
| Service Worker | Workbox | Static asset caching for offline capability; PWA support |
| Cloudflare Worker | JavaScript (ES modules) | Auth gate for all server operations: signed URLs, vision proxy, submission webhook, status lookup |
| R2 Object Storage | Cloudflare R2 | Image storage; time-limited signed URLs for upload |
| Vision Model | OpenAI GPT-4o mini | Semantic description of uploaded inspiration image |
| CRM | Webhook endpoint (customer-defined) | Receives structured order data; triggers email notifications |

### 11.3 Data Flow: Image Upload and Analysis

```
1. User selects/ captures image
2. Browser reads file into ArrayBuffer via FileReader
3. ArrayBuffer passed to Web Worker
4. Web Worker decodes image to ImageData via Canvas API
5. Worker computes:
   - Laplacian variance (OpenCV.js edge detection port)
   - Width x height vs minimum threshold (800x600)
   - Mean pixel brightness (0-255 scale, target: 40-220)
   - Edge-to-total-pixel ratio (crop detection)
6. Worker returns result object: { pass: bool, failures: string[] }
7. Main thread updates UI with pass/fail + text guidance
8. If pass:
   a. Main thread requests signed URL from Cloudflare Worker
   b. Cloudflare Worker validates origin, generates R2 signed URL (5 min expiry)
   c. Browser uploads image directly to R2 via PUT to signed URL
   d. Main thread fires vision request (image URL -> Cloudflare Worker -> OpenAI)
   e. Cloudflare Worker returns description { description: string, tags: string[] }
   f. Description stored in conversation state, presented to user at appropriate step
9. If fail + retry chosen: return to step 1
10. If fail + skip chosen: mark photo as skipped, continue with structured questions
```

### 11.4 Data Flow: Submission

```
1. User confirms summary
2. Browser constructs submission payload:
   {
     referenceNumber: "CC-1234",
     sessionId: "abc-123-def",
     occasion: "birthday",
     guestCount: 12,
     size: "8-inch two-tier",
     dietary: ["eggless"],
     flavour: "Belgian Dark Chocolate",
     eventDate: "2026-06-15",
     deliveryPostcode: "SW1A 1AA",
     deliveryAddress: "123 Main St, London",
     budget: "150-250",
     imageUrl: "https://r2.cakecanvas.dev/images/abc-123.jpg",
     imageDescription: "Two-tier white cake with fresh flowers and gold accents",
     customerEmail: "customer@example.com",
     customerName: "Priya Sharma",
     customerPhone: "+44...",
     notes: ""
   }
3. Browser sends POST /submit to Cloudflare Worker
4. Worker validates payload schema
5. Worker forwards to CRM webhook endpoint
6. CRM creates ticket, triggers email notifications:
   - Customer confirmation with reference number
   - Designer notification with structured brief
7. Worker returns { success: true, referenceNumber: "CC-1234" }
8. Browser stores reference number in localStorage
9. If submission fails (network, rate limit):
   a. Payload saved to localStorage queue
   b. Retry with exponential backoff (max 5 attempts)
   c. "Saved offline" banner displayed to user
```

### 11.5 Technology Stack Summary

| Layer | Technology |
|---|---|
| Frontend Framework | Preact 10 + TypeScript 5 |
| Build Tool | Vite 6 |
| State Machine | XState 5 |
| Client Search | MiniSearch 6 |
| Styling | CSS Custom Properties + mobile-first design |
| Image Analysis | Canvas API in Web Worker |
| Testing | Vitest + Playwright + axe-core |
| Static Hosting | GitHub Pages |
| API Proxy | Cloudflare Workers (free tier) |
| Image Storage | Cloudflare R2 |
| Vision AI | OpenAI GPT-4o mini |
| Email | SendGrid (via CRM webhook) |
| Analytics | Plausible (self-hosted or Cloudflare) |
| CI/CD | GitHub Actions |
| Offline | Workbox Service Worker |

---

## 12. Risks

| ID | Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|---|
| R-01 | Image heuristics produce false positives (reject good images) | Medium | High | Calibrate on 200-image labelled dataset in CI; allow manual override ("It's better in person"); precision gate >90% | AI Architect |
| R-02 | Cloudflare Worker reaches free-tier rate limit (100k req/day) | Medium | High | Implement localStorage retry queue; exponential backoff; monitor usage; upgrade to $5 plan if >80k req/day sustained | Frontend Engineer |
| R-03 | Vision model describes image incorrectly, causing misinterpretation | Medium | Medium | Always phrase as question, never assertion; user confirms or corrects; correction appended to brief; designer reviews all descriptions | AI Architect |
| R-04 | GitHub Pages downtime or build failure | Low | Medium | Cloudflare always-on DNS; static site works offline via Service Worker; build status monitoring in CI | Frontend Engineer |
| R-05 | Customer enters conflicting dietary info (e.g., vegan + eggless) | Medium | Low | Designer reviews all submissions before production; chatbot flags conflicts with informational message | Bakery Domain Expert |
| R-06 | Accessibility audit reveals WCAG failures | Low | High | axe-core in CI; manual VoiceOver audit before launch; high-contrast and keyboard testing mandatory in QA | UX Designer |
| R-07 | Escalation rate exceeds 20% threshold | Medium | High | Tune BM25 intent mapping with real conversation data; add more state transitions for common off-script paths; delay launch until threshold met | All |
| R-08 | Abandoned conversations with partial data stored only in localStorage | Medium | Medium | Implement re-engagement prompt on return; periodic localStorage cleanup; CRM capture at earliest meaningful point (not just at final submit) | Product Manager |
| R-09 | LocalStorage quota exceeded on low-end devices | Low | Medium | Cap stored conversation history to last 50 messages; clear submission queue after successful delivery | Frontend Engineer |
| R-10 | Designer receives poorly structured brief due to chatbot misinterpretation | Medium | Medium | Track correction rate metric; if >15% require substantial designer edits, improve intent mapping and vision prompt | AI Conversation Designer |

---

## 13. Success Metrics

### 13.1 Business Metrics

| Metric | Baseline | 3-Month Target | 6-Month Target | Measurement Method |
|---|---|---|---|---|
| Quote-completion rate | 20% | 50% | 65% | CRM: inquiries vs quotes sent |
| Revenue from chatbot-assisted orders | 0% | 15% of total | 35% of total | CRM: orders with chatbot reference |
| Average order value (chatbot-assisted) | — | $180 | $200 | CRM: order value for chatbot-sourced |
| Customer acquisition cost (chatbot channel) | — | 30% lower than email | 50% lower | Marketing attribution |
| Google rating | 4.1 | 4.3 | 4.5 | Google Business Profile |

### 13.2 Customer Experience Metrics

| Metric | Baseline | Target | Measurement Method |
|---|---|---|---|
| CSAT (post-conversation) | — | >= 4.5 / 5.0 | In-chat survey after submission/ escalation |
| Image first-pass acceptance rate | — | >= 70% | Heuristics result logging |
| Average conversation duration | — | < 5 minutes | Chat event logging (anonymised) |
| Abandonment rate | 80% | < 20% | Conversations started vs completed |
| NPS (new order flow) | 35 | 55 | Post-delivery survey |
| Re-contact rate | — | < 5% | CRM: chatbot-completed inquiries that later contact support |

### 13.3 Operational Metrics

| Metric | Baseline | Target | Measurement Method |
|---|---|---|---|
| Designer time on intake (per order) | 45 min | 10 min | Time tracking (designer self-report + CRM audit) |
| First-response time (chatbot) | — | < 5 min | Chat event logging |
| First-response time (human escalation) | 28 hours | < 2 hours | CRM: escalation to first human reply |
| Escalation rate | — | < 20% | Conversations escalated / total conversations |
| Data completeness at hand-off | 40% | 95% | CRM: required fields populated |
| Correction rate (designer edits brief) | — | < 15% | Designer survey after each chatbot-sourced order |

### 13.4 Technical Metrics

| Metric | Target | Measurement Method |
|---|---|---|
| Lighthouse Performance | >= 90 | Lighthouse CI on every PR |
| Lighthouse Accessibility | >= 95 | Lighthouse CI + axe-core |
| Lighthouse Best Practices | >= 90 | Lighthouse CI |
| Image heuristic precision | > 90% | Labelled test set in CI |
| Image heuristic recall | > 85% | Labelled test set in CI |
| Cloudflare Worker uptime | >= 99.9% | Cloudflare dashboard monitoring |
| Conversation continuity (localStorage) | 100% | Test: refresh mid-conversation, verify state restored |

### 13.5 Launch Gates

The chatbot shall not progress from staged rollout to 100% traffic until ALL of the following are met:

1. Quote-completion rate > 50% (measured over 200 conversations)
2. Designer triage-time reduction > 60% (measured over 20 orders)
3. Escalation rate < 20% (measured over 200 conversations)
4. Image heuristic precision > 90% (measured against labelled test set)
5. Image heuristic recall > 85% (measured against labelled test set)
6. Lighthouse Performance >= 90
7. Lighthouse Accessibility >= 95
8. Lighthouse Best Practices >= 90
9. Zero critical or high-severity accessibility violations (axe-core)
10. All 8 escalation triggers tested and verified

---

## 14. Future Improvements

### 14.1 Short-Term (Post-Launch, Months 3-6)

| Improvement | Rationale | Effort |
|---|---|---|
| Expand dietary categories to halal, dairy-free, keto | Growing demand from customer feedback; top feature request | Medium |
| A/B test image guidance copy to minimise retake rate | Improve first-pass image acceptance above 70% | Low |
| Fine-tune vision model on CakeCanvas-specific cake styles | Improve description accuracy for pastry-specific terminology | High |
| Abandoned conversation re-engagement via email | Recover 10-15% of abandoned inquiries | Medium |
| Post-order feedback survey flow | Collect NPS and CSAT data at scale | Low |

### 14.2 Medium-Term (Months 6-12)

| Improvement | Rationale | Effort |
|---|---|---|
| Multi-language support (Spanish, then Punjabi) | 15% of target audience prefers Spanish; Punjabi is #2 in delivery zone | High |
| Automated quote generation for standard designs | Reduce designer workload further for repeatable cake types | High |
| Chatbot-to-designer hand-off with live preview | Designer dashboard shows chatbot conversation replay | High |
| WhatsApp integration | 40% of customers initiate contact via WhatsApp; meeting them on their channel | High |
| Payment deposit collection post-quote | Reduce abandoned quotes by requiring 25% deposit to lock date | Medium |

### 14.3 Long-Term (Year 2+)

| Improvement | Rationale |
|---|---|
| AI-powered design mockup generation | Generate a visual mockup from description + image before designer creates final design |
| Customer account portal with order history | Self-service for returning customers |
| Inventory-aware lead time estimation | Real-time baker capacity for dynamic delivery date promises |
| Voice interface integration | Hands-free ordering via voice assistants |
| Predictive occasion reminders | "It's been a year since your last order — want another?" based on CRM data |

### 14.4 Never Build

The following shall never be implemented in the chatbot per the unanimous agreement of all stakeholders:

- Exact price quoting (always ranges + designer confirmation)
- Allergen safety or cross-contamination advice (always escalate)
- Structural engineering feasibility (always escalate to pastry chef)
- Colour matching guarantees
- Competitor comparisons
- Order modification without human involvement
- Full order cancellation processing

---

## Document Approvals

| Role | Name | Date | Signature |
|---|---|---|---|
| Product Manager | (PM) | 2026-06-30 | Approved |
| Bakery Domain Expert | (BDE) | 2026-06-30 | Approved |
| Customer Support Manager | (CSM) | 2026-06-30 | Approved |
| UX Designer | (UXD) | 2026-06-30 | Approved |
| AI Conversation Designer | (AICD) | 2026-06-30 | Approved |
| Marketing Manager | (MM) | 2026-06-30 | Approved |
| AI Architect | (AIA) | 2026-06-30 | Approved |
| Frontend Engineer | (FE) | 2026-06-30 | Approved |
| QA Engineer | (QA) | 2026-06-30 | Approved |

---

*This SRS synthesises outputs from the technical architecture discussion (agent-discussion.md) and the business strategy discussion (strategy-discussion.md). All requirements trace to agreements documented in those discussions.*
