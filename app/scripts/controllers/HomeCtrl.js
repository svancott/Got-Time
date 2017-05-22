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

      var ding = new buzz.sound("/assets/sounds/ding.mp3", {
        preload: true
      });

      // $scope.$watch('timeRemaining', function(newVal, oldVal){
      //   console.log(newVal,oldVal);
      //   if (newVal == 0) {
      //     console.log(newVal);
      //     ding.play();
      //   }
      // })

      var startWork = function() {
        vm.onBreak = false;
        workPromise = $interval(decreaseWork, 1000);
      }

      var resetWork = function() {
        if (vm.workTime < 1) {
          $interval.cancel(workPromise);
          ding.play();
          vm.workTime = 2;
          vm.workButtonText = "Start Work";
          vm.onBreak = true;
          vm.workSessions += 1;
          if (vm.workSessions > 3) {
            vm.breakTime = 1800;
            alert('Congrats! You can take a 30 minute break!')
            vm.workSessions = 0;
          }
        } else {
          $interval.cancel(workPromise);
          vm.workTime = 1500;
          vm.workButtonText = "Start Work";
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
        vm.newTask = "";
      }
    }

    angular
        .module('gotTime')
        .controller('HomeCtrl', ['$interval', '$scope', 'Tasks', HomeCtrl]);
})();
