(function(module) {
try { module = angular.module("popoverConfirm/template/wrapper.html"); }
catch(err) { module = angular.module("popoverConfirm/template/wrapper.html", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("popoverConfirm/template/wrapper.html",
    "<div class=\"popover top\" ng-style=\"{display: (isOpened && 'block') || 'none', visibility: (isGoodToOpen && 'visible') || 'hidden', top: position.top+'px', left: position.left+'px', zIndex: 3000}\">\n" +
    "  <div class=\"arrow\"></div>\n" +
    "  <div class=\"popover-inner\">\n" +
    "    <h3 class=\"popover-title\" ng-if=\"title\">{{title}}</h3>\n" +
    "    <div class=\"popover-content\">\n" +
    "      <div ng-bind-html=\"msg\"></div>\n" +
    "      <div class=\"popover-footer clearfix\">\n" +
    "        <div class=\"align-center\">\n" +
    "          <button class=\"btn {{confirmBtnClass}}\" ng-click=\"confirm()\">{{confirmText}}</button>\n" +
    "          <button class=\"btn btn-default\" ng-click=\"cancel()\">{{cancelText}}</button>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);
})();
