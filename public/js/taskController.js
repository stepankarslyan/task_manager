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
  
  var tokens;  //your tokens

  
  $scope.stop = function() {
    var task = $scope.task;
    task.endDate = currentDate();
    task.tokens = "ya29.TADESwIF_diGCEkAAACfT4IrZnFEU1w85154N5xphVz1APSPAizLKMo7OUbsNDYTLYJieRw9BzrNRxjJPE79Y0MbWEQ4q0DC5FPliboHfQg9ZWHpvhrHQdz73kGedQ"; 
	  task.calendarId = "geqtfulmg33djpa049401p07oo@group.calendar.google.com";
    
    //google calendar web service
    $.ajax({
      url: '/calendarEvent',
      method: 'POST',
      data: task,
      success: function(events) {
	      console.log(JSON.stringify(events));
        $scope.deleteTask();
      }
    });

 
  };
     
  var currentDate = function() {
    var d = new Date();
    var curr_day = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    var curr_hour = d.getHours();
    var curr_minute = d.getMinutes();
    var curr_second = d.getSeconds();
    
    var newDate = curr_year + "-" + curr_month + "-" + curr_day + "T" + curr_hour + ":" + curr_minute + ":" + curr_second + ".000Z";
    alert(newDate);
    return newDate;
  };
  
});
