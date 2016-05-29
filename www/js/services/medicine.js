(function () {


  angular
  .module('Allure')
  .service('MedicineService', MedicineService);

  // UserService.$inject = ['$timeout', '$filter', '$q'];
  function MedicineService($timeout, $filter, $q, $http) {

    var service = this;
    this.getMedicineSuggestions = getMedicineSuggestions;
    this.getSaltFromMedicine = getSaltFromMedicine;
    this.selectedMedicine;
    this.currentMedicineSalt;
    this.suggestions;
    return service;

    //key: 19672e3aa4204c3de62095597d5947
    function getMedicineSuggestions(searchString){
      return $http.get('/apiMedicineSuggestions' + '?id=' + searchString +'&limit=' + 20 +'&key=' + '19672e3aa4204c3de62095597d5947');
    }

    function getSaltFromMedicine(medicine){
      console.log('1:::::' + '/apiSaltFromMedicine' + '?id=' + medicine +'&key=' + '19672e3aa4204c3de62095597d5947');
      return $http.get('/apiSaltFromMedicine' + '?id=' + medicine +'&key=' + '19672e3aa4204c3de62095597d5947');
    }

  }
})();
