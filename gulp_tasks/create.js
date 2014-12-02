var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var touch = require('touch');
var es = require('event-stream');
var replace = require('gulp-replace');
var rename = require('gulp-rename');

gulp.task('create', function (cb) {
  var argv = require('yargs').argv;
  // console.dir(argv._);
  var name = argv.n;
  if (!name) {
    return;
  }
  //check if component already exists'
  var componentPath = path.join('src', name);
  if (fs.existsSync(componentPath)) {
    console.error('Error: <' + name + '> already exist');
    cb();// for gulp async task; https://github.com/gulpjs/gulp/blob/master/docs/API.md
  } else {
    // create src/alert
    fs.mkdirSync(componentPath);
    // create src/alert/test
    var testPath = path.join(componentPath, 'test');
    fs.mkdirSync(testPath);
    // create src/alert/docs
    var docsPath = path.join(componentPath, 'docs');
    fs.mkdirSync(docsPath);

    // create src/alert/test/alert.spec.js
      // touch.sync(path.join(testPath, name + '.spec.js'));
    var testPipe = gulp.src('misc/create/test.tpl.js')
      .pipe(replace(/\{\{name\}\}/g, name))
      .pipe(rename(name + '.spec.js'))
      .pipe(gulp.dest(testPath));

    // create src/alert/alert.js
      // touch.sync(path.join(componentPath, name + '.js'));
    var namePipe = gulp.src('misc/create/tpl.js')
      .pipe(replace(/\{\{name\}\}/g, name))
      .pipe(rename(name + '.js'))
      .pipe(gulp.dest(componentPath));

    // create src/alert/docs/demo.html, demo.js, readme.md, oneWordDescription.info
    var demoJsPipe = gulp.src('misc/create/demo.tpl.js')
      .pipe(replace(/\{\{name\}\}/g, name))
      .pipe(rename('demo.js'))
      .pipe(gulp.dest(docsPath));
    var demoTplPipe = gulp.src('misc/create/demo.tpl.html')
      .pipe(replace(/\{\{name\}\}/g, name))
      .pipe(rename('demo.html'))
      .pipe(gulp.dest(docsPath));
    var readmePipe = gulp.src('misc/create/readme.tpl.md')
      .pipe(replace(/\{\{name\}\}/g, name))
      .pipe(rename('readme.md'))
      .pipe(gulp.dest(docsPath));
    touch.sync(path.join(docsPath, 'oneWordDescription.info'));
    // touch.sync(path.join(docsPath, 'demo.js'));
    // touch.sync(path.join(docsPath, 'demo.html'));
    // touch.sync(path.join(docsPath, 'readme.md'));
    return es.concat(testPipe, namePipe, demoJsPipe, demoTplPipe, readmePipe);
  }
  
});