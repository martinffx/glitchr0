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
    rename = require('gulp-rename');
    //babel = require('gulp-babel');

var getBundleName = function (side) {
    var version = require('./package.json').version;
    var name = require('./package.json').name;
    return name + '.' + side + '-' + version + '.' + 'min.js';
};

/*
    JS CLIENT
*/
var jsBundler = watchify(browserify('./app/client/index.js', watchify.args));
jsBundler.transform('babelify');

gulp.task('js', jsBundle); // so you can run `gulp js` to build the file
jsBundler.on('update', jsBundle); // on any dep update, runs the bundler

function jsBundle() {
    return jsBundler.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source(getBundleName('client')))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
        .pipe(uglify())
        .pipe(sourcemaps.write('./')) // writes .map file
        .pipe(gulp.dest('./dist/static'));
}

/*

     SERVER

*/
gulp.task('server', function() {
    // return gulp.src('./server.js')
    //     //.pipe(source(getBundleName('server')))
    //     .pipe(babel())
    //     .pipe(gulp.dest('./dist'));
});


/*

     SASS

*/
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


/*

     TEST

*/
gulp.task('test', function() {

});


/*

     Watch

*/
gulp.task('watch', function(){
    gulp.watch('sass/**/*.scss', ['styles']);
    gulp.watch('tests/**/*.js', ['test']);
    gulp.watch('app/**/*.js', ['test', 'js']);
});


gulp.task('default', ['watch', 'connect', 'js', 'styles']);
