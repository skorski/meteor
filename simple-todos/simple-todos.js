Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // counter starts at 0

  Template.body.helpers({
    tasks: function () {
      return Tasks.find({});
    }
  });

  Template.body.events({
    "submit .new-task": function(event) {
      var text = event.target.text.value;

      Tasks.insert({
        text: text,
        createdAt: new Date()
      });

      event.target.text.value = "";

      return false;
    }

  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
