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