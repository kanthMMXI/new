const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = false; // Stop after one phrase
recognition.interimResults = false; // We want only final results
recognition.lang = "it-IT"; // Set to Italian

// Check if recognition is supported
if (!recognition) {
    alert("Speech Recognition is not supported in this browser.");
}

recognition.onstart = function() {
    console.log("Speech recognition started...");  // Log when recognition starts
};

recognition.onspeechend = function() {
    console.log("Speech ended..."); // Log when speech ends (helps to check if audio was captured)
};

recognition.onresult = function(event) {
    console.log("Speech result event:", event);  // Log entire event for debugging
    const transcript = event.results[0][0].transcript;  // Get the transcript from the event
    console.log("Recognized speech:", transcript);  // Log the transcript

    // Check if any speech was captured, and display it
    if (transcript) {
        document.getElementById("textInput").value = transcript;  // Display captured speech in the text input
        translateText();  // Automatically trigger translation after speech is captured
    } else {
        console.log("No speech detected.");
    }
};

recognition.onerror = function(event) {
    console.error("Speech recognition error:", event.error);  // Log any errors encountered
    alert("Error with speech recognition: " + event.error);  // Show error message
};

recognition.onnomatch = function() {
    console.log("No speech match found.");  // Log when no speech is detected or matched
};

recognition.onaudioend = function() {
    console.log("Audio input ended.");  // Log when audio has ended
};

document.getElementById("start-recording").addEventListener("click", function() {
    console.log("Start recording clicked...");
    recognition.start();  // Start the recognition process
});
