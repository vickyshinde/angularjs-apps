'use strict';

angular.module('myApp.welcome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/welcome', {
		templateUrl: 'welcome/welcome.html',
		controller: 'WelcomeCtrl'
	});
}])

.controller('WelcomeCtrl', ['$scope', '$firebase', '$location', 'CommonProp', function($scope, $firebase, $location, CommonProp) {
	$scope.username = CommonProp.getUser();

	if(!$scope.username){
	    $location.path('/home');
	}

	var firebaseObj = new Firebase("https://myblogappvsdev01.firebaseio.com/Articles");
	var sync = $firebase(firebaseObj.startAt($scope.username).endAt($scope.username));

	$scope.articles = sync.$asArray();

	$scope.editPost = function(id){
		var firebaseObj = new Firebase("https://myblogappvsdev01.firebaseio.com/Articles/" + id);
		var syn = $firebase(firebaseObj);

		$scope.postToUpdate = syn.$asObject();
		console.log($scope.postToUpdate)

		$('#editModal').modal();
	}

	$scope.update = function(){
			var fb = new Firebase("https://myblogappvsdev01.firebaseio.com/Articles/"+$scope.postToUpdate.$id);
			var article = $firebase(fb);

			article.$update({
				title: $scope.postToUpdate.title,
				post: $scope.postToUpdate.post,
				emailId: $scope.postToUpdate.emailId
			}).then(function(ref){
				console.log('Update successful')
				$('#editModal').modal('hide');
			}, function(error){
				console.log("Error: ", error);
			});
	}

	$scope.confirmDelete = function(id) {
		var fb = new Firebase("https://myblogappvsdev01.firebaseio.com/Articles/"+id);
		var article = $firebase(fb);

		$scope.postToDelete = article.$asObject();
		$('#deleteModal').modal();

		console.log("post delete :", $scope.postToDelete)

	}

	$scope.deletepost = function() {
		var fb = new Firebase("https://myblogappvsdev01.firebaseio.com/Articles/" + $scope.postToDelete.$id);
		var article = $firebase(fb);

		article.$remove().then(function(ref){
			console.log("post deleted :", $scope.postToDelete.$id)
			$('#deleteModal').modal('hide');
		}, function(error) {
			console.log("Error :", error);
		})

	}

	$scope.logout = function() {
		CommonProp.logoutUser();
	}

}]);