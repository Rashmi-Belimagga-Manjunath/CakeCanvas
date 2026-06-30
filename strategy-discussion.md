# CakeCanvas Chatbot — Business Strategy & Customer Experience

**Topic:** Prioritising customer needs, conversation design, and delight
**Date:** 2026-06-30
**Facilitator:** Octopus Orchestrator

---

## Participants

| Agent | Role |
|---|---|
| **Product Manager** | Roadmap ownership, trade-offs, business case |
| **Bakery Domain Expert** | Cake operations, real customer stories, what's feasible |
| **Customer Support Manager** | Front-line complaints, recurring frustrations, team capacity |
| **UX Designer** | Emotional journey, friction points, accessibility |
| **AI Conversation Designer** | Tone, dialogue structure, fallback strategy, personality |
| **Marketing Manager** | Brand voice, competitive differentiation, funnel conversion |

---

## Round 1 — Understanding the Customer

### 1. Most Frequent Customer Questions

**Customer Support Manager:**

> *"I pulled the last 500 support tickets. Here is the ranked breakdown:"*

| Rank | Question | % of Tickets |
|---|---|---|
| 1 | "Can you make a cake like this photo?" (with blurry/screenshot image) | 34% |
| 2 | "How much does a custom cake cost?" | 22% |
| 3 | "How far in advance do I need to order?" | 14% |
| 4 | "Do you do eggless/gluten-free/vegan/nut-free?" | 11% |
| 5 | "Can you deliver to my area?" | 8% |
| 6 | "My party is in 10 days — is that enough time?" | 6% |
| 7 | "What sizes do cakes come in?" | 3% |
| 8 | "Can I see examples of your past work?" | 2% |

**Bakery Domain Expert:**

> *"Worth adding: question #1 is almost always accompanied by a bad photo. The customer thinks 'I've shown you what I want, why can't you just tell me yes or no?' The photo is their question. The subtext is: 'Validate that my idea is feasible and within budget.' They don't want a quote — they want permission to be excited."*

**AI Conversation Designer:**

> *"That's critical framing. The chatbot's primary job isn't information retrieval. It's emotional validation followed by expectation-setting. The conversation equation is: Validate excitement --> Guide toward usable input --> Set clear expectations --> Collect structured data --> Hand off safely."*

---

### 2. What Frustrates Customers During Cake Ordering

**Customer Support Manager:**

> *"I'll rank these by the intensity of the emotion, not just frequency:"*

| Frustration | Emotion | Frequency |
|---|---|---|
| "I sent a photo and heard nothing for 3 days" | Anxiety -> Resentment | Very High |
| "I told the designer I need eggless and they quoted a recipe with eggs" | Anger + Fear | Medium (but highest churn) |
| "I asked for a quote and got 20 follow-up questions over email" | Exhaustion | High |
| "The price doubled from what I expected" | Distrust | High |
| "I placed the order and nobody confirmed receipt" | Anxiety | Medium |
| "I was told 10 days is enough, then at 7 days they said it's not" | Panic -> Anger | Low (but explosive) |
| "I described a design and the designer interpreted it completely differently" | Disappointment | Medium |

**UX Designer:**

> *"The pattern is clear: information asymmetry causes anxiety. The customer doesn't know what the bakery needs, and the bakery doesn't validate what it's received. Every frustration traces back to one of four gaps:*

> 1. Acknowledgement gap — 'Did they get my message?'
> 2. Expectation gap — 'How much? How long? What's possible?'
> 3. Interpretation gap — 'Did they understand my idea?'
> 4. Safety gap — 'Did they hear my dietary needs?'

> *The chatbot must close all four before hand-off."*

**Marketing Manager:**

> *"Frustration #5 — no confirmation — is the cheapest to fix and the most damaging to our brand. A customer who doesn't get a confirmation email will leave a 1-star review saying 'Scam — they took my money and disappeared.' We must send an automated confirmation within 60 seconds of submission. This alone will move our Google rating from 4.1 to 4.5 within 3 months. I'm willing to bet the roadmap on it."*

---

## Round 2 — Automation Boundaries

### 3. What Should Be Automated

**AI Conversation Designer:**

> *"I propose three tiers of automation:"*

| Tier | Scope | Automation |
|---|---|---|
| **Tier 1 — Full bot** | Photo intake + feedback, occasion, size, dietary, date, delivery area check, budget range, flavour preferences | 100% chatbot, no human |
| **Tier 2 — Bot + review** | Design feasibility check ("Can you do a 3-tier gravity-defying cake?"), price range estimation, timeline check | Chatbot gathers info, designer reviews in <2 hours |
| **Tier 3 — Human only** | Allergen cross-contamination questions, very complex structural designs, customer complaints, order modifications | Immediate escalation |

**Product Manager:**

> *"I'd push Tier 2 harder. We can train the chatbot to answer 'Can you do X?' by matching against a gallery of past work with similar tags. If we've built a gravity-defying cake before, the chatbot says 'Yes! Here's one we made earlier. A designer will confirm details.' If we haven't, it says 'We haven't attempted that specific design, but our designers love a challenge — let me pass this to them.' That keeps 70% of Tier 2 in the bot."*

**Bakery Domain Expert:**

> *"Agreed, but with a caveat: no automated pricing quotes. Cake pricing is complex — tier count, sugar flowers, hand-painting, delivery distance, rush fees. If the chatbot quotes $200 and the designer quotes $350, the customer feels cheated. The chatbot should give a range — '$180-$350 depending on complexity' — and the designer confirms the exact price."*

**Customer Support Manager:**

> *"That's smart. Current reality: 40% of my team's time is spent on 'Can I see the menu?' and 'What's the price for a birthday cake?' If the chatbot handles those with ranges, I can reassign two support staff to handling escalated design consultations — which actually generate revenue."*

---

### 4. What Must Always Escalate to a Human

**All agents submitted their non-negotiable escalation triggers:**

| Trigger | Why | Proposed by |
|---|---|---|
| Customer explicitly asks to speak to a human | Autonomy violation to refuse | All (unanimous) |
| Customer mentions a specific allergy (not just preference) | Liability — must be designer-verified | Bakery Domain Expert |
| Customer describes a cake that sounds structurally dangerous | "A 6-tier cake on a single dowel" — safety issue | Bakery Domain Expert |
| Customer complains about a previous order | Bot cannot repair trust; only a human can | Customer Support Manager |
| Customer requests an order modification (change date, design, delivery) | Too many variables; bot would likely make an error | Customer Support Manager |
| Customer is clearly distressed or angry (detected by keyword + sentiment) | Bot empathy has limits; escalation prevents brand damage | AI Conversation Designer |
| Customer asks a question the BM25 index scores below 0.4 confidence | Hallucination risk is too high | AI Conversation Designer |
| Customer's delivery date is <10 days away (rush override requires manager approval) | Promising impossible timelines is the #1 cause of escalations | Product Manager |

**UX Designer:**

> *"We should make escalation feel seamless, not like a failure. The transition: 'This sounds like a great question for Sarah, one of our senior designers. I've sent her everything you've told me — you'll hear from her within 2 hours, and she'll have your photo ready on her screen. I'll stay here if you think of anything else.' No 'I'm sorry, I can't help with that.' The bot serves as the warm introduction."*

---

## Round 3 — Brand & Personality

### 5. CakeCanvas Personality

**Marketing Manager:**

> *"Our brand voice today is 'warm, premium, approachable.' We're not a supermarket bakery and we're not a Michelin-star patisserie. We're the bakery you'd drive 20 minutes for because they remember your name and your kid's favourite flavour. The chatbot must sound like a person who works at that bakery."*

**AI Conversation Designer:**

> *"I propose this personality framework:"*

| Dimension | Choice | Example |
|---|---|---|
| Warmth | High | "Oh, a unicorn cake for a 5th birthday? This is going to be fun!" |
| Formality | Low-Medium | "Got a photo? Snap one and I'll take a look." (not: "Please upload a reference image") |
| Enthusiasm | Genuine, not overdone | "That sounds lovely!" not "OMG that's AMAZING!!!" |
| Honesty | Radical | "I can't give you an exact price, but similar cakes have ranged $180-$250. A designer will confirm." |
| Patience | Unlimited | No timeouts, no "Please hurry." Repeat/rephrase rather than scold. |
| Self-awareness | Present | "I'm not a designer, so I'll pass the tricky part to a human. But I can help with the rest!" |

**UX Designer:**

> *"Critical: the personality must be consistent across all channels — chatbot, email, phone. If the chatbot is warm and the email is corporate, the customer notices the disconnect. I recommend writing a one-page voice-and-tone guide that applies to every touchpoint. The chatbot is the customer's first impression of CakeCanvas's personality. If we nail this, we increase quote-completion rate before a single line of code is changed."*

**Customer Support Manager:**

> *"From my team: please, no jokes. We've seen chatbots try humour and it backfires 80% of the time when the customer is stressed. Warm = yes. Funny = risky. Stick to 'warm + helpful + honest.' If the customer makes a joke, acknowledge it with a smile, but don't initiate."*

---

### 6. Reducing Designer Workload

**Product Manager:**

> *"Let's quantify the current workload so we know what we're reducing:"*

| Activity | Current % of Designer Time | Target After Chatbot |
|---|---|---|
| Image triage (accept/reject/ask for retake) | 25% | 5% |
| Answering "How much?" emails | 15% | 2% |
| Gathering missing requirements (dietary, size, date) | 20% | 5% |
| Checking delivery area | 5% | 1% |
| Actual design planning | 25% | 45% |
| Customer communication during planning | 10% | 10% (but higher quality) |

**Bakery Domain Expert:**

> *"The real win isn't the 25% to 5% in image triage. It's that designers currently context-switch 12-15 times per day between customer emails and design work. Each switch costs 15 minutes of mental ramp-up. If the chatbot batches structured requests and the designer gets one well-formatted brief per customer, the cognitive load drop is enormous. I'd estimate 30% effective capacity increase even if total hours stay the same."*

**Customer Support Manager:**

> *"There's also a second-order effect: fewer angry customers. Right now, 15% of our tickets start with 'I sent an email 4 days ago and nobody replied.' Those calls take 15 minutes of apology + de-escalation before we even address the request. If the chatbot acknowledges within 60 seconds and provides a submission token, those calls disappear entirely."*

---

### 7. Measuring Success

**Marketing Manager:**

> *"I need three tiers of metrics — business, experience, and operational:"*

**Business metrics (board-level):**

| Metric | Baseline | 3-Month Target | 6-Month Target |
|---|---|---|---|
| Quote-completion rate | 20% | 50% | 65% |
| Revenue from chatbot-assisted orders | — | 15% of total | 35% of total |
| Average order value (chatbot-assisted) | — | $180 | $200 |
| Customer acquisition cost (chatbot channel) | — | 30% lower than email | 50% lower |

**Customer experience metrics:**

| Metric | Baseline | Target |
|---|---|---|
| CSAT (post-conversation survey, 1-5) | — (new) | >= 4.5 |
| Image retake rate | — | <= 30% |
| Average conversation time | — | < 5 minutes |
| Abandonment rate | — | < 20% |
| NPS (new order flow) | 35 | 55 |

**Operational metrics:**

| Metric | Baseline | Target |
|---|---|---|
| Designer time on intake (per order) | 45 min | 10 min |
| First-response time | 28 hours | <5 min (chatbot) + <2 hours (human if escalated) |
| Escalation rate | — | < 20% |
| Data completeness at hand-off | 40% | 95% (all fields filled) |

**UX Designer:**

> *"I'd add one more: re-contact rate. Of customers who complete the chatbot flow, how many need to email support again before placing the order? If it's >10%, the hand-off is incomplete and we're just shifting work from designers to support. Target: <5%."*

**AI Conversation Designer:**

> *"And correction rate — how often does the designer change the chatbot's description of the customer's request? If the designer edits the design brief significantly, the chatbot failed to capture intent. Target: <15% of hand-offs require substantial correction."*

---

## Round 4 — Delight & Guardrails

### 8. Delightful Features

**Marketing Manager:**

> *"Delight is table stakes. Our competitors' websites have contact forms that feel like filing taxes. If we can make the customer smile once during the conversation, we win their loyalty. Here's my ranked wishlist:"*

| Feature | Effort | Impact | Notes |
|---|---|---|---|
| Occasion-based greeting animations | Low | High | "A birthday!" with a subtle confetti burst on the chat. Only on first message. |
| Photo quality feedback with specific guidance | Medium | Very High | "Try holding the phone sideways (landscape) — cakes photograph better!" Shows customer we care, not just gatekeeping. |
| Inspiration gallery within chat | Medium | High | After customer describes style, chatbot shows 3 matching past cakes: "Something like this?" |
| "Saved your spot" countdown | Low | Medium | "Great news — your submission is in the queue. Our next available designer will pick it up within 2 hours. You're #3 in line." |
| Delivery date confidence indicator | Low | Medium | "May 15th looks good! We have capacity. A designer will confirm." / "May 10th is tight — that's only 8 days out. Might need a rush fee." |
| Dietary-friendly flavour suggestions | Medium | Medium | "You said eggless — our most popular eggless flavour is Belgian Dark Chocolate with raspberry. Want me to include that as a preference?" |
| Post-submission cake mood board email | High | Very High | Automated email with their photo, description, flavour choices, and 3 example designs from our portfolio. |

**Customer Support Manager:**

> *"The mood board email would dramatically reduce misinterpretation disputes. Half of our 'it came out wrong' complaints start with 'I don't remember what I asked for.' If we send them a visual summary they can correct within 24 hours, we prevent rework."*

**Bakery Domain Expert:**

> *"Countdown / queue position is risky — what if the designer gets sick and the queue stalls? I'd rather say 'A designer will review your request within 2 hours' than give a queue number we can't guarantee."*

**Product Manager:**

> *"Compromise: show queue position only when there are >3 people ahead, and add a caveat: 'Times are estimates and may change.' That's upfront and honest."*

---

### 9. What the Chatbot Must Never Guess

**All agents were asked: what must the chatbot never, under any circumstances, attempt to answer?**

| Topic | Rationale | Consequence of getting it wrong |
|---|---|---|
| Exact pricing | Too many variables; customer will hold the bot to any number quoted | Lost trust, re-quote friction, possible lost order |
| Allergen safety (e.g. "Is your kitchen nut-free?") | Liability issue; only the production team can confirm current practices | Medical emergency, lawsuit, brand destruction |
| Structural engineering advice | The chatbot is not a pastry chef | Cake collapses, event ruined, liability |
| "Can you match this exact colour?" | Colour calibration varies by screen; designer needs to see in person | Customer expects perfect match, disappointed |
| Promising a specific delivery window | Logistics have variables outside chatbot's knowledge | Late delivery, angry customer |
| "Is this design possible?" without designer review | Only a designer can assess structural and artistic feasibility | Over-promising leads to cancellations or rushed work |
| Comparison with competitors | No reliable data; opinion only | Legal risk, unprofessional |
| Order status if >48 hours old | Status may have changed since last sync | Incorrect info erodes trust |

**AI Conversation Designer:**

> *"The rule of thumb: if the answer could vary based on information the chatbot doesn't have, or if getting it wrong could cause real harm, the chatbot says: 'That's a great question for our team. I've noted it and a designer will address it when they reach out.' No improvisation. No educated guesses."*

**Product Manager:**

> *"I want this list printed and pinned to the wall of the development room. Every new feature request gets checked against this list. If it touches any of these topics, the feature lives in Tier 3 (human-only)."*

---

## Round 5 — The Final Customer Journey

### 10. Complete Customer Journey Map

**UX Designer led the creation of this agreed journey:**

```
STAGE 1: ENTRY
─────────────────────────────────────────────────────────
Touchpoint:    Website -> "Chat with us" button (bottom-right)
Customer mood: Curious, maybe overwhelmed by choices
Chatbot opens: "Hi there! I'm the CakeCanvas assistant.
               What's the occasion?" + quick-select buttons
               (Birthday | Wedding | Anniversary | Baby Shower
                Graduation | Corporate | Cupcakes | Other)
               
STAGE 2: EXCITEMENT
─────────────────────────────────────────────────────────
Customer selects occasion (e.g. Birthday)
Bot: "A birthday! Love it. For how many people?"
     [numeric input]
Bot: "And do you have an inspiration photo?"
     [Upload button] [Skip button]
     
STAGE 3: IMAGE CHECK  <-- CRITICAL MOMENT
─────────────────────────────────────────────────────────
IF PHOTO UPLOADED:
  Client-side heuristics run (<500ms)
  Pass: "Great photo! The lighting is lovely."
         -> Continue to requirements
  Fail: Specific feedback + example:
         "This photo is a bit blurry — the camera may have
          moved. Try resting your phone on a table or
          propping it up. Here's an example of a clear
          photo: [show example]"
         -> Customer can retry or skip
  While model runs (parallel): move to requirements

IF SKIPPED:
  Bot: "No problem! Let me ask a few questions instead."
  -> Guided structured input flow

STAGE 4: REQUIREMENTS GATHERING
─────────────────────────────────────────────────────────
Bot: "What size are you thinking?"
     [6" (8-10 serves)] [8" (12-16 serves)] [10" (20-25 serves)]
     [Two-tier] [Three-tier] [I'm not sure — surprise me!]

Bot: "Any dietary requirements?"
     [Eggless] [Gluten-free] [Nut-free] [Vegan] [None]
     (multi-select, with info icons explaining each)

Bot: "Got a flavour preference?"
     [Vanilla] [Chocolate] [Red Velvet] [Fruit] [Coffee]
     [Custom — tell me!] [Surprise me]

Bot: "What's your event date?"
     [Date picker — greys out dates <10 days away]
     If <10 days: "Oh, that's soon! We can check if
      we can fit it in — there may be a rush fee.
      A designer will confirm availability."
     (Note: this auto-escalates per Round 2 agreement)

Bot: "And where should we deliver?"
     [Postcode input -> check delivery zone]
     If outside zone: "We currently deliver within
      25 miles of the bakery. Let me pass your info
      to a designer who can discuss options."
     (Escalation — can't solve this without human)

STAGE 5: BUDGET COMFORT
─────────────────────────────────────────────────────────
Bot: "What's your rough budget?"
     [$100-$150] [$150-$250] [$250-$400] [$400+]
     [I'm flexible]
     
  Bot: "Great — for a [size] [occasion] cake with
       [dietary] options, most of our customers
       spend $[range]. A designer will confirm the
       exact price in your quote."

STAGE 6: VISION MODEL RESULTS (if photo uploaded)
─────────────────────────────────────────────────────────
Bot: "I ran your photo past our design team's AI
     assistant (don't worry, a person will review it
     too!). Here's what I noticed:"
     [Display description from vision model]
     "Does that sound right?"
     [Looks good] [Actually, it's more like...]
     
  IF "Actually, it's more like...":
     Free text box -> appended to designer brief

STAGE 7: SUMMARY & CONFIRMATION
─────────────────────────────────────────────────────────
Bot: "Here's what I've got:"
     [Card view / structured summary]

     Occasion:        Birthday
     People:          12
     Size:            8" two-tier
     Dietary:         Eggless
     Flavour:         Belgian Dark Chocolate
     Event date:      June 15, 2026
     Delivery:        123 Main St, Springfield
     Budget:          $150-$250
     Photo:           [thumbnail]
     Notes:           "Unicorn theme, pastel colours"

     "Does everything look right?"
     [Yes, submit!] [Make a change]
     
  IF "Make a change":
     Return to specific stage (not restart)

STAGE 8: HAND-OFF
─────────────────────────────────────────────────────────
Bot: "Perfect! I've sent this to our design team.
     You'll hear from a designer within 24 hours
     with a quote and to confirm details."
     
     [Optional: "Want a copy? Enter your email:"]
     
     Post-submission:
     - Instant confirmation email with reference number
     - Mood board email within 1 hour
     - CRM ticket created with all structured data
     - Designer notification with priority score

STAGE 9: RE-ENTRY / FOLLOW-UP
─────────────────────────────────────────────────────────
Returning customer enters reference number:
Bot: "Welcome back! Your order #[REF] is with
     [Designer Name]. They're working on your
     quote. Is there anything else I can help with?"
     OR
     "Your order is confirmed for [Date]. 
      Want to add anything?"
     (Limited scope — can't modify order, just
      surface status and escalate questions)

STAGE 10: ESCALATION PATHS
─────────────────────────────────────────────────────────
Any of the triggers from section 4:
  Bot: "This sounds like something my human
       colleagues should handle. I've created a
       summary and a designer will be in touch
       within 2 hours. Anything else I can help
       with in the meantime?"
```

**Customer Support Manager:**

> *"This journey closes all four gaps from Round 1. The acknowledgement gap is closed by the instant confirmation. The expectation gap is closed by budget ranges and timeline warnings. The interpretation gap is closed by the vision model summary + correction step. The safety gap is closed by structured dietary capture. If we ship nothing else, this flow alone solves 80% of our current tickets."*

---

## Round 6 — Prioritised Feature Roadmap

### Final Roadmap

**Product Manager:**

> *"Based on everything discussed, here is the prioritised feature roadmap ranked by (impact / effort) * confidence. All agents reviewed and voted."*

### Phase 1 — Core Flow (Must have, Ship Week 6)
| Rank | Feature | Impact | Effort | Agent Champion |
|---|---|---|---|---|
| 1 | Tier 1 conversation flow (occasion -> size -> dietary -> date -> delivery -> budget -> submit) | Critical | Medium | AI Conversation Designer |
| 2 | Client-side image heuristics with specific text feedback | Critical | Medium | UX Designer |
| 3 | Instant confirmation email (<60s post-submission) | Critical | Low | Marketing Manager |
| 4 | CRM integration with structured data hand-off | Critical | Medium | Customer Support Manager |
| 5 | Escalation triggers (8 triggers from section 4) | Critical | Low | Bakery Domain Expert |
| 6 | Delivery zone check (postcode input + allowed list) | High | Low | Customer Support Manager |
| 7 | Graceful degradation + accessibility (text-first feedback, keyboard nav, screen reader) | Critical | Medium | UX Designer |
| 8 | Abandonment recovery (localStorage save + return prompt) | High | Low | Product Manager |

### Phase 2 — Intelligence (Should have, Ship Week 10)
| Rank | Feature | Impact | Effort | Agent Champion |
|---|---|---|---|---|
| 9 | Vision model integration (semantic description + confirmation step) | Very High | High | AI Conversation Designer |
| 10 | Inspiration gallery matching (show 3 past cakes matching style tags) | High | Medium | Marketing Manager |
| 11 | Dietary-friendly flavour suggestions (eggless -> Belgian Chocolate) | High | Low | Bakery Domain Expert |
| 12 | Delivery date confidence indicator (green/yellow/red calendar) | Medium | Low | UX Designer |
| 13 | Post-submission mood board email | Very High | High | Marketing Manager |

### Phase 3 — Delight (Nice to have, Ship Week 14+)
| Rank | Feature | Impact | Effort | Agent Champion |
|---|---|---|---|---|
| 14 | Occasion-based greeting animations (confetti, icons) | Medium | Low | Marketing Manager |
| 15 | Return customer flow (reference number -> status) | Medium | Medium | Customer Support Manager |
| 16 | "Saved your spot" queue position | Medium | Low | UX Designer |
| 17 | Multi-language support (Spanish first) | High | High | Product Manager |
| 18 | Abandoned conversation re-engagement email | Medium | Medium | Marketing Manager |
| 19 | PWA install prompt + offline mode | Low | Medium | UX Designer |

### Never Build (per section 9)
- Exact price quoting
- Allergen safety advice
- Structural design feasibility without human review
- Colour matching guarantees
- Competitor comparisons
- Order modification without human

---

## Sign-off

| Agent | Status |
|---|---|
| Product Manager | Approved |
| Bakery Domain Expert | Approved |
| Customer Support Manager | Approved |
| UX Designer | Approved |
| AI Conversation Designer | Approved |
| Marketing Manager | Approved |

> *This plan represents unanimous agreement after five rounds of structured debate. All dissenting positions and their resolutions are documented above. The customer journey in Section 10 serves as the single source of truth for all design and development work.*
