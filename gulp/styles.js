var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import');

gulp.task('styles', function() {
	return gulp.src('./assets/css/style.css')
	.pipe(postcss([cssImport, cssvars, nested, autoprefixer({
		browserslist: [
		"> 10%",
    	"last 7 versions"],
		cascade: false
	})]))
	.pipe(gulp.dest('./temp/css/'));
});