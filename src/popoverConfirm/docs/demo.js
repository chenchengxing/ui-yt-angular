angular.module('ui.yt.demo').controller('popoverConfirmDemoCtrl', function ($scope) {
  $scope.confirm = function () {
    $scope.result = 'confirmed';
  };
  $scope.cancel = function () {
    $scope.result = 'canceled';
  };
});