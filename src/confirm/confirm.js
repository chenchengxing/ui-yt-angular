angular.module('ui.yt.confirm', [])
  .factory('$confirm', ['$compile', '$rootScope', '$q', '$document', function ($compile, $rootScope, $q, $document) {
    var mask = angular.element('<div class="modal-backdrop fade in" />');
    mask.css({
      'z-index': 1000
    });
    var confirmCount = 0;
    var defaultOptions = {
      title: 'Confirm',
      okText: 'OK',
      cancelText: 'Cancel'
    };
    var confirmDialog;
    var scope;
    var defer;
    var confirm = function(options) {
      if (confirmCount === 0) {
        defer = $q.defer();
        scope = $rootScope.$new();
        angular.extend(scope, defaultOptions, options);
        var wrapper = angular.element('<confirm-wrapper />');
        confirmDialog = $compile(wrapper)(scope);
        $document.find('body').append(confirmDialog);
        $document.find('body').append(mask);

        scope.close = dismiss;
        scope.cancel = dismiss;
        scope.ok = okDismiss;
        confirmCount++;
        return defer.promise;
      }
    };
    var dismiss = function() {
      if (confirmCount === 1) {
        close('cancel');
      }
    };
    var okDismiss = function () {
      if (confirmCount === 1) {
        close('ok');
      }
    };
    var close = function (resolveType) {
      confirmDialog.remove();
      mask.remove();
      scope.$destroy();
      defer.resolve(resolveType);
      confirmCount--;
    };
    return confirm;
  }])
  .directive('confirmWrapper', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'confirm/template/wrapper.html'
    };
  });