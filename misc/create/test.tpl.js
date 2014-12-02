describe('{{name}}', function() {
  var $rootScope;
  beforeEach(function () {
    module('ui.yt.{{name}}');
  });
  beforeEach(inject(function (_$rootScope_) {
    $rootScope = _$rootScope_;
  }));
  it('should', function() {
    expect($rootScope).toBeDefined();
  });
});