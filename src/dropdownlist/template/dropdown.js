(function(module) {
try { module = angular.module("dropdownlist/template/dropdown.html"); }
catch(err) { module = angular.module("dropdownlist/template/dropdown.html", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("dropdownlist/template/dropdown.html",
    "\n" +
    "\n" +
    "<div class=\"dropdown btn-group w_100p\">\n" +
    "  <button class=\"dropdown-toggle btn btn-default btn-full-width\" ng-disabled=\"dropdownDisabled\">\n" +
    "    <span class=\"col-md-11 dropdown-text\">{{curText}}</span>\n" +
    "    <span class=\"caret\"></span>\n" +
    "  </button>\n" +
    "  <ul class=\"dropdown-menu\">\n" +
    "  </ul>\n" +
    "</div>\n" +
    "");
}]);
})();
