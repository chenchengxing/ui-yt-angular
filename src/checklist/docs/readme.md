In Angular one checkbox `<input type="checkbox" ng-model="...">` is linked with one model.
But in practice we usually want one model to store array of checked values from several checkboxes.
**Checklist-model** solves that task without additional code in controller.
You should play with attributes of `<input type="checkbox">` tag:

* set checklist instead of ng-model
* set checklist-value - what should be picked as array item
