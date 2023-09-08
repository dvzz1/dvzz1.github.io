document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('typingForm');
  const responseMessage = document.getElementById('responseMessage');
  const startTypingButton = document.getElementById('startTypingButton');
  const googleAppsScriptFrame = document.getElementById('googleAppsScriptFrame');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const textToType = document.getElementById('textToType').value;

    if (textToType) {
      // Send the text to your Google Apps Script web app via the iframe
      googleAppsScriptFrame.contentWindow.postMessage(textToType, 'https://script.google.com/macros/s/AKfycbz0ahKj7DC16bvcVN1Wd2UUwRZh0hIbKUvRY-j45dULb5y78-0Uzeouwshak-1uCTc_Vg/exec');
    } else {
      responseMessage.textContent = 'Error: Text to type is missing.';
    }
  });

  // Listen for messages from the embedded iframe
  window.addEventListener('message', function (event) {
    if (event.origin === 'https://script.google.com/macros/s/AKfycbz0ahKj7DC16bvcVN1Wd2UUwRZh0hIbKUvRY-j45dULb5y78-0Uzeouwshak-1uCTc_Vg/exec') {
      // Handle responses from the iframe (e.g., success or error messages)
      const result = event.data;
      responseMessage.textContent = result;
    }
  });
});
