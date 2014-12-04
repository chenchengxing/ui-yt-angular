(function(module) {
try { module = angular.module("progressbar/template/progress.html"); }
catch(err) { module = angular.module("progressbar/template/progress.html", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("progressbar/template/progress.html",
    "<div class=\"progress\" ng-transclude></div>");
}]);
})();
