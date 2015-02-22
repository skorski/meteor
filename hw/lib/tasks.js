Tasks = new Mongo.Collection("tasks");

Meteor.methods({
  addTask: function (text) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
     Tasks.insert({
        text: text,
        owner: Meteor.userId(),
        username: Meteor.user().username,
        createdAt: new Date()
      });
  },

  deleteTask: function (taskID) {
    Tasks.remove(taskID);
  },

  setChecked: function (taskId, setChecked) {
    Tasks.update(taskId, { $set: { checked: setChecked} });
  }

});