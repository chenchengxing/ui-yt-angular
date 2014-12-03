describe('$confirm', function() {
  var $confirm;
  var $rootScope;
  beforeEach(function () {
    module('ui.yt.confirm');
    module('confirm/template/wrapper.html');
  });
  beforeEach(inject(function (_$confirm_, _$rootScope_) {
    $confirm = _$confirm_;
    $rootScope = _$rootScope_;
  }));
  afterEach(function () {
    $('.modal-backdrop').remove();
    $('.modal').remove();
  });
  it('should pop', function() {
    $confirm();
    $rootScope.$digest();
    expect($('.modal-backdrop').length).toBe(1);
    expect($('.modal-dialog').length).toBe(1);
  });
  it('should close the pop, if ok clicked', function() {
    $confirm();
    $rootScope.$digest();
    expect($('.modal-backdrop').length).toBe(1);
    $('.modal-dialog').find('.btn-default').click();
    $rootScope.$digest();
    expect($('.modal-backdrop').length).toBe(0);
    expect($('.modal').length).toBe(0);
  });
  it('should close the pop, if close clicked', function() {
    $confirm();
    $rootScope.$digest();
    expect($('.modal-backdrop').length).toBe(1);
    $('.modal-dialog').find('.close').click();
    $rootScope.$digest();
    expect($('.modal-backdrop').length).toBe(0);
    expect($('.modal').length).toBe(0);
  });
  it('should return a promise', function() {
    var promise = $confirm();
    expect(typeof(promise.then)).toBe('function');
  });
  it('should trigger promise then function after confirm closed, ', function() {
    var promise = $confirm();
    $rootScope.$digest();
    var a = {
      thenFn: function (result) {
      }
    };
    var spy = sinon.spy(a, 'thenFn');
    promise.then(a.thenFn);
    $('.modal-dialog').find('.btn-primary').click();
    $rootScope.$digest();
    expect(spy.called).toBe(true);
    expect(spy.calledWith('ok')).toBe(true);
  });
  it('confirm promise called with ok', function() {
    var promise = $confirm();
    $rootScope.$digest();
    var a = {
      thenFn: function (result) {
      }
    };
    var spy = sinon.spy(a, 'thenFn');
    promise.then(a.thenFn);
    $('.modal-dialog').find('.btn-primary').click();
    $rootScope.$digest();
    expect(spy.calledWith('ok')).toBe(true);
  });
  it('close promise called with cancel', function() {
    var promise = $confirm();
    $rootScope.$digest();
    var a = {
      thenFn: function (result) {
      }
    };
    var spy = sinon.spy(a, 'thenFn');
    promise.then(a.thenFn);
    $('.modal-dialog').find('.btn-default').click();
    $rootScope.$digest();
    expect(spy.calledWith('cancel')).toBe(true);
  });
});