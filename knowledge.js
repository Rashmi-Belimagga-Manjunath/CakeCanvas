const knowledge = {

  company: {
    name: "CakeCanvas",
    tagline: "Your vision, our craft",
    about: "CakeCanvas is an online bakery specialising in fully customised celebration cakes. Every cake is made to order by our team of skilled designers and bakers.",
    mission: "To make custom cake ordering as joyful as the celebrations they're made for.",
    founded: 2018,
    location: "London, UK",
    deliveryRadius: "25 miles",
    team: {
      designers: 6,
      bakers: 4,
      supportStaff: 3
    },
    certifications: [
      "Food Hygiene Rating: 5",
      "BFA Registered Bakery",
      "Safe Food Handling Certified"
    ],
    social: {
      instagram: "@cakecanvas",
      pinterest: "cakecanvas",
      facebook: "CakeCanvasBakery"
    },
    contact: {
      email: "hello@cakecanvas.com",
      phone: "+44 20 7946 0958",
      responseTime: "We aim to respond within 24 hours, but our chatbot can help right now."
    }
  },

  products: {
    categories: [
      {
        id: "birthday",
        name: "Birthday Cakes",
        description: "Custom birthday cakes for all ages. From first birthdays to 100th celebrations.",
        startingFrom: "$80",
        popularSizes: ["6-inch", "8-inch", "two-tier"],
        examples: ["Unicorn cakes", "Number cakes", "Character cakes", "Elegant floral"]
      },
      {
        id: "wedding",
        name: "Wedding Cakes",
        description: "Bespoke wedding cakes designed to match your theme and colour palette.",
        startingFrom: "$300",
        popularSizes: ["two-tier", "three-tier", "four-tier"],
        examples: ["Naked rustic", "Fondant elegant", "Fresh floral", "Modern metallic"]
      },
      {
        id: "anniversary",
        name: "Anniversary Cakes",
        description: "Celebrate your milestone with a cake as special as your relationship.",
        startingFrom: "$100",
        popularSizes: ["6-inch", "8-inch", "two-tier"],
        examples: ["Classic tiered", "Photo cake", "Heart-shaped", "Personalised topper"]
      },
      {
        id: "baby-shower",
        name: "Baby Shower Cakes",
        description: "Sweet cakes for welcoming the little one. Gender-neutral or themed.",
        startingFrom: "$90",
        popularSizes: ["8-inch", "two-tier"],
        examples: ["Teddy bear", "Stork and baby", "Floral wreath", "Nappy cake alternative"]
      },
      {
        id: "graduation",
        name: "Graduation Cakes",
        description: "Celebrate academic achievements with a cake featuring school colours, logos, or mortar boards.",
        startingFrom: "$90",
        popularSizes: ["8-inch", "sheet cake", "cupcake tower"],
        examples: ["Cap and diploma", "Book stack", "School colours", "Photo collage"]
      },
      {
        id: "corporate",
        name: "Corporate Cakes",
        description: "Branded cakes for office parties, product launches, and company milestones. Logo reproduction available.",
        startingFrom: "$120",
        popularSizes: ["sheet cake", "two-tier", "cupcake platter"],
        examples: ["Logo in icing", "Brand colours", "Edible image", "Company anniversary"]
      },
      {
        id: "cupcakes",
        name: "Cupcakes",
        description: "Hand-decorated cupcakes in matching designs. Perfect for parties and corporate events.",
        startingFrom: "$3.50 per cupcake",
        minimumOrder: 6,
        popularFlavours: ["Vanilla", "Chocolate", "Red Velvet", "Lemon"],
        examples: ["Floral piped", "Themed toppers", "Miniature cakes", "Cupcake towers"]
      },
      {
        id: "dessert-table",
        name: "Dessert Tables",
        description: "Curated dessert tables for events. Includes cake, cupcakes, cookies, and more.",
        startingFrom: "$250",
        includes: ["Main cake", "6-12 cupcakes", "Cookies", "Macarons", "Setup and styling"],
        servingSizes: ["Small (20 guests)", "Medium (40 guests)", "Large (80+ guests)"]
      }
    ],
    customizationOptions: [
      "Custom colours and themes",
      "Edible image printing",
      "Sugar flowers and figurines",
      "Hand-painted designs",
      "Metallic accents (gold, silver, rose gold)",
      "Fresh flower arrangements",
      "Personalised cake toppers",
      "Matching cupcake sets"
    ]
  },

  cakeSizes: [
    {
      name: "6-inch Round",
      servings: "8-10",
      description: "Perfect for intimate celebrations or small families.",
      typicalOccasions: ["Anniversaries", "Small birthdays", "Baby showers"],
      priceRange: "$80-$150",
      diameter: "6 inches (15 cm)",
      height: "4-5 inches (10-12 cm)"
    },
    {
      name: "8-inch Round",
      servings: "12-16",
      description: "The standard size for most parties and gatherings.",
      typicalOccasions: ["Birthday parties", "Graduations", "Office celebrations"],
      priceRange: "$100-$200",
      diameter: "8 inches (20 cm)",
      height: "4-5 inches (10-12 cm)"
    },
    {
      name: "10-inch Round",
      servings: "20-25",
      description: "Ideal for larger gatherings where you want generous portions.",
      typicalOccasions: ["Large family parties", "Corporate events"],
      priceRange: "$150-$280",
      diameter: "10 inches (25 cm)",
      height: "4-5 inches (10-12 cm)"
    },
    {
      name: "Quarter Sheet",
      servings: "15-20",
      description: "Rectangular cake, easy to serve and transport.",
      typicalOccasions: ["Office parties", "Casual celebrations"],
      priceRange: "$100-$180",
      dimensions: "9 x 13 inches"
    },
    {
      name: "Half Sheet",
      servings: "30-40",
      description: "Great for larger events that need straightforward serving.",
      typicalOccasions: ["Corporate events", "School parties", "Large family gatherings"],
      priceRange: "$180-$350",
      dimensions: "12 x 18 inches"
    },
    {
      name: "Two-Tier",
      servings: "20-35",
      description: "A classic combination of two sizes stacked. Makes a statement without being overwhelming.",
      typicalOccasions: ["Weddings", "Milestone birthdays", "Anniversaries"],
      priceRange: "$200-$450",
      configurations: ["6\" + 8\"", "6\" + 10\"", "8\" + 10\""]
    },
    {
      name: "Three-Tier",
      servings: "40-60",
      description: "A grand centrepiece for significant celebrations.",
      typicalOccasions: ["Weddings", "Large milestone birthdays", "Galas"],
      priceRange: "$350-$700",
      configurations: ["6\" + 8\" + 10\"", "8\" + 10\" + 12\""]
    },
    {
      name: "Four-Tier",
      servings: "60-90",
      description: "The ultimate celebration cake for large weddings and events.",
      typicalOccasions: ["Large weddings", "Major corporate events"],
      priceRange: "$500-$1,200",
      configurations: ["6\" + 8\" + 10\" + 12\""]
    }
  ],

  pricing: {
    disclaimer: "All prices are estimates only. Your designer will provide an exact quote based on your specific requirements.",
    factors: [
      "Number of tiers and servings",
      "Complexity of design (simple buttercream vs. intricate sugar flowers)",
      "Dietary requirements (specialty recipes may cost more)",
      "Delivery distance and time",
      "Rush orders (less than 21 days notice)",
      "Hand-painted or custom-molded elements",
      "Edible image printing",
      "Fresh flower arrangements (flowers not included in cake price)"
    ],
    ranges: {
      birthday: {
        single: "$80-$200",
        twoTier: "$180-$350",
        threeTier: "$300-$600"
      },
      wedding: {
        twoTier: "$300-$600",
        threeTier: "$450-$900",
        fourTier: "$600-$1,500"
      },
      anniversary: {
        single: "$100-$200",
        twoTier: "$200-$400"
      },
      babyShower: {
        single: "$90-$180",
        twoTier: "$200-$380"
      },
      graduation: {
        single: "$90-$200",
        sheet: "$100-$300"
      },
      corporate: {
        sheet: "$120-$350",
        twoTier: "$250-$500"
      },
      cupcakes: {
        perDozen: "$42-$70",
        perPiece: "$3.50-$6.00"
      }
    },
    additionalCosts: {
      rushFee: "$50 (orders placed 10-21 days before event)",
      deliveryFee: "$15-$60 (based on distance)",
      weekendDelivery: "$25 surcharge for Saturday/Sunday",
      sugarFlowers: "From $5 per flower",
      handPainting: "From $30 per hour of painting time",
      edibleImage: "From $20 per image",
      cakeTopper: "From $25 (custom acrylic or wooden toppers)"
    }
  },

  flavours: {
    categories: [
      {
        name: "Classic",
        flavours: [
          { name: "Vanilla Bean", description: "Rich Madagascar vanilla throughout", popularity: "Most popular" },
          { name: "Belgian Chocolate", description: "Deep dark chocolate cake with chocolate ganache", popularity: "Top seller" },
          { name: "Red Velvet", description: "Classic cocoa buttermilk cake with cream cheese frosting", popularity: "Very popular" },
          { name: "Lemon", description: "Zesty lemon cake with lemon buttercream", popularity: "Popular in spring/summer" },
          { name: "Carrot", description: "Spiced carrot cake with walnuts and cream cheese frosting", popularity: "Popular for autumn" },
          { name: "Funfetti", description: "Vanilla cake loaded with rainbow sprinkles", popularity: "Top choice for kids" },
          { name: "Coconut", description: "Coconut cake with coconut buttercream and toasted coconut flakes", popularity: "Niche favourite" },
          { name: "Coffee & Walnut", description: "Light coffee sponge with walnut pieces and coffee buttercream", popularity: "Popular for adults" }
        ]
      },
      {
        name: "Premium",
        flavours: [
          { name: "Salted Caramel", description: "Vanilla sponge with salted caramel filling and caramel buttercream", popularity: "Trending" },
          { name: "Pistachio & Rose", description: "Delicate pistachio sponge with rose buttercream and crushed pistachios", popularity: "Wedding favourite" },
          { name: "Earl Grey & Lavender", description: "Earl Grey infused sponge with lavender buttercream", popularity: "Elegant choice" },
          { name: "Mango & Passionfruit", description: "Tropical mango sponge with passionfruit curd and vanilla buttercream", popularity: "Summer favourite" },
          { name: "Cookies & Cream", description: "Chocolate sponge with crushed cookie pieces and cookies and cream frosting", popularity: "Kids and teens love it" },
          { name: "Honey & Almond", description: "Light almond sponge with honey buttercream and flaked almonds", popularity: "Niche favourite" },
          { name: "Black Forest", description: "Chocolate sponge with cherry compote and whipped cream", popularity: "Classic European" },
          { name: "Tiramisu", description: "Coffee-soaked sponge with mascarpone cream and cocoa dusting", popularity: "Adult favourite" }
        ]
      },
      {
        name: "Fruit",
        flavours: [
          { name: "Strawberry", description: "Fresh strawberry cake with strawberry buttercream", popularity: "Summer favourite" },
          { name: "Banana", description: "Moist banana cake with cream cheese frosting", popularity: "Popular for kids" },
          { name: "Apple & Cinnamon", description: "Spiced apple cake with cinnamon buttercream", popularity: "Autumn favourite" },
          { name: "Blueberry", description: "Blueberry buttermilk cake with lemon buttercream", popularity: "Niche favourite" }
        ]
      }
    ],
    tastingNotes: "We recommend choosing one flavour for the sponge and a complementary flavour for the filling and frosting. Our team can suggest pairings during your consultation.",
    sampleBoxAvailable: true,
    sampleBoxPrice: "$40-$60"
  },

  fillings: [
    { name: "Vanilla Buttercream", description: "Classic smooth vanilla buttercream", pairs: ["Vanilla", "Chocolate", "Red Velvet", "Funfetti"] },
    { name: "Chocolate Ganache", description: "Rich dark chocolate ganache", pairs: ["Belgian Chocolate", "Salted Caramel", "Black Forest"] },
    { name: "Cream Cheese", description: "Tangy cream cheese frosting", pairs: ["Red Velvet", "Carrot", "Lemon", "Banana"] },
    { name: "Salted Caramel", description: "Buttery caramel with sea salt flakes", pairs: ["Vanilla", "Chocolate", "Coffee & Walnut"] },
    { name: "Raspberry Curd", description: "Tart and sweet raspberry curd", pairs: ["Vanilla", "Belgian Chocolate", "Lemon"] },
    { name: "Lemon Curd", description: "Zesty classic lemon curd", pairs: ["Vanilla", "Coconut", "Blueberry"] },
    { name: "Strawberry Compote", description: "Chunky strawberry preserve", pairs: ["Vanilla", "Lemon", "Coconut"] },
    { name: "Nutella", description: "Hazelnut chocolate spread", pairs: ["Vanilla", "Belgian Chocolate", "Banana"] },
    { name: "Coffee Buttercream", description: "Espresso-infused buttercream", pairs: ["Coffee & Walnut", "Belgian Chocolate", "Vanilla"] },
    { name: "Passionfruit Curd", description: "Tropical passionfruit curd", pairs: ["Mango", "Coconut", "Vanilla"] },
    { name: "Cookie Dough", description: "Egg-free cookie dough pieces in vanilla buttercream", pairs: ["Cookies & Cream", "Belgian Chocolate", "Vanilla"] },
    { name: "White Chocolate & Raspberry", description: "White chocolate ganache with raspberry swirl", pairs: ["Vanilla", "Lemon", "Pistachio & Rose"] }
  ],

  frostings: [
    { name: "Vanilla Buttercream", description: "Classic, smooth, and versatile. Our most popular frosting.", use: "Everyday cakes, kids cakes" },
    { name: "Chocolate Buttercream", description: "Rich cocoa buttercream for the chocolate lover.", use: "Chocolate cakes, celebration cakes" },
    { name: "Cream Cheese", description: "Tangy and creamy. Perfect pairing for carrot and red velvet.", use: "Carrot cake, Red Velvet, Banana cake" },
    { name: "Swiss Meringue", description: "Silky, less sweet buttercream. Ideal for elegant finishes.", use: "Wedding cakes, premium cakes" },
    { name: "Italian Meringue", description: "Stable, silky buttercream that holds shape well in warm weather.", use: "Outdoor events, summer weddings" },
    { name: "Ganache", description: "Rich chocolate ganache. Can be glossy or whipped.", use: "Chocolate cakes, Black Forest, drip cakes" },
    { name: "Royal Icing", description: "Hard-setting icing for detailed piping and decorations.", use: "Sugar cookies, intricate piping details" },
    { name: "Fondant", description: "Smooth rolled icing for a flawless, polished finish.", use: "Formal cakes, sharp-edge designs, sculpted cakes" },
    { name: "Whipped Cream", description: "Light and fluffy. Best used on the day of the event.", use: "Fresh fruit cakes, summer cakes, Black Forest" },
    { name: "Ermine (Flour)", description: "Old-fashioned cooked flour frosting. Less sweet than buttercream.", use: "Vintage-style cakes, Southern-style cakes" }
  ],

  dietaryOptions: [
    {
      id: "eggless",
      name: "Eggless",
      description: "Our eggless cakes use plant-based binders and alternative leavening agents. Most of our standard flavours are available eggless.",
      availableFlavours: ["Vanilla Bean", "Belgian Chocolate", "Salted Caramel", "Lemon", "Funfetti", "Cookies & Cream", "Strawberry", "Blueberry"],
      disclaimer: "We use dedicated equipment for eggless preparation, but our kitchen does handle eggs. Please discuss cross-contamination concerns with your designer.",
      surcharge: "No additional charge for eggless recipes",
      orderLeadTime: "Standard 21 days"
    },
    {
      id: "gluten-free",
      name: "Gluten-Free",
      description: "Our gluten-free cakes use certified gluten-free flour blends. We offer a selection of popular flavours in gluten-free versions.",
      availableFlavours: ["Belgian Chocolate", "Lemon", "Strawberry", "Salted Caramel", "Coconut"],
      disclaimer: "We use dedicated equipment for gluten-free preparation, but our kitchen does handle wheat flour. Please discuss cross-contamination concerns with your designer.",
      surcharge: "$20-$40 additional for gluten-free recipes (specialty flour costs)",
      orderLeadTime: "Minimum 14 days notice recommended"
    },
    {
      id: "nut-free",
      name: "Nut-Free",
      description: "Our nut-free cakes are prepared without nuts or nut-based ingredients.",
      availableFlavours: ["Vanilla Bean", "Belgian Chocolate", "Lemon", "Strawberry", "Red Velvet", "Funfetti", "Salted Caramel", "Cookies & Cream", "Blueberry"],
      disclaimer: "We use dedicated equipment for nut-free preparation, but our kitchen does handle nuts. For severe allergies, please speak directly with a designer before ordering.",
      surcharge: "No additional charge for nut-free recipes",
      orderLeadTime: "Standard 21 days"
    },
    {
      id: "vegan",
      name: "Vegan",
      description: "Our vegan cakes contain no animal products — no eggs, dairy, or honey. Made with plant-based milks, butters, and binders.",
      availableFlavours: ["Belgian Chocolate", "Vanilla Bean", "Lemon", "Strawberry", "Salted Caramel", "Coconut"],
      disclaimer: "We use dedicated equipment for vegan preparation. Frostings are made with plant-based butter. Please confirm all requirements with your designer.",
      surcharge: "$15-$30 additional for vegan recipes",
      orderLeadTime: "Minimum 14 days notice recommended"
    },
    {
      id: "dairy-free",
      name: "Dairy-Free",
      description: "Our dairy-free cakes use plant-based milks and butters. Available in select flavours.",
      availableFlavours: ["Belgian Chocolate", "Vanilla Bean", "Lemon", "Strawberry", "Salted Caramel"],
      disclaimer: "We use dedicated equipment for dairy-free preparation. Please discuss cross-contamination concerns with your designer.",
      surcharge: "$15-$30 additional for dairy-free recipes",
      orderLeadTime: "Standard 21 days"
    },
    {
      id: "low-sugar",
      name: "Low-Sugar / No Added Sugar",
      description: "Available on request for customers who need to limit sugar intake. Uses natural sweeteners where possible.",
      availableFlavours: ["Vanilla Bean", "Belgian Chocolate", "Lemon", "Coconut"],
      disclaimer: "Low-sugar options may have a different texture and shorter shelf life than standard cakes. Please discuss with your designer.",
      surcharge: "$10-$20 additional for low-sugar recipes",
      orderLeadTime: "Minimum 14 days notice recommended"
    }
  ],

  delivery: {
    zone: {
      radius: "25 miles from our London bakery",
      includeAreas: ["Central London", "Greater London", "Selected areas of Surrey, Kent, Essex, Hertfordshire"],
      checkInstructions: "Enter your postcode in the chatbot to check if we deliver to your area."
    },
    options: [
      {
        type: "Standard Delivery",
        cost: "$15-$30",
        timing: "Within delivery window agreed at booking",
        description: "Delivered by one of our team members during the agreed time slot."
      },
      {
        type: "Premium Delivery",
        cost: "$30-$60",
        timing: "Narrower time window, first slot of the day",
        description: "Priority delivery with a guaranteed 2-hour window and white-glove setup."
      },
      {
        type: "Weekend Delivery",
        cost: "$25 surcharge on standard delivery",
        timing: "Saturday or Sunday",
        description: "Delivery on Saturdays and Sundays. Limited availability."
      },
      {
        type: "Collection",
        cost: "Free",
        timing: "By appointment during business hours",
        description: "Collect from our London bakery. Please bring your order confirmation."
      }
    ],
    guidelines: [
      "All cakes are delivered in sturdy cardboard boxes with non-slip bases.",
      "Delivery team will place the cake in your chosen location (table, fridge).",
      "We do not deliver in extreme weather conditions without prior discussion.",
      "Delivery to parks, outdoor venues, and untended reception desks must be pre-approved.",
      "The customer should inspect the cake upon delivery and sign the delivery note.",
      "Any damage must be reported within 30 minutes of delivery."
    ],
    packaging: "All cakes come in a branded CakeCanvas box with care instructions.",
    setupIncluded: "Basic setup (placing cake on table) included. Full dessert table styling available as an add-on service from $100.",
    minimumOrderForDelivery: "$50"
  },

  refunds: {
    policy: "Orders cancelled more than 14 days before the event receive a full refund. Orders cancelled 7-14 days before receive a 50% refund. Orders cancelled less than 7 days before are non-refundable.",
    exceptions: [
      "If CakeCanvas cancels due to unforeseen circumstances (e.g., bakery closure, staff illness), a full refund will be issued regardless of timeline.",
      "If the delivered cake has a significant defect (wrong design, incorrect dietary specification, structural failure), we will offer a full or partial refund after review.",
      "Refunds for any reason will be processed within 5-10 business days to the original payment method."
    ],
    nonRefundable: [
      "Custom cake toppers and personalised decorations ordered specifically for your cake",
      "Tasting box fees",
      "Delivery fees (if delivery occurred)"
    ],
    process: "To request a refund, contact us at hello@cakecanvas.com with your order reference number. Our team will respond within 2 business days."
  },

  cancellations: {
    policy: "Orders can be cancelled by contacting our support team. The refund amount depends on how far in advance you cancel relative to your event date.",
    timeline: [
      { period: "More than 14 days before event", refundPercentage: "100%", notes: "Full refund minus any non-refundable items" },
      { period: "7-14 days before event", refundPercentage: "50%", notes: "Half refund as ingredients and time have been allocated" },
      { period: "Less than 7 days before event", refundPercentage: "0%", notes: "Production is typically underway or complete" }
    ],
    rescheduling: "If you need to move your event date, we can usually transfer your deposit and order to a new date within 3 months of the original, subject to availability. Please contact us as early as possible.",
    changeOfDesign: "Minor design changes can be made up to 7 days before the event. Major changes (size, tier count, dietary) must be made at least 14 days before. Changes may affect pricing."
  },

  payments: {
    acceptedMethods: ["Credit card (Visa, Mastercard, Amex)", "Debit card", "Bank transfer", "Cash (collection only)"],
    depositRequired: true,
    depositAmount: "50% of estimated total to secure your date",
    balanceDue: "14 days before the event date",
    paymentLink: "Your designer will send a secure payment link via email.",
    invoice: "A detailed invoice will be provided with your quote. Final invoice reflects actual costs.",
    latePayment: "Orders with outstanding balances 7 days before the event may be subject to cancellation."
  },

  businessHours: {
    studio: {
      mondayToFriday: "9:00 AM - 6:00 PM",
      saturday: "10:00 AM - 4:00 PM",
      sunday: "Closed"
    },
    consultations: "By appointment only. Book via the chatbot or email hello@cakecanvas.com.",
    collections: "By appointment during business hours. Please arrive at your scheduled time.",
    deliveries: "Deliveries are scheduled within agreed time slots, typically 9:00 AM - 5:00 PM.",
    holidayClosures: "Closed on Christmas Day, Boxing Day, New Year's Day, Easter Sunday. Limited hours during holiday periods.",
    responseTime: {
      chatbot: "Instant",
      email: "Within 24 hours on business days",
      phone: "Voicemail checked daily. Return calls within 24 hours."
    }
  },

  imageGuide: {
    bestPractices: [
      "Use natural daylight — take photos near a window, not under artificial kitchen lights",
      "Hold your phone steady or rest it on a surface to avoid blur",
      "Clean your camera lens with a soft cloth before taking the photo",
      "Capture the whole cake or design element — avoid tight crops",
      "If taking a screenshot from social media, share the original post link instead if possible",
      "Multiple angles are helpful — top view, side view, and close-up of details",
      "Include a reference for scale (e.g., a person next to the cake)",
      "Avoid using flash — it washes out colours and creates harsh shadows",
      "If you have a colour swatch or fabric sample, include it next to the inspiration image"
    ],
    minimumResolution: "800 x 600 pixels",
    acceptedFormats: ["JPEG", "PNG", "HEIC", "WebP"],
    maxFileSize: "10 MB per image",
    whatWeCheck: [
      "Blur (camera movement or poor focus)",
      "Brightness (too dark or overexposed)",
      "Resolution (too small to see details)",
      "Cropping (important elements cut off)"
    ],
    failureMessages: {
      blurry: "This photo appears blurry. The camera may have moved while taking it. Try resting your phone on a table or using both hands to keep it steady.",
      tooDark: "This photo is quite dark. Natural light works best — try taking the photo near a window during daytime.",
      tooBright: "This photo is overexposed. The details are washed out. Try moving to a shadier spot or turning off the flash.",
      lowResolution: "This image is quite small. When we zoom in, the details become unclear. A photo with at least 800 x 600 pixels works best.",
      cropped: "Part of the cake or design seems to be cut off at the edge. Try stepping back so the whole cake is visible.",
      unknown: "We're having trouble analysing this image. It may not be a cake photo. Could you try a different image or describe what you're looking for?"
    },
    skipGuidance: "Don't have a photo? No problem at all. We'll ask you a few questions to understand your vision. Many of our best cakes started with just a description.",
    exampleLink: "Your designer can share examples of past work once they review your brief."
  },

  tracking: {
    howToCheck: "Enter your order reference number in the chatbot to check your order status.",
    statuses: [
      { status: "Inquiry Received", description: "Your request has been submitted. A designer will review it within 24 hours." },
      { status: "Consultation Scheduled", description: "A designer has been assigned and will contact you to discuss your requirements." },
      { status: "Quote Sent", description: "Your quote has been sent. Check your email or ask the chatbot for a summary." },
      { status: "Deposit Paid", description: "Your order is confirmed and your date is secured." },
      { status: "In Production", description: "Your cake is being designed and baked. How exciting!" },
      { status: "Ready for Delivery", description: "Your cake is complete. Delivery or collection has been scheduled." },
      { status: "Delivered", description: "Your cake has been delivered. We hope you love it! Share your photos with us @cakecanvas." },
      { status: "Completed", description: "Order complete. Thank you for choosing CakeCanvas!" },
      { status: "Cancelled", description: "This order has been cancelled. Contact us if you have questions." }
    ],
    designerNote: "Once assigned, your designer's name will appear in the status. You can communicate directly with them via email.",
    statusStaleness: "If your order status hasn't been updated in more than 48 hours, please let us know and we'll investigate.",
    referenceFormat: "Your reference number starts with #CC followed by 4 digits (e.g., #CC-1234)."
  },

  faq: [],

  fallbacks: []

};

// =============================================================================
// FAQ — 150+ realistic entries
// =============================================================================

knowledge.faq = [
  // ───── ORDERING & PROCESS (20) ─────
  {
    id: "faq-001",
    category: "ordering",
    question: "How do I place an order?",
    answer: "Just chat with us! Let us know the occasion, your preferred size, flavour, and any dietary requirements. We'll collect everything and pass it to a designer who will send you a quote within 24 hours.",
    tags: ["order", "place order", "how to order", "ordering process"]
  },
  {
    id: "faq-002",
    category: "ordering",
    question: "How far in advance do I need to order?",
    answer: "We recommend ordering at least 21 days before your event. This gives our designers time to plan and our bakers time to create your cake. For orders 10-21 days out, we can often accommodate but a rush fee may apply. Orders less than 10 days before are subject to availability and manager approval.",
    tags: ["lead time", "advance notice", "how far in advance", "booking", "notice period"]
  },
  {
    id: "faq-003",
    category: "ordering",
    question: "Can I place a rush order?",
    answer: "We can sometimes accommodate rush orders placed 10-21 days before your event. A $50 rush fee applies, and availability depends on our production schedule. Orders needed in fewer than 10 days require manager approval — please contact us and we'll do our best.",
    tags: ["rush order", "urgent", "last minute", "quick", "emergency"]
  },
  {
    id: "faq-004",
    category: "ordering",
    question: "What information do I need to provide to get a quote?",
    answer: "To give you an accurate estimate, we'll need: the occasion, number of guests, preferred size and shape, flavour and dietary requirements, your inspiration photos or design ideas, event date, delivery postcode, and your budget range. The chatbot will guide you through each step.",
    tags: ["quote information", "what do you need", "quote requirements", "needed info"]
  },
  {
    id: "faq-005",
    category: "ordering",
    question: "Can I see a design before I commit?",
    answer: "Your designer will create a design brief based on your requirements and share it with you for approval before production begins. For complex designs, a sketch or mood board may be provided. We don't create full mockups unless specifically arranged, as design time is part of the production process.",
    tags: ["design preview", "see design", "sneak peek", "sketch", "mockup"]
  },
  {
    id: "faq-006",
    category: "ordering",
    question: "Can I make changes after I've placed my order?",
    answer: "Minor changes (colours, message on cake, small decorative tweaks) can be made up to 7 days before your event. Major changes (size, tier count, dietary requirements, complete design overhaul) must be made at least 14 days before. Changes may affect the final price.",
    tags: ["change order", "modify", "edit order", "update order", "change design"]
  },
  {
    id: "faq-007",
    category: "ordering",
    question: "Do I need a consultation appointment?",
    answer: "Not initially. The chatbot can handle most of the information gathering. A designer may schedule a call or video consultation for complex orders — especially weddings, multi-tier cakes, or highly detailed custom designs.",
    tags: ["consultation", "appointment", "meeting", "video call", "design consultation"]
  },
  {
    id: "faq-008",
    category: "ordering",
    question: "Do you offer cake tasting boxes?",
    answer: "Yes! Our tasting boxes include samples of 4-6 of our most popular flavours with matching frostings. Tasting boxes cost $40-$60 and can be ordered through the chatbot. They're available for collection or delivery (delivery fee applies).",
    tags: ["tasting", "sample", "tasting box", "try before you buy", "flavour test"]
  },
  {
    id: "faq-009",
    category: "ordering",
    question: "Can I order a cake for someone else as a surprise?",
    answer: "Absolutely! Just let us know when entering the delivery details. We can coordinate delivery with the recipient or with someone else who will be at the event. We won't disclose pricing information to the recipient.",
    tags: ["surprise", "gift", "for someone else", "secret order"]
  },
  {
    id: "faq-010",
    category: "ordering",
    question: "What happens after I submit my request through the chatbot?",
    answer: "You'll receive an instant confirmation with a reference number. A confirmation email will follow within 60 seconds. A designer will review your request and reach out within 24 hours with a quote and to confirm details. If you uploaded a photo, it will be included in the brief sent to the designer.",
    tags: ["after submission", "next steps", "what happens next", "submission process"]
  },
  {
    id: "faq-011",
    category: "ordering",
    question: "Can I order cupcakes and a cake together?",
    answer: "Yes! Many customers order a main cake paired with matching cupcakes. We can design them to coordinate in colour and style. Cupcakes are priced per dozen and complement any cake order. Minimum 6 cupcakes for matching sets.",
    tags: ["cupcakes and cake", "combination order", "cake and cupcakes", "matching set"]
  },
  {
    id: "faq-012",
    category: "ordering",
    question: "Do you offer dessert tables for events?",
    answer: "Yes! Our dessert tables include a main cake, cupcakes, cookies, macarons, and styling. We offer three sizes: Small (20 guests, from $250), Medium (40 guests, from $400), and Large (80+ guests, from $600). Setup and styling are included.",
    tags: ["dessert table", "catering", "event desserts", "dessert bar", "sweet table"]
  },
  {
    id: "faq-013",
    category: "ordering",
    question: "Can I request a cake that matches a specific theme or colour?",
    answer: "Yes, custom colours and themes are what we do best. Share your colour swatches, Pinterest boards, fabric samples, or inspiration photos. We can match Pantone colours and create themed designs for any occasion.",
    tags: ["theme", "colour matching", "custom colours", "themed cake", "specific colour"]
  },
  {
    id: "faq-014",
    category: "ordering",
    question: "Do you write messages on cakes?",
    answer: "Yes! We can pipe messages, names, and ages on cakes in various fonts and styles. Let us know the exact wording and your preferred style (elegant script, bold block letters, etc.). Standard messages are included in the price; complex calligraphy may have a small additional charge.",
    tags: ["message on cake", "writing", "name on cake", "personalised message", "cake text"]
  },
  {
    id: "faq-015",
    category: "ordering",
    question: "Can you recreate a cake from a photo?",
    answer: "We can create cakes inspired by reference photos. Upload your inspiration image and we'll do our best to match the style, colours, and design elements. Keep in mind that each cake is handmade, so there will be natural variation. A designer will discuss what's achievable.",
    tags: ["recreate cake", "copy cake", "from photo", "recreate design", "inspiration photo"]
  },
  {
    id: "faq-016",
    category: "ordering",
    question: "Do you offer edible images on cakes?",
    answer: "Yes, we can print edible images onto icing using food-grade printers. This is popular for photo cakes, logo cakes, and character cakes. Edible image printing starts at $20 per image. Please ensure you own the rights to any photo you provide.",
    tags: ["edible image", "photo cake", "printed icing", "edible print", "picture on cake"]
  },
  {
    id: "faq-017",
    category: "ordering",
    question: "Can I order a cake topper from you?",
    answer: "Yes, we offer custom acrylic and wooden cake toppers starting from $25. Options include names with dates, custom shapes, and silhouette toppers. These are made by our partner craftspeople and typically take 7-10 days to produce.",
    tags: ["cake topper", "custom topper", "acrylic topper", "wooden topper", "personalised topper"]
  },
  {
    id: "faq-018",
    category: "ordering",
    question: "What if I don't know what I want?",
    answer: "That's completely fine. Choose 'Surprise me' for flavour and size, and describe the vibe you're going for (elegant, fun, rustic, modern). Our designers are great at interpreting loose ideas. You'll review and approve the brief before production.",
    tags: ["don't know", "unsure", "no idea", "need help deciding", "not sure what I want"]
  },
  {
    id: "faq-019",
    category: "ordering",
    question: "Can I order a cake for a non-birthday or non-wedding occasion?",
    answer: "Absolutely! We make cakes for engagements, retirements, housewarmings, religious ceremonies, farewell parties, 'just because' — any reason to celebrate. Select 'Other' when asked for the occasion and tell us what you're celebrating.",
    tags: ["other occasion", "non-birthday", "non-wedding", "any occasion", "celebration"]
  },
  {
    id: "faq-020",
    category: "ordering",
    question: "Is there a minimum spend for custom cakes?",
    answer: "Our custom cakes start at around $80 for a simple 6-inch birthday cake. Minimum order for delivery is $50. There's no minimum for collection. Cupcakes have a minimum order of 6.",
    tags: ["minimum order", "minimum spend", "minimum", "minimum amount"]
  },

  // ───── PRICING & BUDGET (15) ─────
  {
    id: "faq-021",
    category: "pricing",
    question: "How much does a custom cake cost?",
    answer: "Prices vary based on size, complexity, and occasion. Single-tier cakes typically range $80-$200, two-tier cakes $180-$450, and three-tier cakes $350-$700. Complex designs, sugar flowers, and hand-painting may increase the price. Your designer will confirm the exact quote.",
    tags: ["cost", "price", "how much", "pricing", "what's the price"]
  },
  {
    id: "faq-022",
    category: "pricing",
    question: "How much does a wedding cake cost?",
    answer: "Wedding cakes typically range from $300 for a simple two-tier design to $1,500 for an elaborate four-tier cake with sugar flowers and hand-painting. The average wedding cake order is around $500-$700. Your designer will provide a detailed quote.",
    tags: ["wedding cake price", "wedding cost", "wedding cake cost", "bridal cake price"]
  },
  {
    id: "faq-023",
    category: "pricing",
    question: "How much do cupcakes cost?",
    answer: "Our hand-decorated cupcakes range from $3.50 to $6.00 each depending on decoration complexity. A dozen standard decorated cupcakes start at $42. Minimum order is 6 cupcakes. Matching cupcake towers and themed sets are available.",
    tags: ["cupcake price", "cupcake cost", "how much per cupcake", "cupcake pricing"]
  },
  {
    id: "faq-024",
    category: "pricing",
    question: "Do you charge extra for fondant or special finishes?",
    answer: "Fondant finishes are included in the base price for most formal cakes. Specialty finishes like hand-painting, metallic leaf, and intricate piping may carry additional charges starting from $30. Your designer will itemise any extras in your quote.",
    tags: ["fondant charge", "special finish cost", "extra charges", "additional costs"]
  },
  {
    id: "faq-025",
    category: "pricing",
    question: "Why do custom cakes cost more than supermarket cakes?",
    answer: "Every CakeCanvas cake is made from scratch using premium ingredients — real butter, Belgian chocolate, Madagascar vanilla, free-range eggs. Each cake is designed and decorated by hand by a skilled pastry artist. You're paying for artistry, quality ingredients, and a cake that's uniquely yours.",
    tags: ["why expensive", "cost difference", "price vs supermarket", "worth the price"]
  },
  {
    id: "faq-026",
    category: "pricing",
    question: "Is there a delivery fee?",
    answer: "Yes, delivery fees range from $15 to $60 depending on distance from our bakery. Weekend delivery carries a $25 surcharge. Collection from our bakery is free.",
    tags: ["delivery fee", "shipping cost", "delivery charge", "how much for delivery"]
  },
  {
    id: "faq-027",
    category: "pricing",
    question: "What is the rush fee?",
    answer: "Orders placed 10-21 days before the event are subject to a $50 rush fee. This covers priority scheduling and out-of-sequence production. Orders needed in fewer than 10 days require manager approval.",
    tags: ["rush fee", "last minute fee", "urgent charge", "expedited fee"]
  },
  {
    id: "faq-028",
    category: "pricing",
    question: "Are sugar flowers extra?",
    answer: "Sugar flowers are priced individually depending on complexity, starting from $5 per flower. A full sugar flower arrangement (5-8 flowers with leaves) typically ranges $40-$100. Fresh flowers are arranged by your designer and charged at cost plus a styling fee.",
    tags: ["sugar flowers cost", "flower charge", "sugar flower pricing", "flower cake cost"]
  },
  {
    id: "faq-029",
    category: "pricing",
    question: "Do you offer discounts for large orders?",
    answer: "We offer pricing considerations for large corporate orders, dessert tables, and high-volume cupcake orders ($200+). Discounts are evaluated on a case-by-case basis. Please discuss your requirements with a designer.",
    tags: ["discount", "bulk discount", "large order discount", "corporate discount", "volume pricing"]
  },
  {
    id: "faq-030",
    category: "pricing",
    question: "Will the price change after I get a quote?",
    answer: "The quote provided by your designer is valid for 14 days. If you make changes to the design, size, or requirements after receiving the quote, the price may be adjusted. We'll always confirm any price changes with you before proceeding.",
    tags: ["price change", "quote change", "quote validity", "price guarantee"]
  },
  {
    id: "faq-031",
    category: "pricing",
    question: "How much is a dessert table?",
    answer: "Dessert table packages start at $250 for a small setup (serves 20) and go up to $600+ for larger arrangements (serves 80+). The price includes the main cake, cupcakes, cookies, macarons, and styling setup.",
    tags: ["dessert table cost", "dessert table price", "dessert table pricing"]
  },
  {
    id: "faq-032",
    category: "pricing",
    question: "Do I pay for the tasting box?",
    answer: "Yes, tasting boxes are $40-$60 and the cost is deducted from your final cake order if you place one within 30 days. Think of it as an investment in choosing the perfect flavour.",
    tags: ["tasting box cost", "tasting fee", "sample box price"]
  },
  {
    id: "faq-033",
    category: "pricing",
    question: "What affects the price of a cake the most?",
    answer: "The biggest factors are size (number of servings), design complexity (especially hand-painting and sugar flowers), dietary requirements (specialty recipes may cost more), and timeline (rush orders incur a fee). The occasion itself doesn't affect price — a birthday cake and a wedding cake of the same size and complexity cost the same.",
    tags: ["price factors", "what affects price", "cost factors", "pricing breakdown"]
  },
  {
    id: "faq-034",
    category: "pricing",
    question: "Can I get a refund if I'm not happy with the cake?",
    answer: "If your cake has a significant defect — wrong design, incorrect dietary specification, or structural failure — we will offer a full or partial refund after review. Our policy is to make it right. Please inspect your cake upon delivery and report any issues within 30 minutes.",
    tags: ["refund unhappy", "not happy refund", "quality issue", "defect refund"]
  },
  {
    id: "faq-035",
    category: "pricing",
    question: "Are there any hidden fees?",
    answer: "No hidden fees. Your quote will itemise all costs: cake base price, dietary surcharges (if applicable), delivery fee, any add-ons (sugar flowers, hand-painting, edible images, toppers), and the rush fee if applicable. Everything is transparent.",
    tags: ["hidden fees", "extra charges", "transparent pricing", "no hidden costs"]
  },

  // ───── CAKE SIZES & SERVINGS (10) ─────
  {
    id: "faq-036",
    category: "sizes",
    question: "What sizes do cakes come in?",
    answer: "We offer 6-inch (8-10 servings), 8-inch (12-16 servings), 10-inch (20-25 servings), quarter sheet (15-20 servings), half sheet (30-40 servings), and multi-tier options (two-tier, three-tier, four-tier). The chatbot can help you choose the right size based on your guest count.",
    tags: ["sizes", "what sizes", "size options", "cake sizes available"]
  },
  {
    id: "faq-037",
    category: "sizes",
    question: "What size cake do I need for 20 guests?",
    answer: "For 20 guests, an 8-inch cake (serves 12-16) would be a tight fit. We'd recommend a 10-inch cake (serves 20-25) or a two-tier 6-inch + 8-inch combination (serves 20-35) which also makes a lovely presentation.",
    tags: ["20 guests", "serving 20", "size for 20", "20 people"]
  },
  {
    id: "faq-038",
    category: "sizes",
    question: "What size cake do I need for 50 guests?",
    answer: "For 50 guests, a three-tier cake (6\" + 8\" + 10\", serves 40-60) would be ideal. Alternatively, a half sheet cake (serves 30-40) plus a smaller display cake is a popular cost-effective choice. Your designer can advise.",
    tags: ["50 guests", "serving 50", "size for 50", "50 people"]
  },
  {
    id: "faq-039",
    category: "sizes",
    question: "What size cake do I need for 100 guests?",
    answer: "For 100 guests, you'll typically need a four-tier cake or a combination of a three-tier display cake plus a sheet cake for serving. A four-tier (6\" + 8\" + 10\" + 12\") serves 60-90, so adding a half sheet (30-40) ensures everyone gets a slice. Your designer will calculate exact portions.",
    tags: ["100 guests", "serving 100", "size for 100", "100 people", "large event"]
  },
  {
    id: "faq-040",
    category: "sizes",
    question: "What's the difference between a tier and a layer?",
    answer: "A tier is a complete cake section. A three-tier cake has three stacked cakes. A layer is one horizontal slice within a single tier. Most of our cakes have 2-3 layers per tier, with filling between each layer.",
    tags: ["tier vs layer", "difference tier layer", "cake terminology"]
  },
  {
    id: "faq-041",
    category: "sizes",
    question: "How many people does a 6-inch cake serve?",
    answer: "A 6-inch round cake serves 8-10 people with standard dessert-sized portions. It's perfect for intimate celebrations, small families, or anniversary cakes.",
    tags: ["6 inch", "6 inch servings", "small cake", "intimate cake"]
  },
  {
    id: "faq-042",
    category: "sizes",
    question: "How many people does an 8-inch cake serve?",
    answer: "An 8-inch round cake serves 12-16 people. This is our most popular size for birthday parties, small weddings, and family gatherings.",
    tags: ["8 inch", "8 inch servings", "medium cake"]
  },
  {
    id: "faq-043",
    category: "sizes",
    question: "Can I get different sized tiers on the same cake?",
    answer: "Yes! Multi-tier cakes with different sized tiers are standard. Common combinations include 6\" + 8\" (two-tier) and 6\" + 8\" + 10\" (three-tier). This creates the classic tiered cake silhouette and provides more servings at the bottom.",
    tags: ["different sizes", "mixed tiers", "multi-tier sizes", "tier combinations"]
  },
  {
    id: "faq-044",
    category: "sizes",
    question: "Do you do sheet cakes?",
    answer: "Yes, we offer quarter sheet (15-20 servings) and half sheet (30-40 servings) cakes. Sheet cakes are great for large events, office parties, and as a serving supplement behind a smaller decorative cake. We decorate them to match your theme.",
    tags: ["sheet cake", "rectangular cake", "sheet cake size", "flat cake"]
  },
  {
    id: "faq-045",
    category: "sizes",
    question: "How do I know what size to choose?",
    answer: "Think about your guest count and how large you want the cake to look. A general rule: each person gets one standard slice. The chatbot will ask for your guest count and suggest appropriate sizes. When in doubt, go a size up — leftover cake is never a problem!",
    tags: ["which size", "size help", "choosing size", "right size", "what size do I need"]
  },

  // ───── FLAVOURS, FILLINGS, FROSTINGS (15) ─────
  {
    id: "faq-046",
    category: "flavours",
    question: "What flavours do you offer?",
    answer: "We offer three categories of flavours: Classic (Vanilla Bean, Belgian Chocolate, Red Velvet, Lemon, Carrot, Funfetti, Coconut, Coffee & Walnut), Premium (Salted Caramel, Pistachio & Rose, Earl Grey & Lavender, Mango & Passionfruit, Cookies & Cream, Honey & Almond, Black Forest, Tiramisu), and Fruit (Strawberry, Banana, Apple & Cinnamon, Blueberry). Most are available as eggless or gluten-free versions.",
    tags: ["flavours", "cake flavours", "flavour list", "what flavours", "options"]
  },
  {
    id: "faq-047",
    category: "flavours",
    question: "What's your most popular flavour?",
    answer: "Our most popular flavour is Belgian Chocolate — it's rich, indulgent, and universally loved. For vanilla lovers, our Madagascar Vanilla Bean is a close second. For kids' cakes, Funfetti is the top choice, while Red Velvet leads for adult celebrations.",
    tags: ["most popular", "best flavour", "favourite flavour", "top flavour"]
  },
  {
    id: "faq-048",
    category: "flavours",
    question: "Can I have different flavours in different tiers?",
    answer: "Yes! Each tier can be a different flavour. A common combination is vanilla or chocolate bottom tier (safe for picky eaters) with a more adventurous flavour on top. You can also have different fillings and frostings per tier.",
    tags: ["different flavours per tier", "mixed flavours", "multiple flavours", "tier flavours"]
  },
  {
    id: "faq-049",
    category: "flavours",
    question: "Can I have different fillings inside the cake?",
    answer: "Absolutely. Each layer can have a different filling, or all layers can be the same. Popular filling combinations include chocolate cake with salted caramel filling or vanilla cake with raspberry curd. We have 12 filling options to choose from.",
    tags: ["fillings", "cake fillings", "different fillings", "filling options", "inside filling"]
  },
  {
    id: "faq-050",
    category: "flavours",
    question: "What frosting options are available?",
    answer: "We offer 10 frosting types: Vanilla Buttercream, Chocolate Buttercream, Cream Cheese, Swiss Meringue, Italian Meringue, Ganache, Royal Icing, Fondant, Whipped Cream, and Ermine. Your choice depends on the look you want and the occasion — Swiss Meringue is ideal for elegant weddings, while classic buttercream is perfect for birthdays.",
    tags: ["frosting", "icing", "buttercream", "frosting options", "frosting types"]
  },
  {
    id: "faq-051",
    category: "flavours",
    question: "Can I get a sample box to try flavours?",
    answer: "Yes! Our tasting box includes 4-6 flavour samples with matching frostings for $40-$60. If you place an order within 30 days, the tasting box cost is deducted from your final balance. Order through the chatbot.",
    tags: ["tasting box", "samples", "try flavours", "flavour sampler", "sample box"]
  },
  {
    id: "faq-052",
    category: "flavours",
    question: "What flavour goes best with chocolate cake?",
    answer: "Chocolate cake pairs beautifully with salted caramel filling, chocolate ganache, raspberry curd, or coffee buttercream. For frosting, chocolate buttercream or a white chocolate ganache complement it well.",
    tags: ["chocolate pairing", "chocolate flavour match", "what goes with chocolate"]
  },
  {
    id: "faq-053",
    category: "flavours",
    question: "What flavour goes best with vanilla cake?",
    answer: "Vanilla cake is versatile and pairs with almost anything. Popular combinations: vanilla cake with strawberry compote and vanilla buttercream, vanilla cake with lemon curd and cream cheese frosting, or vanilla cake with salted caramel and chocolate ganache.",
    tags: ["vanilla pairing", "vanilla flavour match", "what goes with vanilla"]
  },
  {
    id: "faq-054",
    category: "flavours",
    question: "Do you offer seasonal flavours?",
    answer: "Yes, we rotate seasonal specials throughout the year. Summer brings Mango & Passionfruit and Strawberry. Autumn features Apple & Cinnamon and Carrot. Winter offers Tiramisu and Black Forest. Spring highlights Pistachio & Rose and Earl Grey & Lavender.",
    tags: ["seasonal flavours", "limited edition", "seasonal specials", "summer flavours", "winter flavours"]
  },
  {
    id: "faq-055",
    category: "flavours",
    question: "Can I have a cake with different coloured layers inside?",
    answer: "Yes! Rainbow or ombré layered cakes are a fun option, especially for kids' birthdays and pride celebrations. The colour is achieved through food gel colouring. Let us know your colour preference and we'll create a surprise inside.",
    tags: ["rainbow cake", "coloured layers", "colour inside", "rainbow inside", "ombré cake"]
  },
  {
    id: "faq-056",
    category: "flavours",
    question: "Do you use real fruit in your cakes?",
    answer: "Yes, we use real fruit purees, curds, and fresh fruit in our fruit-based cakes. Our Strawberry cake uses fresh strawberry puree, our Lemon cake uses fresh lemon zest and juice, and our Mango & Passionfruit cake uses real tropical fruit purees.",
    tags: ["real fruit", "fresh fruit", "fruit cake ingredients", "natural fruit"]
  },
  {
    id: "faq-057",
    category: "flavours",
    question: "Are your cakes suitable for children?",
    answer: "Absolutely. Our Funfetti, Vanilla Bean, Belgian Chocolate, and Cookies & Cream flavours are especially popular with children. We can create kid-friendly designs with favourite characters, themes, and bright colours. All our ingredients are suitable for children.",
    tags: ["kids cake", "children cake", "cake for kids", "child-friendly", "children's cake"]
  },
  {
    id: "faq-058",
    category: "flavours",
    question: "Can I request a flavour you don't list?",
    answer: "We can often accommodate custom flavour requests. If you have a specific flavour in mind, mention it to the chatbot and we'll check with our team. Lead time may be longer for custom flavour development.",
    tags: ["custom flavour", "special flavour", "unique flavour", "flavour not listed"]
  },
  {
    id: "faq-059",
    category: "flavours",
    question: "What's the difference between Swiss Meringue and regular buttercream?",
    answer: "Swiss Meringue buttercream is made by heating egg whites and sugar before whipping with butter. It's silky, less sweet, and more stable than American buttercream (which is simply butter and powdered sugar). Swiss Meringue is our recommended choice for wedding cakes and outdoor events.",
    tags: ["swiss meringue", "buttercream difference", "frosting types", "meringue vs buttercream"]
  },
  {
    id: "faq-060",
    category: "flavours",
    question: "I'm not sure what flavour to choose — can you help?",
    answer: "Of course! Think about: is this for adults or kids? What's the season? What's the main dessert served alongside the cake? If you're truly stuck, our Belgian Chocolate and Vanilla Bean are crowd-pleasers that work for any occasion. Or you can choose 'Surprise me' and let our team pick a winning combination.",
    tags: ["need flavour help", "flavour advice", "can't decide flavour", "flavour recommendation"]
  },

  // ───── DIETARY & ALLERGENS (20) ─────
  {
    id: "faq-061",
    category: "dietary",
    question: "Do you offer eggless cakes?",
    answer: "Yes! Most of our classic and premium flavours are available eggless. Our eggless recipes use plant-based binders and alternative leavening agents. Popular eggless options include Belgian Chocolate, Vanilla Bean, Lemon, Funfetti, and Salted Caramel.",
    tags: ["eggless", "no eggs", "egg free", "without eggs", "egg allergy"]
  },
  {
    id: "faq-062",
    category: "dietary",
    question: "Do you offer gluten-free cakes?",
    answer: "Yes, we offer gluten-free versions of select flavours including Belgian Chocolate, Lemon, Strawberry, Salted Caramel, and Coconut. Our gluten-free cakes use certified gluten-free flour blends. A surcharge of $20-$40 applies due to specialty ingredient costs.",
    tags: ["gluten free", "gluten-free", "coeliac", "celiac", "wheat free", "no gluten"]
  },
  {
    id: "faq-063",
    category: "dietary",
    question: "Do you offer vegan cakes?",
    answer: "Yes, we offer vegan cakes made without any animal products — no eggs, dairy, or honey. Available flavours include Belgian Chocolate, Vanilla Bean, Lemon, Strawberry, Salted Caramel, and Coconut. A surcharge of $15-$30 applies.",
    tags: ["vegan", "plant based", "dairy free", "no animal products", "vegan cake"]
  },
  {
    id: "faq-064",
    category: "dietary",
    question: "Do you offer nut-free cakes?",
    answer: "Yes, many of our flavours are available nut-free, including Vanilla Bean, Belgian Chocolate, Lemon, Strawberry, Red Velvet, Funfetti, Salted Caramel, Cookies & Cream, and Blueberry. We use dedicated equipment for nut-free preparation. However, our kitchen handles nuts — please discuss severe allergies directly with a designer.",
    tags: ["nut free", "nut-free", "no nuts", "nut allergy", "peanut free"]
  },
  {
    id: "faq-065",
    category: "dietary",
    question: "Can you guarantee your cakes are completely allergen-free?",
    answer: "We cannot guarantee an allergen-free environment. Our kitchen handles eggs, dairy, gluten, nuts, and soy. While we use dedicated equipment and procedures for dietary orders, we recommend customers with severe allergies speak directly with a designer before ordering. Your safety is our priority.",
    tags: ["allergen free", "allergy guarantee", "safe for allergies", "cross contamination"]
  },
  {
    id: "faq-066",
    category: "dietary",
    question: "Do you do dairy-free cakes?",
    answer: "Yes, we offer dairy-free versions of select flavours including Belgian Chocolate, Vanilla Bean, Lemon, Strawberry, and Salted Caramel. Our dairy-free cakes use plant-based milks and butters. A surcharge of $15-$30 applies.",
    tags: ["dairy free", "lactose free", "no dairy", "dairy allergy", "milk free"]
  },
  {
    id: "faq-067",
    category: "dietary",
    question: "Do you offer keto or low-sugar cakes?",
    answer: "We offer low-sugar and no-added-sugar options in Vanilla Bean, Belgian Chocolate, Lemon, and Coconut flavours. These use natural sweeteners where possible. Please note that low-sugar cakes may have a different texture and shorter shelf life. We do not currently offer keto-specific cakes.",
    tags: ["keto", "low sugar", "no sugar", "sugar free", "keto cake", "low carb"]
  },
  {
    id: "faq-068",
    category: "dietary",
    question: "Can I combine dietary requirements?",
    answer: "Some combinations are possible (e.g., eggless + nut-free, vegan + gluten-free). Others are challenging (vegan + eggless is redundant — vegan already excludes eggs). Discuss your specific combination with a designer and we'll see what's achievable. Lead time may be longer for combined dietary orders.",
    tags: ["combined dietary", "multiple dietary", "dietary combinations", "dietary restrictions together"]
  },
  {
    id: "faq-069",
    category: "dietary",
    question: "How do you handle cross-contamination risks?",
    answer: "We use dedicated equipment, utensils, and preparation surfaces for dietary orders. Our team follows strict cleaning protocols between orders. However, our kitchen is not a dedicated allergen-free facility. Customers with life-threatening allergies must confirm with a designer before ordering.",
    tags: ["cross contamination", "contamination risk", "kitchen practices", "allergen cross contact"]
  },
  {
    id: "faq-070",
    category: "dietary",
    question: "Do you use nuts in any of your standard cakes?",
    answer: "Some of our cakes contain nuts or are made in an environment where nuts are present. Carrot cake contains walnuts, Coconut cake contains coconut (technically a fruit but considered a tree nut allergen by some), and Pistachio & Rose contains pistachios. Our nut-free flavours are prepared with dedicated equipment.",
    tags: ["nuts in cakes", "which cakes have nuts", "nut ingredients", "nut containing"]
  },
  {
    id: "faq-071",
    category: "dietary",
    question: "Do you offer halal cakes?",
    answer: "We do not currently offer certified halal cakes. Our gelatines are beef-derived, and our flavourings do not contain alcohol. Please contact a designer to discuss specific halal requirements.",
    tags: ["halal", "halal cake", "halal certified", "halal requirements"]
  },
  {
    id: "faq-072",
    category: "dietary",
    question: "Do you use any alcohol in your cakes?",
    answer: "Some of our flavours may contain trace alcohol in extracts (e.g., vanilla extract). Our Tiramisu cake contains coffee liqueur in the soaking syrup, and our Black Forest cake may include Kirsch. We can omit alcohol on request — just let the chatbot know.",
    tags: ["alcohol in cake", "alcohol free", "no alcohol", "boozy cake", "cake alcohol content"]
  },
  {
    id: "faq-073",
    category: "dietary",
    question: "Are your cake colourings natural?",
    answer: "We use a mix of natural and conventional food colourings. Natural colourings (fruit and vegetable powders, turmeric, Spirulina, beetroot) are available on request but may produce less vibrant colours. If you prefer natural colours only, please specify when ordering.",
    tags: ["natural colouring", "food colouring", "natural colours", "artificial colours", "natural dye"]
  },
  {
    id: "faq-074",
    category: "dietary",
    question: "Do you have soy-free options?",
    answer: "Some of our ingredients contain soy (particularly our eggless recipes which use soy-based binders). If you need a soy-free cake, please discuss with a designer who can review ingredient lists and suggest suitable options.",
    tags: ["soy free", "no soy", "soy allergy", "soy intolerance"]
  },
  {
    id: "faq-075",
    category: "dietary",
    question: "Do you cater for kosher diets?",
    answer: "We are not a kosher-certified kitchen. If you have specific kosher requirements, please contact a designer to discuss what we can accommodate.",
    tags: ["kosher", "kosher cake", "kosher diet", "kosher requirements"]
  },
  {
    id: "faq-076",
    category: "dietary",
    question: "Can you make cakes without artificial additives?",
    answer: "We can accommodate requests for no artificial colours, flavours, or preservatives. Our standard recipes already avoid artificial preservatives. Please specify any additive concerns in your order notes.",
    tags: ["natural cake", "no additives", "no preservatives", "clean ingredients", "natural ingredients"]
  },
  {
    id: "faq-077",
    category: "dietary",
    question: "Is there an extra cost for dietary cakes?",
    answer: "Eggless and nut-free options have no additional charge. Gluten-free cakes cost $20-$40 more due to certified gluten-free flour costs. Vegan and dairy-free cakes cost $15-$30 more due to plant-based ingredient costs. Low-sugar options are $10-$20 more. Your quote will itemise any dietary surcharges.",
    tags: ["dietary surcharge", "dietary extra cost", "allergy friendly cost", "special diet price"]
  },
  {
    id: "faq-078",
    category: "dietary",
    question: "Can I order a cake that's both eggless and gluten-free?",
    answer: "Yes, we can make cakes that are both eggless and gluten-free. This combination is popular for customers with multiple dietary needs. Lead time may be slightly longer. Discuss with a designer for best flavour options.",
    tags: ["eggless and gluten free", "combined restrictions", "multiple dietary needs"]
  },
  {
    id: "faq-079",
    category: "dietary",
    question: "Do you list ingredients on the cake?",
    answer: "A full ingredient list is available upon request. We recommend anyone with allergies or dietary restrictions review the ingredient list with their designer before placing an order.",
    tags: ["ingredients list", "allergen list", "what's in the cake", "ingredient information"]
  },
  {
    id: "faq-080",
    category: "dietary",
    question: "Are your fondant and icing vegan-friendly?",
    answer: "Our standard fondant (sugar paste) is typically vegan as it contains no animal products. Our buttercreams are not vegan as they contain butter. For vegan cakes, we use plant-based butter alternatives. Please confirm specific dietary needs with your designer.",
    tags: ["vegan fondant", "vegan icing", "fondant ingredients", "icing ingredients"]
  },

  // ───── DELIVERY & COLLECTION (15) ─────
  {
    id: "faq-081",
    category: "delivery",
    question: "Do you deliver?",
    answer: "Yes, we deliver within a 25-mile radius of our London bakery. Delivery fees range from $15 to $60 depending on distance. Enter your postcode in the chatbot to check if you're in our delivery zone.",
    tags: ["delivery", "do you deliver", "delivery service", "home delivery"]
  },
  {
    id: "faq-082",
    category: "delivery",
    question: "How much is delivery?",
    answer: "Standard delivery is $15-$30 depending on distance. Weekend delivery carries a $25 surcharge. Collection from our bakery is free. Your designer will confirm the delivery fee in your quote.",
    tags: ["delivery cost", "delivery price", "how much delivery", "delivery fee amount"]
  },
  {
    id: "faq-083",
    category: "delivery",
    question: "Do you deliver on weekends?",
    answer: "Yes, we offer Saturday and Sunday delivery with a $25 surcharge on the standard delivery fee. Weekend delivery slots are limited and should be booked early. We do not deliver on Easter Sunday, Christmas Day, or New Year's Day.",
    tags: ["weekend delivery", "saturday delivery", "sunday delivery", "weekend"]
  },
  {
    id: "faq-084",
    category: "delivery",
    question: "What areas do you deliver to?",
    answer: "We deliver within a 25-mile radius of our London bakery, covering Central London, Greater London, and selected areas of Surrey, Kent, Essex, and Hertfordshire. Enter your postcode in the chatbot for a specific check.",
    tags: ["delivery area", "delivery zone", "where do you deliver", "delivery coverage", "service area"]
  },
  {
    id: "faq-085",
    category: "delivery",
    question: "Can I collect my cake instead?",
    answer: "Yes, collection is free from our London bakery. Collections are by appointment during business hours. Please bring your order confirmation and arrive at your scheduled time. We recommend having a flat, non-slip surface in your car (boot or back seat floor) for transport.",
    tags: ["collection", "pick up", "collect cake", "self collection", "pickup"]
  },
  {
    id: "faq-086",
    category: "delivery",
    question: "How is the cake packaged for delivery?",
    answer: "All cakes are delivered in sturdy branded cardboard boxes with non-slip bases. Multi-tier cakes are assembled on-site. Each box includes care instructions. Our delivery team will place the cake in your chosen location.",
    tags: ["packaging", "cake box", "delivery packaging", "how is it packed"]
  },
  {
    id: "faq-087",
    category: "delivery",
    question: "What if I'm not home when you deliver?",
    answer: "We require someone to be present to receive the cake. If you can't be there, you can nominate someone else (please inform us in advance). We do not leave cakes on doorsteps or with reception desks unless pre-arranged and approved.",
    tags: ["missed delivery", "not home", "missed delivery", "delivery no one home"]
  },
  {
    id: "faq-088",
    category: "delivery",
    question: "Do you deliver to venues like hotels or event spaces?",
    answer: "Yes, we regularly deliver to hotels, community halls, and event venues. Ensure someone from your event team is available to receive the cake and sign the delivery note. Venue delivery in advance of your event time is common — we can coordinate directly with the venue.",
    tags: ["venue delivery", "hotel delivery", "event space", "venue", "delivery to venue"]
  },
  {
    id: "faq-089",
    category: "delivery",
    question: "Do you deliver in extreme weather?",
    answer: "We monitor weather conditions carefully. In very hot weather (over 30°C), we recommend buttercream cakes and may suggest air-conditioned delivery vehicles. In severe weather, we'll contact you to discuss alternatives. We prioritise cake safety above all.",
    tags: ["weather", "hot weather delivery", "cold weather", "rain delivery", "extreme weather"]
  },
  {
    id: "faq-090",
    category: "delivery",
    question: "Can you set up the cake at my venue?",
    answer: "Yes, basic setup (placing the cake and topper on the table) is included. Full dessert table styling including cupcakes, cookies, and decorations is available as an add-on service from $100. We'll need access to the venue at least 30 minutes before your event.",
    tags: ["setup", "cake setup", "venue setup", "table setup", "delivery setup"]
  },
  {
    id: "faq-091",
    category: "delivery",
    question: "What if my cake is damaged during delivery?",
    answer: "While rare, if damage occurs during delivery, please note it on the delivery note and send photos to hello@cakecanvas.com within 30 minutes. We will assess and arrange a solution — typically a partial refund or, if time permits, a repair.",
    tags: ["damaged cake", "delivery damage", "cake damaged", "broken cake"]
  },
  {
    id: "faq-092",
    category: "delivery",
    question: "Can you deliver to different addresses than the billing address?",
    answer: "Yes, we can deliver to a separate address. Just provide the delivery address during the ordering process. We may need to verify the billing address for payment purposes.",
    tags: ["different address", "separate delivery", "delivery vs billing", "different delivery address"]
  },
  {
    id: "faq-093",
    category: "delivery",
    question: "Do you offer same-day delivery?",
    answer: "We do not offer same-day delivery. Minimum lead time for any order is 10 days, and delivery is scheduled as part of the production timeline. If you need a cake urgently, please contact us and we'll advise on what's possible.",
    tags: ["same day delivery", "immediate delivery", "today delivery", "urgent delivery"]
  },
  {
    id: "faq-094",
    category: "delivery",
    question: "What time do you deliver?",
    answer: "Deliveries are typically scheduled between 9:00 AM and 5:00 PM. You can request a preferred time window (morning or afternoon) and we'll do our best to accommodate. Premium delivery offers a narrower 2-hour window.",
    tags: ["delivery time", "delivery schedule", "when do you deliver", "delivery window"]
  },
  {
    id: "faq-095",
    category: "delivery",
    question: "Is there a minimum order for delivery?",
    answer: "Yes, the minimum order for delivery is $50. Orders under $50 can be collected from our bakery.",
    tags: ["minimum delivery", "delivery minimum order", "minimum for delivery"]
  },

  // ───── TIMELINE & LEAD TIMES (10) ─────
  {
    id: "faq-096",
    category: "timeline",
    question: "How long does it take to make a custom cake?",
    answer: "From order confirmation to delivery, we recommend allowing 21 days. This includes design planning, ingredient sourcing, baking, decorating, and setting. Simpler cakes may take less time; complex multi-tier cakes may require more.",
    tags: ["how long", "production time", "baking time", "how long to make", "cake preparation"]
  },
  {
    id: "faq-097",
    category: "timeline",
    question: "Can you make a cake in 2 weeks?",
    answer: "Orders placed 10-21 days before the event can often be accommodated but are subject to a $50 rush fee and availability. Contact us as early as possible so we can check our production schedule.",
    tags: ["2 weeks", "14 days", "short notice", "two weeks"]
  },
  {
    id: "faq-098",
    category: "timeline",
    question: "Can you make a cake in 1 week?",
    answer: "With only 7 days or fewer until your event, we cannot typically guarantee a custom cake. Please contact us and we'll check if we have any capacity. For urgent needs, we may suggest a simpler design or refer you to alternatives.",
    tags: ["1 week", "7 days", "one week", "very short notice"]
  },
  {
    id: "faq-099",
    category: "timeline",
    question: "How long does a tasting box take to arrive?",
    answer: "Tasting boxes are typically available for collection or delivery within 3-5 business days of ordering. Delivery of tasting boxes carries the same delivery fee as cake delivery.",
    tags: ["tasting box timeline", "tasting box delivery time", "sample box lead time"]
  },
  {
    id: "faq-100",
    category: "timeline",
    question: "How soon will I hear from a designer after submitting my request?",
    answer: "A designer will review your submission and reach out within 24 hours on business days. You'll receive an instant confirmation with a reference number as soon as you submit.",
    tags: ["designer response", "how long to hear back", "response time", "designer contact"]
  },
  {
    id: "faq-101",
    category: "timeline",
    question: "When should I order for a wedding?",
    answer: "For wedding cakes, we recommend ordering 2-3 months in advance. This allows time for consultation, tasting, design finalisation, and production. Peak wedding season (May-September) requires earlier booking. We can sometimes accommodate shorter timelines — enquire and we'll check.",
    tags: ["wedding timeline", "wedding lead time", "when to order wedding", "wedding booking"]
  },
  {
    id: "faq-102",
    category: "timeline",
    question: "When should I order for a birthday?",
    answer: "For birthday cakes, 21 days is ideal. If your child's birthday is coming up, we recommend ordering at least 3 weeks in advance — especially for themed cakes that require custom moulds or toppers.",
    tags: ["birthday timeline", "birthday lead time", "when to order birthday"]
  },
  {
    id: "faq-103",
    category: "timeline",
    question: "Do you make cakes for last-minute events?",
    answer: "We do our best to accommodate last-minute requests, but availability depends on our current production schedule. Orders with fewer than 10 days notice require manager approval. Submit your request through the chatbot and we'll check.",
    tags: ["last minute", "emergency cake", "urgent order", "quick turnaround"]
  },
  {
    id: "faq-104",
    category: "timeline",
    question: "How far in advance should I book a dessert table?",
    answer: "Dessert tables require more planning due to the variety of items and setup coordination. We recommend booking at least 4-6 weeks in advance, especially for larger events.",
    tags: ["dessert table lead time", "dessert table booking", "dessert table timeline"]
  },
  {
    id: "faq-105",
    category: "timeline",
    question: "What is your busiest season?",
    answer: "Our busiest period is May through September, with peak demand in June (wedding season) and December (holiday parties). Ordering well in advance during these months is strongly recommended. We also see high demand around Mother's Day, Valentine's Day, and Easter.",
    tags: ["busy season", "peak season", "busiest time", "high demand"]
  },

  // ───── IMAGE & DESIGN (15) ─────
  {
    id: "faq-106",
    category: "image",
    question: "What kind of photo should I upload?",
    answer: "A clear, well-lit photo of the cake or design you like. Natural daylight is best. If you're sharing a cake you saw on social media, try to find the original post and share the link or a clean screenshot. Multiple angles are helpful — a top view and a side view give our designers the most information.",
    tags: ["photo guidance", "what photo to upload", "inspiration photo", "reference photo"]
  },
  {
    id: "faq-107",
    category: "image",
    question: "Why does my photo need to be good quality?",
    answer: "Our designers need to see details clearly — colours, textures, piping work, and structural elements. A blurry or dark photo hides these details and makes it harder for us to understand your vision. The chatbot checks your photo automatically and gives specific feedback if something needs improvement.",
    tags: ["why quality matters", "photo quality importance", "clear photo needed"]
  },
  {
    id: "faq-108",
    category: "image",
    question: "My photo was rejected — what should I do?",
    answer: "Don't worry — the chatbot will tell you exactly what's wrong and how to fix it. Common fixes: move to natural light, hold the phone steady, clean your camera lens, or step back to include the whole cake. You can retake the photo or skip and describe your vision instead.",
    tags: ["photo rejected", "bad photo", "photo not accepted", "photo failed", "retake photo"]
  },
  {
    id: "faq-109",
    category: "image",
    question: "What if I don't have a photo?",
    answer: "No problem at all! You can tell us what you're looking for in words — describe the style, colours, theme, and any elements you like. Many of our best cakes started with just a description. The chatbot will guide you with questions.",
    tags: ["no photo", "no inspiration photo", "don't have photo", "describe instead"]
  },
  {
    id: "faq-110",
    category: "image",
    question: "Can I upload multiple photos?",
    answer: "Currently, the chatbot accepts one primary inspiration image. However, you can include additional references and links in the notes field before submitting. Your designer will review all materials provided.",
    tags: ["multiple photos", "several photos", "more than one photo", "multiple images"]
  },
  {
    id: "faq-111",
    category: "image",
    question: "What file formats do you accept?",
    answer: "We accept JPEG, PNG, HEIC, and WebP formats. Maximum file size is 10 MB. Minimum resolution is 800 x 600 pixels.",
    tags: ["file format", "accepted formats", "image format", "file type", "photo format"]
  },
  {
    id: "faq-112",
    category: "image",
    question: "Is there a maximum file size for photos?",
    answer: "The maximum file size is 10 MB per image. If your photo is larger, try reducing the resolution or compressing it before uploading.",
    tags: ["file size", "max file size", "photo size limit", "size limit"]
  },
  {
    id: "faq-113",
    category: "image",
    question: "Can I take a photo with my camera through the chatbot?",
    answer: "Yes! On mobile devices, you can take a photo directly through the chatbot using your camera. The image will be checked by our quality heuristics immediately.",
    tags: ["camera capture", "take photo", "use camera", "camera in chat"]
  },
  {
    id: "faq-114",
    category: "image",
    question: "What happens after I upload a photo?",
    answer: "The chatbot checks the photo quality instantly — usually within half a second. If it passes, the photo is saved and sent to our AI assistant for a description, which you'll be asked to confirm later. The chatbot continues asking other questions while the AI processes.",
    tags: ["after upload", "what happens to photo", "photo processing", "upload process"]
  },
  {
    id: "faq-115",
    category: "image",
    question: "Can I use a photo from Pinterest or Instagram?",
    answer: "Yes, you can upload a screenshot or save the image. For best results, try to find the highest-resolution version. Please note: we will create an original cake inspired by your reference — we don't copy other bakeries' work exactly.",
    tags: ["pinterest photo", "instagram photo", "social media photo", "online image"]
  },
  {
    id: "faq-116",
    category: "image",
    question: "My photo is a screenshot — is that okay?",
    answer: "Screenshots are often lower resolution and may be cropped. If possible, save the original image instead. If a screenshot is all you have, upload it and the chatbot will check if it meets our minimum quality standards.",
    tags: ["screenshot", "screen capture", "screenshot photo"]
  },
  {
    id: "faq-117",
    category: "image",
    question: "What lighting is best for cake photos?",
    answer: "Natural daylight is best. Place the cake near a window but out of direct sunlight. Avoid yellow indoor lighting (it makes white icing look dull) and never use flash (it creates harsh shadows and washes out colours).",
    tags: ["lighting", "photo lighting", "best light for photo", "cake photography"]
  },
  {
    id: "faq-118",
    category: "image",
    question: "How do I take a good cake photo with my phone?",
    answer: "Clean your lens, use natural light, hold the phone steady (two hands or rest on a surface), and capture the whole cake. Tap the screen to focus on the cake before shooting. Take multiple angles — top-down and side views are most helpful.",
    tags: ["phone photo tips", "smartphone photo", "how to photograph", "cake photography tips"]
  },
  {
    id: "faq-119",
    category: "image",
    question: "Will my photo be shown to other customers?",
    answer: "We may use photos of finished cakes (not reference images) in our portfolio with customer permission. Your inspiration photo is used only to guide your cake design and will not be shared publicly without your consent.",
    tags: ["photo privacy", "photo sharing", "my photo usage", "image privacy"]
  },
  {
    id: "faq-120",
    category: "image",
    question: "Can I describe my design in words instead?",
    answer: "Absolutely. If you choose to skip the photo, the chatbot will ask: what style (elegant, fun, rustic, modern), colours, theme, and any specific elements you want. The more detail you can give, the better our designers can interpret your vision.",
    tags: ["describe design", "words instead of photo", "text description", "describe cake"]
  },

  // ───── PAYMENTS & DEPOSITS (10) ─────
  {
    id: "faq-121",
    category: "payments",
    question: "What payment methods do you accept?",
    answer: "We accept credit and debit cards (Visa, Mastercard, Amex), bank transfers, and cash (for collection only). Secure payment links are sent via email.",
    tags: ["payment methods", "how to pay", "pay", "payment options", "accepted payments"]
  },
  {
    id: "faq-122",
    category: "payments",
    question: "Do I need to pay a deposit?",
    answer: "Yes, a 50% deposit is required to secure your order date. The remaining balance is due 14 days before your event. Your designer will send a secure payment link.",
    tags: ["deposit", "down payment", "deposit required", "how much deposit"]
  },
  {
    id: "faq-123",
    category: "payments",
    question: "When is the full payment due?",
    answer: "The remaining 50% balance is due 14 days before your event date. If the balance isn't paid by this date, your order may be subject to cancellation.",
    tags: ["payment due", "balance due", "full payment", "when to pay"]
  },
  {
    id: "faq-124",
    category: "payments",
    question: "Can I pay in instalments?",
    answer: "We offer a payment plan: 50% deposit to secure the date, and the remaining 50% due 14 days before the event. Custom payment plans may be available for large orders — please discuss with your designer.",
    tags: ["instalments", "payment plan", "pay in parts", "partial payments"]
  },
  {
    id: "faq-125",
    category: "payments",
    question: "Is my payment secure?",
    answer: "Yes. Payment links are processed through secure, encrypted payment gateways. We do not store your card details. Your financial information is handled entirely by the payment processor.",
    tags: ["secure payment", "payment security", "safe payment", "encrypted payment"]
  },
  {
    id: "faq-126",
    category: "payments",
    question: "Do you offer invoices for corporate orders?",
    answer: "Yes, we provide detailed invoices with company information, VAT/tax details, and itemised costs. Corporate orders can be invoiced with Net-30 terms for approved accounts. Please specify your requirements when ordering.",
    tags: ["invoice", "corporate invoice", "business invoice", "receipt", "tax invoice"]
  },
  {
    id: "faq-127",
    category: "payments",
    question: "Can I get a refund if I cancel after paying the deposit?",
    answer: "If you cancel more than 14 days before your event, you'll receive a full refund (minus any non-refundable items like custom toppers). 7-14 days: 50% refund. Less than 7 days: non-refundable. See our cancellation policy for details.",
    tags: ["deposit refund", "cancel after deposit", "refund deposit", "deposit cancellation"]
  },
  {
    id: "faq-128",
    category: "payments",
    question: "What currency are your prices in?",
    answer: "All prices are listed in US dollars ($). We accept payment in USD. If you're paying from an international bank account, please check with your bank about currency conversion fees.",
    tags: ["currency", "dollars", "pricing currency", "usd", "what currency"]
  },
  {
    id: "faq-129",
    category: "payments",
    question: "Do you charge taxes?",
    answer: "Applicable sales tax/VAT will be added to your quote based on your delivery location. Your quote will clearly show all taxes and fees.",
    tags: ["tax", "vat", "sales tax", "taxes", "additional charges tax"]
  },
  {
    id: "faq-130",
    category: "payments",
    question: "Can someone else pay for my order?",
    answer: "Yes, the payment link can be forwarded to another person. Just let us know if someone else will be handling payment so we can address the invoice appropriately.",
    tags: ["someone else pay", "gift payment", "third party payment", "pay for someone"]
  },

  // ───── CANCELLATIONS & REFUNDS (10) ─────
  {
    id: "faq-131",
    category: "cancellations",
    question: "What is your cancellation policy?",
    answer: "Cancellations more than 14 days before your event: full refund. 7-14 days: 50% refund. Less than 7 days: non-refundable. Refunds are processed within 5-10 business days to the original payment method.",
    tags: ["cancellation policy", "cancel order", "how to cancel", "cancellation"]
  },
  {
    id: "faq-132",
    category: "cancellations",
    question: "How do I cancel my order?",
    answer: "Contact us at hello@cakecanvas.com with your order reference number. Our team will process your cancellation and inform you of the refund amount based on our cancellation policy.",
    tags: ["cancel", "cancel how", "how to cancel", "cancellation process"]
  },
  {
    id: "faq-133",
    category: "cancellations",
    question: "Can I reschedule my order instead of cancelling?",
    answer: "Yes, we can usually transfer your deposit and order to a new date within 3 months of the original, subject to availability. Contact us as early as possible to reschedule. Price changes may apply if the new date falls in a different season or requires a different cake size.",
    tags: ["reschedule", "reschedule order", "change date", "move date", "postpone"]
  },
  {
    id: "faq-134",
    category: "cancellations",
    question: "Can I get a refund if CakeCanvas cancels my order?",
    answer: "Yes, if CakeCanvas cancels due to unforeseen circumstances (bakery closure, staff illness, etc.), a full refund will be issued regardless of the cancellation timeline.",
    tags: ["bakery cancels", "they cancelled", "cancelled by bakery", "our fault cancellation"]
  },
  {
    id: "faq-135",
    category: "cancellations",
    question: "What items are non-refundable?",
    answer: "Custom cake toppers and personalised decorations ordered specifically for your cake are non-refundable. Tasting box fees are non-refundable but are deducted from your final order if placed within 30 days. Delivery fees are non-refundable if delivery occurred.",
    tags: ["non refundable", "no refund", "what can't be refunded", "non-refundable items"]
  },
  {
    id: "faq-136",
    category: "cancellations",
    question: "How long do refunds take?",
    answer: "Refunds are processed within 5-10 business days to the original payment method. Your bank may take additional time to reflect the refund in your account.",
    tags: ["refund time", "refund processing", "how long refund", "refund wait"]
  },
  {
    id: "faq-137",
    category: "cancellations",
    question: "Can I cancel my order through the chatbot?",
    answer: "The chatbot cannot process cancellations. Please email hello@cakecanvas.com with your reference number. The chatbot will note your request and escalate it to our team.",
    tags: ["chatbot cancel", "cancel in chat", "cancel through bot"]
  },
  {
    id: "faq-138",
    category: "cancellations",
    question: "What if my event is cancelled due to circumstances beyond my control?",
    answer: "We understand things happen. Contact us as soon as possible with your reference number. We review these situations on a case-by-case basis and will work with you to find a fair solution — whether that's rescheduling, a partial refund, or a credit.",
    tags: ["event cancelled", "force majeure", "circumstances", "emergency cancellation"]
  },
  {
    id: "faq-139",
    category: "cancellations",
    question: "What if I need to change my order after it's in production?",
    answer: "Once production has started (typically within 7 days of the event), we cannot make changes. If you realise a change is needed, contact us immediately and we'll assess what's possible without compromising the cake.",
    tags: ["change in production", "late change", "production change", "too late to change"]
  },
  {
    id: "faq-140",
    category: "cancellations",
    question: "Do you offer store credit instead of a refund?",
    answer: "Yes, we can offer store credit for the full amount if you'd prefer to rebook at a later date. Store credit never expires and can be used toward any future CakeCanvas order.",
    tags: ["store credit", "credit", "voucher", "credit instead of refund"]
  },

  // ───── QUALITY & STORAGE (10) ─────
  {
    id: "faq-141",
    category: "storage",
    question: "How should I store my cake?",
    answer: "Buttercream and ganache cakes can be stored at room temperature (out of direct sunlight) for 1-2 days. In warmer weather, refrigerate. Cream cheese and fresh cream cakes must be refrigerated. Fondant-covered cakes should not be refrigerated as condensation damages the finish. Your delivery will include specific care instructions.",
    tags: ["storage", "keep cake", "cake storage", "how to store", "store cake"]
  },
  {
    id: "faq-142",
    category: "storage",
    question: "Does the cake need to be refrigerated?",
    answer: "It depends on the type. Buttercream and ganache cakes are fine at room temperature. Cakes with cream cheese frosting, whipped cream, fresh fruit, or custard fillings must be refrigerated. Fondant cakes should not be refrigerated. Follow the care instructions provided with your cake.",
    tags: ["refrigerate", "fridge", "refrigeration", "keep cold", "cool storage"]
  },
  {
    id: "faq-143",
    category: "storage",
    question: "How long will the cake stay fresh?",
    answer: "Most of our cakes are best enjoyed within 2-3 days of delivery/collection. Buttercream cakes can last 4-5 days when stored properly. Cakes with fresh fruit or cream are best eaten within 24 hours. We always recommend enjoying your cake as fresh as possible.",
    tags: ["freshness", "how long fresh", "shelf life", "best before", "cake lifetime"]
  },
  {
    id: "faq-144",
    category: "storage",
    question: "Can I freeze my cake?",
    answer: "Yes, most of our cakes freeze well (without fondant decorations). Wrap individual slices tightly in cling film then foil, and freeze for up to 3 months. Thaw in the refrigerator overnight. Fondant decorations may not freeze well — remove them before freezing.",
    tags: ["freeze", "freezing cake", "can you freeze", "frozen cake", "freeze leftovers"]
  },
  {
    id: "faq-145",
    category: "storage",
    question: "How do I transport my cake?",
    answer: "If collecting, place the cake box on a flat, non-slip surface in your car (boot or back seat floor). Avoid boot wells that tilt. Drive carefully, avoid sharp turns. Keep the cake level at all times. For fondant cakes, avoid refrigerating before transport as condensation will ruin the finish.",
    tags: ["transport", "car transport", "moving cake", "travel with cake"]
  },
  {
    id: "faq-146",
    category: "storage",
    question: "Can I prepare my cake the night before?",
    answer: "If refrigerated, remove the cake 1-2 hours before serving to bring it to room temperature (buttercream cakes taste best at room temperature). For fondant cakes, do not refrigerate — they should remain at room temperature in a cool, dry place.",
    tags: ["night before", "prepare ahead", "before serving", "prep cake"]
  },
  {
    id: "faq-147",
    category: "storage",
    question: "What if my cake arrives damaged?",
    answer: "Inspect your cake upon delivery/collection. If there's damage, note it on the delivery note and email photos to hello@cakecanvas.com within 30 minutes. We'll assess and arrange a solution — typically a partial refund or repair if possible.",
    tags: ["arrived damaged", "damaged upon arrival", "cake arrived broken", "delivery damage"]
  },
  {
    id: "faq-148",
    category: "storage",
    question: "Do you use any preservatives?",
    answer: "No, all our cakes are made with fresh ingredients and contain no artificial preservatives. This is why we recommend enjoying your cake within a few days of receiving it.",
    tags: ["preservatives", "no preservatives", "artificial ingredients", "fresh ingredients"]
  },
  {
    id: "faq-149",
    category: "storage",
    question: "Why does my buttercream cake taste different after refrigeration?",
    answer: "Buttercream hardens when cold, which mutes the flavour and changes the texture. For best flavour, remove buttercream cakes from the refrigerator 1-2 hours before serving. This allows the buttercream to soften and the flavours to fully develop.",
    tags: ["buttercream cold", "refrigerated taste", "cake taste after fridge", "buttercream texture"]
  },
  {
    id: "faq-150",
    category: "storage",
    question: "Can I leave my cake out overnight?",
    answer: "Buttercream and ganache cakes can be left at room temperature overnight if covered. Cream cheese, fresh cream, and fruit-filled cakes must be refrigerated overnight. Fondant cakes should be kept in a cool, dry place — not refrigerated.",
    tags: ["leave out", "overnight", "room temperature", "cake out overnight"]
  },

  // ───── CORPORATE & EVENTS (5) ─────
  {
    id: "faq-151",
    category: "corporate",
    question: "Do you do corporate or branded cakes?",
    answer: "Yes! We create branded cakes for office parties, product launches, and company milestones. We can reproduce logos in icing, match brand colours, and create edible image prints. Corporate orders start from $120. Volume discounts may apply.",
    tags: ["corporate cake", "branded cake", "logo cake", "business cake", "company cake"]
  },
  {
    id: "faq-152",
    category: "corporate",
    question: "Can you reproduce my company logo on a cake?",
    answer: "Yes, we can reproduce logos using edible image printing (from $20 per image) or hand-piped/airbrushed for a more premium look. We'll need a high-resolution version of your logo — vector files (AI, EPS, SVG) work best.",
    tags: ["logo on cake", "company logo", "brand logo", "edible logo", "logo reproduction"]
  },
  {
    id: "faq-153",
    category: "corporate",
    question: "Do you offer corporate accounts or invoicing?",
    answer: "Yes, we offer corporate accounts with Net-30 payment terms for approved businesses. We provide detailed invoices with company information, itemised costs, and VAT/tax details. Contact us through the chatbot to set up a corporate account.",
    tags: ["corporate account", "business account", "net 30", "corporate billing"]
  },
  {
    id: "faq-154",
    category: "corporate",
    question: "What's the minimum order for corporate events?",
    answer: "Corporate cake orders start from $120. For dessert tables and larger events, minimum spend is $250. Cupcake orders for corporate events have a minimum of 12 cupcakes.",
    tags: ["corporate minimum", "business minimum order", "corporate order minimum"]
  },
  {
    id: "faq-155",
    category: "corporate",
    question: "How far in advance should corporate events order?",
    answer: "We recommend 3-4 weeks for corporate orders. For large events (50+ servings or dessert tables), 4-6 weeks is advised. Rush orders (10-21 days) may be accommodated with a $50 rush fee.",
    tags: ["corporate lead time", "corporate timeline", "business order timing"]
  },

  // ───── CUPCAKES & DESSERT TABLES (5) ─────
  {
    id: "faq-156",
    category: "cupcakes",
    question: "How many cupcakes do I need per person?",
    answer: "For events where cupcakes are the only dessert, plan on 1.5-2 cupcakes per person. If cupcakes accompany a main cake, 1 per person is usually sufficient. Our team can help you calculate the right quantity.",
    tags: ["cupcakes per person", "how many cupcakes", "cupcake quantity", "serving cupcakes"]
  },
  {
    id: "faq-157",
    category: "cupcakes",
    question: "Can cupcakes match my main cake design?",
    answer: "Yes! We can decorate cupcakes to match your main cake in colour, theme, and style. Matching sets are very popular for weddings and events. A standard matching set includes a mini version of the cake design on each cupcake.",
    tags: ["matching cupcakes", "cupcake match cake", "coordinating cupcakes"]
  },
  {
    id: "faq-158",
    category: "cupcakes",
    question: "What flavours do you offer for cupcakes?",
    answer: "Our cupcake flavours include Vanilla Bean, Belgian Chocolate, Red Velvet, and Lemon as standard. Seasonal and premium flavours are available on request. Minimum order is 6 cupcakes per flavour.",
    tags: ["cupcake flavours", "cupcake options", "what cupcake flavours"]
  },
  {
    id: "faq-159",
    category: "cupcakes",
    question: "Do you offer cupcake towers?",
    answer: "Yes, we provide cupcake towers in various sizes and styles — from simple tiered stands to custom-built display towers. Cupcake towers are a popular alternative to a traditional wedding cake and can serve 40-100+ guests depending on the tower size.",
    tags: ["cupcake tower", "cupcake stand", "cupcake display", "tower display"]
  },
  {
    id: "faq-160",
    category: "cupcakes",
    question: "Can I include cupcakes in a dessert table?",
    answer: "Absolutely. Cupcakes are a standard component of our dessert tables, alongside the main cake, cookies, and macarons. The dessert table package includes a coordinated selection. Extra cupcakes can be added to any package.",
    tags: ["dessert table with cupcakes", "cupcake dessert table", "dessert table include cupcakes"]
  },

  // ───── GENERAL (10) ─────
  {
    id: "faq-161",
    category: "general",
    question: "Where is your bakery located?",
    answer: "We're based in London. Our bakery address will be provided once your order is confirmed. We don't have a walk-in shopfront — all orders are placed via our website or chatbot, and collections are by appointment.",
    tags: ["location", "address", "where are you", "bakery location", "London"]
  },
  {
    id: "faq-162",
    category: "general",
    question: "What are your business hours?",
    answer: "Our studio is open Monday to Friday 9:00 AM - 6:00 PM and Saturday 10:00 AM - 4:00 PM. We're closed on Sundays and public holidays. Collections and consultations are by appointment.",
    tags: ["hours", "business hours", "opening times", "when are you open", "studio hours"]
  },
  {
    id: "faq-163",
    category: "general",
    question: "How do I contact a human?",
    answer: "Just ask the chatbot to speak to a human and we'll transfer you. You can also email hello@cakecanvas.com or call +44 20 7946 0958. Voicemail is checked daily and calls are returned within 24 hours.",
    tags: ["speak to human", "contact person", "real person", "talk to staff", "human support"]
  },
  {
    id: "faq-164",
    category: "general",
    question: "Do you have a shop I can visit?",
    answer: "We're an online bakery without a walk-in shop. All orders are placed through our website or chatbot. Collections are by appointment from our studio. We find this lets us focus fully on each order without the distraction of a retail counter.",
    tags: ["physical shop", "store", "walk in", "visit bakery", "boutique"]
  },
  {
    id: "faq-165",
    category: "general",
    question: "Can I see examples of your past work?",
    answer: "Portfolio images are available on our Instagram (@cakecanvas) and website gallery. The chatbot can also show you relevant examples based on your occasion and style preferences.",
    tags: ["portfolio", "past work", "examples", "gallery", "previous cakes"]
  },
  {
    id: "faq-166",
    category: "general",
    question: "How do I know my cake will look like the design?",
    answer: "Handmade cakes will have natural variation — that's part of their charm. Your designer will share a design brief with you before production begins, and you'll have the opportunity to approve or suggest changes. We don't produce exact replicas, but we aim to capture the essence and style you're looking for.",
    tags: ["design accuracy", "will it match", "look like design", "design vs reality"]
  },
  {
    id: "faq-167",
    category: "general",
    question: "What if I have more questions not answered here?",
    answer: "Ask the chatbot! If it can't answer your question, it will escalate to a human designer who will get back to you within 24 hours. We're here to help.",
    tags: ["more questions", "other questions", "additional questions", "help"]
  },
  {
    id: "faq-168",
    category: "general",
    question: "Are your cakes suitable for diabetics?",
    answer: "We offer low-sugar and no-added-sugar options in select flavours. However, our cakes are not specifically formulated for diabetics. Please discuss your requirements with a designer and consult your healthcare provider.",
    tags: ["diabetic", "diabetes", "diabetic friendly", "sugar free", "diabetic cake"]
  },
  {
    id: "faq-169",
    category: "general",
    question: "Do you offer gluten-free cupcakes?",
    answer: "Yes, gluten-free cupcakes are available in Belgian Chocolate, Lemon, and Strawberry flavours. Minimum order is 6 cupcakes. A surcharge of $20-$40 applies.",
    tags: ["gluten free cupcakes", "gf cupcakes", "cupcakes gluten free"]
  },
  {
    id: "faq-170",
    category: "general",
    question: "Can I add a photo to my cake?",
    answer: "Yes, we offer edible image printing. We can print a photo, logo, or design onto edible icing using food-grade printers. Maximum image size depends on your cake size. Starting from $20 per image. Please ensure you have rights to the photo.",
    tags: ["photo on cake", "picture on cake", "edible photo", "photo cake topper"]
  },

  // ───── ADDITIONAL EDGE CASE / NICHE (10) ─────
  {
    id: "faq-171",
    category: "ordering",
    question: "Can I order a cake for delivery to a different country?",
    answer: "We currently only deliver within the UK, within a 25-mile radius of our London bakery. We do not offer international shipping. If you're planning a destination event, please contact us and we may be able to recommend bakeries in your location.",
    tags: ["international delivery", "overseas", "another country", "shipping abroad"]
  },
  {
    id: "faq-172",
    category: "pricing",
    question: "Is there a charge for a cake consultation?",
    answer: "Standard consultations via email or chatbot are free. In-person consultations or video calls for complex orders (weddings, large events) may have a $50 fee, which is deducted from your final order if you proceed.",
    tags: ["consultation fee", "consultation cost", "design consultation fee"]
  },
  {
    id: "faq-173",
    category: "dietary",
    question: "Do you offer nut-free facility?",
    answer: "Our kitchen handles nuts, so we cannot guarantee a completely nut-free environment. We use dedicated equipment for nut-free orders and follow strict cleaning protocols. Customers with severe nut allergies must speak directly with a designer before ordering.",
    tags: ["nut free facility", "nut free kitchen", "dedicated nut free", "nut free environment"]
  },
  {
    id: "faq-174",
    category: "delivery",
    question: "What happens if I'm running late for collection?",
    answer: "Please call us if you're running late. Collections more than 30 minutes past your appointment time may need to be rescheduled as our team works on other orders. We'll do our best to accommodate.",
    tags: ["late collection", "running late", "missed collection", "collection delay"]
  },
  {
    id: "faq-175",
    category: "timeline",
    question: "Can I place an order on a weekend?",
    answer: "Yes, our chatbot is available 24/7 to collect your requirements. However, designer responses and production only occur during business hours (Monday-Friday, 9 AM - 6 PM). A submission made on Saturday will be reviewed on Monday.",
    tags: ["weekend order", "order on weekend", "sunday order", "weekend enquiry"]
  },
  {
    id: "faq-176",
    category: "payments",
    question: "Do you offer gift vouchers?",
    answer: "Yes, digital gift vouchers are available in any amount starting from $50. They can be emailed directly to the recipient and never expire. Order through the chatbot.",
    tags: ["gift voucher", "gift card", "gift certificate", "voucher"]
  },
  {
    id: "faq-177",
    category: "general",
    question: "What makes CakeCanvas different from other bakeries?",
    answer: "Every CakeCanvas cake is designed and made from scratch by a skilled pastry artist — not mass-produced. We use premium ingredients (real butter, Belgian chocolate, Madagascar vanilla), offer comprehensive dietary options, and provide a full consultation process. The chatbot makes getting started easy and instant.",
    tags: ["unique", "why cakecanvas", "what's different", "special", "choose you"]
  },
  {
    id: "faq-178",
    category: "general",
    question: "Do you offer wedding cake tastings?",
    answer: "Yes, we offer tasting boxes ($40-$60) with 4-6 flavour samples. For wedding orders, the tasting fee is deducted from your final balance if you place an order within 30 days. We recommend ordering your tasting box well before your consultation.",
    tags: ["wedding tasting", "wedding cake tasting", "tasting for wedding"]
  },
  {
    id: "faq-179",
    category: "image",
    question: "Can I use a photo of a cake I found online?",
    answer: "Yes, use it as inspiration. We'll create an original cake inspired by the style, colours, and design elements you like. We don't copy other bakeries' work exactly. Upload the image and the chatbot will check its quality.",
    tags: ["online photo", "internet photo", "found online", "web image", "google image"]
  },
  {
    id: "faq-180",
    category: "delivery",
    question: "Do I need to be present for delivery?",
    answer: "Yes, someone needs to be present to receive the cake and sign the delivery note. You can nominate a friend, family member, or venue staff member — just let us know in advance.",
    tags: ["delivery signature", "sign for cake", "receive delivery", "delivery presence"]
  }
];

// =============================================================================
// FALLBACK RESPONSES — When the chatbot can't match a query with confidence
// =============================================================================

knowledge.fallbacks = [
  {
    threshold: 0.0,
    message: "I'm not quite sure I understood that. Could you rephrase? You can also ask me about pricing, flavours, delivery, or place an order.",
    action: "prompt_rephrase"
  },
  {
    threshold: 0.1,
    message: "I'm having trouble finding an answer to that. Could you try asking it differently? For example, you can ask 'How much does a cake cost?' or 'Do you deliver to my area?'",
    action: "prompt_rephrase"
  },
  {
    threshold: 0.2,
    message: "Hmm, that's a tricky one. I'm still learning! Let me connect you with a human designer who can help. I've noted your question and it'll be included in the hand-off.",
    action: "escalate",
    escalateReason: "low_confidence"
  },
  {
    threshold: 0.3,
    message: "I don't have a great answer for that, but I'd rather pass it to a human than guess. A designer will get back to you within 24 hours. In the meantime, can I help with anything else?",
    action: "escalate",
    escalateReason: "low_confidence"
  },
  {
    threshold: "allergy_trigger",
    message: "Thank you for letting me know about your allergy. For your safety, I'm going to pass this to a human designer who can discuss our ingredients and processes in detail. A designer will reach out within 2 hours. Let's continue with your other requirements in the meantime.",
    action: "escalate",
    escalateReason: "allergy"
  },
  {
    threshold: "anger_trigger",
    message: "I can hear you're frustrated, and I want to make sure this gets sorted properly. I'm going to connect you with a member of our team who can help right away.",
    action: "escalate",
    escalateReason: "customer_distress"
  },
  {
    threshold: "human_request",
    message: "Of course! I'll pass you to a human designer. I've shared everything you've told me so they'll have the full context. You'll hear from them within 2 hours. Is there anything else you'd like to add before I hand over?",
    action: "escalate",
    escalateReason: "customer_requested"
  },
  {
    threshold: "modification_request",
    message: "I can see you'd like to change something about your order. Modifications need to be handled by our team to make sure everything's updated correctly. I've noted your request and a designer will be in touch within 24 hours.",
    action: "escalate",
    escalateReason: "order_modification"
  },
  {
    threshold: "complaint",
    message: "I'm sorry to hear that. Let me pass this to our support team who can look into it properly. I've included all the context from our conversation so you won't need to repeat yourself.",
    action: "escalate",
    escalateReason: "complaint"
  },
  {
    threshold: "pricing_exact",
    message: "I can give you a price range, but exact pricing depends on your specific design details. A designer will provide an accurate quote once they review your requirements. Most [occasion] cakes in [size] range from [min]-[max].",
    action: "provide_range"
  },
  {
    threshold: "off_topic",
    message: "I specialise in all things cake! I can help with ordering, flavours, pricing, delivery, and design ideas. If you have a question about something else, I may need to pass it to a human.",
    action: "redirect_to_cake",
    redirectSuggestions: ["Would you like to start an order?", "Can I help you choose a flavour?", "Do you have a photo of a cake you like?"]
  },
  {
    threshold: "empty_input",
    message: "Hi there! I'm the CakeCanvas assistant. Tell me what you're looking for — I can help with ordering a cake, answering questions about flavours, pricing, delivery, or anything cake-related!",
    action: "prompt_start"
  },
  {
    threshold: "greeting",
    message: "Hello! Welcome to CakeCanvas. Ready to plan a cake? Tell me about your occasion!",
    action: "prompt_occasion"
  },
  {
    threshold: "thanks",
    message: "You're very welcome! If you think of anything else, I'll be right here. Is there anything else I can help with?",
    action: "continue"
  },
  {
    threshold: "goodbye",
    message: "Thanks for chatting with CakeCanvas! A designer will be in touch soon. Have a wonderful celebration! 🎂",
    action: "end"
  }
];

// =============================================================================
// INTENT MAPPING UTILITY
// =============================================================================

knowledge.intentMap = {
  "greeting": ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "howdy", "start"],
  "order": ["order", "place order", "buy", "purchase", "book", "reserve", "i want a cake", "i need a cake"],
  "pricing": ["price", "cost", "how much", "pricing", "quote", "expensive", "cheap", "affordable", "budget"],
  "delivery": ["deliver", "delivery", "shipping", "ship", "postcode", "postal", "zone", "collect", "pick up", "pickup"],
  "flavour": ["flavour", "flavor", "taste", "vanilla", "chocolate", "red velvet", "lemon", "carrot", "funfetti"],
  "dietary": ["eggless", "gluten free", "gluten-free", "vegan", "nut free", "nut-free", "allergy", "allergen", "dairy free", "dairy-free", "vegetarian"],
  "dietary_eggless": ["eggless", "no eggs", "without eggs", "egg free", "egg-free", "egg allergy"],
  "dietary_gluten": ["gluten free", "gluten-free", "coeliac", "celiac", "wheat free", "wheat-free"],
  "dietary_vegan": ["vegan", "plant based", "plant-based", "no dairy", "no eggs vegan"],
  "dietary_nut": ["nut free", "nut-free", "no nuts", "nut allergy", "peanut free", "peanut-free"],
  "size": ["size", "serving", "serves", "how many people", "portions", "tier", "6 inch", "8 inch", "10 inch"],
  "timeline": ["when", "how long", "advance", "lead time", "rush", "urgent", "last minute", "days", "weeks"],
  "cancellation": ["cancel", "cancellation", "refund", "reschedule", "change order", "modify order"],
  "image": ["photo", "picture", "image", "upload", "photograph", "screenshot", "inspiration", "reference", "design"],
  "image_quality": ["blurry", "blur", "dark", "bad photo", "rejected", "quality", "unclear"],
  "contact": ["contact", "phone", "email", "call", "reach", "human", "person", "speak to", "talk to"],
  "corporate": ["corporate", "business", "company", "logo", "brand", "office", "team"],
  "cupcake": ["cupcake", "cupcakes", "fairy cake", "mini cake"],
  "dessert_table": ["dessert table", "catering", "dessert bar", "sweet table", "party platter"],
  "payment": ["pay", "payment", "deposit", "card", "credit card", "bank transfer", "invoice", "installment"],
  "wedding": ["wedding", "bridal", "groom", "marriage", "fiancé", "fiance", "engagement"],
  "birthday": ["birthday", "bday", "b'day", "birth", "anniversary birth"],
  "storage": ["store", "storage", "keep", "refrigerate", "freeze", "fresh", "fridge", "leftover"],
  "complaint": ["complaint", "unhappy", "wrong", "mistake", "damaged", "broken", "terrible", "awful", "angry"],
  "thanks": ["thanks", "thank you", "cheers", "appreciate", "grateful"],
  "goodbye": ["bye", "goodbye", "see you", "talk later", "cya", "gtg"]
};

// =============================================================================
// EXPORT
// =============================================================================

if (typeof module !== "undefined" && module.exports) {
  module.exports = knowledge;
}
