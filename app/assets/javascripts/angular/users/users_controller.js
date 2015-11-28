(function () {
  'use strict';

  angular.module('app.users').controller('UsersController', UsersController);

  function UsersController($scope, $stateParams, usersService, Upload) {
    var vm = this;
    var page_user_id = $stateParams.userId;
    var user_id = $scope.currentUserService.getCurrentUser().user_id;
    vm.user_id = user_id;
    
    var getUser = usersService.getUser(page_user_id);
    vm.user = getUser.query();

    vm.rangeDescriptor = 'all';

//upload image
  
    vm.uploadClick = function() {
      $("#avatar_upload").trigger("click");
    }

    vm.uploadPic = function(file) {
    file.upload = Upload.upload({
      url: '/api/users/'+vm.user_id+'.json',
      method: 'PATCH',
      data: {user: {avatar: file}},
    });

    file.upload.then(function (response) {
      vm.user.avatar = response.data.avatar;
      vm.picFile = null;
    });
  }
  }
}
)();
