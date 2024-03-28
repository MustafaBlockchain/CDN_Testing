async function fetchCallDetails(customerName, retailerName) {

    // Make the API call
    try {
        const response = await fetch('https://us-central1-shop-ar-online.cloudfunctions.net/trial/startCall', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "retailerName": retailerName,
                "callUUID": "b18e18a8-b585-4d15-b40f-5eb9bfe23b97",
                "callEndedBy": 0,
                "userName": customerName
            }),
        });

        if (response.ok) {
            console.log('API request succeeded');
            // Parse the response JSON
            const responseData = await response.json();

            // Extract session ID and token
            const sessionId = responseData.data.sessionId;
            const token = responseData.data.token;
            const callUUID = responseData.data.callUUID;
            const clerkName = responseData.data.userName;

            // Move to another screen with session ID and token
            window.location.href = `landing.html?sessionId=${sessionId}&token=${token}&clerkName=${clerkName}&callUUID=${callUUID}&retailerName=${retailerName}`;

        } else {
            // Handle API error
            console.error('API Error:', response.statusText);
        }
    } catch (error) {
        console.error('API Crash Error:', error.message);
    }
}