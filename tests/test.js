const ServerlessPlugin = require('../index');

test('Working Constructor', () => {
    let serverless = new ServerlessPlugin()

    expect(serverless).toBeDefined();
});

test('Run AWS Commands', () => {
    let serverless = new ServerlessPlugin()

    expect(serverless.runAwsCommand()).toBeDefined();
});

test('Run Sync Directory', () => {
    let serverless = new ServerlessPlugin()

    expect(serverless.syncDirectory()).toBeDefined();
});

test('Show Domain Info', () => {
    let serverless = new ServerlessPlugin()

    expect(serverless.domainInfo()).toBeDefined();
});