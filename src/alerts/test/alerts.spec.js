describe('alerts', function () {
  var scope;
  var $compile;
  var element;

  beforeEach(function () {
    module('ui.yt.alerts');
    module('alerts/template/alert.html');
  });

  beforeEach(inject(function ($rootScope, _$compile_) {
    scope = $rootScope;
    $compile = _$compile_;

    element = angular.element(
      '<div>' +
        '<alert ng-repeat="alert in alerts" type="{{alert.type}}" close="removeAlert($index)">' +
          '{{alert.msg}}' +
        '</alert>' +
      '</div>'
    );

    scope.alerts = [
      { msg: 'foo', type: 'success'},
      { msg: 'bar', type: 'error'},
      { msg: 'baz'}
    ];
  }));

  function createAlerts() {
    $compile(element)(scope);
    scope.$digest();
    return element.find('.alert');
  }

  function findCloseButton(index) {
    return element.find('.close').eq(index);
  }

  function findContent(index) {
    return element.find('div[ng-transclude] span').eq(index);
  }

  it('should generate alerts using ng-repeat', function () {
    var alerts = createAlerts();
    expect(alerts.length).toEqual(3);
  });

  it('should use correct classes for different alert types', function () {
    var alerts = createAlerts();
    expect(alerts.eq(0).hasClass('alert-success')).toBe(true);
    expect(alerts.eq(1).hasClass('alert-error')).toBe(true);
    expect(alerts.eq(2).hasClass('alert-warning')).toBe(true);
  });

  it('should respect alert type binding', function () {
    var alerts = createAlerts();
    expect(alerts.eq(0).hasClass('alert-success')).toBe(true);

    scope.alerts[0].type = 'error';
    scope.$digest();

    expect(alerts.eq(0).hasClass('alert-error')).toBe(true);
  });

  it('should show the alert content', function () {
    var alerts = createAlerts();

    for (var i = 0, n = alerts.length; i < n; i++) {
      expect(findContent(i).text()).toBe(scope.alerts[i].msg);
    }
  });

  it('should show close buttons and have the dismissable class', function () {
    var alerts = createAlerts();
    for (var i = 0, n = alerts.length; i < n; i++) {
      expect(findCloseButton(i).css('dispaly')).not.toBe('none');
      expect(alerts.eq(i).hasClass('alert-dismissable'));
    }
  });

  it('should fire callback when cloased', function () {
    var alerts = createAlerts();
    scope.$apply(function () {
      scope.removeAlert = function () {};
    });
    var spy = sinon.spy(scope, 'removeAlert');
    expect(findCloseButton(0).css('dispaly')).not.toBe('none');
    findCloseButton(1).click();

    expect(spy.calledWith(1)).toBe(true);
  });

  it('should not show close button and have the dismissable class if no close callback specified', function () {
    element = $compile('<alert>No close</alert>')(scope);
    scope.$digest();
    expect(findCloseButton(0)).toBeHidden();
    expect(element).not.toHaveClass('alert-dismissable');
  });

  it('should be possible to add additional classes for alert', function () {
    var element = $compile('<alert class="alert-block" type="info">Default alert!</alert>')(scope);
    scope.$digest();
    expect(element).toHaveClass('alert-block');
    expect(element).toHaveClass('alert-info');
  });

});
