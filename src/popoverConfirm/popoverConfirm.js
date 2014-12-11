// last: ['2014-12-05', 'wujun07']
// contributors: ['wujun07', 'chenchengxing']

angular.module('ui.yt.popoverConfirm', ['ui.yt.position'])
  .directive('popoverConfirm', [
    '$compile',
    '$document',
    '$timeout',
    '$position',
    '$parse',
  function($compile, $document, $timeout, $position, $parse) {
    return {
      scope: {
        options: '=popoverConfirm',
        confirm: '&',
        cancel: '&'
      },
      link: function(scope, element, attrs) {

        var $popoverScope = scope.$new();
        $popoverScope.isOpened = false; // isOpened maintains status
        $popoverScope.isGoodToOpen = false;
        $popoverScope.position = {
          top: 0,
          left: 0
        };
        var defaultOptions = {
          confirmText: 'Confirm',
          cancelText: 'Cancel',
          title: 'Are u sure?',
          confirmBtnClass: 'btn-primary'
        };
        var ifDocumentClickedBind = false;
        var ifElementClickBind = false;
        var $popover;

        var generatePopoverDom = function() {
          var popoverElement = angular.element('<popover-confirm-wrapper />');
          $popover = $compile(popoverElement)($popoverScope);
          $document.find('body').append($popover);
        };

        var updateContent = function() {
          angular.extend($popoverScope, defaultOptions, scope.options);
        };

        //TODO adjust position, when different `placement`
        var updatePosition = function() {
          $popoverScope.position = $position.offset(element);
          $popoverScope.position.top = $popoverScope.position.top - $popover.prop('offsetHeight');
          $popoverScope.position.left = $popoverScope.position.left - ($popover.prop('offsetWidth') - $position.position(element).width) / 2;
        };

        //when document clicked
        var documentClicked = function(event) {
          if ($popoverScope.isOpened && event.target !== element[0]) {
            $popoverScope.isOpened = false;
            element.removeAttr('disabled');
            if (!$popoverScope.$$phase) {
              $popoverScope.$apply();
            }
            element.removeAttr('disabled');
          }
        };

        //when clicked
        var elementClicked = function(e) {
          if (!$popover) {
            generatePopoverDom();
          }
          e.preventDefault();
          $popoverScope.$apply(function() {
            $popoverScope.isOpened = true;
          });
        };

        $popoverScope.$watch('isOpened', function(value) {
          if (value) {
            updateContent();
            $timeout(function() {
              updatePosition();
              $popoverScope.isGoodToOpen = true;
            });
            $document.bind('click', documentClicked);
            if (ifElementClickBind) {
              element.unbind('click', elementClicked);
            }
            ifDocumentClickedBind = true;
          } else {
            if (ifDocumentClickedBind) {
              $document.unbind('click', documentClicked);
            }
            element.bind('click', elementClicked);
            ifElementClickBind = true;
            $popoverScope.isGoodToOpen = false;
          }
        });

        /*confirm and cancel handler*/
        //TODO retrieve a promise from outer `confirm`
        $popoverScope.confirm = function () {
          // $timeout(function () {
            $popoverScope.isOpened = false;
            scope.confirm();
            element.removeAttr("disabled");
          // });
        };
        $popoverScope.cancel = function () {
          $popoverScope.isOpened = false;
          scope.cancel();
          element.removeAttr("disabled");
        };

        /* destroy pop when ele destroyed*/
        scope.$on('$destroy', function() {
          $popover.remove();
          $popoverScope.$destroy();
        });
      }
    };
  }])
  .directive('popoverConfirmWrapper', function() {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: 'popoverConfirm/template/wrapper.html',
      link: function(scope, element, attrs) {
        element.bind('click', function(event) {
          event.preventDefault();
          event.stopPropagation();
        });
      }
    };
  });