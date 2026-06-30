/* =============================================================================
   conversationEngine.js — Intent matching, state machine, response generation
   =============================================================================
   Processes user input, matches against knowledge base, manages conversation
   state, and generates responses. Handles fallback and escalation logic.
   ============================================================================= */

const ConversationEngine = (function () {

  var state = {
    phase: 'greeting',
    data: {
      occasion: null,
      guestCount: null,
      size: null,
      hasPhoto: null,
      dietary: [],
      flavour: null,
      eventDate: null,
      deliveryPostcode: null,
      deliveryInZone: null,
      budget: null,
      name: null,
      email: null,
      phone: null,
      notes: '',
      imageUrl: null,
      imageDescription: null,
      imagePass: null
    },
    history: [],
    escalated: false,
    submitted: false,
    sessionId: generateId()
  };

  function generateId() {
    return 'CC-' + Date.now().toString(36).toUpperCase() + '-' +
           Math.random().toString(36).substring(2, 6).toUpperCase();
  }

  function processInput(input) {
    var text = (input || '').trim();
    if (!text) return getGreeting();

    state.history.push({ role: 'user', text: text, timestamp: new Date().toISOString() });

    var escalation = checkEscalationTriggers(text);
    if (escalation) {
      state.escalated = true;
      state.history.push({ role: 'bot', text: escalation.message, timestamp: new Date().toISOString() });
      return escalation;
    }

    if (state.phase === 'greeting') {
      var intent = detectIntent(text);
      if (intent === 'birthday' || intent === 'wedding') {
        return handleOccasion(intent);
      }
      if (intent === 'order') {
        state.phase = 'occasion';
        state.history.push({ role: 'bot', text: getOccasionPrompt(), timestamp: new Date().toISOString() });
        return { type: 'phase_change', message: getOccasionPrompt(), phase: 'occasion', options: getOccasionOptions() };
      }
      var faqResult = searchFAQ(text);
      if (faqResult) {
        state.history.push({ role: 'bot', text: faqResult.answer, timestamp: new Date().toISOString() });
        return { type: 'faq_answer', message: faqResult.answer, faqId: faqResult.id };
      }
      state.phase = 'occasion';
      state.history.push({ role: 'bot', text: getOccasionPrompt(), timestamp: new Date().toISOString() });
      return { type: 'phase_change', message: getOccasionPrompt(), phase: 'occasion', options: getOccasionOptions() };
    }

    switch (state.phase) {
      case 'occasion': return handleOccasion(text);
      case 'guestCount': return handleGuestCount(text);
      case 'size': return handleSize(text);
      case 'hasPhoto': return handleHasPhoto(text);
      case 'dietary': return handleDietary(text);
      case 'flavour': return handleFlavour(text);
      case 'eventDate': return handleEventDate(text);
      case 'delivery': return handleDelivery(text);
      case 'budget': return handleBudget(text);
      case 'summary': return handleSummary(text);
      case 'complete': return handleComplete(text);
      default:
        var generalResult = searchFAQ(text);
        if (generalResult) {
          state.history.push({ role: 'bot', text: generalResult.answer, timestamp: new Date().toISOString() });
          return { type: 'faq_answer', message: generalResult.answer, faqId: generalResult.id };
        }
        return getFallback();
    }
  }

  function detectIntent(text) {
    var lower = text.toLowerCase();
    var intentMap = knowledge.intentMap || {};
    var bestIntent = null;
    var bestScore = 0;

    for (var intent in intentMap) {
      if (!intentMap.hasOwnProperty(intent)) continue;
      var keywords = intentMap[intent];
      if (!Array.isArray(keywords)) continue;

      var score = 0;
      for (var i = 0; i < keywords.length; i++) {
        if (lower.indexOf(keywords[i]) >= 0) score += 1;
      }
      if (score > bestScore) {
        bestScore = score;
        bestIntent = intent;
      }
    }
    return bestScore > 0 ? bestIntent : null;
  }

  function searchFAQ(text) {
    var lower = text.toLowerCase();
    var faqs = knowledge.faq || [];
    var bestMatch = null;
    var bestScore = 0;

    for (var i = 0; i < faqs.length; i++) {
      var faq = faqs[i];
      var score = 0;

      if (faq.tags && Array.isArray(faq.tags)) {
        for (var t = 0; t < faq.tags.length; t++) {
          if (lower.indexOf(faq.tags[t].toLowerCase()) >= 0) score += 3;
        }
      }

      var qWords = (faq.question || '').toLowerCase().split(' ');
      for (var w = 0; w < qWords.length; w++) {
        if (qWords[w].length > 3 && lower.indexOf(qWords[w]) >= 0) score += 1;
      }

      if (lower.indexOf(faq.question.toLowerCase()) >= 0) score += 10;

      if (score > bestScore) {
        bestScore = score;
        bestMatch = faq;
      }
    }

    return bestMatch && bestScore >= 1 ? bestMatch : null;
  }

  function checkEscalationTriggers(text) {
    var lower = text.toLowerCase();

    if (lower.indexOf('speak to a human') >= 0 || lower.indexOf('talk to a person') >= 0 ||
        lower.indexOf('real person') >= 0 || (lower.indexOf('human') >= 0 && lower.indexOf('talk') >= 0)) {
      var fallback = knowledge.fallbacks.find(function (f) { return f.threshold === 'human_request'; });
      return fallback ? { type: 'escalate', message: fallback.message, reason: 'customer_requested', action: 'escalate' } : null;
    }

    if (lower.indexOf('complaint') >= 0 || lower.indexOf('unhappy') >= 0 || lower.indexOf('wrong') >= 0 ||
        lower.indexOf('mistake') >= 0 || lower.indexOf('damaged') >= 0 || lower.indexOf('angry') >= 0) {
      var compFallback = knowledge.fallbacks.find(function (f) { return f.threshold === 'complaint'; });
      return compFallback ? { type: 'escalate', message: compFallback.message, reason: 'complaint', action: 'escalate' } : null;
    }

    var allergyPatterns = ['allergic', 'severe allergy', 'peanut allergy', 'nut allergy', 'allergy to',
                           'anaphylactic', 'allergic reaction', 'deathly allergic', 'serious allergy'];
    for (var i = 0; i < allergyPatterns.length; i++) {
      if (lower.indexOf(allergyPatterns[i]) >= 0) {
        var allergyFallback = knowledge.fallbacks.find(function (f) { return f.threshold === 'allergy_trigger'; });
        return allergyFallback
          ? { type: 'escalate', message: allergyFallback.message, reason: 'allergy', action: 'escalate' }
          : null;
      }
    }

    if ((lower.indexOf('change') >= 0 || lower.indexOf('modify') >= 0 || lower.indexOf('update') >= 0) &&
        (lower.indexOf('order') >= 0 || lower.indexOf('booking') >= 0)) {
      var modFallback = knowledge.fallbacks.find(function (f) { return f.threshold === 'modification_request'; });
      return modFallback ? { type: 'escalate', message: modFallback.message, reason: 'order_modification', action: 'escalate' } : null;
    }

    return null;
  }

  // ─── Phase Handlers ──────────────────────────────────────────────────────

  function getGreeting() {
    return {
      type: 'greeting',
      message: 'Welcome! I\'m Ask Me, your cake consultant. ✨\n\nI\'ll help you design a custom celebration cake — from flavour to delivery. Let\'s start with the most important question: what\'s the occasion?',
      phase: 'greeting',
      options: getOccasionOptions()
    };
  }

  function getOccasionOptions() {
    return [
      { label: '🎂 Birthday', value: 'birthday' },
      { label: '💍 Wedding', value: 'wedding' },
      { label: '💝 Anniversary', value: 'anniversary' },
      { label: '👶 Baby Shower', value: 'baby shower' },
      { label: '🎓 Graduation', value: 'graduation' },
      { label: '🏢 Corporate', value: 'corporate' },
      { label: '🧁 Cupcakes', value: 'cupcakes' },
      { label: '✨ Other', value: 'other' }
    ];
  }

  function getOccasionPrompt() {
    return 'Lovely! What\'s the special occasion? 🎉';
  }

  function handleOccasion(text) {
    var lower = text.toLowerCase();
    var occasions = ['birthday', 'wedding', 'anniversary', 'baby shower', 'graduation', 'corporate', 'cupcakes', 'other'];

    var matched = occasions.find(function (o) { return lower.indexOf(o) >= 0; });
    if (!matched) {
      var intent = detectIntent(text);
      if (intent && occasions.indexOf(intent) >= 0) {
        matched = intent;
      } else {
        state.data.occasion = text;
      }
    }
    if (matched) {
      state.data.occasion = matched;
    }

    state.phase = 'guestCount';
    var display = state.data.occasion.charAt(0).toUpperCase() + state.data.occasion.slice(1);
    var emoji = getOccasionEmoji(state.data.occasion);

    return {
      type: 'phase_change',
      message: display + ' — wonderful! ' + emoji + '\n\nHow many guests will the cake serve?',
      phase: 'guestCount',
      data: { occasion: state.data.occasion }
    };
  }

  function getOccasionEmoji(occasion) {
    var map = {
      'birthday': '🎂',
      'wedding': '💍',
      'anniversary': '💝',
      'baby shower': '👶',
      'graduation': '🎓',
      'corporate': '🏢',
      'cupcakes': '🧁'
    };
    return map[occasion] || '✨';
  }

  function handleGuestCount(text) {
    var count = parseInt(text, 10);
    if (isNaN(count) || count <= 0) {
      return { type: 'error', message: 'How many guests? Just type a number (e.g., 15).', phase: 'guestCount' };
    }

    state.data.guestCount = count;
    var sizeRec = RecommendationEngine.recommendSize(count);
    state.phase = 'size';

    return {
      type: 'phase_change',
      message: sizeRec.recommendation + '\n\nDoes this sound right, or would you prefer a different size?',
      phase: 'size',
      data: { guestCount: count, recommendedSize: sizeRec.size },
      options: [
        { label: sizeRec.size.name, value: sizeRec.size.name },
        { label: 'Different size', value: 'different' }
      ]
    };
  }

  function handleSize(text) {
    state.data.size = text;
    state.phase = 'hasPhoto';
    return {
      type: 'phase_change',
      message: 'Got it! Do you have an inspiration photo? 📸\n\nYou can upload one or take a photo with your camera. If you don\'t have one, just tell me what you\'re looking for — I\'ll ask a few questions to understand your vision.',
      phase: 'hasPhoto',
      options: [
        { label: '📸 Upload a photo', value: 'yes' },
        { label: '✍️ Describe instead', value: 'no' }
      ]
    };
  }

  function handleHasPhoto(text) {
    var lower = text.toLowerCase();
    var hasPhoto = lower.indexOf('yes') >= 0 || lower.indexOf('upload') >= 0 ||
                   lower.indexOf('photo') >= 0 || lower.indexOf('camera') >= 0;
    state.data.hasPhoto = hasPhoto;
    state.phase = 'dietary';

    return {
      type: 'phase_change',
      message: hasPhoto
        ? 'Great — you can upload your photo at any time!\n\nNow, any dietary requirements? 🥗\n\nWe offer eggless, gluten-free, nut-free, and vegan options. Select all that apply, or say "none".'
        : 'No problem at all! Let me ask a few questions to understand your vision.\n\nAny dietary requirements? 🥗\n\nWe offer eggless, gluten-free, nut-free, and vegan options. Select all that apply, or say "none".',
      phase: 'dietary',
      data: { hasPhoto: hasPhoto },
      options: [
        { label: '🥚 Eggless', value: 'eggless' },
        { label: '🌾 Gluten-free', value: 'gluten-free' },
        { label: '🥜 Nut-free', value: 'nut-free' },
        { label: '🌱 Vegan', value: 'vegan' },
        { label: '— None', value: 'none' }
      ],
      multiSelect: true
    };
  }

  function handleDietary(text) {
    var lower = text.toLowerCase();
    var dietaryOptions = ['eggless', 'gluten-free', 'gluten free', 'nut-free', 'nut free', 'vegan'];

    if (lower.indexOf('none') >= 0 || lower.indexOf('no dietary') >= 0 ||
        lower.indexOf('no restrictions') >= 0 || lower.indexOf('no allergies') >= 0) {
      state.data.dietary = [];
    } else {
      dietaryOptions.forEach(function (opt) {
        if (lower.indexOf(opt) >= 0) {
          var id = opt.replace(/ /g, '-').split('-')[0];
          if (state.data.dietary.indexOf(id) < 0) {
            state.data.dietary.push(id);
          }
        }
      });
    }

    state.phase = 'flavour';
    var flavourRec = RecommendationEngine.recommendFlavour(state.data.occasion, state.data.dietary);
    var msg = 'Thanks! ';

    if (flavourRec.dietarySuggestion) {
      msg += 'Our most popular ' + state.data.dietary.join('/') + ' flavour is **' + flavourRec.dietarySuggestion + '**.\n\n';
    }

    msg += 'Now — what flavour would you like the cake to be? 🧁';

    return {
      type: 'phase_change',
      message: msg,
      phase: 'flavour',
      data: { dietary: state.data.dietary },
      options: [
        { label: '🍦 Vanilla Bean', value: 'Vanilla Bean' },
        { label: '🍫 Belgian Chocolate', value: 'Belgian Chocolate' },
        { label: '❤️ Red Velvet', value: 'Red Velvet' },
        { label: '🍋 Lemon', value: 'Lemon' },
        { label: '✨ Surprise me!', value: 'surprise' }
      ]
    };
  }

  function handleFlavour(text) {
    state.data.flavour = text;
    state.phase = 'eventDate';

    return {
      type: 'phase_change',
      message: 'Excellent choice! 🎉\n\nWhat\'s your event date? This helps us check availability and plan production.',
      phase: 'eventDate',
      data: { flavour: state.data.flavour }
    };
  }

  function handleEventDate(text) {
    var parsed = Date.parse(text);
    if (isNaN(parsed)) {
      return {
        type: 'error',
        message: 'Sorry, I didn\'t quite catch that date. Could you tell me another way? (e.g., "June 15, 2026" or "15th June")',
        phase: 'eventDate'
      };
    }

    var d = new Date(parsed);
    var dateStr = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    state.data.eventDate = dateStr;

    var now = new Date();
    var diffDays = Math.ceil((d - now) / (1000 * 60 * 60 * 24));
    state.phase = 'delivery';

    if (diffDays < 10) {
      return {
        type: 'phase_change',
        message: dateStr + ' — noted! ⏰\n\nOur standard lead time is 21 days, so this would be a **rush order**. I\'ll flag it for manager approval.\n\nWhere should we deliver? Enter your postcode.',
        phase: 'delivery',
        data: { eventDate: dateStr, isRush: true },
        rush: true
      };
    } else if (diffDays < 21) {
      return {
        type: 'phase_change',
        message: dateStr + ' — that works! 🟡\n\nJust a heads up: orders with less than 21 days notice may include a $50 rush fee. A designer will confirm.\n\nWhere should we deliver? Enter your postcode.',
        phase: 'delivery',
        data: { eventDate: dateStr, isRush: diffDays < 21 }
      };
    } else {
      return {
        type: 'phase_change',
        message: dateStr + ' — perfect, plenty of time! 🟢\n\nWhere should we deliver? Enter your postcode.',
        phase: 'delivery',
        data: { eventDate: dateStr }
      };
    }
  }

  function handleDelivery(text) {
    state.data.deliveryPostcode = text.toUpperCase();

    var inZone = false;
    var zone = knowledge.delivery && knowledge.delivery.zone;
    if (zone && zone.includeAreas) {
      var code = text.substring(0, 2).toUpperCase();
      inZone = zone.includeAreas.some(function (area) {
        return area.toUpperCase().indexOf(code) >= 0;
      });
    }

    state.data.deliveryInZone = inZone;
    state.phase = 'budget';

    var deliveryMsg = inZone
      ? 'We deliver to that area! 🚚'
      : 'Thanks! It looks like that area may be outside our standard 25-mile zone. I\'ll pass this to a designer who can discuss options.';

    return {
      type: 'phase_change',
      message: deliveryMsg + '\n\nNow — what\'s your rough budget for the cake? 💰\n\nThis helps me recommend suitable options. Select a range, or choose "Flexible."',
      phase: 'budget',
      data: { deliveryPostcode: text.toUpperCase(), deliveryInZone: inZone },
      options: [
        { label: '$100 – $150', value: '100-150' },
        { label: '$150 – $250', value: '150-250' },
        { label: '$250 – $400', value: '250-400' },
        { label: '$400+', value: '400+' },
        { label: '✨ Flexible', value: 'flexible' }
      ]
    };
  }

  function handleBudget(text) {
    state.data.budget = text;
    state.phase = 'summary';

    var priceInfo = PriceCalculator.formatBudgetRange(
      state.data.occasion, state.data.size, state.data.dietary
    );

    var summary = generateSummary();

    return {
      type: 'phase_change',
      message: summary + '\n\n' + priceInfo + '\n\nDoes everything look right? If yes, I\'ll submit your request to our design team.',
      phase: 'summary',
      data: state.data,
      options: [
        { label: '✅ Looks good — submit!', value: 'submit' },
        { label: '✍️ Make a change', value: 'change' }
      ]
    };
  }

  function generateSummary() {
    var d = state.data;
    var lines = [];
    lines.push('Here\'s a summary of your order:');
    lines.push('');
    lines.push('🎉 **Occasion:** ' + (d.occasion || '—'));
    lines.push('👥 **Guests:** ' + (d.guestCount || '—'));
    lines.push('📐 **Size:** ' + (d.size || 'To be confirmed'));
    lines.push('🥗 **Dietary:** ' + (d.dietary.length > 0 ? d.dietary.join(', ') : 'None'));
    lines.push('🧁 **Flavour:** ' + (d.flavour || 'To be confirmed'));
    lines.push('📅 **Event date:** ' + (d.eventDate || '—'));
    lines.push('📍 **Delivery:** ' + (d.deliveryPostcode || '—') +
               (d.deliveryInZone === false ? ' ⚠️ May be outside delivery zone' : ''));
    lines.push('💰 **Budget:** ' + (d.budget || '—'));
    lines.push('📸 **Photo:** ' + (d.hasPhoto ? 'Provided ✓' : 'Not provided — description will be used'));
    return lines.join('\n');
  }

  function handleSummary(text) {
    var lower = text.toLowerCase();

    if (lower.indexOf('submit') >= 0 || lower.indexOf('yes') >= 0 || lower.indexOf('looks good') >= 0) {
      state.phase = 'complete';
      state.submitted = true;
      var submissionRef = generateId();

      return {
        type: 'submitted',
        message: 'Perfect! ✅ Your request has been submitted.\n\n**Reference: ' + submissionRef + '**\n\nA confirmation email is on its way. A designer will review your request and reach out within **24 hours**.\n\nIf you think of anything else, I\'ll be right here! 🎂',
        phase: 'complete',
        data: { reference: submissionRef },
        reference: submissionRef
      };
    }

    if (lower.indexOf('change') >= 0 || lower.indexOf('no') >= 0) {
      state.phase = 'occasion';
      return {
        type: 'phase_change',
        message: 'No problem! Let\'s start from the beginning. What\'s the occasion?',
        phase: 'occasion',
        options: getOccasionOptions()
      };
    }

    var faq = searchFAQ(text);
    if (faq) {
      return { type: 'faq_answer', message: faq.answer, faqId: faq.id };
    }

    return {
      type: 'error',
      message: 'Please let me know: would you like to **submit** your request or **make a change**?',
      phase: 'summary',
      options: [
        { label: '✅ Looks good — submit!', value: 'submit' },
        { label: '✍️ Make a change', value: 'change' }
      ]
    };
  }

  function handleComplete(text) {
    var faqResult = searchFAQ(text);
    if (faqResult) {
      return { type: 'faq_answer', message: faqResult.answer, faqId: faqResult.id };
    }
    return {
      type: 'faq_answer',
      message: 'Your request has been submitted! A designer will be in touch within 24 hours. Is there anything else I can help with in the meantime? 😊'
    };
  }

  // ─── Image Handling ────────────────────────────────────────────────────

  function handleImageResult(result) {
    state.data.imagePass = result.pass;

    if (result.pass) {
      state.data.imageUrl = 'uploaded';
      return {
        type: 'image_pass',
        message: result.message
      };
    }

    return {
      type: 'image_fail',
      message: result.message,
      imageFailures: result.failures
    };
  }

  // ─── Fallback ──────────────────────────────────────────────────────────

  function getFallback() {
    var input = state.history.length > 0 && state.history[state.history.length - 1].role === 'user'
      ? state.history[state.history.length - 1].text : '';

    if (!input || input.trim() === '') {
      var emptyFallback = knowledge.fallbacks.find(function (f) { return f.threshold === 'empty_input'; });
      return emptyFallback
        ? { type: 'fallback', message: emptyFallback.message, action: 'prompt_start' }
        : null;
    }

    var lower = input.toLowerCase();

    if (lower.indexOf('thank') >= 0 || lower.indexOf('thanks') >= 0) {
      var thanksFallback = knowledge.fallbacks.find(function (f) { return f.threshold === 'thanks'; });
      return thanksFallback
        ? { type: 'fallback', message: thanksFallback.message, action: 'continue' }
        : null;
    }

    if (lower.indexOf('bye') >= 0 || lower.indexOf('goodbye') >= 0 || lower.indexOf('see you') >= 0) {
      var byeFallback = knowledge.fallbacks.find(function (f) { return f.threshold === 'goodbye'; });
      return byeFallback
        ? { type: 'fallback', message: byeFallback.message, action: 'end' }
        : null;
    }

    var greetings = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'];
    if (greetings.some(function (g) { return lower.indexOf(g) >= 0; })) {
      var greetFallback = knowledge.fallbacks.find(function (f) { return f.threshold === 'greeting'; });
      return greetFallback
        ? { type: 'fallback', message: greetFallback.message, action: 'prompt_occasion' }
        : null;
    }

    var faqResult = searchFAQ(input);
    if (faqResult) {
      return { type: 'faq_answer', message: faqResult.answer, faqId: faqResult.id };
    }

    var lowConfFallback = knowledge.fallbacks.find(function (f) { return f.threshold === 0.2; });
    state.escalated = true;
    return lowConfFallback
      ? { type: 'escalate', message: lowConfFallback.message, reason: 'low_confidence', action: 'escalate' }
      : {
          type: 'escalate',
          message: 'I\'m not sure I can answer that. Let me connect you with a human designer who can help. 😊',
          reason: 'low_confidence',
          action: 'escalate'
        };
  }

  // ─── State Management ─────────────────────────────────────────────────

  function getState() {
    return {
      phase: state.phase,
      data: JSON.parse(JSON.stringify(state.data)),
      escalated: state.escalated,
      submitted: state.submitted,
      sessionId: state.sessionId
    };
  }

  function setState(savedState) {
    if (!savedState) return;
    state.phase = savedState.phase || 'greeting';
    state.data = savedState.data || state.data;
    state.escalated = savedState.escalated || false;
    state.submitted = savedState.submitted || false;
    state.sessionId = savedState.sessionId || generateId();
  }

  function reset() {
    state.phase = 'greeting';
    state.data = {
      occasion: null, guestCount: null, size: null, hasPhoto: null,
      dietary: [], flavour: null, eventDate: null, deliveryPostcode: null,
      deliveryInZone: null, budget: null, name: null, email: null, phone: null,
      notes: '', imageUrl: null, imageDescription: null, imagePass: null
    };
    state.history = [];
    state.escalated = false;
    state.submitted = false;
    state.sessionId = generateId();
  }

  function getFormData() {
    return JSON.parse(JSON.stringify(state.data));
  }

  // ─── Public API ────────────────────────────────────────────────────────

  return {
    processInput: processInput,
    handleImageResult: handleImageResult,
    getState: getState,
    setState: setState,
    reset: reset,
    getFormData: getFormData,
    searchFAQ: searchFAQ,
    generateId: generateId
  };
})();
