var emailApp = angular.module("emailApp", []);


emailApp.factory('dataService', function($http){
    return {
        getEmails: function(callback){
            $http({
                method: 'GET',
                url: 'email.json',
                cache: true
            })

            .success(callback)
            .error(callback);
        }
    };
});

emailApp.controller("EmailController", function($scope, dataService){
    
//    $http.get("email.json")
//    .then(function(response){
//        $scope.emails = response.data;
//    });
    dataService.getEmails(function(response){
        $scope.emails = response;
    });
    
    $scope.isPopupVisible = false;
    $scope.isComposePopupVisible = false;
    $scope.activeTab = "inbox";
    
    $scope.showPopup = function(email){
        console.log("click")
        $scope.isPopupVisible = true;
        $scope.selectedEmail = email;
    }
    
     $scope.closePopup = function(){
        $scope.isPopupVisible = false;
    }
    
    $scope.showComposePopup = function() {
        $scope.composeEmail = {};
        $scope.isComposePopupVisible = true;
    }
     
    $scope.closeComposePopup = function () {
        $scope.isComposePopupVisible = false;
    }
    
    $scope.composeEmail= {};
    $scope.sentEmails = [];
    
    $scope.sendEmail = function() {
        $scope.isComposePopupVisible = false;
        $scope.composeEmail.from = "me";
        $scope.composeEmail.date = new Date();
        $scope.sentEmails.push($scope.composeEmail);
        
        alert($scope.composeEmail.to
              + " " + $scope.composeEmail.subject
              + " " + $scope.composeEmail.body);
    }    
    
//    $scope.emails = [
//        { 
//            from: 'John',
//            to: 'me',
//            subject: 'I love angular', 
//            date: 'Jan 1', 
//            body: 'hello world!' 
//        },
//        { 
//            from: 'Jack', 
//            to: 'me',
//            subject: 'Angular and I are just friends', 
//            date: 'Feb 15', 
//            body: 'just kidding' 
//        },
//        { 
//            from: 'Ember', 
//            to: 'me',
//            subject: 'I hate you Angular!', 
//            date: 'Dec 8', 
//            body: 'wassup dude' 
//        }
//    ];
    
    $scope.forword = function() {
        $scope.isPopupVisible = false;
        
        $scope.composeEmail = {};
        
        angular.copy($scope.selectedEmail, $scope.composeEmail);
        
        $scope.composeEmail.body = 
            "\n-------------------------------\n" 
            + "from: " + $scope.composeEmail.from + "\n"
            + "sent: " + $scope.composeEmail.date + "\n"
            + "to: " + $scope.composeEmail.to + "\n"
            + "subject: " + $scope.composeEmail.subject + "\n"
            + $scope.composeEmail.body;
        
        $scope.composeEmail.subject = "FW: " + $scope.composeEmail.subject;

        $scope.composeEmail.to = "";

        $scope.composeEmail.from= "me";

        $scope.isComposePopupVisible = true;
                
    };
    
    $scope.reply = function() {
        $scope.isPopupVisible = false;
        
        $scope.composeEmail = {};
        
        angular.copy($scope.selectedEmail, $scope.composeEmail);
        
        $scope.composeEmail.body = 
            "\n-------------------------------\n" 
            + "from: " + $scope.composeEmail.from + "\n"
            + "sent: " + $scope.composeEmail.date + "\n"
            + "to: " + $scope.composeEmail.to + "\n"
            + "subject: " + $scope.composeEmail.subject + "\n"
            + $scope.composeEmail.body;
        
    $scope.composeEmail.subject = "RE: " + $scope.composeEmail.subject;
        
    $scope.composeEmail.to = $scope.composeEmail.from;
        
    $scope.composeEmail.from= "me";
    
    $scope.isComposePopupVisible = true;
        
    };
})