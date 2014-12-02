angular.module('ui.yt.msie', [])
  .constant('MSIE', (function() {
    var msie = ~~((/msie (\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1]);
    if (isNaN(msie)) {
      msie = ~~((/trident\/.*; rv:(\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1]);
    }
    return msie;
  })());