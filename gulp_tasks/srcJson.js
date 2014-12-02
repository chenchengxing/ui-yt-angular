var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var file = require('gulp-file');
var minimatch = require("minimatch")


gulp.task('srcJson', function () {
  var srcJson = {};
  var components = fs.readdirSync('src');
  for (var i = 0, iLen = components.length; i < iLen; i++) {
    var component = components[i];
    var allJs = {};

    var componentPath = 'src/' + component;
    var tplPath = componentPath + '/template';

    var componentName = 'ui.yt.' + component;
    allJs[componentName] = readContentsSync(componentPath + '/' + component + '.js');

    var tplJs = readDirSync(tplPath).filter(minimatch.filter("*.js", {matchBase: true}));;
    for (var j = 0, jLen = tplJs.length; j < jLen; j++) {
      tplName = tplJs[j].replace(/\.js$/, '.html').replace(/^src\//, '');
      allJs[tplName] = readContentsSync(tplJs[j]);
    }

    srcJson[component] = allJs;
  }

  return file('componentsSrc.json', JSON.stringify(srcJson), {src: true})
    .pipe(gulp.dest('dist'));
});

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
