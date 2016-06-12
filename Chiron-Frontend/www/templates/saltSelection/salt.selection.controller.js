(function () {
    'use strict';

    angular
        .module('Allure')
        .controller('saltSelectionController', saltSelectionController);

    // LoginController.$inject = ['$location', 'UserService'];
    function saltSelectionController($timeout, $state, UserService, MedicineService, $ionicHistory, $ionicLoading, $scope, $ionicPlatform) {
        var vm = this;
        vm.goBack = goBack;
        vm.notSure = notSure;
        vm.finalSure = finalSure;
        vm.checkSingleItemSelected = checkSingleItemSelected;
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        var doCustomBack= function() {
          $state.go('app.welcome');
          // do something interesting here
        };
        // registerBackButtonAction() returns a function which can be used to deregister it
        var deregisterHardBack= $ionicPlatform.registerBackButtonAction(
            doCustomBack, 101
        );

        $scope.$on('$destroy', function() {
            deregisterHardBack();
        });

        load();
        return vm;

        function goBack(){
          $ionicHistory.goBack();
        }

        function load(){
          $ionicLoading.show({ template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>' });

          MedicineService
              .getSaltFromMedicine(MedicineService.selectedMedicine)
              .then(function(response) {
                  vm.salts = response.data.response.constituents;
                  MedicineService.currentMedicineSalt = makeList(vm.salts);
                  vm.salts = MedicineService.currentMedicineSalt;
                  $ionicLoading.hide();
              }, function(error) {
                  console.log(error);
              });
        }

        function makeList(saltsData){
          var saltList = [];
          angular.forEach(saltsData, function(value){
              saltList.push({name: value.name, check: false});
          });
          saltList = processSaltData(saltList);
          return saltList;
        }

        function processSaltData(saltList){
          if (saltList.length == 1){
            saltList[0].check = true;
          }
          return saltList;
        }

        function checkSingleItemSelected(){
          var check = false;
          angular.forEach(vm.salts, function(value){
            if (value.check){
              check = true;
            }
          });
          return check;
        }

        function notSure(){
          var newProbableSaltsAdded = [];
          angular.forEach(vm.salts, function(value){
            if (MedicineService.probableAllergicSalts.indexOf(value.name) == -1 &&
                MedicineService.definiteAllergicSalts.indexOf(value.name) == -1){
              MedicineService.probableAllergicSalts.push(value.name);
              newProbableSaltsAdded.push(value.name);
            }
          });
          UserService.setProbableSaltsOfUser(UserService.getPresentUser().username, MedicineService.probableAllergicSalts);
          MedicineService.newProbableSaltsAdded = newProbableSaltsAdded;
          MedicineService.previousView = [$ionicHistory.currentView().stateId, 'probable'];
          $state.go('app.allergicSalts');
        }



        function finalSure(){
          var newDefiniteSaltsAdded = [];
          angular.forEach(vm.salts, function(value){
            if (value.check){
              if (MedicineService.definiteAllergicSalts.indexOf(value.name) == -1){
                MedicineService.definiteAllergicSalts.push(value.name);
                newDefiniteSaltsAdded.push(value.name);
              }
            }
          });
          UserService.setDefinitiveSaltsOfUser(UserService.getPresentUser().username, MedicineService.definiteAllergicSalts);
          MedicineService.newDefiniteSaltsAdded = newDefiniteSaltsAdded;
          MedicineService.previousView = [$ionicHistory.currentView().stateId, 'definitive'];
          $state.go('app.allergicSalts');
        }

    }

})();
