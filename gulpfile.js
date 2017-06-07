var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create(),
postCss = require('gulp-postcss'),
cssImport = require('postcss-import'),
cssVars = require('postcss-simple-vars'),
nestedCss = require('postcss-nested'),
mkNestedCss = require('postcss-to-nest'),
autoprefixer = require('autoprefixer'),
cssUnused = require('gulp-uncss'),
cssClean = require('gulp-clean-css'),
jsUglify = require('gulp-uglify'),
imageMin = require('gulp-imagemin'),
htmlMin = require('gulp-htmlmin');

var path = {
		dist:   'dist/',
		src:    'src/',
		cssin:  'src/css/*.css',
		cssout: 'dist/css/',
		jsin:   'src/js/app.js',
		jsout:  'dist/js/',
		imgin:  'src/img/*.{jpg,jpeg,png,gif}',
		imgout: 'dist/img/',
		htmlin: 'src/index.html',	
		htmlout:'dist/',
		cssinname:  'src/css/style.css',
	}


gulp.task('watch', function() {

// 3 watchery: 1-plik index.html  2-pliki css 3-pliki JavaScript 
// jedna komenada minifikacji plików graficznych wykonywana tylko raz ręcznie

	// watch('./assets/img/*.{jpg,jpeg,png,gif}', function() {
	// 	gulp.start('minifyIMG');	 	
	// });

	browserSync.init({
		notify: false,
	 	server: {
	 		baseDir: path.src
	 	}
	 });

	// watcher plików HTML
	watch(path.htmlin, function() {
		gulp.start('htmlmin');
		browserSync.reload();	 	
	});


	// watcher plików JS
	watch(path.jsin, function() {
		gulp.start('jsuglify');
		browserSync.reload();	 	
	});

		// watcher plików CSS
	watch(path.cssin, function() {
	 	gulp.start('cssinject');
	 	browserSync.reload();	 	
	});	

});

gulp.task('cssinject', ['stylescss'], function() {
	 return gulp.src(path.cssinname)
	 .pipe(browserSync.stream());
});

// taski do CSS'a
gulp.task('stylescss', function() {
	return gulp.src(path.cssinname)
	.pipe(postCss([cssImport, cssVars, nestedCss, 
		          autoprefixer({browserslist: ["> 3%","last 3 versions"],cascade: false})]))
	.pipe(gulp.dest(path.cssout));
});


// taki bajer, przeróbka plików z wcięciami 
gulp.task('mknestedcss', function () {
    return gulp.src(path.cssin)
    .pipe(postCss([require('postcss-to-nest')]))
    .pipe(gulp.dest(path.cssout));
});

//minimalizacja JS app.js
gulp.task('jsuglify', function() {
	return gulp.src(path.jsin)
	.pipe(jsUglify())
	.pipe(gulp.dest(path.jsout));
});


// nimalizacja pliku index.html
gulp.task('htmlmin', function() {
	return gulp.src(path.htmlin)
	.pipe(htmlMin({
		sortAttributes: true,
		sortClassName: true,
		collapseWhitespace : true
	}))
	.pipe(gulp.dest(path.htmlout))
});

// minifikowanie grafik
gulp.task('imagemin', function() {
	return gulp.src(path.imgin)
	.pipe(imageMin())
	.pipe(gulp.dest(path.imgout));
	
});

//  -----------  całościowy build projektu  -----------------

//ze wględu na złożonosc czsową skrytpów cssUnused i cssClean
// wrzuciłem jej tutaj wykonywane tylko raz   
gulp.task('build', ['stylescss','imagemin','htmlmin','jsuglify'], function() {
	return gulp.src(path.cssin)
	.pipe(cssUnused({html: path.htmlin}))
	.pipe(cssClean())
	.pipe(gulp.dest(path.cssout));
});