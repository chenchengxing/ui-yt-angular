describe('$alert', function() {
  var $alert;
  var $rootScope;
  beforeEach(function () {
    module('ui.yt.alert');
    module('alert/template/wrapper.html');
  });
  beforeEach(inject(function (_$alert_, _$rootScope_) {
    $alert = _$alert_;
    $rootScope = _$rootScope_;
  }));
  afterEach(function () {
    $('.modal-backdrop').remove();
    $('.modal').remove();
  });
  it('should pop', function() {
    $alert();
    $rootScope.$digest();
    expect($('.modal-backdrop').length).toBe(1);
    expect($('.modal-dialog').length).toBe(1);
  });
  it('should close the pop, if ok clicked', function() {
    $alert();
    $rootScope.$digest();
    expect($('.modal-backdrop').length).toBe(1);
    $('.modal-dialog').find('.btn-primary').click();
    $rootScope.$digest();
    expect($('.modal-backdrop').length).toBe(0);
    expect($('.modal').length).toBe(0);
  });
  it('should close the pop, if close clicked', function() {
    $alert();
    $rootScope.$digest();
    expect($('.modal-backdrop').length).toBe(1);
    $('.modal-dialog').find('.close').click();
    $rootScope.$digest();
    expect($('.modal-backdrop').length).toBe(0);
    expect($('.modal').length).toBe(0);
  });
  it('should return a promise', function() {
    var promise = $alert();
    expect(typeof(promise.then)).toBe('function');
  });
  it('should trigger promise then function after alert closed', function() {
    var promise = $alert();
    $rootScope.$digest();
    var a = {
      thenFn: function () {
      }
    };
    var spy = sinon.spy(a, 'thenFn');
    promise.then(a.thenFn);
    $('.modal-dialog').find('.close').click();
    $rootScope.$digest();
    expect(spy.called).toBe(true);
  });
});