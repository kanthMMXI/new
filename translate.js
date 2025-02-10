async function translateText() {
    let text = document.getElementById('textInput').value;
    console.log("Text to translate:", text);  // Debug: Check the text passed to the translation API

    let targetLang = document.getElementById('languageSelect').value;
    let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=it&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

    let response = await fetch(url);
    let result = await response.json();
    console.log("Translation API response:", result);  // Debug: Log the response from the translation API

    if (result && result[0] && result[0].length > 0) {
        let translatedText = result[0].map(item => item[0]).join(' ');
        console.log("Translated text:", translatedText);  // Log the translated text

        document.getElementById('outputText').innerText = translatedText;

        // Speak the translated text
        speakText(translatedText);
    } else {
        console.log("Translation failed or no text available to translate.");
        alert("Translation failed or no text available to translate.");
    }
}

function speakText(text) {
    if (text === '') {
        console.log("No translated text to speak!");
        return;
    }

    console.log("Speaking text:", text);  // Log the text being spoken

    let utterance = new SpeechSynthesisUtterance(text);

    // Set the language based on the selected translation
    let selectedLang = document.getElementById('languageSelect').value;
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

    // Speech synthesis events
    utterance.onstart = function () {
        console.log("Speech synthesis started.");
    };

    utterance.onend = function () {
        console.log("Speech synthesis ended.");
    };

    utterance.onerror = function (event) {
        console.error("Speech synthesis error:", event);
    };

    if ('speechSynthesis' in window) {
        console.log("Speech synthesis is supported!");
        window.speechSynthesis.speak(utterance);
    } else {
        console.error("Speech synthesis is not supported in this browser.");
    }
}
