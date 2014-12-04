(function(module) {
try { module = angular.module("tabs/template/tab.html"); }
catch(err) { module = angular.module("tabs/template/tab.html", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("tabs/template/tab.html",
    "<li ng-class=\"{active: active, disabled: disabled}\">\n" +
    "  <a href ng-click=\"select()\" tab-heading-transclude>{{heading}}</a>\n" +
    "</li>\n" +
    "");
}]);
})();
