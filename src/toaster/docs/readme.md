** toaster ** is a very useful service. When user makes action on page, you may want to show info to user. And you don't want to make noise, or alert something, so here toaster comes.It provides diverse types to show info aside.

## api

`$toaster(options)`, options are listed below:

* title (default: ''): toast title
* body (default: ''): toast body
* type (default: 'success'): toast type, support 'info', 'success', 'warning'
* timeout (default: 3000): delay time to dismiss one

`$toaster.clear()`, clear all toasts.
