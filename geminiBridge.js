/* =============================================================================
   geminiBridge.js — Gemini response enhancement with local engine fallback
   -----------------------------------------------------------------------------
   Local ConversationEngine runs for state management (phase tracking, order
   flow, structured data collection). Gemini generates the response text.
   Falls back to local-only if the server is unreachable.
   ============================================================================= */
const GeminiBridge = (function () {

  var SERVER_URL = 'http://localhost:8765/chat';
  var sessionId = null;
  var serverDown = false;

  function processInput(text) {
    // Always run the local engine first — this manages phases, options, state
    var localResponse = ConversationEngine.processInput(text);

    if (serverDown) {
      return Promise.resolve(localResponse);
    }

    // Call Gemini for richer response text, but keep local engine's structure
    return callServer(text).then(function (data) {
      sessionId = data.session_id;
      // Merge Gemini's text into the local response, preserving phase/options/state
      return {
        type: localResponse.type,
        message: data.reply,
        phase: localResponse.phase,
        options: localResponse.options,
        data: localResponse.data,
        action: localResponse.action,
        reference: localResponse.reference
      };
    }).catch(function () {
      console.warn('[GeminiBridge] Server unreachable, using local responses.');
      serverDown = true;
      return localResponse;
    });
  }

  function callServer(text) {
    var body = JSON.stringify({ session_id: sessionId, message: text });
    return fetch(SERVER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body
    }).then(function (r) {
      if (!r.ok) throw new Error('Server error');
      return r.json();
    });
  }

  function handleImageResult(analysis) {
    return ConversationEngine.handleImageResult(analysis);
  }

  function reset() {
    sessionId = null;
    serverDown = false;
    ConversationEngine.reset();
  }

  function getState() { return ConversationEngine.getState(); }
  function setState(s) { ConversationEngine.setState(s); }
  function getFormData() { return ConversationEngine.getFormData(); }
  function searchFAQ(text) { return ConversationEngine.searchFAQ(text); }

  return {
    processInput: processInput,
    handleImageResult: handleImageResult,
    reset: reset,
    getState: getState,
    setState: setState,
    getFormData: getFormData,
    searchFAQ: searchFAQ
  };

})();
