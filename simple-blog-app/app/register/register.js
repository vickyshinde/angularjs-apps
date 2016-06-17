'use strict';

angular.module('myApp.register', ['ngRoute','firebase'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/register', {
        templateUrl: 'register/register.html',
        controller: 'RegisterCtrl'
    });
}])

.controller('RegisterCtrl', ['$scope', '$location', '$firebaseAuth', function($scope, $location, $firebaseAuth) {

    var firebaseObj = new Firebase("https://myblogappvsdev01.firebaseio.com/");
    var auth = $firebaseAuth(firebaseObj);

    var myload = {};
    $scope.myload = myload;

    $scope.signUp = function() {
        if (!$scope.regForm.$invalid) {
            myload.loading = true;
            var email = $scope.user.email;
            var password = $scope.user.password;

            if (email && password) {
                auth.$createUser(email, password)
                    .then(function() {
                        // do things if success
                        console.log('User creation success');
                        $location.path('/home');
                        myload.loading  = false;
                    }, function(error) {
                        // do things if failure
                        console.log(error);
                        $scope.regError = true;
                        $scope.regErrorMessage = error.message;
                        myload.loading  = false;
                    });
            }

            console.log('Valid form submission')
        }
    };
}]);
