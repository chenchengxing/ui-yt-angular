angular.module('ui.yt', ['ui.yt.placeholder', 'ui.yt.focusOnce']);
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
angular.module('ui.yt.placeholder', [])
  .directive('placeholder', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        // var placeHolderText = attrs.placeholder;
        // var msie = ~~( navigator.userAgent.toLowerCase().match( /msie (\d)/ ) || [] )[ 1 ];
        var isInputSupported = 'placeholder' in document.createElement('input');
        var isTextareaSupported = 'placeholder' in document.createElement('textarea');
        /*for ie below 9,placeholder attribute not supported*/
        if (!isInputSupported || !isTextareaSupported) {
          var value;

          var placehold = function() {
            element.val(attrs.placeholder);
            element.addClass('placeholder-ie');
          };
          var unplacehold = function() {
            element.val('');
            element.removeClass('placeholder-ie');
          };

          scope.$watch(attrs.ngModel, function(val) {
            value = val || '';
          });

          element.bind('focus', function() {
            if (value === '') {
              unplacehold();
            }
          });

          element.bind('blur', function() {
            if (element.val() === '') {
              placehold();
            }
          });

          ctrl.$formatters.unshift(function(val) {
            if (!val) {
              placehold();
              value = '';
              return attrs.placeholder;
            }
            return val;
          });
        }
      }
    };
  });