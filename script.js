// Load the Google API Client Library
gapi.load('client', start);

function start() {
  // Initialize the Google API Client with your API key
  gapi.client.init({
    apiKey: 'AIzaSyBM-Yl64gfsH26SE9bmXo8V45RxPFVjDEM',
    clientId: '916884835094-nu61ir6f1tbkf0nu2363t01r8g4b3fot.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/documents',
  }).then(function () {
    // Listen for the form submission event
    const form = document.getElementById('typingForm');
    const responseMessage = document.getElementById('responseMessage');

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const textToType = document.getElementById('textToType').value;

      if (textToType) {
        // Authorize the user
        const auth = gapi.auth2.getAuthInstance();

        // Trigger OAuth authentication if the user is not signed in
        if (!auth.isSignedIn.get()) {
          try {
            await auth.signIn();
          } catch (error) {
            console.error('OAuth authentication error:', error);
            return;
          }
        }

        // Make a request to your Google Apps Script Web App
        const response = await fetch('https://script.google.com/macros/s/AKfycbysWGBdwKPRd5WWtSm7_l6DToC3EN6jKcwIsPm5fiC0yMhFqyQHc4pWNRkrBotFcRJS3A/exec', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Bearer ' + auth.currentUser.get().getAuthResponse().access_token,
          },
          body: `textToType=${encodeURIComponent(textToType)}`,
        });

        if (response.ok) {
          const result = await response.text();
          responseMessage.textContent = result;
        } else {
          responseMessage.textContent = 'Error: Unable to connect to the server.';
        }
      } else {
        responseMessage.textContent = 'Error: Text to type is missing.';
      }
    });
  }).catch(function (error) {
    console.log(error);
  });
}
