module.exports = function(grunt) {
	var dest = grunt.config.get('copyRootdirs.dest') || 'dist';
	var rootdirs = grunt.config.get('copyRootdirs.rootdirs') || ['src'];
	var noProcess = grunt.config.get('copyRootdirs.noProcess') || [];
	
	var copyFile = function (abspath, rootdir, subdir, filename) {
		if(grunt.util._.contains(noProcess, rootdir)) {
			grunt.log.write('Copy file(no process) "' + abspath + '"...');
			grunt.file.copy(abspath, dest + '/' + abspath, {noProcess: true});
		} else {
			grunt.log.write('Copy file(process) "' + abspath + '"...');
			grunt.file.copy(abspath, dest + '/' + abspath);
		}
		grunt.log.ok();
	};
	
   grunt.registerTask('copyRootdirs', 'copy rootdir files to dest and filter if process', function(){
   grunt.log.writeln('Processing rootdirs "' + rootdirs + '"...');
	grunt.util._.each(rootdirs, function(rootdir) {
		grunt.log.writeln('Processing rootdir "' + rootdir + '"...');
		grunt.file.recurse(rootdir, copyFile);
		grunt.log.ok('End processing rootdir "' + rootdir + '"...')
	});
  });
};