var gulp = require('gulp');

gulp.task('watch', function () {
  return gulp.watch(['src/**/*.{js,info,html,css}', 'gulpfile.js'], ['jshint', 'build', 'html2js', 'demoJsMerge', 'demo', 'demoOneWordDescription']);
});