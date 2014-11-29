var capital = function (input) {
      return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
angular.module('ui.bootstrap.demo', []);
angular.module('app', ['ui.bootstrap', 'ui.router', 'ui.bootstrap.demo', 'ui.yt'])
  .constant('COMPONENTS', [
    {
      name: 'accordion',
      desc: [
        'The **accordion directive** builds on top of the collapse directive to provide a list of items, with collapsible bodies that are collapsed or expanded by clicking on the item\'s header.',
        'We can control whether expanding an item will cause the other items to close, using the `close-others` attribute on accordion.',
        'The body of each accordion group is transcluded in to the body of the collapsible element.'
      ]
    },
    {
      name: 'alert'
    },
    {
      name: 'buttons'
    },{
      name: 'collapse'
    },{
      name: 'datepicker'
    },{
      name: 'dropdown'
    },{
      name: 'modal'
    },{
      name: 'pagination'
    },{
      name: 'popover'
    },{
      name: 'progressbar'
    },{
      name: 'rating'
    },{
      name: 'tabs'
    },{
      name: 'timepicker'
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
            return 'demo/app/components/' + $stateParams.id + '/docs/all.tpl.html';
          }
        },
        'hint@': {
          template: function($stateParams) {
            return '<a svg-font="' + $stateParams.id + '"></a>';
          }
        },
        'readme@': {
          templateUrl: 'demo/app/home/readme.tpl.html'
        }
      }
    });

  })
  .controller('Ctrl', function($scope) {
    $scope.home = 'home';
    $scope.hmoe = 'hmoe';
    $scope.ohem = 'ohem';
    $scope.tabs = [
      { title:'html', content:'Dynamic content 1' },
      { title:'javascript', content:'Dynamic content 2', disabled: true }
    ];
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
  })
  // .directive('cloud', function($timeout) {
  //   return {
  //     link: function(scope, element, attrs) {
  //       $timeout(function () {
  //         generate([
  //           // "ccx"
  //         ])
  //       }, 2000)
  //       var fill = d3.scale.category20();
  //       var layout = d3.layout.cloud().size([300, 300]);
  //       var vis = d3.select(element[0]).append("svg")
  //           .attr("width", 300)
  //           .attr("height", 300);
  //           vis = vis.append("g")
  //           .attr("transform", "translate(150,150)");
  //       generate([
  //           "Hello", "world", "normally", "you", "want", "more", "words",
  //           "than", "this"
  //         ])
  //       function generate (words) {
  //         layout.stop()
  //         .words(words.map(function(d) {
  //           return {
  //             text: d,
  //             size: 10 + Math.random() * 90,
  //             state: 'route' + d
  //           };
  //         }))
  //         .padding(5)
  //         .rotate(function() {
  //           return ~~(Math.random() * 2) * 90;
  //         })
  //         .font("Impact")
  //         .fontSize(function(d) {
  //           return d.size;
  //         })
  //         .on("end", draw)
  //         .start();
  //       }


//       function draw(words) {
//           vis
//           .selectAll("text")
//           .data(words)
//           .enter().append("text")
//           .on('click', function (d) {
//             console.log(d.state);
//           })
//           .style("font-size", function(d) {
//             return d.size + "px";
//           })
//           .style("font-family", "Impact")
//           .style("fill", function(d, i) {
//             return fill(i);
//           })
//           .attr("text-anchor", "middle")
//           .attr("transform", function(d) {
//             return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
//           })
//           .text(function(d) {
//             return d.text;
//           });
//       }
//     }
//   }
// })


// $('path').css({'stroke-dasharray': 0,
// 'stroke-dashoffset': 0})

// $.each($('path'), function(i, item) {
//   var pathLength = item.getTotalLength();
//   $(item).css({
//     'stroke-dasharray': pathLength + ' ' + pathLength,
//     'stroke-dashoffset': pathLength
//   });
// });

// $.each($('path'), function(i, item) {
//   TweenMax.to(item, 1, {
//     'stroke-dashoffset': 0
//   })
// });

// setTimeout(function () {
//   // body...
//   var offset = 0;
//   $.each($('text'), function (i, item) {
//     // $(item).attr({
//     //   transform: 'translate(' + offset + ', 0)'
//     // });
//     TweenMax.to(item, 1, {
//       attr: {
//         // transform: 'translate(' + offset + ', 0)'
//         x: offset
//       }
//     });
//     offset += 20;
//   })
// }, 1000)