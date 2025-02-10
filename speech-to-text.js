// Initialize Speech Recognition API
let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'it-IT';  // Italian language
recognition.interimResults = false;
recognition.maxAlternatives = 1;

document.getElementById('start-recording').onclick = function () {
    console.log("Start recording clicked...");
    recognition.start();
    console.log("Speech recognition started...");
};

recognition.onresult = function (event) {
    let transcript = event.results[0][0].transcript;
    console.log("Recognized speech:", transcript);
    document.getElementById('textInput').value = transcript;
    translateText();  // Automatically translate the recognized speech
};

recognition.onerror = function (event) {
    console.error("Speech recognition error:", event.error);
};

recognition.onend = function () {
    console.log("Speech input ended.");
};
