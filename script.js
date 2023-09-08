// Listen for the form submission event
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('typingForm');
  const responseMessage = document.getElementById('responseMessage');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const textToType = document.getElementById('textToType').value;

    if (textToType) {
      try {
        const auth = google.accounts.id.getAuthCode({
          client_id: '916884835094-nu61ir6f1tbkf0nu2363t01r8g4b3fot.apps.googleusercontent.com', // Replace with your Google Cloud Console project's client ID
          prompt_parent_id: 'content'
        });

        const signInResponse = await auth.signIn();

        if (signInResponse['status'] === 'OK') {
          // User is signed in
          const response = await fetch('https://script.google.com/macros/s/AKfycbysWGBdwKPRd5WWtSm7_l6DToC3EN6jKcwIsPm5fiC0yMhFqyQHc4pWNRkrBotFcRJS3A/exec', {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: 'Bearer ' + signInResponse['auth_code'],
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
          // Handle sign-in error
          console.error('Sign-in error:', signInResponse);
        }
      } catch (error) {
        console.error('Sign-in error:', error);
      }
    } else {
      responseMessage.textContent = 'Error: Text to type is missing.';
    }
  });
});
