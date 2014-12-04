(function(module) {
try { module = angular.module("typeahead/template/typeahead-match.html"); }
catch(err) { module = angular.module("typeahead/template/typeahead-match.html", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("typeahead/template/typeahead-match.html",
    "<a tabindex=\"-1\" bind-html-unsafe=\"match.label | typeaheadHighlight:query\"></a>");
}]);
})();
