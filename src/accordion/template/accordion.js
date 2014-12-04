(function(module) {
try { module = angular.module("accordion/template/accordion.html"); }
catch(err) { module = angular.module("accordion/template/accordion.html", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("accordion/template/accordion.html",
    "<div class=\"panel-group\" ng-transclude></div>");
}]);
})();
