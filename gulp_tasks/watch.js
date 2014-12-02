var gulp = require('gulp');

gulp.task('watch', function () {
  return gulp.watch(['src/**/*.js', 'gulpfile.js'], ['jshint', 'build', 'html2js', 'demoWatch']);
});