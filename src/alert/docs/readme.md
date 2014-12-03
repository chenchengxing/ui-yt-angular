The **$alert service** is substitute of `window.alert`.

**$alert** indicates strong warning to user. User must confirm by click ok button or close button.

## $alert options
All options can be provided by an object passing into $alert, like `$alert({title: 'hint', body: 'good'})` :

* `title` (default: 'Alert'): title of alert.
* `body`: body of alert.

The `$alert` method return a promise, which will be resolved when the alert 
dismisses.