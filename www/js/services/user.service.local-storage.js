(function () {
    'use strict';

    angular
        .module('Allure')
        .service('UserService', UserService);

    // UserService.$inject = ['$timeout', '$filter', '$q'];
    function UserService($timeout, $filter, $q) {

        var service = this;

        this.getAllUsers = getUsers;
        this.login = login;
        this.register = register;

        return service;

        function login(username, password){
          var output = {};
          output.success = false;
          if (!localStorage.users){
            output.error = 'User not found!';
          }
          else {
            angular.forEach(getUsers(), function(user){
              if (username === user.username){
                if(password === user.password){
                  output.success = true;
                }
                else{
                  output.error = "Authentication failed. Username and Password doesn't match.";
                }
              }
            })
            if(!output.error){
              output.error = "User not found!"
            }
          }
          return output;
        }

        function register(user){
          var output = {};
          output.success = false;
          if (!localStorage || !userExists(user.username)){
            var users = getUsers();
            users.push(user);
            setUsers(users);
            output.success = true;
          }
          else{
            output.error = "Account Exists Already!";
          }
          return output;
        }

        function userExists(username){
          angular.forEach(localStorage.users, function(user){
            if (user.username === username){
              return true;
            }
          })
          return false;
        }

        // private functions

        function getUsers() {
            if(!localStorage.users){
                localStorage.users = JSON.stringify([]);
            }

            return JSON.parse(localStorage.users);
        }

        function setUsers(users) {
            localStorage.users = JSON.stringify(users);
        }
    }
})();
