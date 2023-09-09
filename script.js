const pdfFileInput = document.getElementById('pdfFile');
const pdfViewer = document.getElementById('pdfViewer');
const audioPlayer = document.getElementById('audioPlayer');

pdfFileInput.addEventListener('change', () => {
    const file = pdfFileInput.files[0];
    if (file) {
        // Display the PDF in the iframe
        pdfViewer.src = URL.createObjectURL(file);

        // Extract text from PDF and convert it to audio
        extractTextAndConvertToAudio(file);
    }
});

function extractTextAndConvertToAudio(pdfFile) {
    // Initialize Web Speech API
    const synthesis = window.speechSynthesis;

    // Cancel any previous speech synthesis
    if (synthesis.speaking) {
        synthesis.cancel();
    }

    // Load PDF.js library
    pdfjsLib.getDocument(URL.createObjectURL(pdfFile)).promise.then(function (pdfDoc) {
        let text = '';

        // Loop through each page
        for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
            pdfDoc.getPage(pageNum).then(function (page) {
                return page.getTextContent();
            }).then(function (pageText) {
                // Combine text from all pages
                for (const item of pageText.items) {
                    text += item.str + ' ';
                }

                // If this is the last page, convert text to audio
                if (pageNum === pdfDoc.numPages) {
                    convertTextToAudio(text);
                }
            });
        }
    }).catch(function (error) {
        console.error('Error loading PDF: ' + error.message);
    });
}

function convertTextToAudio(text) {
    // Create an utterance for text-to-speech
    const speechUtterance = new SpeechSynthesisUtterance(text);

    // Set the voice and other options (adjust as needed)
    speechUtterance.lang = 'en-US';
    speechUtterance.rate = 1.0;

    // Use the Web Speech API to speak the text
    speechSynthesis.speak(speechUtterance);

    // Enable the audio player with synthesized speech
    const audioBlob = new Blob([text], { type: 'text/plain' });
    audioPlayer.src = URL.createObjectURL(audioBlob);
    audioPlayer.load();
}
