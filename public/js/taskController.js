angular.module("TaskManager").controller("taskController", function($scope, $location) {
  $scope.task = null;

  function redirectToPage() {
    var currentPath = $location.path();
    var correctPath = $scope.task ? "/stop" : "/start";
    
    if (currentPath != correctPath) {
      $location.path(correctPath);
    }    
  };

  $.ajax({
    url: "/tasks/current",
    method: "GET",
    
    success: function(data) {
      if (data) $scope.task = JSON.parse(data);
      else $scope.task = null;  
      redirectToPage();    
      $scope.$apply();
    }
    
  });

  $scope.start = function() {
    $.ajax({
      url: "/tasks/current",
      data: {
        name: $scope.taskName,
        startDate: new Date()
      },
      method: "POST",
      
      success: function(data) {       
        $location.path("/stop");
        $scope.$apply();
      }
      
    });
  };  
  
  $scope.stop = function() {
    var task = $scope.task;
    task.endDate = new Date();
    
    $.ajax({
      url: "/tasks/current",
      data: task,
      method: "POST",
      
      success: function(data) {       
        $location.path("/start");
        $scope.$apply();
      }
      
    });
  };  
  
});
