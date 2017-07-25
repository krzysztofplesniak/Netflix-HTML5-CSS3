var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create(),
autoprefixer = require('autoprefixer'),
postCss = require('gulp-postcss'),
cssImport = require('postcss-import'),
cssVars = require('postcss-simple-vars'),
cssNested = require('postcss-nested'),
cssMixins = require('postcss-mixins'),
mkNestedCss = require('postcss-to-nest'),
cssUnused = require('gulp-uncss'),
cssClean = require('gulp-clean-css'),
jsUglify = require('gulp-uglify'),
jshint = require('gulp-jshint'),
imageMin = require('gulp-imagemin'),
htmlMin = require('gulp-htmlmin'),
htmlhint = require('gulp-htmlhint'),
del = require ('del'),
runSequence = require('run-sequence'),
plumber = require('gulp-plumber'), // do wykrywania błędów w CSS
gutil = require('gulp-util'); // do wykrywania błędów i ich lepszego opisywania w sposób czytelny


 
var path = {
		dist:   'dist/',
		src:    'src/',
		cssin:  'src/css/*.css',
		cssout: 'dist/css/',
		jsin:   'src/js/*.js',
		jsout:  'dist/js/',
		imgin:  'src/img/*.{jpg,jpeg,png,gif}',
		imgout: 'dist/img/',
		htmlin: 'index.html',	
		htmlout:'dist/',
		cssinname:  'src/css/style.css',
	}


gulp.task('watch', function() {

// 3 watchery: 1-plik index.html  2-pliki css 3-pliki JavaScript 
// jedna komenada minifikacji plików graficznych wykonywana tylko raz ręcznie

	// gdzie domyślnie działa  BrowserSync
	browserSync.init({
		notify: false,
		server: {
	 		baseDir: './',
	 		middleware: function (req, res, next) {
	            res.setHeader('Access-Control-Allow-Origin', '*');
	            next();
        	}
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
	.pipe(plumber())
	.pipe(postCss([cssImport, cssMixins, cssVars, cssNested, 
		          autoprefixer({browserslist: ["> 3%","last 3 versions"],cascade: false})]))
	.pipe(plumber.stop())
	.pipe(gulp.dest(path.cssout));
});

// taki bajer, przeróbka plików z wcięciami SASSowymi
gulp.task('mknestedcss', function () {
    return gulp.src(path.cssinname)
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
	.pipe(htmlhint())
    .pipe(htmlhint.reporter('htmlhint-stylish'))
    .pipe(htmlhint.failReporter({    // task do błędów składniowych HTML'a
         supress: true
    }))
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

// task dla build'a -> skopiowanie fontów awesome, plików pakietu video.js do katalogu produkcyjnego DIST
gulp.task('copy', function() {
	gulp.src('src/css/fonts/*.*')	
	.pipe(gulp.dest('dist/css/fonts/'));
	gulp.src('src/videojs/*.*')	
	.pipe(gulp.dest('dist/videojs/'));
	gulp.src('src/video/*.*')	
	.pipe(gulp.dest('dist/video/'));
	return true;
});

// skasowanie całej zawartości katalogu DIST przed utworzeniem nowej aplikacji
gulp.task('del', function() {
	return 	del([path.dist])
	.then(console.log('Katalog produkcyjny >dist< skasowany'));
});

//  -----------  całościowy build projektu  -----------------

//ze wględu na złożonosc czsową skrytpów cssUnused i cssClean
// wrzuciłem jej tutaj wykonywane tylko raz  przy buildzie projektu 
gulp.task('build', function() {
    runSequence('del',['stylescss','imagemin','htmlmin','jshint','copy']);
	
	return gulp.src(path.cssinname)
	.pipe(cssUnused({html: path.htmlin}))
	.pipe(cssClean())
	.pipe(gulp.dest(path.cssout));
});