var capital = function (input) {
      return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
angular.module('ui.bootstrap.demo', []);
angular.module('app', ['ui.bootstrap', 'ui.router', 'ui.bootstrap.demo', 'ui.yt', 'modalBuild'])
=======
angular.module('ui.yt.demo', []);
angular.module('app', ['ui.router', 'ui.yt.demo', 'ui.yt', 'ui.bootstrap'])
>>>>>>> FETCH_HEAD
=======
angular.module('ui.yt.demo', []);
angular.module('app', ['ui.router', 'ui.yt.demo', 'ui.yt', 'ui.bootstrap'])
>>>>>>> 8e25d866859f79ead576b4421b0c159b7d4f75b7
=======
angular.module('ui.yt.demo', []);
angular.module('app', ['ui.router', 'ui.yt.demo', 'ui.yt', 'ui.bootstrap'])
>>>>>>> 8e25d866859f79ead576b4421b0c159b7d4f75b7
  .constant('COMPONENTS', [
    {
      name: 'alert'
    },
    {
      name: 'busySpin'
    },
    {
      name: 'checklist'
    },{
      name: 'confirm'
    },{
      name: 'dropdownlist'
    },{
      name: 'focusOnce'
    },{
      name: 'msie'
    },{
      name: 'placeholder'
    },{
      name: 'popoverConfirm'
    },{
      name: 'position'
    },{
      name: 'toaster'
    }
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('home');
    $stateProvider.state('home', {
      url: '/home',
      views: {
        'body': {
          templateUrl: 'demo/app/home/home.tpl.html',
          controller: function($scope, COMPONENTS) {
            $scope.list = COMPONENTS;
          }
        },
        'hint@': {
          template: function($stateParams) {
            return '<a svg-font="home"></a>';
          }
        },
        'docHeader@': {
          templateUrl: 'demo/app/home/docHeader.tpl.html'
        }
      },
    });
    $stateProvider.state('component', {
      url: '/component/:id',
      views: {
        'body': {
          templateUrl: function($stateParams) {
            return 'demo/app/components/' + $stateParams.id + '/docs/demo.tpl.html';
          }
        },
        'hint@': {
          template: function($stateParams) {
            return '<a svg-font="' + $stateParams.id + '"></a>';
          }
        },
        'readme@': {
          templateUrl: function($stateParams) {
            return 'demo/app/components/' + $stateParams.id + '/docs/readme.tpl.html';
          }
        }
      }
    });
  })
  .controller('Ctrl', function($scope, $http, $modal) {
    $scope.home = 'home';
    $scope.hmoe = 'hmoe';
    $scope.ohem = 'ohem';
    $scope.tabs = [
      { title:'html', content:'Dynamic content 1' },
      { title:'javascript', content:'Dynamic content 2', disabled: true }
    ];

    $scope.download = function () {

    };

    $scope.openCreate = function () {
      var modalInstance = $modal.open({
        templateUrl: 'modalBuild.html',
        controller: CtrlModalBuild,
        size: 'lg',
      });

      modalInstance.result.then(function (selectedComponents) {
        createBuild(selectedComponents);
      });
    };

    function createBuild (components) {
      console.log(components);

      $http.get('dist/componentsSrc.json').success(function (data) {
        var content = '';
        var moduleNames = [];
        for (var i = 0, iLen = components.length; i < iLen; i++) {
          var component = data[components[i].name];
          for (var moduleName in component) {
            moduleNames.push(moduleName);
            content = content + '\n' + component[moduleName];
          }
        }
        console.log(moduleNames);
        console.log(content);

        var header = 'angular.module(\'ui.yt\', [\'';
        var modules = moduleNames.join('\',\'');
        header = header + modules + '\']);';

        content = header + '\n\n' + content;

        downloadFile('ui-yt.js', content);
      });

    }

    function CtrlModalBuild($scope, $modalInstance, COMPONENTS) {
      $scope.components = angular.copy(COMPONENTS);
      $scope.download = function () {
        var selectedComponents = $scope.components.filter(function (ele, index, array) {
          return ele.selected;
        });
        $modalInstance.close(selectedComponents);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      }
    }

    function downloadFile(fileName, content){
      var aLink = document.createElement('a');
      var blob = new Blob([content]);
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent("click", false, false);
      aLink.download = fileName;
      aLink.href = URL.createObjectURL(blob);
      aLink.dispatchEvent(evt);
    }
  })
  .directive('svgFont', function() {
    var pathMap = {
      a: 'm0,4 v-2 l2,-2 h1 v4 v-2 h-2',
      b: 'm0,0 h2 l-1,1 l2,2 v1 h-3 v-3',
      c: 'm3,0 h-1 l-2,2 v2 h3',
      d: 'm3,4 h-3 v-4 h1 l2,2 v2',
      e: 'm3,0 h-3 v4 h2 M3,2 h-3',
      f: 'm0,4 v-2 h3 h-3 v-2 h3',
      g: 'm2,2 h1 v1 l-1,1 h-2 v-3 l1,-1 h2',
      h: 'm0,0 v4 v-2 h3 v-2 v4',
      i: 'm0,0 v4',
      j: 'm0,3 l1,1 h2 v-4',
      k: 'm0,0 v4 v-1 l3,-3 l-2,2 l2,2',
      l: 'm0,0 v4 h3',
      m: 'm0,4 v-4 l1,1 h1 l1,-1 v4',
      n: 'm0,4 v-4 l3,4 v-4',
      o: 'm0,1 l1,-1 h2 v3 l-1,1 h-2 z',
      p: 'm0,4 v-4 h3 v2 l-1,1 h-2',
      q: 'm3,4 h-2 v-3 l1,-1 h2 v3 l-1,1 m1,0 l-1,-1',
      r: 'm0,4 v-4 h3 l-2,2 l2,2',
      s: 'm3,0 h-2 l-1,1 v1 h3 v2 h-3',
      t: 'm0,0 h3 h-2 v4',
      u: 'm0,0 v3 l1,1 h2 v-4',
      v: 'm0,0 l1,4 l2,-4',
      w: 'm0,0 v4 l2,-2 l1,2 v-4',
      x: 'm0,0 l4,4 l-2,-2 l-2,2 l4,-4',
      y: 'm0,0 l2,2 l1,-1 v-1 v1 l-3,3',
      z: 'm0,0 h3 l-3,3 v1 h3',
      '-': 'm0,2 h2',
      '$': '',
      '': ''
    };
    return {
      link: function(scope, element, attrs) {
        var text = attrs.svgFont;
        var ns = 'http://www.w3.org/2000/svg';
        var svg = document.createElementNS(ns, 'svg');
        svg.setAttribute("viewBox", "-0.2 -0.2 15.4 4.4");
        svg.setAttribute("preserveAspectRatio", "xMinYMin");
        angular.element(svg).css({
            // width: '150px',
            // height: '40px'
          })
          .attr({
            // 'data-reactid': '.0.0.3.0.0.0.0',
            // xmlns: "http://www.w3.org/2000/svg",
            // viewBox: "-0.2 -0.2 15.4 4.4",
            height: '40',
            width: 37.5 * text.length
          }).append(angular.element(document.createElementNS(ns, 'title')).text('home'));
        var transitionOffset = 0;
        for (var i = 0; i < text.length; i++) {
          var ch = text[i].toLowerCase();
          var pathD = pathMap[ch];
          var path = document.createElementNS(ns, 'path');
          angular.element(path).attr({
            stroke: 'black',
            'stroke-width': 0.4,
            transform: "translate(" + transitionOffset + ")",
            'd': pathD
          });
          if (ch !== 'i') {
            transitionOffset += 4;
          } else {
            transitionOffset += 2;
          }
          var pathLength = path.getTotalLength();
          angular.element(path).css({
            transition: 'stroke-dashoffset 0.5s ease-in-out 1.12280943891965s',
            '-webkit-transition': 'stroke-dashoffset 0.5s ease-in-out 1.12280943891965s',
            'stroke-dasharray': pathLength + ' ' + pathLength,
            'stroke-dashoffset': pathLength
          });
          angular.element(svg).append(path);
        }
        element.append(svg);
        var tl = new TimelineMax();
        angular.forEach(angular.element(svg).find('path'), function(item) {
          tl.add(TweenMax.to(item, 0.1, {
            'stroke-dashoffset': 0
          }));
        });
        tl.play();
      }
    }
  });

angular.module('modalBuild', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('modalBuild.html',
    '<div class="modal-header">' +
        '<h3 class="modal-title">Create a Build</h3>' +
    '</div>' +
    '<div class="modal-body">' +
        '<div class="list-group">' +
          '<a class="list-group-item" ng-class="{\'active\': component.selected}" ng-repeat="component in components" ng-click="component.selected = true;">{{component.name}}</a>' +
        '</div>' +
    '</div>' +
    '<div class="modal-footer">' +
        '<button class="btn btn-primary" ng-click="download()">Download</button>' +
        '<button class="btn btn-warning" ng-click="cancel()">Cancel</button>' +
    '</div>'
  );
}]);
