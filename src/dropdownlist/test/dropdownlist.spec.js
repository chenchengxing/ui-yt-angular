describe('dropdownlist', function() {
  beforeEach(module('ui.yt.dropdownlist'));
  beforeEach(module('dropdownlist/template/dropdown.html'));
  var $compile;
  var $rootScope;
  var $timeout;
  beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
  }));
  afterEach(function() {
    $('.dropdown').remove();
  });
  describe('##displaying', function () {
    it('should not generate dropdown if no option specify', function() {
      var tpl = angular.element('<div dropdownlist />');
      document.body.appendChild(tpl[0]);
      var scope = $rootScope.$new();
      $compile(tpl)(scope);
      $rootScope.$digest();
      expect($('.dropdown').length).toBe(0);
    });
    it('should allow no transclude content', function() {
      var tpl = angular.element('<div dropdownlist="item in list" />');
      document.body.appendChild(tpl[0]);
      var scope = $rootScope.$new();
      $compile(tpl)(scope);
      scope.list = [1, 2, 3];
      $rootScope.$digest();
      expect($('.dropdown').length).toBe(1);
      var ul = $('.dropdown').find('ul');
      expect(ul.find('li').length).toBe(3);
      expect(ul.find('li').eq(0).text()).toBe('1');
      expect(ul.find('li').eq(1).text()).toBe('2');
      expect(ul.find('li').eq(2).text()).toBe('3');
    });
    it('allows array with object', function() {
      var tpl = angular.element('<div dropdownlist="item in list" />');
      document.body.appendChild(tpl[0]);
      var scope = $rootScope.$new();
      $compile(tpl)(scope);
      scope.list = [{
        id: 1,
        text: 'text1'
      }, {
        id: 2,
        text: 'text2'
      }, {
        id: 3,
        text: 'text3'
      }];
      $rootScope.$digest();
      expect($('.dropdown').length).toBe(1);
      var ul = $('.dropdown').find('ul');
      expect(ul.find('li').length).toBe(3);
      expect(ul.find('li').eq(0).text()).toBe('{"id":1,"text":"text1"}');
      expect(ul.find('li').eq(1).text()).toBe('{"id":2,"text":"text2"}');
      expect(ul.find('li').eq(2).text()).toBe('{"id":3,"text":"text3"}');
    });
    it('allows array with object, displaying value', function() {
      var tpl = angular.element('<div dropdownlist="item in list"> {{ item.text }} </div>');
      document.body.appendChild(tpl[0]);
      var scope = $rootScope.$new();
      $compile(tpl)(scope);
      scope.list = [{
        id: 1,
        text: 'text1'
      }, {
        id: 2,
        text: 'text2'
      }, {
        id: 3,
        text: 'text3'
      }];
      $rootScope.$digest();
      expect($('.dropdown').length).toBe(1);
      var ul = $('.dropdown').find('ul');
      expect(ul.find('li').length).toBe(3);
      expect(ul.find('li').eq(0).text()).toBe('text1');
      expect(ul.find('li').eq(1).text()).toBe('text2');
      expect(ul.find('li').eq(2).text()).toBe('text3');
    });
  });
  describe('model', function() {
    it('updates model when item clicked', function() {
      var tpl = angular.element('<div dropdownlist="item in list" ng-model="cur"></div>');
      document.body.appendChild(tpl[0]);
      var scope = $rootScope.$new();
      $compile(tpl)(scope);
      scope.list = [1, 2, 3];
      $rootScope.$digest();
      expect($('.dropdown').length).toBe(1);
      var ul = $('.dropdown').find('ul');
      ul.find('li').find('a').eq(0).click();
      $rootScope.$digest();
      expect(scope.cur).toBe(1);
    });
    it('updates curText when item clicked', function() {
      var tpl = angular.element('<div dropdownlist="item in list" ng-model="cur"></div>');
      document.body.appendChild(tpl[0]);
      var scope = $rootScope.$new();
      $compile(tpl)(scope);
      scope.list = [1, 2, 3];
      $rootScope.$digest();
      expect($('.dropdown').length).toBe(1);
      var ul = $('.dropdown').find('ul');
      ul.find('li').find('a').eq(0).click();
      $rootScope.$digest();
      $timeout.flush();
      expect($('.dropdown').find('.dropdown-text').eq(0).text()).toBe('1');
    });
    it('updates curText when model change', function() {
      var tpl = angular.element('<div dropdownlist="item in list" ng-model="cur"></div>');
      document.body.appendChild(tpl[0]);
      var scope = $rootScope.$new();
      $compile(tpl)(scope);
      scope.list = [{
        text: '1'
      }, 2, 3];
      $rootScope.$digest();
      expect($('.dropdown').length).toBe(1);
      scope.cur = 2;
      $rootScope.$digest();
      $timeout.flush();
      expect($('.dropdown').find('.dropdown-text').eq(0).text()).toBe('2');
      scope.cur = scope.list[0];
      $rootScope.$digest();
      $timeout.flush();
      expect($('.dropdown').find('.dropdown-text').eq(0).text()).toBe('{"text":"1"}');
      scope.cur = {
        text: '1'
      };
      $rootScope.$digest();
      expect($('.dropdown').find('.dropdown-text').eq(0).text()).toBe('');
    });
  });
  describe('as', function() {
    it('should match the value of as described', function() {
      var tpl = angular.element('<div dropdownlist="item.text as item in list" ng-model="cur"></div>');
      document.body.appendChild(tpl[0]);
      var scope = $rootScope.$new();
      $compile(tpl)(scope);
      scope.list = [{
        text: '1'
      }, 2, 3];
      $rootScope.$digest();
      var ul = $('.dropdown').find('ul');
      ul.find('li').find('a').eq(0).click();
      $rootScope.$digest();
      expect(scope.cur).toBe('1');
    });
    it('should update text using as when model change', function() {
      var tpl = angular.element('<div dropdownlist="iii.id as iii in list" ng-model="cur">{{iii.text}}</div>');
      document.body.appendChild(tpl[0]);
      var scope = $rootScope.$new();
      $compile(tpl)(scope);
      scope.list = [{
        text: '1',
        id: 1
      }, 2, 3];
      $rootScope.$digest();
      scope.cur = 1;
      $rootScope.$digest();
      $timeout.flush();
      expect($('.dropdown').find('.dropdown-text').eq(0).text()).toBe('1');
    });
  });
  // it('should generate lists from attr dropdownlist', function() {
  //   var tpl = angular.element('<div dropdownlist="list">{{item}}</div>');
  //   document.body.appendChild(tpl[0]);
  //   var scope = $rootScope.$new();
  //   scope.list = [1, 2, 3];
  //   $compile(tpl)(scope);
  //   $rootScope.$digest();
  //   expect($('.dropdown').find('li').length).toBe(3);
  //   expect($('.dropdown').find('li a').eq(0).text()).toBe('1');
  // });
  // it('should generate lists using array with object, value should match', function() {
  //   var tpl = angular.element('<div dropdownlist="list">{{item.id}}</div>');
  //   document.body.appendChild(tpl[0]);
  //   var scope = $rootScope.$new();
  //   scope.list = [{
  //     id: 1
  //   }];
  //   $compile(tpl)(scope);
  //   $rootScope.$digest();
  //   expect($('.dropdown').find('li a').eq(0).text()).toBe('1');
  // });
  // it('should pick selected value', function() {
  //   var tpl = angular.element('<div dropdownlist="list" model="cur">{{item}}</div>');
  //   document.body.appendChild(tpl[0]);
  //   var scope = $rootScope.$new();
  //   scope.list = [1, 2, 3];
  //   $compile(tpl)(scope);
  //   $rootScope.$digest();
  //   $('.dropdown').find('li a').eq(0).click();
  //   $rootScope.$digest();
  //   expect(scope.cur).toBe(1);
  // });
  // it('should pick selected value from object', function() {
  //   var tpl = angular.element('<div dropdownlist="list" model="cur" value="id">{{item.text}}</div>');
  //   document.body.appendChild(tpl[0]);
  //   var scope = $rootScope.$new();
  //   scope.list = [{
  //     id: 1,
  //     text: 't1'
  //   }];
  //   $compile(tpl)(scope);
  //   $rootScope.$digest();
  //   $('.dropdown').find('li a').eq(0).click();
  //   $rootScope.$digest();
  //   expect(scope.cur).toBe(1);
  //   expect($('.dropdown').find('li a').eq(0).text()).toBe('t1');
  // });
});