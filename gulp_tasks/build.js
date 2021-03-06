var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
/**
 * build task
 * @description concat ui-yi.js, also minified one
 */
gulp.task('build', ['mergeCss', 'generateBuildPrefix', 'html2js'], function() {
  return gulp.src(['misc/build-prefix.js', 'src/*/*.js', 'src/*/template/*.js'])
    .pipe(concat('ui-yt.js'))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('demo/vendor'))
    .pipe(rename('ui-yt.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
});

gulp.task('b', ['build']);

