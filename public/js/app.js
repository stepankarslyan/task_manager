angular.module('taskManager', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
  var path = templatePath;
  if (!path) path = '';
	$routeProvider.
		when('/start', {templateUrl: path + '/template/start.html', controller: 'taskController'}).
		when('/stop', {templateUrl: path + '/template/stop.html', controller: 'taskController'}).
		otherwise({redirectTo: '/start'});
}]);
