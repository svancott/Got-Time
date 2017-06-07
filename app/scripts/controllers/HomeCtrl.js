(function() {
    function HomeCtrl($interval, $scope, Tasks) {
      var vm = this;
      vm.workTime = 3;
      vm.breakTime = 2;
      vm.workButtonText = "Start Work"
      vm.breakButtonText = "Take a Break"
      var workPromise;
      var breakPromise;
      vm.onBreak = false;
      vm.workSessions = 0;
      vm.tasks = Tasks.all;
      vm.pauseButton = "Pause"
      vm.canPause = false;

      var ding = new buzz.sound("/assets/sounds/ding.mp3", {
        preload: true
      });

      $scope.$watch(function() {
        return vm.workTime;
      }, function(newVal, oldVal){
        console.log(newVal,oldVal);
        if (newVal == 0) {
          console.log(newVal);
          ding.play();
        }
      })

      var startWork = function() {
        vm.onBreak = false;
        vm.canPause = true;
        vm.pauseButton = "Pause";
        workPromise = $interval(decreaseWork, 1000);

      }

      var resetWork = function() {
        if (vm.workTime < 1) {
          ding.play();
          vm.workTime = 2;
          vm.workButtonText = "Start Work";
          vm.onBreak = true;
          vm.workSessions += 1;
          vm.canPause = false;
          $interval.cancel(workPromise);
          if (vm.workSessions > 3) {
            vm.breakTime = 1800;
            alert('Congrats! You can take a 30 minute break!')
            vm.workSessions = 0;
          }
        } else {
          vm.workTime = 1500;
          vm.workButtonText = "Start Work";
          vm.canPause = false;
          $interval.cancel(workPromise);
        }
      }

      function decreaseWork() {
        if (vm.workTime >= 1) {
          vm.workTime -= 1;
        } else {
          resetWork();
        }
      }

      vm.workButtonContol = function() {
        if (vm.workButtonText == "Start Work") {
          startWork();
          resetBreak();
          vm.workTime -= 1;
          vm.workButtonText = "Reset Work";
        } else {
          resetWork();
          vm.workButtonText = "Start Work";
        }
      }

      var startBreak = function() {
        breakPromise = $interval(decreaseBreak, 1000);
      }

      var resetBreak = function() {
        if (vm.breakTime < 1) {
          $interval.cancel(breakPromise);
          ding.play();
          if (vm.workSessions > 3) {
            vm.breakTime = 1800;
          } else {
            vm.breakTime = 300;
          }
          vm.breakButtonText = "Take a Break";
          vm.onBreak = false;
        } else {
          $interval.cancel(breakPromise);
          if (vm.workSessions > 3) {
            vm.breakTime = 1800;
          } else {
            vm.breakTime = 300;
          }
          vm.breakButtonText = "Take a Break";
        }
      }

      function decreaseBreak() {
        if (vm.breakTime > 0) {
          vm.breakTime -= 1;
        } else {
          resetBreak();
        }
      }

      vm.breakButtonContol = function() {
        if (vm.breakButtonText == "Take a Break") {
          startBreak();
          vm.breakTime -= 1;
          vm.breakButtonText = "Reset Break";
        } else {
          resetBreak();
          vm.breakButtonText = "Take a Break";
        }
      }
      vm.newTask = {};

      vm.addTask = function(task) {
        Tasks.add(task);
        vm.newTask = {};
      }

      vm.removeAllTasks = function() {
        var r = confirm('Are you sure you want to remove all completed tasks?');
        if (r == true) {
          for (var i = 0; i < vm.tasks.length; i++) {
            vm.tasks.$remove(vm.tasks[i]);
          }
        }
      }

      vm.pauseWork = function() {
        if (vm.pauseButton == "Pause") {
          $interval.cancel(workPromise);
          vm.pauseButton = "Resume";
        } else {
          vm.pauseButton = "Pause";
          startWork();
        }
      }
    }

    angular
        .module('gotTime')
        .controller('HomeCtrl', ['$interval', '$scope', 'Tasks', HomeCtrl]);
})();
