angular.module('ui.yt.demo').controller('focusOnceCtrl', function ($scope) {
  $scope.triggerText = 'Trigger';
  $scope.click = function () {
    $scope.trigger = true;
    $scope.triggerText = 'TriggerAgain';
  };
});