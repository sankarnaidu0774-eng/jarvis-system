/* JARVIS Voice Engine - browser-only version */
(function () {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  function el(id) { return document.getElementById(id); }

  function setStatus(text, show) {
    const box = el('listening');
    if (!box) return;
    box.textContent = text;
    box.style.display = show ? 'block' : 'none';
  }

  function react(active) {
    const core = document.querySelector('.jarvis-core');
    const mic = document.querySelector('.mic');
    if (core) core.classList.toggle('jarvis-active', active);
    if (mic) mic.classList.toggle('jarvis-active-mic', active);
  }

  function addMessage(who, text) {
    const messages = el('chatMessages');
    if (!messages) return;
    const div = document.createElement('div');
    div.className = 'message';
    const b = document.createElement('b');
    b.textContent = who + ':';
    div.appendChild(b);
    div.appendChild(document.createTextNode(' ' + text));
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function speak(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onstart = function () { setStatus('🔊 JARVIS speaking...', true); };
    utterance.onend = function () {
      setStatus('', false);
      react(false);
    };
    window.speechSynthesis.speak(utterance);
  }

  function answer(text) {
    const q = text.toLowerCase().trim();
    let reply;

    if (/^(hi|hello|hey)( jarvis)?/.test(q)) {
      reply = 'Hello Sankar. I am JARVIS. How can I help you?';
    } else if (q.includes('who are you') || q.includes('what are you')) {
      reply = 'I am JARVIS, your personal AI assistant interface.';
    } else if (q.includes('time')) {
      reply = 'The current time is ' + new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' }) + '.';
    } else if (q.includes('date') || q.includes('today')) {
      reply = 'Today is ' + new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) + '.';
    } else if (q.includes('open youtube')) {
      reply = 'Opening YouTube.';
      window.open('https://www.youtube.com', '_blank');
    } else if (q.startsWith('search ')) {
      const query = text.slice(7).trim();
      reply = 'Searching for ' + query + '.';
      window.open('https://www.google.com/search?q=' + encodeURIComponent(query), '_blank');
    } else {
      reply = 'I heard you say: ' + text + '. My voice interface is working. The full AI brain is the next upgrade.';
    }

    addMessage('JARVIS', reply);
    speak(reply);
    return reply;
  }

  function startVoice() {
    if (!Recognition) {
      setStatus('⚠️ Voice recognition is not supported in this browser.', true);
      react(false);
      return;
    }

    if (window.__jarvisListening) return;
    window.__jarvisListening = true;
    react(true);
    setStatus('🔵 Listening... speak now', true);

    const recognition = new Recognition();
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = function () {
      setStatus('🔵 Listening... speak now', true);
    };

    recognition.onresult = function (event) {
      const text = event.results[0][0].transcript.trim();
      addMessage('You', text);
      setStatus('🟢 Processing...', true);
      setTimeout(function () { answer(text); }, 250);
    };

    recognition.onerror = function (event) {
      let message = '⚠️ Voice error: ' + event.error;
      if (event.error === 'not-allowed') message = '⚠️ Microphone permission is blocked. Allow microphone access for this site.';
      if (event.error === 'no-speech') message = '⚠️ I did not hear anything. Tap the mic and speak again.';
      setStatus(message, true);
      react(false);
      setTimeout(function () { setStatus('', false); }, 4500);
    };

    recognition.onend = function () {
      window.__jarvisListening = false;
      if (window.speechSynthesis && window.speechSynthesis.speaking) return;
      react(false);
      setTimeout(function () {
        const box = el('listening');
        if (box && box.textContent.indexOf('error') === -1 && box.textContent.indexOf('permission') === -1) box.style.display = 'none';
      }, 1200);
    };

    try {
      recognition.start();
    } catch (e) {
      window.__jarvisListening = false;
      react(false);
      setStatus('⚠️ Could not start the microphone. Tap again.', true);
    }
  }

  function sendMessage() {
    const input = el('chatInput');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    addMessage('You', text);
    input.value = '';
    setTimeout(function () { answer(text); }, 250);
  }

  window.startVoice = startVoice;
  window.sendMessage = sendMessage;

  // Add visual voice-state styles without changing the existing design.
  const style = document.createElement('style');
  style.textContent = `
    .jarvis-active .ring { animation-duration: 1.5s !important; filter: brightness(1.7); }
    .jarvis-active .core { transform: scale(1.08); box-shadow: inset 0 0 45px rgba(0,225,255,.8), 0 0 55px rgba(0,220,255,.9); }
    .jarvis-active-mic { animation: jarvisMicPulse .8s ease-in-out infinite alternate; }
    @keyframes jarvisMicPulse { from { transform: scale(1); box-shadow: 0 0 20px #008cff; } to { transform: scale(1.12); box-shadow: 0 0 55px #00eaff; } }
  `;
  document.head.appendChild(style);
})();
