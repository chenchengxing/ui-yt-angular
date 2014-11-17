angular.module('ui.yt.busySpin', [])
  .factory('$busySpin', ['$compile', '$rootScope', '$document', '$log', function($compile, $rootScope, $document, $log) {
    var launchSpin = function() {
      if (!$spin) {
        generateDom();
      } else {
        $log.warn('should not generate spin, if spining');
      }
    };
    var scope = $rootScope.$new();
    var $spin;
    var generateDom = function() {
      var spin = angular.element('<div class="busy-spin" busy-spin-three-bounce />');
      $spin = $compile(spin)(scope);
      $document.find('body').append($spin);
    };
    var dismiss = function() {
      $spin.remove();
    };
    return {
      start: launchSpin,
      dismiss: dismiss
    };
  }])
  .directive('busySpinThreeBounce', function() {
    return {
      restrict: 'A',
      template: '<div class="three-bounce">' +
        '<div class="bounce1"></div>' +
        '<div class="bounce2"></div>' +
        '<div class="bounce3"></div>' +
        '</div>'
    };
  });