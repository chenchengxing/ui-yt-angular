angular.module('ui.yt.demo').controller('$alertDemoCtrl', function ($scope, $alert) {
  $scope.showAlert = function (argument) {
    $alert.pop();
  };
});