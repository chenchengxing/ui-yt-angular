angular.module('ui.yt', ['ui.yt.alert','alert/template/wrapper.html','ui.yt.busySpin','ui.yt.checklist','ui.yt.confirm','confirm/template/wrapper.html','ui.yt.dropdownlist','dropdownlist/template/dropdown.html','ui.yt.focusOnce','ui.yt.msie','ui.yt.placeholder','ui.yt.popoverConfirm','popoverConfirm/template/wrapper.html','ui.yt.position','ui.yt.toaster']);
angular.module('ui.yt.alert', [])
  .factory('$alert', ['$document', '$rootScope', '$compile', '$q', function($document, $rootScope, $compile, $q) {
    var mask = angular.element('<div class="modal-backdrop fade in" />');
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
          if (tElement[0].tagName !== 'INPUT' || tElement.attr('type') !== 'checkbox') {
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
    var pop = function(options) {
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
    return {
      pop: pop
    };
  }])
  .directive('confirmWrapper', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'confirm/template/wrapper.html'
    };
  });
angular.module('ui.yt.dropdownlist', [])
  .directive('dropdownlist', ['$compile', '$document', '$parse', '$timeout', function($compile, $document, $parse, $timeout) {
    
    var compile = function compile( tElement, tAttributes, transclude ) {
      return function (scope, element, attrs, ctrl ) {
        if (!attrs.dropdownlist) {
          element.remove();
          return false;
        }
        // console.log(element[0].innerHTML);
        // .match(/^\s*(.+)\s+in\s+(.*?)\s*(\s+track\s+by\s+(.+)\s*)?$/);
        // var NG_OPTIONS_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
        var DROPDOWN_OPTIONS_REGEXP = /^\s*([\S]+)(?:\s+as\s+([\S]+))?\s+in\s+([\S]+)\s*$/;
        var match = attrs.dropdownlist.match(DROPDOWN_OPTIONS_REGEXP);
        var repeatArray = match[3];
        var repeatItem = match[2] ? match[2] : match[1];
        var asString = match[2] ? match[1] : '';
        
        transclude(scope, function (clone) {
          var transcludeContent;
          if (clone && clone[0]) {
            transcludeContent = clone[0].innerHTML.trim();//http://stackoverflow.com/questions/22183778/angularjs-transclude-how-to-access-the-html-content-of-clone-object
          } else {
            transcludeContent = '{{' + repeatItem + '}}';
          }

          var tpl = '<li ng-repeat="' + repeatItem + ' in ' + repeatArray + '">' + 
                      '<a ng-click="itemClick(' + repeatItem + ', $event)">' + transcludeContent + '</a>' +
                    '</li>';
          var lisEle = angular.element(tpl);
          lis = $compile(lisEle)(scope);
          element.find('ul').append(lis);
        });
        var model = $parse(attrs.ngModel);
        //watch model change, update cur text
        scope.$parent.$watch(attrs.ngModel, function (newValue, oldValue) {
          if (newValue === oldValue) {
            return;
          }
          if (newValue) {
            var index = getItemIndex(newValue, $parse(repeatArray)(scope.$parent), asString);
            if (index !== -1) {
              // trick to delay dom query
              $timeout(function () {
                var aForIndex = element.find('li').eq(index).find('a')[0];
                scope.curText = aForIndex.textContent || aForIndex.innerText;
              });
              // finally change to get value from dom
              // if (!asString) {
              //   scope.curText = $parse(repeatArray)(scope.$parent)[index];
              // } else {
              //   scope.curText = getPathValue($parse(repeatArray)(scope.$parent)[index], asString);
              // }
            } else {
              scope.curText = '';
            }
          }

        });
        var getItemIndex = function (value, array, keyPath) {
          if (!value || !array || !array.length) {
            return -1;
          }
          for (var i = 0; i < array.length; i++) {
            if ((keyPath && getPathValue(array[i], keyPath) === value) || (!keyPath && array[i] === value)) {
              return i;
            }
          }
          return -1;
        };
        // return value under path, e.g. value={key: '1'}, path='item.key', should return '1', maximum depth: 2
        var getPathValue = function (value, path) {
          // dump(value, path)
          if (!value || !path) {
            return;
          }
          var paths = path.split('.');
          if (!paths[1]) {
            return;
          }
          if (paths[2]) {
            return value[paths[1]][paths[2]];
          }
          return value[paths[1]];
        };
        scope.itemClick = function(item, $event) {
          if (!attrs.ngModel) {
            return false;
          }
          if (!asString) {
            model.assign(scope.$parent, item);
          } else {
            var value = $parse(asString)(angular.element($event.target).scope());
            model.assign(scope.$parent, value);
          }
          if (attrs.ngChange) {
            scope.$parent.$eval(attrs.ngChange);
          }
          //http://stackoverflow.com/questions/18326689/javascript-textcontent-is-not-working-in-ie8-or-ie7
          // scope.curText = $event.target.textContent || $event.target.innerText;
        };
        element.find('button').on('click', function(e) {
          element.toggleClass('open');

          e.preventDefault();
          e.stopPropagation();
        });

        $document.on('click', function() {
          element.removeClass('open');
        });
      };
    };
    return {
      scope: true,
      replace: true,
      transclude: true,
      terminal: true,
      priority: 1000,
      templateUrl: 'dropdownlist/template/dropdown.html',
      compile: compile
     //  ,
     //  controller: function($scope, $element, $transclude, $log){
     //    if (!this.transcludeContent) {
     //      $transclude(function(clone) {
     //        this.transcludeContent = clone[0].innerHTML;
     //         // console.log(clone[0].innerHTML); //undefined??
     //         // console.log(clone[0].outerHTML); //undefined??
     //         // console.log(angular.element("<div/>").append(clone).html()); //undefined??
     //         // console.log(clone.text()); //works but strips the html tags    
     //      });
     //    }
     // }
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
angular.module('ui.yt.msie', [])
  .constant('MSIE', (function() {
    var msie = ~~((/msie (\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1]);
    if (isNaN(msie)) {
      msie = ~~((/trident\/.*; rv:(\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1]);
    }
    return msie;
  })());
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
        $popoverScope.position = {
          top: 0,
          left: 0
        };
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
        if (offsetParentEl !== $document[0]) {
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
    };
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
(function(module) {
try { module = angular.module("alert/template/wrapper.html"); }
catch(err) { module = angular.module("alert/template/wrapper.html", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("alert/template/wrapper.html",
    "<div class=\"modal fade in\" style=\"display: block\">\n" +
    "  <div class=\"modal-dialog\">\n" +
    "    <div class=\"modal-content\">\n" +
    "      <div class=\"modal-header\">\n" +
    "        <button type=\"button\" class=\"close\" ng-click=\"close()\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\n" +
    "        <h4 class=\"modal-title\">{{title}}</h4>\n" +
    "      </div>\n" +
    "      <div class=\"modal-body\">\n" +
    "        {{body}}\n" +
    "      </div>\n" +
    "      <div class=\"modal-footer\">\n" +
    "        <button type=\"button\" class=\"btn btn-primary\" ng-click=\"ok()\">{{okText}}</button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("confirm/template/wrapper.html"); }
catch(err) { module = angular.module("confirm/template/wrapper.html", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("confirm/template/wrapper.html",
    "<div class=\"modal fade in\" style=\"display: block\">\n" +
    "  <div class=\"modal-dialog\">\n" +
    "    <div class=\"modal-content\">\n" +
    "      <div class=\"modal-header\">\n" +
    "        <button type=\"button\" class=\"close\" ng-click=\"close()\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\n" +
    "        <h4 class=\"modal-title\">{{title}}</h4>\n" +
    "      </div>\n" +
    "      <div class=\"modal-body\">\n" +
    "        {{body}}\n" +
    "      </div>\n" +
    "      <div class=\"modal-footer\">\n" +
    "        <button type=\"button\" class=\"btn btn-primary\" ng-click=\"ok()\">{{okText}}</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">{{cancelText}}</button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("dropdownlist/template/dropdown.html"); }
catch(err) { module = angular.module("dropdownlist/template/dropdown.html", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("dropdownlist/template/dropdown.html",
    "\n" +
    "\n" +
    "<div class=\"dropdown btn-group w_100p\">\n" +
    "  <button class=\"dropdown-toggle btn btn-default btn-full-width\" ng-disabled=\"dropdownDisabled\">\n" +
    "    <span class=\"col-md-11 dropdown-text\">{{curText}}</span>\n" +
    "    <span class=\"caret\"></span>\n" +
    "  </button>\n" +
    "  <ul class=\"dropdown-menu\">\n" +
    "  </ul>\n" +
    "</div>\n" +
    "");
}]);
})();

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
