(function() {
    function HomeCtrl($interval) {
      var vm = this;
      vm.workTime = 1500;
      vm.breakTime = 300;
      vm.workButtonText = "Start Work"
      vm.breakButtonText = "Take a Break"
      var workPromise;
      var breakPromise;

      var startWork = function() {
        if (vm.workTime >= 0) {
          vm.workTime -= 1;
          workPromise = $interval(decreaseWork, 1000);
        } else {
          vm.workTime = 1500;
          vm.workButtonText = "Start Work";
        }
      }

      var resetWork = function() {
        $interval.cancel(workPromise);
        vm.workTime = 1500;
        vm.workButtonText = "Start Work";
      }

      function decreaseWork() {
        if (vm.workTime > 0) {
          vm.workTime -= 1;
        } else {
          resetWork();
        }
      }

      vm.workButtonContol = function() {
        if (vm.workButtonText == "Start Work") {
          resetBreak();
          startWork();
          vm.workButtonText = "Reset";
        } else {
          resetWork();
          vm.workButtonText = "Start Work";
        }
      }

      var startBreak = function() {
        if (vm.breakTime >= 0) {
          vm.breakTime -= 1;
          breakPromise = $interval(decreaseBreak, 1000);
        } else {
          vm.breakTime = 300;
          vm.breakButtonText = "Take a Break";
        }
      }

      var resetBreak = function() {
        $interval.cancel(breakPromise);
        vm.breakTime = 300;
        vm.breakButtonText = "Take a Break";
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
          resetWork();
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
