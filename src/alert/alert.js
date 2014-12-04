angular.module('ui.yt.alert', [])
  .factory('$alert', ['$document', '$rootScope', '$compile', '$q', '$timeout', function($document, $rootScope, $compile, $q, $timeout) {
    var mask = angular.element('<div class="modal-backdrop fade" />');
    mask.css({
      'z-index': 1035
    });
    var alertCount = 0;
    var defaultOptions = {
      title: 'Alert',
      okText: 'OK'
    };
    //ccx
    var alertDialog;
    var scope;
    var defer;
    var alert = function(options) {
      if (alertCount === 0) {
        defer = $q.defer();
        scope = $rootScope.$new();
        angular.extend(scope, defaultOptions, options);
        var wrapper = angular.element('<alert-wrapper />');
        alertDialog = $compile(wrapper)(scope);
        $document.find('body').append(alertDialog);
        $document.find('body').append(mask);
        $timeout(function () {
          alertDialog.addClass('in').css('display', 'block');
          mask.addClass('in');
        });
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
        mask.removeClass('in');
        alertDialog.removeClass('in');
        scope.$destroy();
        defer.resolve('ok');
        alertCount--;
      }
    };
    return alert;
  }])
  .directive('alertWrapper', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'alert/template/wrapper.html'
    };
  });