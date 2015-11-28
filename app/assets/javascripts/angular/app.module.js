angular.module('app',
  [
    'ui.bootstrap',
    'ui.router',
    'templates',
    'ngMessages',
    'ngSanitize',

    'app.posts',
    'app.forums',
    'app.jogs',
    'app.login',
    'app.report',
    'app.users',
    'app.tags',
    'app.answers'
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
  'ngLodash',
  'isteven-multi-select',
  'ckeditor'
]);
angular.module('app.tags', [
  'ngResource',
]);
angular.module('app.answers', [
  'ngResource',
]);

angular.module('app.login', []);
angular.module('app.report', []);
angular.module('app.users', [
    'ngResource',
    'ngFileUpload'
]);
