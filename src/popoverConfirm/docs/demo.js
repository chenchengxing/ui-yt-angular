angular.module('ui.yt.demo').controller('popoverConfirmDemoCtrl', function ($scope) {
  $scope.result = 'noting happened yet~';

  $scope.confirm = function () {
    $scope.result = 'on going';
  };
  $scope.cancel = function () {
    $scope.result = 'canceled';
  };

  $scope.deleteIt = function () {
    $scope.result = 'it is be deleted!';
  };
  $scope.deleteCancel = function () {
    $scope.result = 'it is still here!';
  };

  $scope.popDeleteOpts = {
    confirmText: 'Delete it',
    cancelText: 'Keep it',
    title: 'Do u want to delete it?',
    confirmBtnClass: 'btn-danger'
  };
});