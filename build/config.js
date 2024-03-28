// config.js
class Config {
    constructor(environment) {
        this.baseUrl = this.getBaseUrl(environment);
    }

    getBaseUrl(environment) {
        switch (environment) {
            case 'dev':
                return 'https://dev-api.example.com';
            case 'sit':
                return 'https://sit-api.example.com';
            case 'demo':
                return 'https://demo-api.example.com';
            default:
                throw new Error('Invalid environment');
        }
    }
}

export default Config;
