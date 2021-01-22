// jest.config.js
// Sync object
module.exports = {
    "verbose": true,
    "collectCoverageFrom": [
        "*.{js,jsx,ts,tsx}",
        "!jest.config.js"
    ],
    "coverageThreshold": {
        "global": {
            "functions": 0,
            "lines": 0,
            "statements": 0
        }
    },
    "collectCoverage": true
};
