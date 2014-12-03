var gulp = require('gulp');
var zip = require('gulp-zip');

gulp.task('zipDist', ['build'], function () {
    return gulp.src(['dist/ui-yt*', '!dist/ui-yt.zip'])
        .pipe(zip('ui-yt.zip'))
        .pipe(gulp.dest('dist'));
});