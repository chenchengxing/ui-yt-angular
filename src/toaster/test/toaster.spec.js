describe('toaster', function() {
  var $toaster;
  var $rootScope;
  var $timeout;
  beforeEach(function () {
    module('ui.yt.toaster');
  });
  beforeEach(inject(function (_$toaster_, _$rootScope_, _$timeout_) {
    $toaster = _$toaster_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
  }));
  afterEach(function () {
    $('.toaster-container').remove();
  });
  it('should generate container', function() {
    $toaster();
    $rootScope.$digest();
    expect($('.toaster-container').length).toBe(1);
  });
  it('should have a toaster', function() {
    $toaster();
    $rootScope.$digest();
    expect($('.toaster-container').find('.toaster').length).toBe(1);
  });
  it('should have mutiple toasters', function() {
    $toaster();
    $toaster();
    $rootScope.$digest();
    expect($('.toaster-container').find('.toaster').length).toBe(2);
  });
  it('should clear all toasters', function() {
    $toaster();
    $toaster();
    $rootScope.$digest();
    expect($('.toaster-container').find('.toaster').length).toBe(2);
    $toaster.clear();
    $rootScope.$digest();
    expect($('.toaster-container').length).toBe(1);
    expect($('.toaster-container').find('.toaster').length).toBe(0);
  });
  it('should place the correct title and body', function() {
    $toaster({
      title: 'title1',
      body: 'body1'
    });
    $toaster({
      title: 'title2',
      body: 'body2'
    });
    $rootScope.$digest();
    var toasters = $('.toaster-container').find('.toaster');
    expect(toasters.length).toBe(2);
    expect(toasters.eq(0).find('.toaster-title').text()).toBe('title1');
    expect(toasters.eq(0).find('.toaster-body').text()).toBe('body1');
    expect(toasters.eq(1).find('.toaster-title').text()).toBe('title2');
    expect(toasters.eq(1).find('.toaster-body').text()).toBe('body2');
  });
  it('should dismiss after seconds', function() {
    $toaster({
      title: 'title1',
      body: 'body1'
    });
    $rootScope.$digest();
    expect($('.toaster-container').find('.toaster').length).toBe(1);
    $timeout.flush(3000);
    expect($('.toaster-container').find('.toaster').length).toBe(0);
  });
  it('should pass in a timeout milli-second', function() {
    $toaster({
      title: 'title1',
      body: 'body1',
      timeout: 5000
    });
    $rootScope.$digest();
    expect($('.toaster-container').find('.toaster').length).toBe(1);
    $timeout.flush(3000);
    expect($('.toaster-container').find('.toaster').length).toBe(1);
    $timeout.flush(2000);
    expect($('.toaster-container').find('.toaster').length).toBe(0);
  });
  it('should have different type', function() {
    $toaster();
    $toaster({
      type: 'warning'
    });
    $toaster({
      type: 'error'
    });
    $toaster({
      type: 'wait'
    });
    $toaster({
      type: 'note'
    });
    $rootScope.$digest();
    expect($('.toaster-container').find('.toaster').eq(0).hasClass('toaster-success')).toBe(true);
    expect($('.toaster-container').find('.toaster').eq(1).hasClass('toaster-warning')).toBe(true);
    expect($('.toaster-container').find('.toaster').eq(2).hasClass('toaster-error')).toBe(true);
    expect($('.toaster-container').find('.toaster').eq(3).hasClass('toaster-wait')).toBe(true);
    expect($('.toaster-container').find('.toaster').eq(4).hasClass('toaster-note')).toBe(true);
  });
});