// gulp server

// gulp release

  // gulp vbump
  // gulp upload
/*
 * Dependencies
 */
var gulp      = require('gulp');
var stylus    = require('gulp-stylus');
var rimraf    = require('rimraf');
var concatCss = require('gulp-concat-css');
var concatJs  = require('gulp-concat');
var cp        = require('child_process');

/*
 * Generate stylesheets
 */
gulp.task('build-css', ['clean'], function() {
  return gulp.src('./lib/stylesheets/*.styl')
    .pipe(stylus())
    .pipe(concatCss('soysauce.css'))
    .pipe(gulp.dest('./public'));
});

/*
 * Generate javascript files for the library
 */
gulp.task('build-js-lib', ['clean'], function() {
  return gulp.src([
    './bower_components/fastclick/lib/fastclick.js',
    './bower_components/hammerjs/hammer.js',
    './bower_components/imagesloaded/imagesloaded.pkgd.js',
    './lib/head.js',
    './lib/helpers/*.js',
    './lib/errors.js',
    './lib/widgets/base.js',
    './lib/widgets/_*.js',
    './lib/tail.js'])
    .pipe(concatJs('soysauce.js'))
    .pipe(gulp.dest('./public'));
});

/*
 * Generate javascript files for testing
 */
gulp.task('build-js-tests', function() {
  return gulp.src([
    './tests/setup.js',
    './tests/*/*/*.js',
    './tests/run.js'])
    .pipe(concatJs('testing.js'))
    .pipe(gulp.dest('./tests'));
});

/*
 * Generate javascript files
 */
gulp.task('build-js', ['build-js-lib', 'build-js-tests']);

/*
 * Clean
 */
gulp.task('clean', function (cb) {
  rimraf('./public', cb);
});

/*
 * Generate docs from javascript files
 */
gulp.task('generate-docs', function() {
  return cp.exec('./node_modules/.bin/yuidoc ./lib');
});

/*
 * Compile assets
 */
gulp.task('build', ['build-css', 'build-js', 'generate-docs']);

/*
 * Watch
 */
gulp.task('watch', ['build'], function() {
  gulp.watch('./lib/**/*', ['build']);
  gulp.watch('./tests/**/*', ['build-js-tests']);
});

gulp.task('default', ['build']);
