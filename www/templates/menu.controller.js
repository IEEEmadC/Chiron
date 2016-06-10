(function () {
    'use strict';

    angular
        .module('Allure')
        .controller('MenuComponentCtrl', MenuComponentCtrl);

    // LoginController.$inject = ['$location', 'UserService'];
    function MenuComponentCtrl($timeout, $state, UserService, $ionicHistory, MedicineService) {
        this.logout = logout;

        function logout(){
          UserService.logout();
          $state.go('login');
        }
    }

})();
