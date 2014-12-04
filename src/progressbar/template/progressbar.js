(function(module) {
try { module = angular.module("progressbar/template/progressbar.html"); }
catch(err) { module = angular.module("progressbar/template/progressbar.html", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("progressbar/template/progressbar.html",
    "<div class=\"progress\">\n" +
    "  <div class=\"progress-bar\" ng-class=\"type && 'progress-bar-' + type\" role=\"progressbar\" aria-valuenow=\"{{value}}\" aria-valuemin=\"0\" aria-valuemax=\"{{max}}\" ng-style=\"{width: percent + '%'}\" aria-valuetext=\"{{percent | number:0}}%\" ng-transclude></div>\n" +
    "</div>");
}]);
})();
