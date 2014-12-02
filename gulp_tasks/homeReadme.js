var gulp = require('gulp');
var fs = require('fs');
var markdown = require('gulp-markdown');
var rename = require('gulp-rename');

gulp.task('homeReadme', function(){
  var readmePath = './readme.md';
  if (!fs.existsSync(readmePath)) {
    if (!fs.existsSync(path.dirname(readmePath))){
      fs.mkdirSync(path.dirname(readmePath));
    }
    fs.openSync(readmePath, 'w');
  }
  return gulp.src(readmePath)
    .pipe(markdown())
    .pipe(rename('readme.tpl.html'))
    .pipe(gulp.dest('demo/app/home'));
});