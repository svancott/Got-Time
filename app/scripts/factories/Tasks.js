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

    var deleteTask = function(task) {
      tasks.$remove(task)
    }

    return {
      all: tasks,
      add: addTask,
      deleteTask: deleteTask
    };
  }

  angular
    .module('gotTime')
    .factory('Tasks', ['$firebaseArray', '$firebaseObject', Tasks]);
})();
