var gulp = require('gulp');
var fs = require('fs');
var path = require('path');

gulp.task('create', function () {
  var argv = require('yargs').argv;
  // console.dir(argv._);
  var name = argv.n;
  //check if component already exists
  if (fs.existsSync(path.join('src', name))) {
    console.error('Error: ' + name + 'already exist');
  } else {
    
  }
});