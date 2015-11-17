(function () {
  'use strict';

  angular.module('app.posts').config(config);

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('posts');

    $stateProvider.state('posts', {
      url: '/posts',
      templateUrl: 'angular/posts/_posts.html',
      resolve: {
        auth: ["$q", "currentUserService", function ($q, currentUserService) {

          // TODO: this is an exact copy of what's in reports/routes.js
          // Look here for ideas? http://www.sitepoint.com/implementing-authentication-angular-applications/

          var currentUser = currentUserService.getCurrentUser();

          if (currentUser) {
            return $q.when(currentUser);
          } else {
            return $q.reject({ authenticated: false });
          }
        }]
      }
    })
  }

})();
