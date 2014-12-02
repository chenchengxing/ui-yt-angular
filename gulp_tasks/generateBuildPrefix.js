var gulp = require('gulp');
var path = require('path');
var folders = require('gulp-folders');
var foreach = require('gulp-foreach');
var fs = require('fs');
var file = require('gulp-file');
var minimatch = require('minimatch');

gulp.task('generateBuildPrefix', function () {
  var prefix = 'angular.module(\'ui.yt\', [';
  var suffix = ']);'
  var modules = [];
  var components = fs.readdirSync('src');
  for (var i = 0, iLen = components.length; i < iLen; i++) {
    var component = components[i];
    var allJs = {};

    var componentPath = 'src/' + component;
    var tplPath = componentPath + '/template';
    var componentName = 'ui.yt.' + component;

    modules.push(componentName);

    var tplJs = readDirSync(tplPath).filter(minimatch.filter('*.js', {matchBase: true}));;
    for (var j = 0, jLen = tplJs.length; j < jLen; j++) {
      // var regexp = new RegExp('^src' + path.sep);
      // console.log(tplJs[j])
      var tplName = tplJs[j].replace(/\.js$/, '.html').replace(/^src/, '');
      var sep = tplName.split(path.sep);
      sep.splice(0, 1);
      modules.push(sep.join('/'));
    }
  }
  // add ''
  for (var k = 0; k < modules.length; k++) {
    modules[k] = '\'' + modules[k] + '\'';
  }
  return file('build-prefix.js', prefix + modules.join() + suffix, {src: true})
    .pipe(gulp.dest('misc'));
})

function readDirSync (floder) {
  var ret = [];
  if (fs.existsSync(floder)) {
    ret = fs.readdirSync(floder).map(function (fileName) {
      return path.join(floder, fileName);
    });
  }

  return ret;
}

function readContentsSync(file) {
  var contents = '';
  if (fs.existsSync(file)) {
    contents = fs.readFileSync(file, 'utf8');
  }
  return contents;
}