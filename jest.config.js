// jest.config.js
// Sync object
module.exports = {
    "verbose": true,
    "collectCoverageFrom": [
        "*.{js,jsx,ts,tsx}"
    ],
    "coverageThreshold": {
        "global": {
            "functions": 80,
            "lines": 80,
            "statements": -10
        }
    },
    "collectCoverage": true
};
