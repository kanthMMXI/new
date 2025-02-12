async function translateText() {
    let text = document.getElementById('textInput').value.trim();
    let targetLang = document.getElementById('languageSelect').value;

    if (!text) {
        alert("Please enter or speak text first!");
        return;
    }

    let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=it&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

    try {
        let response = await fetch(url);
        let result = await response.json();
        let translatedText = result[0].map(item => item[0]).join(' ');

        document.getElementById('outputText').innerText = translatedText;
    } catch (error) {
        console.error("Translation failed:", error);
        alert("Translation error. Please try again.");
    }
}

function speakTranslation() {
    let translatedText = document.getElementById('outputText').innerText.trim();

    if (!translatedText) {
        alert("No translated text to speak!");
        return;
    }

    let utterance = new SpeechSynthesisUtterance(translatedText);
    utterance.lang = document.getElementById('languageSelect').value; // Match the selected language
    utterance.rate = 1;

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
}
