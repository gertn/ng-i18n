basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'vendor/angular/angular.js',
  'vendor/angular/angular-*.js',
  'test/lib/angular/angular-mocks.js',
  'src/js/ng-i18n*.min.js',
  'test/unit/**/*.js'
];

autoWatch = false;

// web server port
port = 8080;

// cli runner port
runnerPort = 9100;

// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;

browsers = ['Chrome'];

reporters = ['dots', 'junit'];

junitReporter = {
  outputFile: 'test_out/unit_min.xml',
  suite: 'unit'
};
