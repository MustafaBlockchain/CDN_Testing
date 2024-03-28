//const axios = require('axios');
let session; // Declare session variable at a higher scope

// fetch(location.pathname, { method: "POST" })
//   .then(res => {
//     return res.json();
//   })
//   .then(res => {
//     const apiKey = res.apiKey;
//     const sessionId = res.sessionId;
//     const token = res.token;
//     initializeSession(apiKey, sessionId, token);
//   })
//   .catch(handleCallback);


function getURLParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function startCall() {
  const sessionId = getURLParameter('sessionId');
  const token = getURLParameter('token');
  const callUUID = getURLParameter('callUUID');
  const clerkName = getURLParameter('clerkName');
  const apiKey = '47838721';

  //Start timer to end the call after 60 seconds
  const timer = setTimeout(callTimeout, 60000);

    session = OT.initSession(apiKey, sessionId);

    // Create a publisher
    const publisher = OT.initPublisher(
      "publisher",
      {
        insertMode: "append",
        width: "100%",
        height: "100%"
      },
      handleCallback
    );

    // Connect to the session
    session.connect(token, error => {
      // If the connection is successful, initialize the publisher and publish to the session
      if (error) {
        handleCallback(error);
      } else {
        session.publish(publisher, handleCallback);
      }
    });

    // Subscribe to a newly created stream
    session.on("streamCreated", event => {
      console.log('Subscriber joined the session.');
      clearTimeout(timer);

      session.subscribe(
        event.stream,
        "subscriber",
        {
          insertMode: "append",
          width: "100%",
          height: "100%"
        },
        handleCallback
      );
    });

    session.on('streamDestroyed', event => {
      console.log('Subscriber left the call with reason: ', event.reason);
      // Perform actions to handle subscriber departure, if needed
      callEndApi();
    });
}

// // End the call
async function endCall() {

  endSession();
    await callEndApi();
    console.log('Call ended');
}

async function endSession() {
  if (session) {
    session.disconnect();
    console.log("Session disconnected");
  } else {
    console.log("Session already disconnected");
  }
}

// // Callback handler
function handleCallback(error) {
  if (error) {
    console.log("error: " + error.message);
  } else {
    console.log("callback success");
  }
}

async function callEndApi() {

  const callUUID = getURLParameter('callUUID');
  const retailerName = getURLParameter('retailerName');

  // Make the API call
  try {
    const response = await fetch('https://us-central1-shop-ar-online.cloudfunctions.net/trial/endCall', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "retailerName": retailerName,
        "callUUID": callUUID,
        "callEndedBy": 0
      }),
    });

    if (response.ok) {

      // Redirect to the thankyou screen
      //window.location.href = 'thankyou.html';
    } else {
      // Handle API error
      console.error('API Error:', response.statusText);
    }
  } catch (error) {
    console.error('API Crash Error:', error.message);
  }
}

function callTimeout() {
  endSession();

  window.alert("Oh no!!! All clerks are busy at this moment. Please try again in some time.");

  //Move to the next screen and update server about no clerk available
  callEndApi();
}
