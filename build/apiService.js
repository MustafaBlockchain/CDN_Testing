// apiService.js
class ApiService {
    constructor(config) {
        this.config = config;
    }

    async post(endpoint, data) {
        try {
            const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                return await response.json();
            } else {
                throw new Error(`API Error: ${response.statusText}`);
            }
        } catch (error) {
            throw new Error(`API Crash Error: ${error.message}`);
        }
    }
}

export default ApiService;
