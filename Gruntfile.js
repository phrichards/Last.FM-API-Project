 module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
	 pkg: grunt.file.readJSON('package.json'),
	 	sass: {                              // Task
	 	    dist: {                            // Target
 	      		options: {   // Target options
	 	        	style: 'compact',
	 	        	lineNumbers: true
 	      		}, // end options
	 	      	files: {  // Dictionary of files
		 	        'css/style.css': 'css/style.scss', // 'destination': 'source'
	 	      	} // end files
 	    	} // end dist
 	  	}, // end sass

 	  	watch: {
 	  	  css: {
 	  	    files: '**/*.scss',
 	  	    tasks: ['sass'],
 	  	    options: {
 	  	      livereload: true,
 	  	    } // end options
 	  	  } // end css
 	  	}, // end watch

 	  	cssmin : {
	        css:{
	            src: 'css/style.css',
	            dest: 'style.min.css'
	        }
	    },

	    uglify : {
            js: {
                files: {
                    'scripts.js' : [ 'scripts.js' ]
                }
            }
        },

        svginject: {
			all : {
				options: {},
				files: {
					'js/SVGinject.js': ['img/*.svg'],
				}
			}
		},



	}); // end initconfig

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-svginject');

	// Default task(s).
	grunt.registerTask('default', ['sass', 'cssmin', 'uglify', 'svginject', 'watch']);

 };

 // TO USE:

 // navigate to project folder in terminal
 // npm init
 // npm install grunt --save-dev
 // npm install grunt-contrib-sass --save-dev
 // npm install grunt-contrib-watch --save-dev
 // ensure css paths above match filenames in project folder
 // grunt
