(function(module) {
try { module = angular.module("tooltip/template/tooltip-popup.html"); }
catch(err) { module = angular.module("tooltip/template/tooltip-popup.html", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("tooltip/template/tooltip-popup.html",
    "<div class=\"tooltip {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
    "  <div class=\"tooltip-arrow\"></div>\n" +
    "  <div class=\"tooltip-inner\" ng-bind=\"content\"></div>\n" +
    "</div>\n" +
    "");
}]);
})();
