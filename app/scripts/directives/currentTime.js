(function() {
    function currentTime($interval) {

      return {
  			templateUrl: '/templates/directives/currentTime.html',
  			replace: true,
  			restrict: 'E',
  			scope: {
  				onChange: '&'
  			},
        link: function(scope, element, attributes) {

        scope.min = 0;
        scope.value = 1500;

        var time = element;

        var countDown = function() {
          scope.value -= 1;
        }

        attributes.$interval(countDown(), 100);







        };
      }
    }

    angular
        .module('gotTime')
        .directive('currentTime', ['$interval', currentTime]);
})();
