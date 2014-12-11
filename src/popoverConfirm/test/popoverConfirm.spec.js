// last: ['2014-12-05', 'wujun07']
// contributors: ['wujun07', 'chenchengxing']

describe('popoverConfirm', function() {
  var rootScope, $compile, element;
  beforeEach(function () {
    module('ui.yt.popoverConfirm');
    module('popoverConfirm/template/wrapper.html');
  });
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  afterEach(function () {
    element.remove();
    $('.popover').remove();
    $rootScope.$digest();//important! make sure digested, ensue trigger directive's $destroy
  });

  it('should append popover wrapper to body after clicked', function() {
    var tpl ='<button popover-confirm />';
    element = angular.element(tpl);
    var $scope = $rootScope.$new();
    $compile(element)($scope);
    $scope.$digest();//wait it trigger click bind
    element[0].click();
    $scope.$digest();
    expect($('.popover').length).not.toBe(0);
  });

  it('click cancel should close popover', function() {
    var tpl ='<button popover-confirm />';
    element = angular.element(tpl);
    var $scope = $rootScope.$new();
    $compile(element)($scope);
    $scope.$digest();//wait it trigger click bind
    element[0].click();
    $scope.$digest();
    expect($('.popover').css('display')).toBe('block');
    $('.popover').find('button')[1].click();
    $scope.$digest();
    expect($('.popover').css('display')).toBe('none');
  });

  it('click confirm should close popover, and fire the confirm function', function() {
    var tpl ='<button popover-confirm confirm="confirm()" />';
    element = angular.element(tpl);
    var $scope = $rootScope.$new();
    $scope.confirm = function () {

    };
    $compile(element)($scope);
    var spy = sinon.spy($scope, 'confirm');
    $scope.$digest();//wait it trigger click bind
    element[0].click();
    $scope.$digest();
    expect($('.popover').css('display')).toBe('block');
    $('.popover').find('button')[0].click();
    $scope.$digest();
    expect($('.popover').css('display')).toBe('none');
    expect(spy.called).toBe(true);
  });


});