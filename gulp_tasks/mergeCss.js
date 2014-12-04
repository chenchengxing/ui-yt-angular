var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('mergeCss', function () {
  return gulp.src(['src/*/css/*.css'])
    .pipe(concat('ui-yt.css'))
    .pipe(gulp.dest('dist'))
});
