(function () {
  'use strict';

  angular.module('app.users').controller('UsersController', UsersController);

  function UsersController($scope, $stateParams, usersService) {
    var vm = this;
    var page_user_id = $stateParams.userId;
    var user_id = $scope.currentUserService.getCurrentUser().user_id;
    vm.user_id = user_id;
    
    var getUser = usersService.getUser($scope.currentUserService.getCurrentUser());
    vm.user = getUser.query();
    console.log(vm.user);

    vm.rangeDescriptor = 'all';

  }

})();
