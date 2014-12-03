The **$confirm service**.

**$confirm** indicates strong warning to user. User must confirm by click ok button or close button.

## $confirm options
All options can be provided by an object passing into $confirm, like `$confirm({title: 'hint', body: 'good'})` :

* `title` (default: 'confirm'): title of confirm.
* `body`: body of confirm.

The `$confirm` method return a promise, which will be resolved when the confirm 
dismisses.