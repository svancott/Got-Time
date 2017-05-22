(function() {
    function HomeCtrl($interval) {
      var vm = this;
      vm.workTime = 1500;
      vm.breakTime = 300;
      vm.workButtonText = "Start Work"
      vm.breakButtonText = "Take a Break"
      var workPromise;
      var breakPromise;
      vm.onBreak = false;
      var resetBreak;
      vm.workSessions = 0;

      var startWork = function() {
        vm.onBreak = false;
        workPromise = $interval(decreaseWork, 1000);
      }

      var resetWork = function() {
        if (vm.workTime < 1) {
          $interval.cancel(workPromise);
          vm.workTime = 1500;
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
          vm.workButtonText = "Reset";
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
          vm.breakButtonText = "Reset";
        } else {
          resetBreak();
          vm.breakButtonText = "Take a Break";
        }
      }
    }

    angular
        .module('gotTime')
        .controller('HomeCtrl', ['$interval', HomeCtrl]);
})();
