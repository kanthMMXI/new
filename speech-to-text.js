const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = "it-IT"; // Set to Italian

// Check if recognition is supported
if (!recognition) {
    alert("Speech Recognition is not supported in this browser.");
}

recognition.onstart = function() {
    console.log("Speech recognition started...");
};

recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    console.log("Recognized speech:", transcript); // Check if the speech is being captured
    document.getElementById("textInput").value = transcript; // Insert spoken text into input field
};

recognition.onerror = function(event) {
    console.error("Speech recognition error", event.error);
    alert("Error with speech recognition: " + event.error);
};

document.getElementById("start-recording").addEventListener("click", function() {
    recognition.start();
});
