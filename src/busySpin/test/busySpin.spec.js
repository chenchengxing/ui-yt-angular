describe('this', function() {
  var busySpin;
  var $rootScope;
  beforeEach(function () {
    module('ui.yt.busySpin');
  });
  beforeEach(inject(function (_$busySpin_, _$rootScope_) {
    busySpin = _$busySpin_;
    $rootScope = _$rootScope_;
  }));
  afterEach(function () {
    $('.busy-spin').remove();
  });
  it('should exist', function() {
    expect(busySpin).toBeDefined();
  });
  it('can start a spin', function() {
    busySpin.start();
    $rootScope.$digest();
    expect($('.busy-spin').length).toBe(1);
  });
  it('can not start a spin, if there\'s already one', function() {
    expect($('.busy-spin').length).toBe(0);
    busySpin.start();
    $rootScope.$digest();
    expect($('.busy-spin').length).toBe(1);
    busySpin.start();
    $rootScope.$digest();
    expect($('.busy-spin').length).toBe(1);
  });
  it('can dismiss a spin', function() {
    busySpin.start();
    $rootScope.$digest();
    expect($('.busy-spin').length).toBe(1);
    busySpin.dismiss();
    expect($('.busy-spin').length).toBe(0);
  });
});