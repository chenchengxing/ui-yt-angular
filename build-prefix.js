angular.module('ui.yt', [
  'ui.yt.template',
  'ui.yt.placeholder',
  'ui.yt.focusOnce',
  'ui.yt.popoverConfirm',
  'ui.yt.busySpin',
  'ui.yt.checklist',
  'ui.yt.toaster',
  'ui.yt.alert',
  'ui.yt.confirm'
]);
angular.module('ui.yt.template', [
  'popoverConfirm/template/wrapper.html',
  'alert/template/wrapper.html',
  'confirm/template/wrapper.html'
]);