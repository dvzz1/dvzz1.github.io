// Listen for the form submission event
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('typingForm');
  const responseMessage = document.getElementById('responseMessage');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const textToType = document.getElementById('textToType').value;

    if (textToType) {
      try {
        const authOptions = {
          client_id: '916884835094-nu61ir6f1tbkf0nu2363t01r8g4b3fot.apps.googleusercontent.com', // Replace with your Google Cloud Console project's client ID
          callback: onAuthCallback,
        };

        google.accounts.id.initialize(authOptions);

        // Trigger the Google Identity Services (GIS) one-tap prompt
        google.accounts.id.prompt();

        function onAuthCallback(authResponse) {
          if (authResponse['credential']) {
            // User is signed in
            const response = await fetch('https://script.google.com/macros/s/AKfycbysWGBdwKPRd5WWtSm7_l6DToC3EN6jKcwIsPm5fiC0yMhFqyQHc4pWNRkrBotFcRJS3A/exec', {
              method: 'POST',
              mode: 'cors',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Bearer ' + authResponse['credential'],
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
            // Handle authentication error
            console.error('Authentication error:', authResponse);
          }
        }
      } catch (error) {
        console.error('Authentication error:', error);
      }
    } else {
      responseMessage.textContent = 'Error: Text to type is missing.';
    }
  });
});
