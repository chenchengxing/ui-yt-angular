describe('placeholder', function() {
  beforeEach(function () {
    module('ui.yt.placeholder');
  });
  it('!ie should not has placeholder-ie class', inject(function($compile, $rootScope) {
    var tpl ='<input  placeholder="haha" ng-model="dfs"/>';
    var element = angular.element(tpl);
    $compile(element)($rootScope);
    $rootScope.$digest();
    expect(element.hasClass('placeholder-ie')).toBe(false);
  }));
});