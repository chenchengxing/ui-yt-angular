var gulp = require('gulp');
var karma = require('gulp-karma');

/*run karma tests*/
gulp.task('test', ['html2js'], function() {
  return gulp.src(['undefined.js'])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }))
});