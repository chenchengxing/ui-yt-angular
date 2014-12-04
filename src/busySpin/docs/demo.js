angular.module('ui.yt.demo').controller('busySpinDemoCtrl', function ($scope, $busySpin, $timeout) {
  $scope.spin = function () {
    $busySpin.start();
    $timeout(function () {
      $busySpin.dismiss();
    }, 3000);
  };
});