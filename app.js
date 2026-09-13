// ==========================================
// JARVIS CORE CLIENT CONTROLLER (app.js)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    console.log("[JARVIS OS] Core frontend loaded successfully.");

    // 1. LIVE CLOCK & DATE ENGINE
    function updateClock() {
        const clockEl = document.getElementById("clock");
        if (!clockEl) return;

        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        clockEl.innerText = `${hours}:${minutes}`;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 2. SYSTEM TELEMETRY (RAM, Battery, CPU)
    async function fetchTelemetry() {
        const telemetryEl = document.getElementById("ram-batt-text");
        try {
            const response = await fetch('/api/telemetry');
            if (!response.ok) throw new Error("Server error");
            const data = await response.json();

            if (telemetryEl) {
                telemetryEl.innerText = `RAM: ${data.ram_usage} | BAT: ${data.battery}`;
            }
        } catch (error) {
            if (telemetryEl) {
                telemetryEl.innerText = "RAM: Offline | BAT: --";
            }
        }
    }
    // Update every 3 seconds
    setInterval(fetchTelemetry, 3000);
    fetchTelemetry();

    // 3. VOICE SYNTHESIS (JARVIS Voice Output)
    function speakReply(text) {
        if (!('speechSynthesis' in window)) {
            console.warn("Speech synthesis not supported in this browser.");
            return;
        }
        window.speechSynthesis.cancel(); // Stop any previous speech
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
    }

    // 4. SPEECH RECOGNITION (Voice Command Input)
    const voiceBtn = document.querySelector(".voice-btn");
    const orbCore = document.querySelector(".orb-core");
    const greetingText = document.querySelector(".greeting p");

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;

    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = "te-IN"; // Telugu Voice Recognition (Fallback English handle chesthundi)

        recognition.onstart = () => {
            if (voiceBtn) voiceBtn.innerHTML = '<i class="fa-solid fa-waveform-lines"></i> Listening to Sankar...';
            if (orbCore) orbCore.style.boxShadow = "0 0 80px #39ff14";
            if (greetingText) greetingText.innerText = "Listening... Em cheyalo cheppandi Boss!";
        };

        recognition.onresult = async (event) => {
            const userVoiceText = event.results[0][0].transcript;
            console.log("[User Input]:", userVoiceText);
            if (greetingText) greetingText.innerText = `Command: "${userVoiceText}"`;

            // Python backend ki voice command pampadam
            try {
                const response = await fetch('/api/command', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt: userVoiceText, language: "te-IN" })
                });
                const result = await response.json();
                
                if (greetingText) greetingText.innerText = `JARVIS: ${result.reply}`;
                speakReply(result.reply);
            } catch (err) {
                const fallbackMsg = "Command process cheyadam lo error vachindi Boss.";
                if (greetingText) greetingText.innerText = fallbackMsg;
                speakReply(fallbackMsg);
            }
        };

        recognition.onerror = (e) => {
            console.error("Speech Recognition Error:", e);
            resetOrbUI();
        };

        recognition.onend = () => {
            resetOrbUI();
        };
    } else {
        console.warn("Web Speech Recognition is not supported on this browser.");
    }

    function resetOrbUI() {
        if (voiceBtn) voiceBtn.innerHTML = '<i class="fa-solid fa-microphone-lines"></i> Tap or say \'Hey Jarvis\'';
        if (orbCore) orbCore.style.boxShadow = "0 0 60px var(--cyan)";
    }

    // Voice button click handler
    if (voiceBtn) {
        voiceBtn.addEventListener("click", () => {
            if (recognition) {
                try {
                    recognition.start();
                } catch (e) {
                    recognition.stop();
                }
            } else {
                alert("Speech recognition ee browser lo support cheyadam ledu. Chrome browser lo try cheyandi!");
            }
        });
    }

    // 5. CALL SIMULATION BUTTON
    const callBtn = document.getElementById("btn-call");
    if (callBtn) {
        callBtn.addEventListener("click", async () => {
            const isUnknown = confirm("Simulate cheyadaniki 'OK' nokkithe Unknown Number, 'Cancel' nokkithe Whitelist (Family) number simulate avthundi.");
            const payload = isUnknown
                ? { caller_name: "Delivery Agent", caller_number: "9900112233" }
                : { caller_name: "Family Member", caller_number: "7658939464" };

            try {
                const res = await fetch('/api/call-filter', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const data = await res.json();
                alert(`[JARVIS CALL FILTER ALERT]\nCaller: ${payload.caller_name} (${payload.caller_number})\nAction: ${data.action}\nJARVIS Response: ${data.message}`);
                speakReply(data.message);
            } catch (err) {
                alert("Call filter API connect avvaledu. Server on lo undo ledo check cheyandi.");
            }
        });
    }

    // 6. ACTION CARDS (Write Code, Read Screen, Web Search)
    const actionCards = document.querySelectorAll(".action-card");
    if (actionCards.length >= 3) {
        // Card 0: Write Code
        // Card 0: Write Code (The Code Forge)
        actionCards[0].addEventListener("click", async () => {
            const codeQuery = prompt("Emi code rayali Boss? (e.g. 'Write a Pygame logic for a Free Fire MAX style radar'):");
            
            if (codeQuery) {
                // UI lo loading message
                alert(`[JARVIS CODE FORGE]\n'${codeQuery}' - Generating code... Koncham wait cheyandi Boss.`);
                
                try {
                    const res = await fetch('/api/generate-code', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ prompt: codeQuery })
                    });
                    
                    const data = await res.json();
                    
                    // Code ni background Console lo print cheyadam (easy copy kosam)
                    console.log("========== JARVIS GENERATED CODE ==========");
                    console.log(data.code);
                    console.log("===========================================");
                    
                    // User ki popup chupinchadam
                    alert(`[CODE GENERATED SUCCESSFULLY]\n\n${data.code.substring(0, 150)}...\n\n(Full code chudadaniki F12 nokki 'Console' open cheyandi)`);
                    
                } catch (err) {
                    alert("Code generation failed Boss. Backend server offline lo undi.");
                }
            }
        });
        
        // Card 1: Read Screen
        actionCards[1].addEventListener("click", async () => {
            alert("[SCREEN VISION]\nLaptop screen capture chesthunnanu... Okkasari screen chudandi.");
            try {
                const res = await fetch('/api/screen');
                const data = await res.json();
                alert(`[SCREEN RESULT]:\n${data.reply || "Screen read complete."}`);
            } catch (err) {
                console.log("Screen read error (endpoint offline).");
            }
        });

        // Card 2: Search Web
        actionCards[2].addEventListener("click", () => {
            const query = prompt("Web lo emi search cheyali Boss?:");
            if (query) {
                window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
            }
        });
    }

    // 7. SIDEBAR NAVIGATION SWITCHER
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
        });
    });
});