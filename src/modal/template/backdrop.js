(function(module) {
try { module = angular.module("modal/template/backdrop.html"); }
catch(err) { module = angular.module("modal/template/backdrop.html", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("modal/template/backdrop.html",
    "<div class=\"modal-backdrop fade {{ backdropClass }}\"\n" +
    "     ng-class=\"{in: animate}\"\n" +
    "     ng-style=\"{'z-index': 1040 + (index && 1 || 0) + index*10}\"\n" +
    "></div>\n" +
    "");
}]);
})();
