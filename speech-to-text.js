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
