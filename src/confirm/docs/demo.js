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