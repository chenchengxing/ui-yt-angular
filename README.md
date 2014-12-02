BEFE yt-ui-angular
=============

yt ui for angular

trying to write some angular ui

## Installation

Installation is easy as yt-ui-bootstrap has minimal dependencies - only the AngularJS and Bootstrap's CSS are required.Just checkout `dist/ui-yt.min.js`

When you are done downloading all the dependencies and project files the only remaining part is to add dependencies on the `ui.yt` AngularJS module:

```javascript
angular.module('myModule', ['ui.yt']);
```

## Contents

### placeholder
`directive` for ie

### focusOnce
`directive` trigger once focus

### busySpin
`service` busy spin for long time data loading

### popoverConfirm
`directive` quick confirm preventing from a slip
    
### toaster
`service` toast

### checklist
`directive` checkbox list model

### alert
`service` alert

### confirm
`service` confirm

### dropdownlist
`directive` for dropdown array

## Compatibility
ie8+, Chrome, ff

## FAQ

## Contributing to the project

Please check the [CONTRIBUTING.md](CONTRIBUTING.md) for the contribution guidelines.

### Development
#### environment
* install `nodejs`
* run `npm install`

#### Build
* run cli `gulp` to watch changes, which will trigger tasks
* run `gulp b` to just build

#### Test coverage
* todo..

#### src structure
* all components lays in `src` diretory.
* each component has `test` `template` folder
* tests file name must end up with `.spec.js`
* template file name must end up with `.html`

#### tests
we're using jasmine and sinon for testing.

## todos
* scrollfix
* return to top
* maxlength
* gtable
* checkbox indeterminate
* pager
* slider

