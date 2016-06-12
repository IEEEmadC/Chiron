(function () {
  'use strict';

  angular
  .module('Allure')
  .controller('LoginController', LoginController);

  // LoginController.$inject = ['$location', 'UserService'];
  function LoginController($timeout, $state, UserService, $ionicHistory, MedicineService, $ionicScrollDelegate) {
    var vm = this;

    vm.login = login;
    vm.error = '';
    vm.goToRegister = goToRegister;
    MedicineService.previousView = [];
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });
    vm.username = '';
    vm.password = '';

    var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');
     var scroller = document.body.querySelector('#userMessagesView .scroll-content');

     window.addEventListener('native.keyboardshow', keyboardShowHandler);
     function keyboardShowHandler(e){
       scroller.style.bottom = e.keyboardHeight + 'px';
       viewScroll.scrollBottom();
     }
    return;

    function login() {

      var result = UserService.login(vm.username, vm.password);
      if (result.success){
        $timeout(function() {
          vm.error = '';
          $state.go('app.welcome');
        }, 0);
      }
      else{
        vm.error = result.error;
      }
    };

    function goToRegister(){
      vm.username = '';
      vm.password = '';
      $state.go('register');
    }
  }

})();
