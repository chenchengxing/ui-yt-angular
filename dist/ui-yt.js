angular.module('ui.yt', ['ui.yt.template', 'ui.yt.placeholder', 'ui.yt.focusOnce', 'ui.yt.popoverConfirm', 'ui.yt.busySpin', 'ui.yt.checklist']);
angular.module('ui.yt.template', ['popoverConfirm/template/wrapper.html']);
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
//shamelessly plagiarize from http://vitalets.github.io/checklist-model/
angular.module('ui.yt.checklist', [])
  .directive('checklist', ['$parse', '$compile', function($parse, $compile) {
      // contains
      function contains(arr, item) {
        if (angular.isArray(arr)) {
          for (var i = 0; i < arr.length; i++) {
            if (angular.equals(arr[i], item)) {
              return true;
            }
          }
        }
        return false;
      }

      // add
      function add(arr, item) {
        arr = angular.isArray(arr) ? arr : [];
        for (var i = 0; i < arr.length; i++) {
          if (angular.equals(arr[i], item)) {
            return arr;
          }
        }
        arr.push(item);
        return arr;
      }

      // remove
      function remove(arr, item) {
        if (angular.isArray(arr)) {
          for (var i = 0; i < arr.length; i++) {
            if (angular.equals(arr[i], item)) {
              arr.splice(i, 1);
              break;
            }
          }
        }
        return arr;
      }

      // http://stackoverflow.com/a/19228302/1458162
      function postLinkFn(scope, elem, attrs) {
        // compile with `ng-model` pointing to `checked`
        $compile(elem)(scope);

        // getter / setter for original model
        var getter = $parse(attrs.checklist);
        var setter = getter.assign;

        // value added to list
        var value = $parse(attrs.checklistValue)(scope.$parent);

        // watch UI checked change
        scope.$watch('checked', function(newValue, oldValue) {
          if (newValue === oldValue) {
            return;
          }
          var current = getter(scope.$parent);
          if (newValue === true) {
            setter(scope.$parent, add(current, value));
          } else {
            setter(scope.$parent, remove(current, value));
          }
        });

        // watch original model change
        scope.$parent.$watch(attrs.checklist, function(newArr, oldArr) {
          scope.checked = contains(newArr, value);
        }, true);
      }

      return {
        restrict: 'A',
        priority: 1000,
        terminal: true,
        scope: true,
        compile: function(tElement, tAttrs) {
          if (tElement[0].tagName !== 'INPUT' || !tElement.attr('type', 'checkbox')) {
            throw 'checklist-model should be applied to `input[type="checkbox"]`.';
          }

          if (!tAttrs.checklistValue) {
            throw 'You should provide `checklist-value`.';
          }

          // exclude recursion
          tElement.removeAttr('checklist');

          // local scope var storing individual checkbox model
          tElement.attr('ng-model', 'checked');

          return postLinkFn;
        }
      };
    }]);
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
  ]);
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
angular.module('ui.yt.popoverConfirm', ['ui.yt.position'])
  .directive('popoverConfirm', ['$compile', '$document', '$timeout', '$position', '$parse', function($compile, $document, $timeout, $position, $parse) {
    return {
      scope: {
        options: '=popoverConfirm',
        confirm: '&',
        cancel: '&'
      },
      link: function(scope, element, attrs) {

        var $popoverScope = scope.$new();
        $popoverScope.isOpened = false; // isOpened maintains status
        var defaultOptions = {
          confirmText: 'Confirm',
          cancelText: 'Cancel',
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
/*shamelessly pliagarize from ui-bootstrap*/
angular.module('ui.yt.position', [])

/**
 * A set of utility methods that can be use to retrieve position of DOM elements.
 * It is meant to be used where we need to absolute-position DOM elements in
 * relation to other, existing elements (this is the case for tooltips, popovers,
 * typeahead suggestions etc.).
 */
  .factory('$position', ['$document', '$window', function ($document, $window) {

    function getStyle(el, cssprop) {
      if (el.currentStyle) { //IE
        return el.currentStyle[cssprop];
      } else if ($window.getComputedStyle) {
        return $window.getComputedStyle(el)[cssprop];
      }
      // finally try and get inline style
      return el.style[cssprop];
    }

    /**
     * Checks if a given element is statically positioned
     * @param element - raw DOM element
     */
    function isStaticPositioned(element) {
      return (getStyle(element, 'position') || 'static' ) === 'static';
    }

    /**
     * returns the closest, non-statically positioned parentOffset of a given element
     * @param element
     */
    var parentOffsetEl = function (element) {
      var docDomEl = $document[0];
      var offsetParent = element.offsetParent || docDomEl;
      while (offsetParent && offsetParent !== docDomEl && isStaticPositioned(offsetParent) ) {
        offsetParent = offsetParent.offsetParent;
      }
      return offsetParent || docDomEl;
    };

    return {
      /**
       * Provides read-only equivalent of jQuery's position function:
       * http://api.jquery.com/position/
       */
      position: function (element) {
        var elBCR = this.offset(element);
        var offsetParentBCR = { top: 0, left: 0 };
        var offsetParentEl = parentOffsetEl(element[0]);
        if (offsetParentEl != $document[0]) {
          offsetParentBCR = this.offset(angular.element(offsetParentEl));
          offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
          offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }

        var boundingClientRect = element[0].getBoundingClientRect();
        return {
          width: boundingClientRect.width || element.prop('offsetWidth'),
          height: boundingClientRect.height || element.prop('offsetHeight'),
          top: elBCR.top - offsetParentBCR.top,
          left: elBCR.left - offsetParentBCR.left
        };
      },

      /**
       * Provides read-only equivalent of jQuery's offset function:
       * http://api.jquery.com/offset/
       */
      offset: function (element) {
        var boundingClientRect = element[0].getBoundingClientRect();
        return {
          width: boundingClientRect.width || element.prop('offsetWidth'),
          height: boundingClientRect.height || element.prop('offsetHeight'),
          top: boundingClientRect.top + ($window.pageYOffset || $document[0].documentElement.scrollTop),
          left: boundingClientRect.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft)
        };
      },

      /**
       * Provides coordinates for the targetEl in relation to hostEl
       */
      positionElements: function (hostEl, targetEl, positionStr, appendToBody) {

        var positionStrParts = positionStr.split('-');
        var pos0 = positionStrParts[0], pos1 = positionStrParts[1] || 'center';

        var hostElPos,
          targetElWidth,
          targetElHeight,
          targetElPos;

        hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);

        targetElWidth = targetEl.prop('offsetWidth');
        targetElHeight = targetEl.prop('offsetHeight');

        var shiftWidth = {
          center: function () {
            return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
          },
          left: function () {
            return hostElPos.left;
          },
          right: function () {
            return hostElPos.left + hostElPos.width;
          }
        };

        var shiftHeight = {
          center: function () {
            return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
          },
          top: function () {
            return hostElPos.top;
          },
          bottom: function () {
            return hostElPos.top + hostElPos.height;
          }
        };

        switch (pos0) {
          case 'right':
            targetElPos = {
              top: shiftHeight[pos1](),
              left: shiftWidth[pos0]()
            };
            break;
          case 'left':
            targetElPos = {
              top: shiftHeight[pos1](),
              left: hostElPos.left - targetElWidth
            };
            break;
          case 'bottom':
            targetElPos = {
              top: shiftHeight[pos0](),
              left: shiftWidth[pos1]()
            };
            break;
          default:
            targetElPos = {
              top: hostElPos.top - targetElHeight,
              left: shiftWidth[pos1]()
            };
            break;
        }

        return targetElPos;
      }
    };
  }]);

angular.module('ui.yt.radiolist', [])
  .directive('radiolist', ['$compile', function ($compile) {
    return {
      link: function () {
        // body...
      }
    };
  }]);
(function(module) {
try { module = angular.module("popoverConfirm/template/wrapper.html"); }
catch(err) { module = angular.module("popoverConfirm/template/wrapper.html", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("popoverConfirm/template/wrapper.html",
    "<div class=\"popover top\" ng-style=\"{display: (isOpened && 'block') || 'none', top: position.top+'px', left: position.left+'px', zIndex: 3000}\">\n" +
    "  <div class=\"arrow\"></div>\n" +
    "  <div class=\"popover-inner\">\n" +
    "    <h3 class=\"popover-title\" ng-if=\"title\">{{title}}</h3>\n" +
    "    <div class=\"popover-content\">\n" +
    "      <div ng-bind-html=\"msg\"></div>\n" +
    "      <div class=\"popover-footer clearfix\">\n" +
    "        <div class=\"align-center\">\n" +
    "          <button class=\"btn {{confirmBtnClass}}\" ng-click=\"confirm()\">{{confirmText}}</button>\n" +
    "          <button class=\"btn btn-default\" ng-click=\"cancel()\">{{cancelText}}</button>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);
})();
