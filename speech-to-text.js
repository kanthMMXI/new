const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = "it-IT"; // Set to Italian

recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById("textInput").value = transcript; // Insert spoken text into input field
};

document.getElementById("start-recording").addEventListener("click", function() {
    recognition.start();
});
