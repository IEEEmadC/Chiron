(function () {
    'use strict';

    angular
        .module('Allure')
        .controller('checkMedicineResultsController', checkMedicineResultsController);

    // LoginController.$inject = ['$location', 'UserService'];
    function checkMedicineResultsController($timeout, $state, UserService, MedicineService, $ionicHistory, $ionicLoading) {
        var vm = this;
        // vm.goBack = goBack;
        // vm.notSure = notSure;
        // vm.finalSure = finalSure;
        // vm.checkSingleItemSelected = checkSingleItemSelected;

        load();
        return vm;

        function goBack(){
          $ionicHistory.goBack();
        }

        function load(){
          $ionicLoading.show({ template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>' });
          MedicineService
              .getSaltFromMedicine(MedicineService.selectedMedicineForCheck)
              .then(function(response) {
                  vm.salts = makeList(response.data.response.constituents);
                  checkIfAllergy(vm.salts);
                  $ionicLoading.hide();
              }, function(error) {
                  console.log(error);
              });
        }

        function makeList(saltsData){
          var saltList = [];
          angular.forEach(saltsData, function(value){
              saltList.push(value.name);
          });
          return saltList;
        }

        function checkIfAllergy(saltsInMedicine){
          angular.forEach(saltsInMedicine, function(medicineSalt){
            angular.forEach(MedicineService.probableAllergicSalts, function(probableSalt){
              if(probableSalt == medicineSalt){
                vm.isAllergy = 'maybe';
                console.log('b');
              }
            })
          })
          angular.forEach(saltsInMedicine, function(medicineSalt){
            angular.forEach(MedicineService.definiteAllergicSalts, function(definiteSalt){
              if(definiteSalt == medicineSalt){
                vm.isAllergy = 'yes';
                console.log('a');
              }
            })
          })

          if (!vm.isAllergy && vm.isAllergy != 'yes' && vm.isAllergy !='maybe'){
            vm.isAllergy = 'no';
            console.log('c');
          }
        }

    }

})();
