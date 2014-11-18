describe('radiolist', function() {
  beforeEach(function () {
    module('ui.yt.radiolist');
  });
  var $compile;
  var $rootScope;
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));
  it('should', function() {
    var tpl = '<input type="radio" radiolist />';
    var scope = $rootScope.$new();
    $compile(tpl)(scope);
  });
});