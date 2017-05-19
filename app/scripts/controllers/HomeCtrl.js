(function() {
    function HomeCtrl() {
      this.hi = "waaazzzzzzuppppp?"
    }

    angular
        .module('gotTime')
        .controller('HomeCtrl', [HomeCtrl]);
})();
