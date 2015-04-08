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
    concat = require('gulp-concat'),
    del = require('del'),
    jest = require('jest-cli');

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

gulp.task('client', ['test.client', 'styles'], jsBundle); // so you can run `gulp js` to build the file
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

     SASS

*/
gulp.task('styles', ['clean.client'], function () {
    return gulp.src('./src/sass/main.scss')
        .pipe(sass({
            includePaths: ['styles'].concat(neat)
        }))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/static'));
});



/*

     SERVER

*/
gulp.task('server', ['test.server', 'templates'], function() {
    return gulp.src(['src/server/**/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('./dist/server'));
});

gulp.task('templates', ['clean.server'], function() {
    return gulp.src('src/server/templates/*')
        .pipe(gulp.dest('./dist/server/templates'));
});



/*

     TEST

*/
gulp.task('test.server', function() {
    console.log('TODO: run tests');
});

gulp.task('test.client', function() {
    console.log('TODO: run tests');
});
xo

/*

     CLEAN

*/
gulp.task('clean.server', function(cb) {
  del(['./dist/server'], cb);
});

gulp.task('clean.client', function(cb) {
  del(['./dist/static'], cb);
});



/*

     BUILD

*/
gulp.task('build', ['client', 'server', ]);


/*

     Watch

*/
gulp.task('watch', ['build'], function(){
    // Watch Files
    gulp.watch('./src/sass/**/*.scss', ['styles']);
    gulp.watch('./tests/client/**/*.js', ['test.client']);
    gulp.watch('./tests/server/**/*.js', ['test.server']);
    gulp.watch('./src/client/**/*.js', ['test', 'client']);
    gulp.watch(['./src/index.js', './src/lib/**/*.js'], ['test', 'server']);
    gulp.watch('./src/lib/templates/**/*', ['server']);
});


gulp.task('default', ['watch']);
