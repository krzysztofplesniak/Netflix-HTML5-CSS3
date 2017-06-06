var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
uncss = require('gulp-uncss'),
cleanCss = require('gulp-clean-css'),
uglify = require('gulp-uglify'),
imagemin = require('gulp-imagemin'),
htmlMin = require('gulp-htmlmin');


// taski do CSS'a
gulp.task('styles', function() {
	return gulp.src('./assets/css/style.css')
	.pipe(postcss([cssImport, cssvars, nested, 
					autoprefixer({browserslist: 
						["> 3%","last 3 versions"],cascade: false})
				  ]))
	.pipe(gulp.dest('./dist/css/'));
});

//minimalizacja JS app.js
gulp.task('uglifyJS', function() {
	return gulp.src('./assets/js/app.js')
	.pipe(uglify())
	.pipe(gulp.dest('./dist/js/'));
});


// nimalizacja pliku index.html
gulp.task('htmlMin', function() {
	return gulp.src('./index.html')
	.pipe(htmlMin({
		sortAttributes: true,
		sortClassName: true,
		collapseWhitespace : true
	}))
	.pipe(gulp.dest('./dist/'))
});

// minifikowanie grafik
gulp.task('minifyIMG', function() {
	return gulp.src('./assets/img/*.{jpg,jpeg,png,gif}')
	.pipe(imagemin())
	.pipe(gulp.dest('./dist/img/'));
	
});

gulp.task('build', ['styles','minifyIMG','htmlMin','uglifyJS'], function() {
	return gulp.src('./dist/css/style.css')
	.pipe(uncss({html: ['index.html']}))
	.pipe(cleanCss())
	.pipe(gulp.dest('./dist/css/'));
});