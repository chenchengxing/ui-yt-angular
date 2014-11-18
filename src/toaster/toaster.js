angular.module('ui.yt.toaster', [])
  .factory('$toaster', ['$compile', '$document', '$rootScope', '$timeout', function ($compile, $document, $rootScope, $timeout) {
    var id = 0;
    var scope = $rootScope.$new();
    scope.toasters = [];
    var $container;
    var generateDom = function() {
      var container = angular.element('<toaster-wrapper />');
      $container = $compile(container)(scope);
      $document.find('body').append($container);
    };
    var pop = function (toastOptions) {
      toastOptions = toastOptions || {};
      angular.extend(toastOptions, {
        timeout: 3000,
        type: 'success'
      }, angular.copy(toastOptions), {id: id++});
      toastOptions.type = 'toaster-' + toastOptions.type;//transform type
      if (!$container) {
        generateDom();
      }
      append(toastOptions);
    };
    var append = function (toastOptions) {
      scope.toasters.push(toastOptions);
      $timeout(function () {
        clear(toastOptions.id);
      }, toastOptions.timeout);
    };
    var clear = function (id) {
      for (var i = 0; i < scope.toasters.length; i++) {
        if (scope.toasters[i].id === id) {
          scope.toasters.splice(i, 1);
          break;
        }
      }
    };
    var clearAll = function () {
      $container.remove();
    };
    return {
      pop: pop,
      clear: clearAll
    }
  }])
  .directive('toasterWrapper', function() {
    return {
      restrict: 'E',
      replace: true,
      template:
      '<div class="toaster-container">' +
        '<div ng-repeat="toaster in toasters" class="toaster" ng-class="toaster.type">' +
          '<div class="toaster-title">{{toaster.title}}</div>' + 
          '<div class="toaster-body">{{toaster.body}}</div>' + 
        '</div>' +
      '</div>'
    };
  });