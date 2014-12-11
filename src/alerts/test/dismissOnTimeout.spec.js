describe('dismissOnTimeout', function () {
  var scope;
  var $compile;
  var $timeout;

  beforeEach(function () {
    module('ui.yt.alerts');
    module('alerts/template/alert.html');
  });

  beforeEach(inject(function ($rootScope, _$compile_, _$timeout_) {
    scope = $rootScope;
    $compile = _$compile_;
    $timeout = _$timeout_;
  }));

  it('should close automatically if auto-dismiss is defined on the element', function () {
    scope.removeAlert = function() {};
    var spy = sinon.spy(scope, 'removeAlert');
    $compile('<alert close="removeAlert()" dismiss-on-timeout="500"></alert>')(scope);
    scope.$digest();
    $timeout.flush();
    expect(spy.called).toBe(true);
  });

});