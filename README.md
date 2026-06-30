# CakeCanvas AI Chatbot

A production-quality AI chatbot for CakeCanvas, a fictional online bakery specialising in fully customised celebration cakes. The chatbot helps customers pre-qualify orders, validate inspiration images, capture structured requirements, and reduce designer triage workload.

## Live Demo

Deploy to GitHub Pages:

1. Push this repository to GitHub
2. Go to **Settings > Pages**
3. Select **Deploy from branch** → `main` / `docs` (or set up GitHub Actions)
4. Your site will be live at `https://<username>.github.io/<repo>`

## Features

- **Conversational ordering flow** — guided step-by-step chat (occasion → size → dietary → flavour → date → delivery → budget → submit)
- **Instant image quality analysis** — client-side blur, resolution, brightness, and crop detection with specific text-based guidance
- **180+ FAQ knowledge base** — comprehensive answers about pricing, flavours, dietary options, delivery, policies, and more
- **Price range estimation** — occasion-based ranges with dietary surcharge awareness (never exact prices)
- **Flavour & size recommendations** — smart suggestions based on guest count, occasion, and dietary requirements
- **BM25-style intent matching** — keyword scoring against tagged intents with confidence thresholds
- **Human escalation** — seamless hand-off for allergens, complaints, modifications, and low-confidence queries
- **Chat history persistence** — session saved to `localStorage` across page refreshes
- **Dark mode** — toggle persisted to `localStorage` with system preference detection
- **Accessibility** — semantic HTML, ARIA labels, keyboard navigation, screen reader announcements, reduced motion support
- **Responsive design** — mobile-first, full-screen chatbot on mobile, bottom-right panel on desktop
- **Typing animation** — realistic typing indicator with smooth message transitions
- **Suggested questions** — one-click FAQ shortcuts in the chat interface

## Files

| File | Purpose |
|---|---|
| `index.html` | Landing page with hero, about, features, and chatbot interface |
| `style.css` | Complete stylesheet with design system, dark mode, animations, responsive breakpoints |
| `knowledge.js` | Knowledge base: 180 FAQ entries, company info, products, sizes, pricing, flavours, fillings, frostings, dietary options, delivery rules, policies, fallback responses, and intent mapping |
| `conversationEngine.js` | State machine, BM25 intent matching, phase-based conversation handlers, escalation logic |
| `priceCalculator.js` | Price range estimation based on occasion, size, and dietary surcharges |
| `recommendationEngine.js` | Size, flavour, and product recommendation logic |
| `imageAdvisor.js` | Client-side image quality analysis (blur via Laplacian variance, resolution, brightness histogram, crop detection) |
| `script.js` | UI controller: DOM rendering, event binding, dark mode, localStorage persistence, chat lifecycle |

## Architecture

```
User → index.html → script.js (UI controller)
                        ├── knowledge.js (data layer)
                        ├── conversationEngine.js (state machine + matching)
                        ├── priceCalculator.js (pricing logic)
                        ├── recommendationEngine.js (recommendation logic)
                        └── imageAdvisor.js (image analysis via Canvas API)

All client-side. No backend. No frameworks. Works on GitHub Pages.
```

### Data Flow

1. User types a message or clicks a suggested question / option button
2. `script.js` captures input, renders it, calls `ConversationEngine.processInput()`
3. `ConversationEngine` searches `knowledge.faq` via tag-based scoring, checks `knowledge.fallbacks` for escalation triggers, and routes through its state machine
4. Response is returned as a structured object (type, message, options, phase)
5. `script.js` renders the response with appropriate UI (bubble text, option buttons, image upload area, etc.)
6. Conversation state is persisted to `localStorage`

### Image Analysis Flow

1. User taps upload area → file picker / camera opens
2. File is read via `FileReader` into `Image` object
3. `ImageAdvisor.analyse()` runs four checks on a Canvas-rendered version:
   - **Blur**: Laplacian variance (3×3 kernel)
   - **Resolution**: width × height vs 800×600 threshold
   - **Brightness**: mean pixel brightness (40–220 range)
   - **Crop**: edge content ratio (empty edges suggest cropping)
4. Pass/fail result with specific guidance text returned to user
5. On pass: image URL stored in conversation state
6. On fail: retry/skip options presented

## Knowledge Base

The knowledge base (`knowledge.js`) contains:

- **180 FAQ entries** across 13 categories (ordering, pricing, sizes, flavours, dietary, delivery, timeline, image, payments, cancellations, storage, corporate, cupcakes, general)
- **15 fallback responses** with escalation triggers (low confidence, allergy, anger, human request, modification, complaint)
- **34 intent categories** with keyword mappings for BM25-style matching
- **8 product categories** with descriptions, starting prices, and examples
- **8 cake sizes** with serving capacities and price ranges
- **20 flavours** in 3 categories with popularity indicators
- **12 fillings** with sponge pairing suggestions
- **10 frostings** with use-case descriptions
- **6 dietary options** with disclaimers, surcharges, and available flavours

## Design Decisions

- **Vanilla JavaScript only** — zero dependencies, no build step, works directly in the browser on GitHub Pages
- **State machine pattern** — deterministic conversation flow, each phase has exactly one handler, no floating state
- **Client-side image analysis** — no server needed for quality checks, instant feedback (<500ms)
- **No exact pricing** — ranges only, with strong disclaimers per unanimous agent agreement
- **BM25-style matching** — lightweight tag scoring instead of full NLP, deterministic and auditable
- **localStorage persistence** — no server for session state, survives page refresh
- **Graceful degradation** — `<noscript>` fallback, keyboard navigation, screen reader support, reduced motion

## Browser Support

- Chrome 80+
- Firefox 80+
- Safari 14+
- Edge 80+
- Opera 67+
- Samsung Internet 13+

## Accessibility

- WCAG 2.1 AA target
- `aria-live` region for chat message announcements
- Keyboard-navigable chat interface
- Visible focus indicators
- High-contrast mode support
- `prefers-reduced-motion` support
- Semantic HTML structure (landmarks, headings, roles)

## Deployment to GitHub Pages

### Option 1: Direct (recommended for static content)

```
git add .
git commit -m "Initial chatbot release"
git push origin main
```

Then in GitHub repo Settings → Pages → Source: Deploy from branch `main` → `/ (root)`

### Option 2: GitHub Actions (for CI)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .
```

## Customisation

### Updating FAQ entries

Edit the `knowledge.faq` array in `knowledge.js`. Each entry requires:

- `id` — unique identifier
- `category` — one of: ordering, pricing, sizes, flavours, dietary, delivery, timeline, image, payments, cancellations, storage, corporate, cupcakes, general
- `question` — the question text
- `answer` — the answer text (can include `**bold**` formatting)
- `tags` — array of search keywords

### Adding a new dietary option

Add an entry to `knowledge.dietaryOptions` with `id`, `name`, `description`, `availableFlavours[]`, `disclaimer`, `surcharge`, and `orderLeadTime`.

### Modifying pricing ranges

Update `knowledge.pricing.ranges` with occasion-specific ranges. All prices must be expressed as ranges only.

## License

MIT — Free for personal and commercial use.

---

*Built with love for CakeCanvas. Part of the Octopus agent-driven design process.*
