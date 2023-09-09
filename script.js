const pdfFileInput = document.getElementById('pdfFile');
const pdfViewer = document.getElementById('pdfViewer');
const audioPlayer = document.getElementById('audioPlayer');

pdfFileInput.addEventListener('change', async () => {
    const file = pdfFileInput.files[0];
    if (file) {
        // Display the PDF in the iframe
        pdfViewer.src = URL.createObjectURL(file);

        // Convert PDF content to text (you need a PDF library, like pdf.js, for this)
        const pdfText = await convertPDFToText(file);

        // Make a request to the serverless function to generate audio
        const audioUrl = await generateAudioFromText(pdfText);

        // Set the audio source
        audioPlayer.src = audioUrl;

        // Load and play the audio
        audioPlayer.load();
        audioPlayer.play();
    }
});

async function convertPDFToText(pdfFile) {
    // Use a PDF library like pdf.js to convert PDF content to text
    // Implement this function to extract text from the PDF
    // Return the extracted text
}

async function generateAudioFromText(text) {
    // Make an HTTP request to the serverless function endpoint
    const response = await fetch('/.netlify/functions/convertTextToAudio', {
        method: 'POST',
        body: JSON.stringify({ text }),
    });

    if (!response.ok) {
        throw new Error('Failed to generate audio');
    }

    const { audioFile } = await response.json();
    return audioFile;
}
