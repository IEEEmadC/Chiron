﻿(function () {
    'use strict';

    angular
        .module('Allure')
        .controller('RegisterController', RegisterController);

    // LoginController.$inject = ['$location', 'UserService'];
    function RegisterController(UserService, $state, $timeout) {
        var vm = this;

        vm.register = register;
        vm.goToLogin = goToLogin;
        vm.error = '';
        vm.user = {};
        return;
        // login();

        // (function initController() {
        //     // reset login status
        //     UserService.ClearCredentials();
        // })();

        function register() {

          var result = UserService.register(vm.user);
          if (result.success){
            $timeout(function() {
              vm.error = ''
               $state.go('login');
             }, 0);
          }
          else{
            vm.error = result.error;
          }
        };

        function goToLogin(){
          $state.go('login');
        }
    }

})();
