'use strict';

angular.module('myApp.home', ['ngRoute', 'firebase'])

// Declared route
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}])

// Home controller
.controller('HomeCtrl', ['$scope', '$location', 'CommonProp', '$firebaseAuth', function($scope, $location, CommonProp, $firebaseAuth) {

	var firebaseObj = new Firebase("https://myblogappvsdev01.firebaseio.com/")

	var loginObj = $firebaseAuth(firebaseObj);

    $scope.user = {};

    var myload = {};
    $scope.myload = myload;

    $scope.SignIn = function(e) {
    e.preventDefault();
    myload.loading = true;
    var username = $scope.user.email;
    var password = $scope.user.password;
    loginObj.$authWithPassword({
            email: username,
            password: password
        })
        .then(function(user) {
            //Success callback
            console.log('Authentication successful');
            CommonProp.setUser(user.password.email);
            $location.path('/welcome');
            myload.loading = false;
        }, function(error) {
            //Failure callback
            console.log('Authentication failure');
            myload.loading = false;
        });
    }

    loginObj.$onAuth(function(authData) {
    if(authData){
        CommonProp.setUser(authData.password.email);
        $location.path('/welcome');
    }
 });


}])

.service('CommonProp', [ '$location', '$firebaseAuth', function( $location, $firebaseAuth ) {
    var user = '';
    var firebaseObj = new Firebase("https://myblogappvsdev01.firebaseio.com/");
    var loginObj = $firebaseAuth(firebaseObj);

    return {
        getUser: function(){
            if(user == ''){
                user = localStorage.getItem('userEmail')
            }
            console.log(user)
            return user;
        },
        setUser: function(value){
            localStorage.setItem("userEmail", value)
            user = value;
        },
        logoutUser:function(){
            loginObj.$unauth();
            console.log('done logout :' , user);
            user='';
            localStorage.removeItem('userEmail');
            $location.path('/home');
        }
    };
}])

.directive('laddaLoading', [
    function() {
        return {
            link: function(scope, element, attrs) {
                var Ladda = window.Ladda;
                var ladda = Ladda.create(element[0]);
                scope.$watch(attrs.laddaLoading, function(newVal, oldVal) {
                    if(newVal) {
                        ladda.start();
                    } else {
                        ladda.stop();
                    }
                })
            }
        };
    }
]);
