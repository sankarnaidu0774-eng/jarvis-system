document.addEventListener("DOMContentLoaded", () => {
    // 1. Live Clock Engine
    setInterval(() => {
        const now = new Date();
        const clockEl = document.getElementById("clock");
        if (clockEl) {
            clockEl.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
    }, 1000);

    const chatOutput = document.getElementById("chat-output");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const micBtn = document.getElementById("mic-btn");

    // JARVIS Voice Output (Text-to-Speech)
    function speak(text) {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1.0;
            window.speechSynthesis.speak(utterance);
        }
    }

    // Command Processor (Browser lone direct ga pani chesthundi)
    function processCommand(rawText) {
        if (!rawText) return;
        const cmd = rawText.toLowerCase().trim();
        
        if (chatOutput) {
            chatOutput.innerHTML += `<br><b>You:</b> ${rawText}`;
            chatOutput.scrollTop = chatOutput.scrollHeight;
        }

        let reply = "";

        if (cmd.includes("open youtube")) {
            reply = "Opening YouTube for you Boss!";
            window.open("https://www.youtube.com", "_blank");
        } else if (cmd.includes("open google")) {
            reply = "Opening Google Boss!";
            window.open("https://www.google.com", "_blank");
        } else if (cmd.includes("who are you") || cmd.includes("nee peru enti")) {
            reply = "I am JARVIS, your advanced personal AI assistant built by Sankar.";
        } else if (cmd.startsWith("search ")) {
            const query = cmd.replace("search ", "");
            reply = `Searching Google for: ${query}`;
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
        } else {
            reply = `Command received: "${rawText}". All systems operational!`;
        }

        if (chatOutput) {
            chatOutput.innerHTML += `<br><span style="color:#ffcc00;">JARVIS:</span> ${reply}`;
            chatOutput.scrollTop = chatOutput.scrollHeight;
        }
        speak(reply);
    }

    // Chat Send Button Click
    if (sendBtn && userInput) {
        sendBtn.addEventListener("click", () => {
            processCommand(userInput.value);
            userInput.value = "";
        });

        userInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                sendBtn.click();
            }
        });
    }

    // Voice Recognition (Microphone Integration)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition && micBtn) {
        const recognition = new SpeechRecognition();
        recognition.lang = "te-IN"; // Telugu & English support
        
        micBtn.addEventListener("click", () => {
            try {
                recognition.start();
                if (chatOutput) {
                    chatOutput.innerHTML += `<br><span style="color:#00ff00;">JARVIS: Listening to Sankar...</span>`;
                }
            } catch (err) {
                console.log("Mic already active");
            }
        });

        recognition.onresult = (event) => {
            const voiceText = event.results[0][0].transcript;
            processCommand(voiceText);
        };
    }
});