// Initialize Google Identity Services (GIS)
google.accounts.id.initialize({ client_id: 'YOUR_CLIENT_ID' }); // Replace 'YOUR_CLIENT_ID' with your actual client ID

// Listen for the form submission event
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('typingForm');
  const responseMessage = document.getElementById('responseMessage');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const textToType = document.getElementById('textToType').value;

    if (textToType) {
      try {
        const auth = google.accounts.id.getGsiAuth({ client_id: 'YOUR_CLIENT_ID' }); // Replace 'YOUR_CLIENT_ID' with your actual client ID
        const signInResponse = await auth.signIn();

        if (signInResponse['status'] === 'OK') {
          // User is signed in
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
