(function(module) {
try { module = angular.module("progressbar/template/bar.html"); }
catch(err) { module = angular.module("progressbar/template/bar.html", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("progressbar/template/bar.html",
    "<div class=\"progress-bar\" ng-class=\"type && 'progress-bar-' + type\" role=\"progressbar\" aria-valuenow=\"{{value}}\" aria-valuemin=\"0\" aria-valuemax=\"{{max}}\" ng-style=\"{width: percent + '%'}\" aria-valuetext=\"{{percent | number:0}}%\" ng-transclude></div>");
}]);
})();
