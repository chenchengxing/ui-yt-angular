var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('mergeCss', function () {
  return gulp.src(['src/**/*.css'])
    .pipe(concat('ui-ytt.css'))
    .pipe(gulp.dest('dist'))
});
