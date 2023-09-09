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

        // Request the serverless function to generate audio from text
        try {
            const audioSrc = await generateAudioFromText(pdfText);
            audioPlayer.src = audioSrc;

            // Enable the play button
            playButton.disabled = false;
        } catch (error) {
            console.error(error);
            alert('Error generating audio. Please try again.');
        }
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

// Function to request the serverless function to generate audio from text
async function generateAudioFromText(text) {
    try {
        const response = await fetch('/netlify-functions/generateAudio', {
            method: 'POST',
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            throw new Error('Failed to generate audio');
        }

        const { audioSrc } = await response.json();
        return audioSrc;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
