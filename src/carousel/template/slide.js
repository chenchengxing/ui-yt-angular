(function(module) {
try { module = angular.module("carousel/template/slide.html"); }
catch(err) { module = angular.module("carousel/template/slide.html", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("carousel/template/slide.html",
    "<div ng-class=\"{\n" +
    "    'active': leaving || (active && !entering),\n" +
    "    'prev': (next || active) && direction=='prev',\n" +
    "    'next': (next || active) && direction=='next',\n" +
    "    'right': direction=='prev',\n" +
    "    'left': direction=='next'\n" +
    "  }\" class=\"item text-center\" ng-transclude></div>\n" +
    "");
}]);
})();
