var gulp = require('gulp');

gulp.task('watch', function () {
  return gulp.watch(['src/**/*.{js,info,html,css}', 'gulpfile.js', '!src/*/template/*.js'], ['jshint', 'zipDist', 'srcJson', 'html2js', 'demoJsMerge', 'demoCssMerge', 'demo', 'demoOneWordDescription']);
});