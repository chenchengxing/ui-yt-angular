var gulp = require('gulp');
var html2js = require('gulp-html2js');
var foreach = require('gulp-foreach');
var path = require('path');
var rename = require('gulp-rename');

/*generate templateCache from tpl*/
gulp.task('html2js', function() {
  return gulp.src('src/*/template/*.html')
    .pipe(foreach(function(stream, file) {
      return stream
        .pipe(html2js({
          outputModuleName: file.name,
          base: 'src'
        }))
        .pipe(rename(path.basename(file.path, '.html') + '.js'))
        .pipe(gulp.dest(path.dirname(file.path)));
    }));
});
