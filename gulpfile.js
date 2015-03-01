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
    rename = require('gulp-rename'),
    babel = require('gulp-babel'),
    shell = require('gulp-shell'),
    concat = require('gulp-concat');

var getBundleName = function () {
    var version = require('./package.json').version;
    var name = require('./package.json').name;
    return name + '-' + version + '.' + 'min.js';
};

/*
    JS CLIENT
*/
var jsBundler = watchify(browserify('./src/client/index.js', watchify.args));
jsBundler.transform('babelify');

gulp.task('client', jsBundle); // so you can run `gulp js` to build the file
jsBundler.on('update', jsBundle); // on any dep update, runs the bundler

function jsBundle() {
    return jsBundler.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source(getBundleName()))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./')) // writes .map file
        .pipe(gulp.dest('./dist/static'));
}



/*

     SERVER

*/
gulp.task('server', function() {
    return gulp.src(['src/index.js', 'src/lib/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('index.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'));
});



/*

     SASS

*/
gulp.task('styles', function () {
    return gulp.src('./src/sass/main.scss')
        .pipe(sass({
            includePaths: ['styles'].concat(neat)
        }))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/static'));
});



/*

     TEST

*/
gulp.task('test', function() {
    console.log('TODO: run tests');
});



/*

     BUILD

*/
gulp.task('build', ['client', 'server', 'styles']);


/*

     Watch

*/
gulp.task('watch', ['build'], function(){
    // Watch Files
    gulp.watch('dist/*.js', ['restart']);
    gulp.watch('sass/**/*.scss', ['styles']);
    gulp.watch('tests/**/*.js', ['test']);
    gulp.watch('client/**/*.js', ['test', 'client']);
    gulp.watch('server/**/*.js', ['test', 'server']);
});


gulp.task('default', ['watch']);
