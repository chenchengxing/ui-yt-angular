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






