	var gulp = require('gulp');
	var ts = require('gulp-typescript');
	var less = require('gulp-less');
	var concat = require('gulp-concat');
	var connect = require('gulp-connect'); //Auto-refresh the browser.
	var htmlSources = ['**/*.html']; // to help refresh the browser
	//Gulp likes the typescript Options in the following format which
	//is slightly different than that of a standard tsconfig.json file. 
	//Therefore my tsconfig.json file is obsolete even though its content
	//is the same as below. 
	var typescriptOptions ={
        "target": "es5",
        "module": "commonjs",
        "moduleResolution": "node",
        "sourceMap": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "removeComments": false,
        "noImplicitAny": false
	};
var tsProject = ts.createProject(typescriptOptions);
//Double wildcards  (double asterisks) recurse subDirs.
//Include all *.ts files in the typescript transpiling. 
//Use exclamation ponts to exlude any and all *.d.ts files. 
var typescriptGlob = [
    "./**/*.ts", "!./node_modules/**",  "!./typings/**",
	 
];
gulp.task('ts', function () {
	   return  gulp.src(typescriptGlob)
	  .pipe(tsProject(ts.reporter.fullReporter()))
	});
	gulp.task('js', function () { //Task name is 'js'
	  gulp.src(['**/module.js', '**/*.js'])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('.'))
	})
	//Presume the source css-file for LESS to be 'app/app.less'
	//The dest folder will be '/dist'. Thus the dest file will be dist/app.css 
	gulp.task('less', function() { //Task name is 'less'
	  return gulp.src('app/app.less')
		.pipe(less())
		.pipe(gulp.dest('dist'));
	});
	//Watch all the files of the tasks named ts,less, and js
	gulp.task('watch', ['ts', 'less', 'js'], function() {
		gulp.watch(typescriptGlob, ['ts']);
		gulp.watch('**/*.less', ['less']);
		gulp.watch('**/*.js', ['js']);
	});
	//Refresh the browser using livereload
	gulp.task('connect', function() {
	  connect.server({
		root: '.',
		livereload: true,
		port:3000
	  })
	});
	gulp.task('html', function() {//Helps with livereload?
	  gulp.src(htmlSources)
	  .pipe(connect.reload())
	});
	gulp.task('default', ['html', 'ts', 'js', 'less', 'connect', 'watch']);
	