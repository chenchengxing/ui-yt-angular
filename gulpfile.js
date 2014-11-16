var path = require('path');
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var foreach = require('gulp-foreach');
var html2js = require('gulp-html2js');
var rename = require('gulp-rename');
var karma = require('gulp-karma');

/**
 * default task `gulp`
 * watch src, when changed, run `lint`, 'test'
 */
gulp.task('default', function() {
  return gulp.watch(['src/**/*.js', 'gulpfile.js'], ['lint', 'test', 'b']);
});

/*lint src*/
gulp.task('lint', function() {
  return gulp.src(['src/**/*.js', 'gulpfile.js'])
});

/*run karma tests*/
gulp.task('test', ['html2js'], function() {
  return gulp.src(['undefined.js'])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }))
});

/*generate templateCache from tpl*/
gulp.task('html2js', function() {
  return gulp.src('src/**/*.html')
    .pipe(foreach(function(stream, file) {
      console.dir(file)
      return stream
        .pipe(html2js({
          outputModuleName: file.name,
          base: 'src'
        }))
        .pipe(rename(path.basename(file.path, '.html') + '.js'))
        .pipe(gulp.dest(path.dirname(file.path)));
    }));
});

/**
 * build task
 * @description concat ui-yi.js, also minified one
 */
gulp.task('b', ['test'], function() {
  return gulp.src(['build-prefix.js', 'src/**/*.js', '!src/**/*.spec.js'])
    .pipe(concat('ui-yt.js'))
    .pipe(gulp.dest('dist'))
    .pipe(concat('ui-yt.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
})