/* =============================================================================
   script.js — UI Controller — Premium Edition
   =============================================================================
   Manages DOM rendering, event binding, dark mode, localStorage persistence,
   image upload, and chatbot UI lifecycle. Optimized for smooth animations and
   mobile UX.
   ============================================================================= */

(function () {
  'use strict';

  // ─── DOM References ──────────────────────────────────────────────────────

  var chatLauncher = document.getElementById('chatLauncher');
  var chatPanel = document.getElementById('chatPanel');
  var chatMessages = document.getElementById('chatMessages');
  var chatInput = document.getElementById('chatInput');
  var chatSendBtn = document.getElementById('chatSendBtn');
  var chatCloseBtn = document.getElementById('chatCloseBtn');
  var chatClearBtn = document.getElementById('chatClearBtn');
  var chatStatus = document.getElementById('chatStatus');
  var suggestedList = document.getElementById('suggestedList');
  var headerChatBtn = document.getElementById('headerChatBtn');
  var heroChatBtn = document.getElementById('heroChatBtn');
  var footerChatBtn = document.getElementById('footerChatBtn');
  var launcherLabel = document.getElementById('launcherLabel');
  var launcherBadge = document.getElementById('launcherBadge');

  var isOpen = false;
  var isProcessing = false;
  var isMobile = window.innerWidth <= 768;

  // ─── Resize observer for mobile ──────────────────────────────────────────

  window.addEventListener('resize', function () {
    isMobile = window.innerWidth <= 768;
    if (isOpen && isMobile) {
      chatPanel.classList.add('fullscreen');
    } else if (isOpen) {
      chatPanel.classList.remove('fullscreen');
    }
  });

  // ─── Chat History (localStorage) ─────────────────────────────────────────

  function loadChatHistory() {
    try {
      var data = localStorage.getItem('cakecanvas-chat');
      return data ? JSON.parse(data) : null;
    } catch (e) { return null; }
  }

  function saveChatHistory(messages, state) {
    try {
      localStorage.setItem('cakecanvas-chat', JSON.stringify({
        messages: messages,
        state: state,
        updated: new Date().toISOString()
      }));
    } catch (e) { /* noop */ }
  }

  function clearChatHistory() {
    try { localStorage.removeItem('cakecanvas-chat'); }
    catch (e) { /* noop */ }
  }

  // ─── Chat Message Rendering ──────────────────────────────────────────────

  var messageStore = [];

  function renderMessage(msg) {
    var el = document.createElement('div');
    el.className = 'message ' + msg.role;
    el.setAttribute('role', 'listitem');

    if (msg.image) {
      var imgWrap = document.createElement('div');
      imgWrap.className = 'message-img';
      var imgEl = document.createElement('img');
      imgEl.src = msg.image;
      imgEl.alt = msg.imageAlt || '';
      imgEl.loading = 'lazy';
      imgWrap.appendChild(imgEl);
      el.appendChild(imgWrap);
    }

    var bubble = document.createElement('div');
    bubble.className = 'message-bubble';

    var formatted = (msg.text || '')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
    bubble.innerHTML = formatted;

    el.appendChild(bubble);

    // Options (quick-select buttons)
    if (msg.options && msg.options.length > 0) {
      var optContainer = document.createElement('div');
      optContainer.className = 'message-options';

      if (msg.multiSelect) {
        msg.options.forEach(function (opt) {
          var btn = createOptionButton(opt);
          btn.addEventListener('click', function () { handleOptionClick(opt, true); });
          optContainer.appendChild(btn);
        });
        var doneBtn = createOptionButton({ label: '✓ Done', value: 'done' });
        doneBtn.style.cssText = 'border-color:#5D4037;color:#5D4037;background:#F5E6D3;';
        doneBtn.addEventListener('click', handleMultiSelectDone);
        optContainer.appendChild(doneBtn);
      } else {
        msg.options.forEach(function (opt) {
          var btn = createOptionButton(opt);
          btn.addEventListener('click', function () { handleOptionClick(opt, false); });
          optContainer.appendChild(btn);
        });
      }
      el.appendChild(optContainer);
    }

    // Image upload area
    if (msg.showImageUpload) {
      el.appendChild(createImageUploadArea());
    }

    // Timestamp
    var time = document.createElement('div');
    time.className = 'message-time';
    time.textContent = msg.timestamp || formatTime(new Date());
    el.appendChild(time);

    return el;
  }

  function createOptionButton(opt) {
    var btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt.label;
    btn.setAttribute('data-value', opt.value);
    btn.setAttribute('type', 'button');
    return btn;
  }

  function createImageUploadArea() {
    var container = document.createElement('div');
    container.className = 'image-upload-area';
    container.setAttribute('role', 'button');
    container.setAttribute('tabindex', '0');
    container.setAttribute('aria-label', 'Upload a photo of your inspiration cake');

    var icon = document.createElement('div');
    icon.className = 'upload-icon';
    icon.textContent = '📸';
    container.appendChild(icon);

    var text = document.createElement('div');
    text.className = 'upload-text';
    text.textContent = 'Tap to upload a photo';
    container.appendChild(text);

    var preview = document.createElement('img');
    preview.className = 'upload-preview';
    preview.alt = 'Upload preview';
    container.appendChild(preview);

    var result = document.createElement('div');
    result.className = 'quality-result';
    container.appendChild(result);

    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/jpeg,image/png,image/heic,image/webp';
    fileInput.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);border:0;';
    fileInput.setAttribute('tabindex', '-1');
    container.appendChild(fileInput);
    container.style.position = 'relative';

    container.addEventListener('click', function () { fileInput.click(); });
    container.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInput.click(); }
    });

    fileInput.addEventListener('change', function () {
      if (fileInput.files && fileInput.files[0]) {
        handleImageUpload(fileInput.files[0], container, preview, result);
      }
    });

    return container;
  }

  // ─── Image Upload Handling ───────────────────────────────────────────────

  function handleImageUpload(file, container, previewEl, resultEl) {
    var reader = new FileReader();
    reader.onload = function (e) {
      previewEl.src = e.target.result;
      previewEl.className = 'upload-preview visible';
      container.className = 'image-upload-area has-image';
    };
    reader.readAsDataURL(file);

    addTypingIndicator();

    setTimeout(function () {
      removeTypingIndicator();

      ImageAdvisor.analyse(file).then(function (analysis) {
        resultEl.textContent = analysis.message;
        resultEl.className = 'quality-result ' + (analysis.pass ? 'pass' : 'fail');

        GeminiBridge.handleImageResult(analysis);

        if (analysis.pass) {
          addBotMessage('✅ ' + analysis.message);

          var convState = GeminiBridge.getState();
          if (convState.phase === 'hasPhoto' || convState.phase === 'greeting') {
            setTimeout(function () {
              GeminiBridge.processInput('yes').then(function (response) {
                processResponse(response);
              });
            }, 500);
          }
        } else {
          addBotMessage('📸 ' + analysis.message);

          var retryContainer = document.createElement('div');
          retryContainer.className = 'message-options';

          var retryBtn = createOptionButton({ label: 'Try again', value: 'retry' });
          retryBtn.addEventListener('click', function () {
            fileInput.value = '';
            fileInput.click();
          });
          retryContainer.appendChild(retryBtn);

          var skipBtn = createOptionButton({ label: 'Skip — describe instead', value: 'skip' });
          skipBtn.addEventListener('click', function () {
            GeminiBridge.getState().data.hasPhoto = false;
            GeminiBridge.processInput('no').then(function (response) {
              processResponse(response);
            });
          });
          retryContainer.appendChild(skipBtn);

          var lastMsg = chatMessages.querySelector('.message:last-child');
          if (lastMsg) {
            lastMsg.appendChild(retryContainer);
          } else {
            var fallbackMsg = document.createElement('div');
            fallbackMsg.className = 'message-options';
            fallbackMsg.appendChild(retryBtn);
            fallbackMsg.appendChild(skipBtn);
            chatMessages.appendChild(fallbackMsg);
          }
        }
      });
    }, 800);
  }

  // ─── Typing Indicator ────────────────────────────────────────────────────

  var typingEl = null;

  function addTypingIndicator() {
    removeTypingIndicator();
    typingEl = document.createElement('div');
    typingEl.className = 'message bot';
    typingEl.id = 'typingIndicator';
    var bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    var dots = document.createElement('div');
    dots.className = 'typing-indicator';
    dots.innerHTML = '<span></span><span></span><span></span>';
    dots.setAttribute('aria-label', 'Ask Me is typing');
    bubble.appendChild(dots);
    typingEl.appendChild(bubble);
    chatMessages.appendChild(typingEl);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    if (typingEl) {
      typingEl.remove();
      typingEl = null;
    }
  }

  // ─── Adding Messages ─────────────────────────────────────────────────────

  function addBotMessage(text, options, extra) {
    var msg = {
      role: 'bot',
      text: text,
      timestamp: formatTime(new Date()),
      options: options || null
    };

    if (extra) {
      if (extra.showImageUpload) msg.showImageUpload = true;
      if (extra.image) msg.image = extra.image;
      if (extra.imageAlt) msg.imageAlt = extra.imageAlt;
    }

    messageStore.push(msg);
    var el = renderMessage(msg);
    chatMessages.appendChild(el);
    scrollToBottom();
    saveChatHistory(messageStore, GeminiBridge.getState());
  }

  function addUserMessage(text) {
    var msg = {
      role: 'user',
      text: text,
      timestamp: formatTime(new Date())
    };
    messageStore.push(msg);
    var el = renderMessage(msg);
    chatMessages.appendChild(el);
    scrollToBottom();
  }

  function scrollToBottom() {
    requestAnimationFrame(function () {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  }

  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // ─── Input Handling ──────────────────────────────────────────────────────

  function handleUserInput(text) {
    if (isProcessing || !text.trim()) return;
    isProcessing = true;
    chatInput.disabled = true;
    chatSendBtn.disabled = true;

    addUserMessage(text);
    chatInput.value = '';
    addTypingIndicator();

    var delay = 300 + Math.random() * 700;

    setTimeout(function () {
      GeminiBridge.processInput(text).then(function (response) {
        removeTypingIndicator();
        processResponse(response);

        isProcessing = false;
        chatInput.disabled = false;
        chatSendBtn.disabled = false;
        chatInput.focus();
      });
    }, delay);
  }

  var phaseImages = {
    greeting: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=400&q=80',
    occasion: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=80',
    guests: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400&q=80',
    size: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&q=80',
    hasPhoto: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=400&q=80',
    dietary: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=80',
    flavour: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80',
    delivery: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400&q=80',
    budget: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&q=80'
  };

  function getPhaseImage(phase) {
    return phaseImages[phase] || null;
  }

  function processResponse(response) {
    if (!response) return;

    var extra = {};
    var phaseImg = getPhaseImage(response.phase);
    if (phaseImg) {
      extra.image = phaseImg;
      extra.imageAlt = response.phase ? response.phase + ' cake' : 'Cake';
    }

    if (response.type === 'phase_change' && response.phase === 'hasPhoto' && response.data && response.data.hasPhoto !== false) {
      extra.showImageUpload = true;
    }

    switch (response.type) {
      case 'greeting':
        addBotMessage(response.message, response.options, extra);
        break;

      case 'phase_change':
        addBotMessage(response.message, response.options, extra);
        break;

      case 'faq_answer':
        addBotMessage(response.message, null, extra);
        break;

      case 'fallback':
        addBotMessage(response.message, null, extra);
        if (response.action === 'prompt_occasion') {
          setTimeout(function () {
            addBotMessage('What\'s the occasion? 🎂', [
              { label: 'Birthday', value: 'birthday' },
              { label: 'Wedding', value: 'wedding' },
              { label: 'Anniversary', value: 'anniversary' },
              { label: 'Baby Shower', value: 'baby shower' },
              { label: 'Graduation', value: 'graduation' },
              { label: 'Corporate', value: 'corporate' },
              { label: 'Cupcakes', value: 'cupcakes' },
              { label: 'Other', value: 'other' }
            ]);
          }, 500);
        }
        break;

      case 'escalate':
        addBotMessage(response.message, null, extra);
        chatStatus.textContent = 'With a designer';
        chatStatus.style.setProperty('--status-color', '#FFA726');
        showEscalationBanner();
        break;

      case 'submitted':
        addBotMessage(response.message, null, extra);
        if (response.reference) {
          try {
            localStorage.setItem('cakecanvas-submission-' + response.reference, JSON.stringify({
              data: GeminiBridge.getFormData(),
              timestamp: new Date().toISOString()
            }));
          } catch (e) { /* noop */ }
        }
        break;

      case 'error':
        addBotMessage(response.message, response.options, extra);
        break;

      default:
        addBotMessage(response.message || 'Thanks! Is there anything else I can help with?', null, extra);
    }
  }

  function showEscalationBanner() {
    var existing = document.querySelector('.escalation-banner');
    if (existing) existing.remove();

    var banner = document.createElement('div');
    banner.className = 'escalation-banner';
    banner.textContent = 'A designer has been notified. You\'ll hear within 2 hours.';
    var target = chatPanel.querySelector('.suggested-area') || chatPanel.querySelector('.chat-input-area');
    if (target) {
      chatPanel.insertBefore(banner, target);
    }
  }

  // ─── Option Button Handling ──────────────────────────────────────────────

  var multiSelectBuffer = [];

  function handleOptionClick(opt, isMultiSelect) {
    if (isMultiSelect) {
      var idx = multiSelectBuffer.indexOf(opt.value);
      if (idx >= 0) {
        multiSelectBuffer.splice(idx, 1);
      } else if (opt.value !== 'none') {
        multiSelectBuffer.push(opt.value);
      } else {
        multiSelectBuffer = [];
      }

      var buttons = chatMessages.querySelectorAll('.message:last-child .option-btn');
      buttons.forEach(function (btn) {
        var val = btn.getAttribute('data-value');
        if (multiSelectBuffer.indexOf(val) >= 0) {
          btn.style.cssText = 'background:#5D4037;border-color:#5D4037;color:#fff;';
        } else {
          btn.style.cssText = '';
        }
      });
    } else {
      handleUserInput(opt.label);
    }
  }

  function handleMultiSelectDone() {
    var text = multiSelectBuffer.length > 0
      ? multiSelectBuffer.join(', ')
      : 'None';
    multiSelectBuffer = [];
    handleUserInput(text);
  }

  // ─── Suggested Questions ─────────────────────────────────────────────────

  suggestedList.addEventListener('click', function (e) {
    var btn = e.target.closest('.suggested-btn');
    if (btn) {
      var question = btn.getAttribute('data-question');
      if (question) handleUserInput(question);
    }
  });

  // ─── Chat Open / Close ───────────────────────────────────────────────────

  function hideLauncherLabel() {
    if (launcherLabel) launcherLabel.classList.add('hidden');
    if (launcherBadge) launcherBadge.classList.add('hidden');
  }

  function openChat() {
    hideLauncherLabel();
    isOpen = true;
    chatPanel.classList.add('open');
    chatPanel.setAttribute('aria-hidden', 'false');
    chatLauncher.classList.add('open');
    chatLauncher.setAttribute('aria-expanded', 'true');

    if (isMobile) {
      chatPanel.classList.add('fullscreen');
      document.body.style.overflow = 'hidden';
    }

    setTimeout(function () { chatInput.focus(); }, 400);

    if (messageStore.length === 0) {
      startChat();
    }
  }

  function closeChat() {
    isOpen = false;
    chatPanel.classList.remove('open', 'fullscreen');
    chatPanel.setAttribute('aria-hidden', 'true');
    chatLauncher.classList.remove('open');
    chatLauncher.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    chatLauncher.focus();
  }

  function toggleChat() {
    if (isOpen) { closeChat(); }
    else { openChat(); }
  }

  // ─── Start / Restore Chat ────────────────────────────────────────────────

  function startChat() {
    var saved = loadChatHistory();

    if (saved && saved.messages && saved.messages.length > 0) {
      GeminiBridge.setState(saved.state);
      messageStore = saved.messages;
      messageStore.forEach(function (msg) {
        chatMessages.appendChild(renderMessage(msg));
      });
      scrollToBottom();

      var state = GeminiBridge.getState();
      if (state.escalated) {
        showEscalationBanner();
        chatStatus.textContent = 'With a designer';
      } else if (state.submitted) {
        addBotMessage('Welcome back! Your request has been submitted. A designer will be in touch.');
      } else {
        addBotMessage('Welcome back! We were discussing your ' + (state.data.occasion || 'cake') + '. Ready to continue?');
      }
    } else {
      GeminiBridge.processInput('').then(function (greeting) {
        addBotMessage(greeting.message, greeting.options);
      });
    }
  }

  function resetChat() {
    GeminiBridge.reset();
    messageStore = [];
    chatMessages.innerHTML = '';
    clearChatHistory();

    var banner = document.querySelector('.escalation-banner');
    if (banner) banner.remove();

    chatStatus.innerHTML = '<span class="sr-only">Status: </span>Online';
    chatStatus.style.removeProperty('--status-color');

    GeminiBridge.processInput('').then(function (greeting) {
      addBotMessage(greeting.message, greeting.options);
      chatInput.focus();
    });
  }

  // ─── Event Binding ───────────────────────────────────────────────────────

  if (launcherLabel) {
    launcherLabel.addEventListener('click', function () {
      hideLauncherLabel();
      openChat();
    });
  }

  chatLauncher.addEventListener('click', function () {
    hideLauncherLabel();
    toggleChat();
  });
  chatCloseBtn.addEventListener('click', closeChat);
  chatClearBtn.addEventListener('click', resetChat);

  chatSendBtn.addEventListener('click', function () {
    handleUserInput(chatInput.value);
  });

  chatInput.addEventListener('focus', hideLauncherLabel);
  chatInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleUserInput(chatInput.value);
    }
  });

  headerChatBtn.addEventListener('click', openChat);
  heroChatBtn.addEventListener('click', openChat);
  if (footerChatBtn) footerChatBtn.addEventListener('click', openChat);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) {
      closeChat();
    }
  });

  // ─── Scroll effect for header ────────────────────────────────────────────

  window.addEventListener('scroll', function () {
    var header = document.querySelector('.site-header');
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }
  });

  // ─── Scroll reveal animation ─────────────────────────────────────────────

  function initReveal() {
    if (!window.IntersectionObserver) {
      document.querySelectorAll('.product-card, .testimonial-card, .about-image, .about-text, .contact-item').forEach(function (el) {
        el.classList.add('revealed');
      });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.product-card, .testimonial-card, .about-image, .about-text, .contact-item').forEach(function (el) {
      observer.observe(el);
    });
  }

  // ─── Initialisation ──────────────────────────────────────────────────────

  function init() {
    initReveal();
    if ('serviceWorker' in navigator) {
      // Cache for offline support (if service worker registered)
    }

    console.log('Ask Me chatbot ready. Click the chat button to start.');
  }

  init();

})();
