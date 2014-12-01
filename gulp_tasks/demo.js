var gulp = require('gulp');
var path = require('path');
var folders = require('gulp-folders');
var componentsPath = 'demo/app/components';
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var fs = require('fs');
var htmlencode = require('htmlencode').htmlEncode;

gulp.task('demo', folders(componentsPath, function(component){
  //This will loop over all folders inside pathToFolder main, secondary
  //Return stream so gulp-folders can concatenate all of them
  //so you still can use safely use gulp multitasking
  var componentDocsPath = path.join(componentsPath, component, 'docs');
  var apiHtml = readSync(path.join(componentDocsPath, 'api.html'));

  var demoHtml = readSync(path.join(componentDocsPath, 'demo.html'));
  var codeHtml = demoHtml && htmlencode(demoHtml);
  var jsHtml = readSync(path.join(componentDocsPath, 'demo.js'));
  var cssHtml = readSync(path.join(componentDocsPath, 'demo.css'));


  return gulp.src('demo/app/home/demoAll.tpl.html')
      .pipe(replace(/\{\{DEMO\}\}/g, demoHtml || 'no demo'))
      .pipe(replace(/\{\{API\}\}/g, apiHtml || 'no apiHtml'))
      .pipe(replace(/\{\{codeHtml\}\}/g, codeHtml || 'no html'))
      .pipe(replace(/\{\{codeJs\}\}/g, jsHtml || 'no js'))
      .pipe(replace(/\{\{codeCss\}\}/g, cssHtml || 'no css'))
      .pipe(rename('all.tpl.html'))
      .pipe(gulp.dest(componentDocsPath));
}));

function readSync(file) {
  if (fs.existsSync(file)) {
    return fs.readFileSync(file, 'utf8');
  }
}