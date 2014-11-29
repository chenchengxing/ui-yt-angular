var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

/*lint src*/
gulp.task('jshint', function() {
  return gulp.src(['src/**/*.js', 'gulpfile.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});
