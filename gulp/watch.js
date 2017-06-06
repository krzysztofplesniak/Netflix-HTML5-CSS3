var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('watch', function() {

// 3 watchery: 1-plik index.html  2-pliki css 3-pliki JavaScript 
// jedna komenada minifikacji plików graficznych wykonywana tylko raz ręcznie

	// watch('./assets/img/*.{jpg,jpeg,png,gif}', function() {
	// 	gulp.start('minifyIMG');	 	
	// });

	browserSync.init({
		notify: false,
	 	server: {
	 		baseDir: "./"
	 	}
	 });

	// watcher plików HTML
	watch('./index.html', function() {
		gulp.start('htmlMin');
		browserSync.reload();	 	
	});

	// watcher plików CSS
	watch('./assets/css/*.css', function() {
	 	gulp.start('cssInject');
	});	
	
	// watcher plików JS
	watch('./assets/js/*.js', function() {
		gulp.start('uglifyJS');
	});
	
});

gulp.task('cssInject', ['styles'], function() {
	 return gulp.src('./temp/css/style.css')
	 .pipe(browserSync.stream());
});