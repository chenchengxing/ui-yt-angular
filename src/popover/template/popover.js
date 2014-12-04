(function(module) {
try { module = angular.module("popover/template/popover.html"); }
catch(err) { module = angular.module("popover/template/popover.html", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("popover/template/popover.html",
    "<div class=\"popover {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
    "  <div class=\"arrow\"></div>\n" +
    "\n" +
    "  <div class=\"popover-inner\">\n" +
    "      <h3 class=\"popover-title\" ng-bind=\"title\" ng-show=\"title\"></h3>\n" +
    "      <div class=\"popover-content\" ng-bind=\"content\"></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
})();
