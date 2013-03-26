'use strict';

var testacular = require('testacular');

module.exports = function(grunt) {

	// Project configuration.
	grunt
			.initConfig({
				distdir : 'dist',
				srcdir : 'src/js',
				targetdir : 'target',
				pkg : grunt.file.readJSON('package.json'),
                banner : '/**\n' + ' * <%= pkg.description %>\n'
                    + ' * @version v<%= pkg.version %> - '
                    + '<%= grunt.template.today("yyyy-mm-dd") %>\n'
                    + ' * @link <%= pkg.homepage %>\n' +
                    ' * @license MIT License, http://www.opensource.org/licenses/MIT\n'
                    + ' */\n' ,
				src : {
					js : [ 'src/**/*.js' ]
				},
				clean : [ '<%= targetdir %>/*', '<%= distdir %>/*' ],
				copyRootdirs : {
					dest : '<%= targetdir %>',
					rootdirs : [ 'vendor', 'config', 'src', 'test' ],
					noProcess : [ 'vendor' ]
				},
				uglify : {
					options : {
						mangle : true
					},
					dist : {
						src : '<%= srcdir %>/<%= pkg.name %>.js',
						dest : '<%= srcdir %>/<%= pkg.name %>.min.js'
					}
				},
                concat : {
					options : {
						banner : '<%= banner %>'
					},
                    file_src : {
                        src : '<%= targetdir %>/<%= srcdir %>/<%= pkg.name %>-<%= pkg.version %>.js',
                        dest : '<%= distdir %>/<%= pkg.name %>-<%= pkg.version %>.js'
                    },
                    file_src_min : {
                        src : '<%= targetdir %>/<%= srcdir %>/<%= pkg.name %>-<%= pkg.version %>.min.js',
                        dest : '<%= distdir %>/<%= pkg.name %>-<%= pkg.version %>.min.js'
                    }

				},
				watch : {
					files : [ '<%= src.js %>', '<%= test.unit %>' ],
					tasks : 'build'
				},
				test : {
					unit : [ 'test/unit/**/*Spec.js' ],
					e2e : [ 'test/e2e/**/*scenarios.js' ],
					buildDir : '<%= targetdir %>'
				},
                renameSrcFilesWithVersion : {
                    src : {
                        src : '<%= targetdir %>/<%= srcdir %>/<%= pkg.name %>.js',
                        to : '<%= targetdir %>/<%= srcdir %>/<%= pkg.name %>-<%= pkg.version %>.js'
                    },
                    src_min : {
                        src : '<%= targetdir %>/<%= srcdir %>/<%= pkg.name %>.min.js',
                        to : '<%= targetdir %>/<%= srcdir %>/<%= pkg.name %>-<%= pkg.version %>.min.js'
                    }
            }
			});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadTasks('build');

    grunt.registerMultiTask('renameSrcFilesWithVersion', 'rename files', function() {
        grunt.log.write('rename file from "' + this.data.src + '" to "'
            + this.data.to + '"');
        grunt.file.copy(this.data.src, this.data.to);
        grunt.file.delete(this.data.src) ;
        grunt.log.ok();
    });

	// Default task(s).
	grunt.registerTask('default', [ 'build' ]);

	grunt.registerTask('build', [ 'clean', 'uglify', 'copyRootdirs', 'renameSrcFilesWithVersion',
			'testBuild', 'testBuildMin', 'e2e', 'concat' ]);

	grunt.registerTask('release', [ 'checkForChangedFiles', 'build', 'tag',
			'bump' ]);
};