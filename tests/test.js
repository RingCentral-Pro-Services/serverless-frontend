const ServerlessPlugin = require('../index');
const serverless = require('serverless');

test('Working Constructor', () => {
    let serverlessInstance = new ServerlessPlugin(serverless, {})

    expect(serverlessInstance).toBeDefined();
});

test('Show Domain Info', () => {
    let serverlessInstance = new ServerlessPlugin(serverless, {})

    expect(serverlessInstance.domainInfo()).toBeDefined();
});