angular.module('TaskManager', ["ngRoute"]).config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/start', {templateUrl: '/template/start.html', controller: 'taskController'}).
		when('/stop', {templateUrl: '/template/stop.html', controller: 'taskController'}).
		otherwise({redirectTo: '/start'});
}]);
