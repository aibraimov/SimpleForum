angular.module('app',
  [
    'ui.bootstrap',
    'ui.router',
    'templates',
    'ngMessages',

    'app.posts',
    'app.forums',
    'app.jogs',
    'app.login',
    'app.report',
    'app.users'
  ]);

angular.module('app.jogs', [
  'ui.bootstrap.datetimepicker',
  'ngResource'
]);
angular.module('app.forums', [
  'ngResource',
]);
angular.module('app.posts', [
  'ngResource',
]);

angular.module('app.login', []);
angular.module('app.report', []);
angular.module('app.users', []);
