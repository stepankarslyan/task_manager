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
    url: "/wp-content/plugins/task_service_plugin/taskService.php",
    method: "GET",
    success: function(data) {
      var task = JSON.parse(data);
      if (task.taskName) {
        $scope.task = task;
        console.log(task);
      }
      else {
        $scope.task = null;
      }  
      redirectToPage();    
      $scope.$apply();
    }
    
  });
  
  $scope.start = function() {
    $.ajax({
      url: "/wp-content/plugins/task_service_plugin/taskService.php",
      method: "POST",
      data: { 
        
        task: {
          post_title: $scope.taskName,
          post_type: 'task',
          post_status: 'private',
          post_meta: {
            taskName: $scope.taskName,
            startDate: currentDate()
          }
        }
        
      },

      success: function(data) {       
        $location.path("/stop");
        $scope.$apply();
      }
      
    });
  };
  
  $scope.deleteTask = function() {
    $.ajax({
      url: "/wp-content/plugins/task_service_plugin/taskService.php?task_id="  +  $scope.task.id,
      method: "DELETE",
      
      success: function(data) {       
        $scope.task = null;
        $location.path("/start");
        $scope.$apply();
      }
      
    });
  };
  
  var tokens = {access_token:"ya29.TQBgY9tqZ6c800kAAADc8g5QASSafmqRdIVH1O34Uuf3h7VH6jIxc9wPZIKRn_zvQDm8K_2HwuVF3R841FC7ch-8ne3VfHw15uu38se3WEEgQkyJe0Ma0-ZIfDISYQ",
  token_type:"Bearer",
  expires_in: 3599};  //your tokens

  
  $scope.stop = function() {
    var task = $scope.task;
    task.endDate = currentDate();
    task.tokens = tokens; 
	  task.calendarId = "geqtfulmg33djpa049401p07oo@group.calendar.google.com";
    
    //google calendar web service
    $.ajax({
      url: '/calendarEvent',
      type: 'POST',
      data: task,
      success: function(events) {
	      console.log("Google Calendar event: " +  events);
        $scope.deleteTask();
        $scope.$apply();
      }
    });

 
  };
     
  var currentDate = function() {
    var newDate = JSON.stringify(new Date())
    return JSON.parse(newDate);
  };
  
});
