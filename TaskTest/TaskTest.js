Tasks = new Mongo.Collection('tasks');

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    },
    'submit .new-task': function(event){
      var text = event.target.text.value;
      console.log('ready to call for ' + text);
      Meteor.call('addTask', text);
      event.target.text.value = "";
    }
  
});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Tasks.allow ({
  insert: function(){
    return true;
  }
});

Tasks.all = function() {
  return Tasks.find({}, {sort: {createdAt: -1}});
}

Meteor.methods({
  addTask: function(task) {
  id = Tasks.insert({
		text: task,
		createdAt: new Date
	});
  console.log('tried to add ' + task);
 return id; 
 }
});
