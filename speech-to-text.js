// Function to translate the text
async function translateText() {
    let text = document.getElementById('textInput').value;
    let targetLang = document.getElementById('languageSelect').value;
    let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=it&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

    let response = await fetch(url);
    let result = await response.json();
    console.log(result); // Check the full response

    // Check if the result is valid before proceeding
    if (result && result[0] && result[0].length > 0) {
        let translatedText = result[0].map(item => item[0]).join(' ');

        // Display translated text
        document.getElementById('outputText').innerText = translatedText;

        // Speak the translated text
        speakText(translatedText);
    } else {
        console.log("No translation available.");
        alert("Translation failed or no text available to translate.");
    }
}

// Function to transcribe audio and translate it
async function transcribeAudio() {
    let fileInput = document.getElementById("audioInput").files[0];
    if (!fileInput) {
        alert("Please select an audio file first!");
        return;
    }

    let apiKey = "AIzaSyD4HjBVAbKAWC5wf98ay1b6iveuolmmDCc";
    let url = `https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`;

    let reader = new FileReader();
    reader.readAsDataURL(fileInput);
    reader.onload = async function () {
        let audioBase64 = reader.result.split(",")[1];
        let requestBody = {
            config: { encoding: "LINEAR16", languageCode: "it-IT" },
            audio: { content: audioBase64 }
        };

        let response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });

        let result = await response.json();
        console.log(result); // Check the transcription result

        if (result.results && result.results[0] && result.results[0].alternatives[0].transcript) {
            let transcript = result.results[0].alternatives[0].transcript;
            document.getElementById("textInput").value = transcript;
            translateText();
        } else {
            alert("Could not transcribe audio.");
        }
    };
}

// Function to speak translated text using SpeechSynthesis API
function speakText(text) {
    if (text === '') {
        console.log("No translated text to speak!");
        return;
    }

    let utterance = new SpeechSynthesisUtterance(text);
    // Set the language based on the selected translation
    let selectedLang = document.getElementById('languageSelect').value;

    // Set the language for speech synthesis
    switch (selectedLang) {
        case 'si':
            utterance.lang = 'si-LK'; // Sinhala language code
            break;
        case 'ta':
            utterance.lang = 'ta-IN'; // Tamil language code
            break;
        case 'tl':
            utterance.lang = 'tl-PH'; // Tagalog language code
            break;
        default:
            utterance.lang = 'en-US'; // Default to English
    }

    // Speak the translated text
    window.speechSynthesis.speak(utterance);
}

// Function to start recording using the browser's Web Speech API
const startRecordingButton = document.getElementById('start-recording');
let recognition;

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'it-IT'; // Set language for recognition

    recognition.onstart = function () {
        console.log("Speech recognition started.");
    };

    recognition.onresult = function (event) {
        let transcript = event.results[0][0].transcript;
        document.getElementById('transcribed-text').value = transcript;
        document.getElementById('textInput').value = transcript; // Put the transcribed text into the text input field
        translateText(); // Translate the transcribed text
    };

    recognition.onerror = function (event) {
        console.error('Speech recognition error', event);
    };

    recognition.onend = function () {
        console.log("Speech recognition ended.");
    };

    startRecordingButton.addEventListener('click', function () {
        recognition.start();
    });
} else {
    alert("Your browser does not support speech recognition.");
}

