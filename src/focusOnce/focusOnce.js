angular.module('ui.yt.focusOnce', [])
  .directive('focusOnce', [
    '$timeout',
    '$parse',
    function($timeout, $parse) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          var model = $parse(attrs.focusOnce);
          var unwatch = scope.$watch(model, function(value) {
            if (value === true) {
              $timeout(function() {
                element[0].focus();
                unwatch();
              });
            }
          });
        }
      };
    }
  ])