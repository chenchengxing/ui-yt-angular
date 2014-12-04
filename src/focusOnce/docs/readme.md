Sometimes, in form validation, it is neccesary to warn user when missing something. But it is not neccesary to do it again. So ** focusOnce ** come into living.

## Usage
markup like this: `<input focus-once="trigger" />`

when `$scope.trigger = true;` is run, the input will be focused in. If you reset the trigger value and do it again, nothing happens.