(function(module) {
try { module = angular.module("alerts/template/alert.html"); }
catch(err) { module = angular.module("alerts/template/alert.html", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("alerts/template/alert.html",
    "<div class=\"alert\" ng-class=\"['alert-' + (type || 'warning'), closeable ? 'alert-dismissable' : null]\" role=\"alert\">\n" +
    "    <button ng-show=\"closeable\" type=\"button\" class=\"close\" ng-click=\"close()\">\n" +
    "        <span aria-hidden=\"true\">&times;</span>\n" +
    "        <span class=\"sr-only\">Close</span>\n" +
    "    </button>\n" +
    "    <div ng-transclude></div>\n" +
    "</div>\n" +
    "");
}]);
})();
