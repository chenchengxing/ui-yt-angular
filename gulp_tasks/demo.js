/**
 * gulp task for demo(website)
 * demo website including 1)home page listing all components
 *                        2)individual component page,where description, apis, demo for component can be found.
 *
 * This build process is way too complicated.
 * 1.first we 
 */
var gulp = require('gulp');
var path = require('path');
var folders = require('gulp-folders');
var componentsPath = 'src';
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var fs = require('fs');
var htmlencode = require('htmlencode').htmlEncode;
var concat = require('gulp-concat');
var markdown = require('gulp-markdown');
var md = require('node-markdown').Markdown;
var _ = require('lodash');
var file = require('gulp-file');
var clean = require('gulp-clean');


gulp.task('demoWatch', function () {
  return gulp.watch('src/**/*.{js,css,html}', ['demoJsMerge', 'demo', 'demoOneWordDescription'])
});

gulp.task('demoJsMerge', function () {
  return gulp.src('src/*/docs/demo.js')
    .pipe(concat('demo.js'))
    .pipe(gulp.dest('demo'))
});
/**
  read name from docs/oneWordDescription and generate CONSTANTS
*/
gulp.task('demoOneWordDescription', ['demoOneWordDescriptionClean'], function () {
  var components = fs.readdirSync('src');
  var componentConstant = [];
  _.forEach(components, function (component) {
    var oneWordDescription = readContentsSync(path.join('src', component, 'docs', 'oneWordDescription.info'));
    var item = {
      name: component,
      desc: oneWordDescription
    };
    componentConstant.push(item);
  });
  return file('components.js', 'angular.module(\'app\').constant(\'COMPONENTS\',' + JSON.stringify(componentConstant) + ');' , {src: true})
    .pipe(gulp.dest('demo'));
});
gulp.task('demoOneWordDescriptionClean', function () {
  return gulp.src('demo/components.js', {read: false})
          .pipe(clean());
})

gulp.task('demo', folders(componentsPath, function(component){
  //This will loop over all folders inside pathToFolder main, secondary
  //Return stream so gulp-folders can concatenate all of them
  //so you still can use safely use gulp multitasking
  var componentDocsPath = path.join(componentsPath, component, 'docs');
  var apiMd = readSync(path.join(componentDocsPath, 'readme.md'));
  var apiHtml = md(apiMd);
  var demoHtml = readSync(path.join(componentDocsPath, 'demo.html'));
  var codeHtml = demoHtml && htmlencode(demoHtml);
  var jsHtml = readSync(path.join(componentDocsPath, 'demo.js'));
  var cssHtml = readSync(path.join(componentDocsPath, 'demo.css'));


  return gulp.src('misc/demo/demoAll.tpl.html')
      .pipe(replace(/\{\{DEMO\}\}/g, demoHtml || 'no demo'))
      .pipe(replace(/\{\{API\}\}/g, apiHtml || '<!-- no apiHtml -->'))
      .pipe(replace(/\{\{codeHtml\}\}/g, codeHtml || '<!-- no demo html -->'))
      .pipe(replace(/\{\{codeJs\}\}/g, jsHtml || '// no demo js'))
      .pipe(replace(/\{\{codeCss\}\}/g, cssHtml || '/* no css */'))
      .pipe(rename('demo.tpl.html'))
      .pipe(gulp.dest(path.join('demo/app/components', component, 'docs')));
}));

function readSync(file) {
  if (fs.existsSync(file)) {
    return fs.readFileSync(file, 'utf8');
  }
}

function readContentsSync(file) {
  var contents = '';
  if (fs.existsSync(file)) {
    contents = fs.readFileSync(file, 'utf8');
  }
  return contents;
}

// gulp.task('demoReadme', folders(componentsPath, function(component){
//   var readmePath = path.join('src', component, 'docs/readme.md');
//   if (!fs.existsSync(readmePath)) {
//     if (!fs.existsSync(path.dirname(readmePath))){
//       fs.mkdirSync(path.dirname(readmePath));
//     }
//     fs.openSync(readmePath, 'w');
//   }
//   return gulp.src(readmePath)
//     .pipe(markdown())
//     .pipe(rename('readme.tpl.html'))
//     .pipe(gulp.dest(path.join('demo/app/components', component, 'docs')));
// }));
