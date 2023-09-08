document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('typingForm');
  const responseMessage = document.getElementById('responseMessage');
  const startTypingButton = document.getElementById('startTypingButton');
  const googleAppsScriptFrame = document.getElementById('googleAppsScriptFrame');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const textToType = document.getElementById('textToType').value;

    if (textToType) {
      console.log('Sending text to iframe:', textToType);
      // Send the text to your Google Apps Script web app via the iframe
      googleAppsScriptFrame.contentWindow.postMessage(textToType, '916884835094-nu61ir6f1tbkf0nu2363t01r8g4b3fot.apps.googleusercontent.com');
    } else {
      responseMessage.textContent = 'Error: Text to type is missing.';
    }
  });

  // Listen for messages from the embedded iframe
  window.addEventListener('message', function (event) {
    if (event.origin === '916884835094-nu61ir6f1tbkf0nu2363t01r8g4b3fot.apps.googleusercontent.com') {
      // Handle responses from the iframe (e.g., success or error messages)
      const result = event.data;
      console.log('Received message from iframe:', result);
      responseMessage.textContent = result;
    }
  });
});
