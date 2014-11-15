describe('focusOnce', function() {
  beforeEach(function () {
    module('ui.yt.focusOnce');
  });

  it('should attach watcher', inject(function($compile, $rootScope, $timeout) {
    var tpl ='<input focus-once="trigger" id="dfs"/>';
    var element = angular.element(tpl);
    $compile(element)($rootScope);
    expect(element.scope().$$watchers.length).not.toBe(0);
  }));


  it('should focus if it triggers', inject(function($compile, $rootScope, $timeout) {
    var tpl ='<input focus-once="trigger" id="dfs"/>';
    var element = angular.element(tpl);
    document.body.appendChild(element[0]);
    $compile(element)($rootScope);
    $rootScope.trigger = true;
    $rootScope.$digest();
    $timeout.flush();
    expect(document.activeElement.id).toBe('dfs');
  }));

  it('should unwatch after focused', inject(function($compile, $rootScope, $timeout) {
    var tpl ='<input focus-once="trigger" id="dfs"/>';
    var element = angular.element(tpl);
    document.body.appendChild(element[0]);
    $compile(element)($rootScope);
    $rootScope.trigger = true;
    $rootScope.$digest();
    $timeout.flush();
    expect(element.scope().$$watchers.length).toBe(0);
  }));

});