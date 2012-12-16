module.exports = function(grunt) {

  var exec = require('child_process').exec;

  /**
   * Bump version
   *  - increase version
   *  - generate changelog
   *  - create tag
   *  - push to github
   *
   *
   * grunt bump
   * grunt bump:patch
   * grunt bump:minor
   * grunt bump:major
   */
  grunt.registerTask('bump', 'Increment version', function(type) {
  
	var type = type || 'patch';

    var bumpVersion = function(version, versionType) {
		var type = {
		  patch: 2,
		  minor: 1,
		  major: 0
		};

		var parts = version.split('.');
		var idx = type[versionType || 'patch'];

		parts[idx] = parseInt(parts[idx], 10) + 1;
		while(++idx < parts.length) {
		  parts[idx] = 0;
		}
		return parts.join('.');
	};


    // increment the version
    var PKG_FILE = 'package.json';
    var pkg = grunt.file.readJSON(PKG_FILE);
    var previousVersion = pkg.version;
    var newVersion = pkg.version = bumpVersion(previousVersion, type);

    // write updated package.json
    grunt.file.write(PKG_FILE, JSON.stringify(pkg, null, '  '));
    grunt.log.ok('Version bumped to ' + newVersion);
  });
  
  grunt.registerTask('checkForChangedFiles', 'check for changes', function() {

    var finish = this.async();
    var queue = [];
	var changes = false;
    var next = function() {
      var cmd = queue.shift();

      if (!cmd) return finish();

      exec(cmd[0], function(err, output) {
		if(!grunt.util._.isEmpty(output)){
			return grunt.fail.fatal('Commit and/or push changes!!!');
		}
        if (err) return grunt.fail.fatal(err.message.replace(/\n$/, '.'));
        if (cmd[1]) grunt.log.ok(cmd[1]);
        if (cmd[2]) cmd[2](output);
        next();
      });
    };

    var run = function(cmd, msg, fn) {
      queue.push([cmd, msg, fn]);
    };
	
	run('git status --porcelain');
    run('git diff master origin/master');
    next();
  });
  
  grunt.registerTask('tag', 'create tag version and push to github.', function(type) {

    var finish = this.async();
    var queue = [];
    var next = function() {
      var cmd = queue.shift();
      if (!cmd) return finish();

      exec(cmd[0], function(err, output) {
        if (err) return grunt.fail.fatal(err.message.replace(/\n$/, '.'));
        if (cmd[1]) grunt.log.ok(cmd[1]);
        if (cmd[2]) cmd[2](output);
        next();
      });
    };

    var run = function(cmd, msg, fn) {
      queue.push([cmd, msg, fn]);
    };
	
	// increment the version
    var PKG_FILE = 'package.json';
    var pkg = grunt.file.readJSON(PKG_FILE);
    var currentVersion = pkg.version;
    grunt.file.write('running git commands');

    //run('git commit package.json -m "Version ' + currentVersion + '"', 'Changes committed');
    run('git tag -a v' + currentVersion + ' -m "Version ' + currentVersion + '"', 'New tag "v' + currentVersion + '" created');
    run('git push origin master --tags', 'Pushed to github');
    next();
	grunt.log.ok('Create tag version and push to github v' + currentVersion);
  });
};