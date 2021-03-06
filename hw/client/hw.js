Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // counter starts at 0

  Template.body.helpers({
    tasks: function () {
      if (Session.get("hideCompleted")) {
        return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
      } else {
        return Tasks.find({}, {sort: {createdAt: -1}});
      }
    },
    hideCompleted: function () {
      return Session.get("hideCompleted");
    },
    incompleteCount: function () {
      return Tasks.find( {checked: {$ne: true}} ).count();
    }
  });

  Template.body.events({
    "submit .new-task": function(event) {
      var text = event.target.text.value;

      Meteor.call("addTask", text);

      event.target.text.value = "";

      return false;
    },

    "change .hide-completed input": function(event) {
      Session.set("hideCompleted", event.target.checked);
    }
  });

  Template.task.events({
    "click .toggle-checked": function(){
      Meteor.call("setChecked", this._id, ! this.checked);
    },

    "click .delete ": function() {
      Meteor.call("deleteTask", this._id);
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

}

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