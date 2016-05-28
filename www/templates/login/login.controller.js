(function () {
    'use strict';

    angular
        .module('Allure')
        .controller('LoginController', LoginController);

    // LoginController.$inject = ['$location', 'UserService'];
    function LoginController($timeout, $state, UserService) {
        var vm = this;

        vm.login = login;
        function login() {

          var result = UserService.login(vm.username, vm.password);
          if (result.success){
            $timeout(function() {
               $state.go('app.components');
             }, 0);
            console.log('Login Success');
          }
          else{
            console.log('Login Fail', result.error);
          }
        };
    }

})();
