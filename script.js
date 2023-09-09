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
    // Load PDF.js library
    pdfjsLib.getDocument(pdfFile).promise.then(function (pdfDoc) {
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
    // Use ResponsiveVoice to convert text to audio
    responsiveVoice.speak(text, 'UK English Male', { onend: function () {
        // Enable the audio player with synthesized speech
        audioPlayer.src = 'data:audio/wav;base64,' + btoa(responsiveVoice.getBlob());
        audioPlayer.load();

        // Display a confirmation message
        alert('PDF uploaded and audio loaded successfully!');
    }});
}
