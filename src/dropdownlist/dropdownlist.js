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
        scope.$parent.$watch(attrs.ngModel, function (newValue) {
          if (newValue) {
            var index = getItemIndex(newValue, $parse(repeatArray)(scope.$parent), asString);
            if (index !== -1) {
              // trick to delay dom query
              // $timeout(function () {
              //   var aForIndex = element.find('li').eq(index).find('a')[0];
              //   scope.curText = aForIndex.textContent || aForIndex.innerText;
              // });
              // finally change to get value from dom
              if (!asString) {
                scope.curText = $parse(repeatArray)(scope.$parent)[index];
              } else {
                scope.curText = getPathValue($parse(repeatArray)(scope.$parent)[index], asString);
              }
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