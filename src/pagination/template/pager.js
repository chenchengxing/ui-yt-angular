(function(module) {
try { module = angular.module("pagination/template/pager.html"); }
catch(err) { module = angular.module("pagination/template/pager.html", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("pagination/template/pager.html",
    "<ul class=\"pager\">\n" +
    "  <li ng-class=\"{disabled: noPrevious(), previous: align}\"><a href ng-click=\"selectPage(page - 1)\">{{getText('previous')}}</a></li>\n" +
    "  <li ng-class=\"{disabled: noNext(), next: align}\"><a href ng-click=\"selectPage(page + 1)\">{{getText('next')}}</a></li>\n" +
    "</ul>");
}]);
})();
