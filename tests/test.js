const ServerlessPlugin = require('../index');
const serverless = require('serverless');

test('Working Constructor', () => {
    let serverlessInstance = new ServerlessPlugin(serverless, {})

    expect(serverlessInstance).toBeDefined();
});

test('Run AWS Commands', () => {
    let serverlessInstance = new ServerlessPlugin(serverless, {})

    expect(serverlessInstance.runAwsCommand()).toBeDefined();
});

test('Run Sync Directory', () => {
    let serverlessInstance = new ServerlessPlugin(serverless, {})

    expect(serverlessInstance.syncDirectory()).toBeDefined();
});

test('Show Domain Info', () => {
    let serverlessInstance = new ServerlessPlugin(serverless, {})

    expect(serverlessInstance.domainInfo()).toBeDefined();
});