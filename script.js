const pdfFileInput = document.getElementById('pdfFile');
const pdfPreview = document.getElementById('pdfPreview');
const audioPlayer = document.getElementById('audioPlayer');
const playButton = document.getElementById('playButton');

pdfFileInput.addEventListener('change', async () => {
    const file = pdfFileInput.files[0];
    if (file) {
        // Display the PDF in the iframe
        pdfPreview.innerHTML = `<embed src="${URL.createObjectURL(file)}" width="100%" height="500px" />`;

        // Convert PDF content to text (not implemented here)

        // For demonstration purposes, we'll simulate generating audio with a delay
        await simulateAudioGeneration();

        // Set the audio source using the serverless function
        const audioSrc = await generateAudioFromText('Your PDF text goes here'); // Replace with the extracted PDF text
        audioPlayer.src = audioSrc;

        // Enable the play button
        playButton.disabled = false;
    }
});

playButton.addEventListener('click', () => {
    // Start audio playback when the play button is clicked
    audioPlayer.play();
});

// Simulate audio generation (replace with actual audio generation code)
async function simulateAudioGeneration() {
    await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate a 3-second delay
}

async function generateAudioFromText(text) {
    try {
        const response = await fetch('/.netlify/functions/generateAudio', {
            method: 'POST',
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            throw new Error('Failed to generate audio');
        }

        const { audioFile } = await response.json();
        return audioFile;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
