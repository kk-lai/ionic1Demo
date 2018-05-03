angular.module('app.routes', [])
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

	  $stateProvider
	  
	  .state('root', {
		    url: '/', 
	        templateUrl: 'templates/root.html',
	        controller: 'rootCtrl',
	        cache : false,
	  })	  
  	  .state('list', {
		    url: '/list', 
	        templateUrl: 'templates/list.html',
	        controller: 'listCtrl',
	        cache : false,
	  })	  
	  ;
	  
	  $urlRouterProvider.otherwise('/');	 
});	 	  