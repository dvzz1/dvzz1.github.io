const { textToSpeech } = require('gtts'); // Replace with the actual text-to-speech library you plan to use

exports.handler = async function (event, context) {
  try {
    const { text } = JSON.parse(event.body);

    // Log the received text for debugging
    console.log('Received text:', text);

    // Generate audio from text using your text-to-speech library
    const audioFile = await textToSpeech(text);

    // Log the generated audio file path for debugging
    console.log('Generated audio file:', audioFile);

    return {
      statusCode: 200,
      body: JSON.stringify({ audioFile }),
    };
  } catch (error) {
    // Log any errors that occur during execution for debugging
    console.error('Error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
