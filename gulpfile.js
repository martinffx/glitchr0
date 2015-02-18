var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    watchify = require('watchify'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect'),
    reactify = require('reactify'),
    babelify = require('babelify'),
    sass = require('gulp-sass'),
    neat = require('node-neat').includePaths,
    cssmin = require('gulp-cssmin'),
    rename = require("gulp-rename");


var jsBundler = watchify(browserify('./app/index.js', watchify.args));
// add any other browserify options or transforms here
//jsBundler.transform('reactify');
jsBundler.transform('babelify');

var getBundleName = function () {
  //var version = require('./package.json').version;
  var name = require('./package.json').name;
  return name + '.' + 'min.js';
};

gulp.task('js', jsBundle); // so you can run `gulp js` to build the file
jsBundler.on('update', jsBundle); // on any dep update, runs the bundler

function jsBundle() {
  return jsBundler.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(getBundleName()))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    .pipe(uglify())
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist'));
}

gulp.task('styles', function () {
    return gulp.src('sass/main.scss')
        .pipe(sass({
            includePaths: ['styles'].concat(neat)
        }))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('test', function() {
    
});

gulp.task('watch', function(){
  gulp.watch('sass/**/*.scss', ['styles']);
  gulp.watch('tests/**/*.js', ['test']);
});

gulp.task('connect', function(){
  connect.server();
});


gulp.task('default', ['watch', 'connect', 'js', 'styles']);
