// callDetails.js
class CallDetails {
    constructor(apiService, config) {
        this.apiService = apiService;
        this.config = config;
    }

    async fetchCallDetails(customerName, retailerName) {
        try {
            const data = {
                "retailerName": retailerName,
                "callUUID": "b18e18a8-b585-4d15-b40f-5eb9bfe23b97",
                "callEndedBy": 0,
                "userName": customerName
            };

            const response = await this.apiService.post('/sit/startCall', data);

            const sessionId = response.data.sessionId;
            const token = response.data.token;
            const callUUID = response.data.callUUID;
            const clerkName = response.data.userName;

            // Move to another screen with session ID and token
            window.location.href = `landing.html?sessionId=${sessionId}&token=${token}&clerkName=${clerkName}&callUUID=${callUUID}&retailerName=${retailerName}`;
        } catch (error) {
            console.error(error.message);
        }
    }
}

export default CallDetails;
