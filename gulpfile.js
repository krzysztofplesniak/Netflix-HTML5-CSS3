var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create(),
autoprefixer = require('autoprefixer'),
postCss = require('gulp-postcss'),
cssImport = require('postcss-import'),
cssVars = require('postcss-simple-vars'),
nestedCss = require('postcss-nested'),
mkNestedCss = require('postcss-to-nest'),
cssUnused = require('gulp-uncss'),
cssClean = require('gulp-clean-css'),
plumberCss = require('gulp-plumber'), 
jsUglify = require('gulp-uglify'),
jshint = require('gulp-jshint'),
imageMin = require('gulp-imagemin'),
htmlMin = require('gulp-htmlmin'),
del = require ('del'),
gutil = require('gulp-util'); // do wykrywania błędów i ich lepszego opisywania w sposób czytelny


// $.uglify().on('error', function(err) {
// 	gutil.log(gutil.colors.red('[Error]'), err.toString());
// 	this.emit('end');
// })

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
		gulp.start('jshint');
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
	.pipe(plumberCss())
	.pipe(gulp.dest(path.cssout));
});

// taki bajer, przeróbka plików z wcięciami 
gulp.task('mknestedcss', function () {
    return gulp.src(path.cssin)
    .pipe(postCss([require('postcss-to-nest')]))
    .pipe(gulp.dest(path.cssout));
});

// task odpowiedzialny za analizę skryptów JS
gulp.task('jshint', ['jsuglify'], function() {
  return gulp.src(path.jsin)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
});

//minimalizacja JS app.js
gulp.task('jsuglify', function() {
	return gulp.src(path.jsin)
	.pipe(jsUglify())
	.on('error', function (err) { 
		gutil.log(gutil.colors.red('[Error]'), err.toString());
	})
	.pipe(gulp.dest(path.jsout));
});


// nimalizacja pliku index.html
gulp.task('htmlmin', function() {
	return gulp.src(path.htmlin)
	.pipe(htmlMin({
		sortAttributes: true,
		sortClassName: true,
		removeComments: true,
		collapseWhitespace : true
	}))
	.pipe(gulp.dest(path.htmlout))
});

// minifikowanie grafik
gulp.task('imagemin', function() {
	return gulp.src(path.imgin)
	.pipe(imageMin())
	.pipe(gulp.dest(path.imgout))
});

// raks dla build'a -> skopiowanie wszystkich fontów do katalgu produkcyjnego DIST
gulp.task('fontscopy', function() {
	return gulp.src('src/fonts/**/*.*')	
	.pipe(gulp.dest('dist/fonts/'));
});

// skasowanie całe j zawartosci katalogu distr przed utworzeniem nowej aplikacji
gulp.task('del', function() {
	return 	del([path.dist])
	.then(console.log('Katalog produkcyjny >dist< skasowany'));
});


//  -----------  całościowy build projektu  -----------------

//ze wględu na złożonosc czsową skrytpów cssUnused i cssClean
// wrzuciłem jej tutaj wykonywane tylko raz   
gulp.task('build', ['del','stylescss','imagemin','htmlmin','jsuglify','fontscopy'], function() {
	return gulp.src(path.cssin)
	.pipe(cssUnused({html: path.htmlin}))
	.pipe(cssClean())
	.pipe(gulp.dest(path.cssout));
});