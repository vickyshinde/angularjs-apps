var websiteApp = angular.module('websiteApp',['ngRoute']);

websiteApp.config(['$routeProvider', function ($routeProvider){
    $routeProvider
    
    .when('/', {
        templateUrl: 'templates/home.html',
        controller: 'homePageController'
    })
    
    .when('/services', {
        templateUrl: 'templates/services.html',
        controller: 'servicesPageController'  
    })
    
    .when('/pricing', {
        templateUrl: 'templates/pricing.html',
        controller: 'pricingPageController'  
    })
    
    .when('/about', {
        templateUrl: 'templates/about.html',
        controller: 'aboutPageController'  
    })
    
    .when('/faq', {
        templateUrl: 'templates/faq.html',
        controller: 'faqPageController'  
    })
    
    .when('/contact', {
        templateUrl: 'templates/contact.html',
        controller: 'contactPageController'  
    })
    
    .when('/404', {
        templateUrl: 'templates/notfound.html',
        controller: 'notfoundPageController'        
    })
    
    .otherwise({redirectTo: '/404'});
    
}]);


websiteApp.controller('homePageController', ['$scope', function ($scope) {
    console.log('homePageController')
}]);

websiteApp.controller('servicesPageController', ['$scope', function ($scope) {
    console.log('servicesPageController')
}])

websiteApp.controller('pricingPageController', ['$scope', function ($scope) {
    console.log('pricingPageController')
}])

websiteApp.controller('aboutPageController', ['$scope', function ($scope) {
    console.log('aboutPageController')
}])

websiteApp.controller('faqPageController', ['$scope', function ($scope) {
    console.log('faqPageController')
}])

websiteApp.controller('contactPageController', ['$scope', function ($scope) {
    console.log('contactPageController')
}])

websiteApp.controller('notfoundPageController', ['$scope', function ($scope) {
    console.log('notfoundPageController')
}])



websiteApp.directive('isActiveNav', [ '$location', function($location) {
return {
 restrict: 'A',
 link: function(scope, element) {
   scope.location = $location;
   scope.$watch('location.path()', function(currentPath) {
     if('#' + currentPath === element[0].attributes['href'].nodeValue) {
       element.parent().addClass('active');
     } else {
       element.parent().removeClass('active');
     }
   });
 }
 };
}]);