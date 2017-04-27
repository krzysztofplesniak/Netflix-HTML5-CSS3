var gulp = require('gulp'),
watch = require('gulp-watch'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
browserSync = require('browser-sync').create();


gulp.task('default', function() {
	console.log('Domyślne wysołanie Gulpa');
});

gulp.task('html', function() {
	console.log('Zmiana w pliku HTML');
});

gulp.task('css', function() {
	return gulp.src('./assets/css/style.css')
	.pipe(postcss([cssvars, nested, autoprefixer]))
	.pipe(gulp.dest('./temp/css/'));
});

gulp.task('watch', function() {
	 watch('./index.html', function() {
		browserSync.reload();	 	
	});

	 watch('./assets/css/**/style.css', function() {
	 	gulp.start('cssInject');
	 });	

	 browserSync.init({
	 	server: {
	 		baseDir: "./"
	 	}
	 });
});

gulp.task('cssInject', ['css'], function() {
	 return gulp.src('./temp/css/style.css')
	 pipe(browserSync.stream());
});