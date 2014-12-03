angular.module('ui.yt.demo').controller('toasterDemoCtrl', function ($scope, $toaster) {
  $scope.click = function () {
    $toaster($scope.option);
  };
  $scope.clear = function () {
    $toaster.clear();
  };
});