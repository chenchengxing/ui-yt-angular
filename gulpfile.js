var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var karma = require('gulp-karma');

gulp.task('default', function () {
  return gulp.watch(['src/**/*.js', 'gulpfile.js'], ['lint', 'test']);
});

gulp.task('lint', function () {
  return gulp.src(['src/**/*.js', 'gulpfile.js'])
});

gulp.task('test', function () {
  return gulp.src(['undefined.js'])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }))
});

gulp.task('b', function () {
  return gulp.src(['build-prefix.js', 'src/**/*.js', '!src/**/*.spec.js'])
    .pipe(concat('ui-yt.js'))
    .pipe(gulp.dest('dist'))
    .pipe(concat('ui-yt.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
})