angular.module('ui.yt.demo').controller('alertDemoCtrl', function ($scope, $alert, $log) {
  $scope.alert1 = function () {
    $alert();
  };
  $scope.alert2 = function () {
    $alert({
      title: $scope.t2.title,
      body: $scope.t2.body
    });
  };
  $scope.ct = 0;
  $scope.alert3 = function () {
    var promise = $alert();
    promise.then(function () {
      $scope.ct ++;
      $log.info('$alert dismissed');
    });
  };
});
angular.module('ui.yt.demo').controller('busySpinDemoCtrl', function ($scope, $busySpin, $timeout) {
  $scope.spin = function () {
    $busySpin.start();
    $timeout(function () {
      $busySpin.dismiss();
    }, 3000);
  };
});
angular.module('ui.yt.demo').controller('checklistDemoCtrl', function($scope) {
  $scope.roles = [
    {id: 1, text: 'guest'},
    {id: 2, text: 'user'},
    {id: 3, text: 'customer'},
    {id: 4, text: 'admin'}
  ];
  $scope.user = {
    roles: [$scope.roles[1]]
  };
  $scope.checkAll = function() {
    $scope.user.roles = angular.copy($scope.roles);
  };
  $scope.uncheckAll = function() {
    $scope.user.roles = [];
  };
  $scope.checkFirst = function() {
    $scope.user.roles.splice(0, $scope.user.roles.length); 
    $scope.user.roles.push($scope.roles[0]);
  };
});
angular.module('ui.yt.demo').controller('confirmDemoCtrl', function ($scope, $confirm, $log) {
  $scope.confirm1 = function () {
    $confirm();
  };
  $scope.confirm2 = function () {
    $confirm({
      title: $scope.t2.title,
      body: $scope.t2.body
    });
  };
  $scope.confirm3 = function () {
    var promise = $confirm();
    promise.then(function (result) {
      $scope.cb = result;
      $log.info('$confirm dismissed');
    });
  };
});
angular.module('ui.yt.demo').controller('dropdownlistDemoCtrl', function($scope) {
  $scope.list = [{
    id: 1,
    text: '1'
  },{
    id: 2,
    text: '2'
  },{
    id: 3,
    text: '3'
  },];
});
angular.module('ui.yt.demo').controller('focusOnceCtrl', function ($scope) {
  $scope.triggerText = 'Trigger';
  $scope.click = function () {
    $scope.trigger = true;
    $scope.triggerText = 'TriggerAgain';
  };
});
angular.module('ui.yt.demo').controller('msieDemoCtrl', function ($scope, MSIE) {
  $scope.ieVersion = MSIE;
});
angular.module('ui.yt.demo').controller('placeholderDemoCtrl', function ($scope) {
  // body...
});
angular.module('ui.yt.demo').controller('popoverConfirmDemoCtrl', function ($scope) {
  $scope.confirm = function () {
    $scope.result = 'confirmed';
  };
  $scope.cancel = function () {
    $scope.result = 'canceled';
  };
});
angular.module('ui.yt.demo').controller('toasterDemoCtrl', function ($scope, $toaster) {
  $scope.click = function () {
    $toaster($scope.option);
  };
  $scope.clear = function () {
    $toaster.clear();
  };
});