angular.module('ui.yt.alert', [])
  .factory('$alert', ['$document', '$rootScope', '$compile', '$q', function($document, $rootScope, $compile, $q) {
    var mask = angular.element('<div class="modal-backdrop fade in" />');
    mask.css({
      'z-index': 1000
    });
    var alertCount = 0;
    var defaultOptions = {
      title: 'Alert',
      okText: 'OK'
    };
    var alertDialog;
    var scope;
    var defer;
    var pop = function(options) {
      if (alertCount === 0) {
        defer = $q.defer();
        scope = $rootScope.$new();
        angular.extend(scope, defaultOptions, options);
        var wrapper = angular.element('<alert-wrapper />');
        alertDialog = $compile(wrapper)(scope);
        $document.find('body').append(alertDialog);
        $document.find('body').append(mask);

        scope.close = dismiss;
        scope.ok = dismiss;
        alertCount++;
        return defer.promise;
      }
    };
    var dismiss = function() {
      if (alertCount === 1) {
        alertDialog.remove();
        mask.remove();
        scope.$destroy();
        defer.resolve('ok');
        alertCount--;
      }
    };
    return {
      pop: pop
    };
  }])
  .directive('alertWrapper', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'alert/template/wrapper.html'
    };
  });