basePath = '../';

files = [
    ANGULAR_SCENARIO,
    ANGULAR_SCENARIO_ADAPTER,
    'test/e2e/**/*.js'
];

autoWatch = false;

browsers = ['Chrome'];

singleRun = false;

// web server port
port = 8081;

proxies = {
    '/':'http://localhost:8000/'
};

reporters = ['dots', 'junit'];

junitReporter = {
    outputFile:'test_out/e2e.xml',
    suite:'e2e'
};
