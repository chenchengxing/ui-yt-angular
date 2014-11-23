angular.module('ui.yt.dropdownlist', [])
  .directive('dropdownlist', ['$compile', '$document', '$parse', function($compile, $document, $parse) {
    
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
        scope.itemClick = function(item, $event) {
          if (!asString) {
            model.assign(scope.$parent, item);
          } else {
            var value = $parse(asString)(angular.element($event.target).scope());
            model.assign(scope.$parent, value);
          }
          //http://stackoverflow.com/questions/18326689/javascript-textcontent-is-not-working-in-ie8-or-ie7
          scope.curText = $event.target.textContent || $event.target.innerText;
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