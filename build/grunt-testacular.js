'use strict';

module.exports = function(grunt) {

  // Testacular stuff
  var testacularCmd = process.platform === 'win32' ? 'testacular.cmd' : 'testacular';
  var buildDir = grunt.config.get('test.buildDir') || 'dist';
  var runTestacular = function(testConfigFile, options) {
      var args = ['start', testConfigFile, '--reporters=dots'].concat(options);
      var done = grunt.task.current.async();
      var child = grunt.util.spawn({
        cmd: testacularCmd,
        args: args
      }, function(err, result, code) {
        if (code) {
          done(false);
        } else {
          done();
        }
      });
      child.stdout.pipe(process.stdout);
      child.stderr.pipe(process.stderr);
    };

  grunt.registerTask('test-watch', 'watch file changes and test', function() {
    var options = ['--auto-watch', '--no-single-run'];
    runTestacular('config/testacular.conf.js', options);
  });

  grunt.registerTask('testBuild', 'run testacular tests in build folder', function() {
    var options = ['--single-run', '--no-auto-watch'];
    if (process.env.TRAVIS) {
      options.push('--browsers=Firefox');
    } else {
		options.push('--browsers=Chrome');
	}
    runTestacular(buildDir + '/config/testacular.conf.js', options);
  });
  
  grunt.registerTask('testBuildMin', 'run testacular tests in build folder', function() {
    var options = ['--single-run', '--no-auto-watch'];
    if (process.env.TRAVIS) {
      options.push('--browsers=Firefox');
    } else {
		options.push('--browsers=Chrome');
	}
    runTestacular(buildDir + '/config/testacular.min.conf.js', options);
  });
  
  grunt.registerTask('test', 'run testacular tests', function() {
    var options = ['--single-run', '--no-auto-watch'];
    if (process.env.TRAVIS) {
      options.push('--browsers=Firefox');
    } else {
		options.push('--browsers=Chrome');
	}
    runTestacular('config/testacular.conf.js', options);
  });

  grunt.registerTask('e2e', 'run testacular e2e tests', function() {
    var options = ['--single-run', '--no-auto-watch'];
    if (process.env.TRAVIS) {
      options.push('--browsers=Firefox');
    }
    runTestacular('config/testacular-e2e.conf.js', options);
  });
};