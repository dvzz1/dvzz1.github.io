const pdfFileInput = document.getElementById('pdfFile');
const pdfViewer = document.getElementById('pdfViewer');
const audioPlayer = document.getElementById('audioPlayer');

pdfFileInput.addEventListener('change', () => {
    const file = pdfFileInput.files[0];
    if (file) {
        // Display the PDF in the iframe (You may need a PDF rendering library)
        pdfViewer.src = URL.createObjectURL(file);

        // Extract text from PDF and read it out loud
        readPDFText(file);
    }
});

function readPDFText(pdfFile) {
    const reader = new FileReader();

    reader.onload = function () {
        const text = reader.result;

        // Create an utterance for text-to-speech
        const speechUtterance = new SpeechSynthesisUtterance(text);

        // Set the voice and other options (adjust as needed)
        speechUtterance.lang = 'en-US';
        speechUtterance.rate = 1.0;

        // Use the Web Speech API to speak the text
        window.speechSynthesis.speak(speechUtterance);

        // Enable the audio player with synthesized speech
        audioPlayer.src = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
        audioPlayer.load();

        // Display a confirmation message
        alert('PDF uploaded and audio loaded successfully!');
    };

    reader.readAsArrayBuffer(pdfFile);
}
