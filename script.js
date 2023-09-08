document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('typingForm');
  const responseMessage = document.getElementById('responseMessage');
  const googleAppsScriptFrame = document.getElementById('googleAppsScriptFrame');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const textToType = document.getElementById('textToType').value;

    if (textToType) {
      try {
        // Send the text to your Google Apps Script web app via the iframe
        googleAppsScriptFrame.contentWindow.postMessage(textToType, 'https://script.google.com/macros/s/AKfycbz0ahKj7DC16bvcVN1Wd2UUwRZh0hIbKUvRY-j45dULb5y78-0Uzeouwshak-1uCTc_Vg/exec');
        responseMessage.textContent = 'Sending text to Google Apps Script...';

        // Add a timeout to wait for a response (adjust as needed)
        const timeoutDuration = 10000; // 10 seconds
        const timeout = setTimeout(() => {
          responseMessage.textContent = 'Timeout: No response from Google Apps Script.';
        }, timeoutDuration);

        // Listen for messages from the embedded iframe
        window.addEventListener('message', function (event) {
          if (event.origin === 'https://script.google.com/macros/s/AKfycbz0ahKj7DC16bvcVN1Wd2UUwRZh0hIbKUvRY-j45dULb5y78-0Uzeouwshak-1uCTc_Vg/exec') {
            clearTimeout(timeout); // Clear the timeout
            const result = event.data;
            responseMessage.textContent = result;
          }
        });
      } catch (error) {
        responseMessage.textContent = 'Error: ' + error.message;
      }
    } else {
      responseMessage.textContent = 'Error: Text to type is missing.';
    }
  });
});
