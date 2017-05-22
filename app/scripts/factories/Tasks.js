(function() {
  function Tasks($firebaseArray, $firebaseObject) {
    var ref = firebase.database().ref();
    var tasks = $firebaseArray(ref);

    var addTask = function(task) {
      tasks.$add({
        name: task,
        dateCreated: firebase.database.ServerValue.TIMESTAMP
      })
    }

    return {
      all: tasks,
      add: addTask
    };
  }

  angular
    .module('gotTime')
    .factory('Tasks', ['$firebaseArray', '$firebaseObject', Tasks]);
})();
