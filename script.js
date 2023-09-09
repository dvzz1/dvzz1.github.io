const pdfFileInput = document.getElementById('pdfFile');
const pdfPreview = document.getElementById('pdfPreview');
const audioPlayer = document.getElementById('audioPlayer');
const playButton = document.getElementById('playButton');

pdfFileInput.addEventListener('change', async () => {
    const file = pdfFileInput.files[0];
    if (file) {
        // Display the PDF in the iframe
        pdfPreview.innerHTML = `<embed src="${URL.createObjectURL(file)}" width="100%" height="500px" />`;

        // Simulate text extraction from the PDF (replace with actual code)
        const pdfText = await simulateTextExtraction(file);

        // Generate audio from text and set the source
        const audioSrc = await generateAudioFromText(pdfText);
        audioPlayer.src = audioSrc;

        // Enable the play button
        playButton.disabled = false;
    }
});

playButton.addEventListener('click', () => {
    // Start audio playback when the play button is clicked
    audioPlayer.play();
});

// Simulate text extraction from the PDF (replace with actual code)
async function simulateTextExtraction(pdfFile) {
    // Simulate text extraction with a delay (replace with actual code)
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Replace this with actual text extraction code
    const extractedText = 'This is a sample text extracted from the PDF.';
    return extractedText;
}

// Simulate audio generation (replace with actual audio generation code)
async function generateAudioFromText(text) {
    // Simulate audio generation with a delay (replace with actual code)
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generate audio using ResponsiveVoice
    responsiveVoice.speak(text, 'UK English Male', {
        onend: function () {
            // This function is called when audio playback ends
        },
    });

    // Replace this with the actual URL of the generated audio
    const audioSrc = 'https://example.com/path-to-generated-audio.mp3';
    return audioSrc;
}
