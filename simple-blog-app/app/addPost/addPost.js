'use strict';

angular.module('myApp.addPost', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/addPost', {
        templateUrl: 'addPost/addPost.html',
        controller: 'AddPostCtrl'
    })
}])

.controller('AddPostCtrl', ['$scope', '$firebase', '$location', 'CommonProp', function($scope, $firebase, $location, CommonProp){
    $scope.username = CommonProp.getUser();

    if(!$scope.username){
        $location.path('/home');
    }

    $scope.AddPost = function() {
        var title = $scope.article.title;
        var post = $scope.article.post;
        var user = CommonProp.getUser();

        var firebaseObj = new Firebase("https://myblogappvsdev01.firebaseio.com/Articles");
        var fb = $firebase(firebaseObj);

        fb.$push({
            title: title,
            post: post,
            emailId: user,
            '.priority': user
        }).then(function(ref){
            console.log(ref);
            $location.path('/welcome');
        }, function(error) {
            console.log("Error :", error);
        });

    }

    $scope.logout = function() {
        CommonProp.logoutUser();
    }
}]);