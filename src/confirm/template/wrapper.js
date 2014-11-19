(function(module) {
try { module = angular.module("confirm/template/wrapper.html"); }
catch(err) { module = angular.module("confirm/template/wrapper.html", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("confirm/template/wrapper.html",
    "<div class=\"modal fade in\" style=\"display: block\">\n" +
    "  <div class=\"modal-dialog\">\n" +
    "    <div class=\"modal-content\">\n" +
    "      <div class=\"modal-header\">\n" +
    "        <button type=\"button\" class=\"close\" ng-click=\"close()\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\n" +
    "        <h4 class=\"modal-title\">{{title}}</h4>\n" +
    "      </div>\n" +
    "      <div class=\"modal-body\">\n" +
    "        {{body}}\n" +
    "      </div>\n" +
    "      <div class=\"modal-footer\">\n" +
    "        <button type=\"button\" class=\"btn btn-primary\" ng-click=\"ok()\">{{okText}}</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">{{cancelText}}</button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);
})();
