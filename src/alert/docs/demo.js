angular.module('ui.yt.demo').controller('alertDemoCtrl', function ($scope, $alert, $log) {
  $scope.alert1 = function () {
    $alert();
  };
  $scope.t2 = {};
  $scope.alert2 = function () {
    $alert({
      title: $scope.t2.title || 'empty Title, try to input a Title',
      body: $scope.t2.body || 'empty Content, try to input some Content'
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