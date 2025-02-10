const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true;
recognition.interimResults = true;

recognition.onresult = function(event) {
    const transcript = event.results[event.results.length - 1][0].transcript;
    document.getElementById("transcribed-text").value = transcript;
};

document.getElementById("start-recording").addEventListener("click", function() {
    recognition.start();
});
