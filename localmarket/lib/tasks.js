Tasks = new Mongo.Collection('tasks');

Tasks.allow({
  insert: function() {
  	return true;
  }
});


Tasks.latest = function() {
  return Tasks.findOne({}, {sort: {date: -1}, limit: 1});
}

Tasks.all = function() {
  return Tasks.find({});
}


Meteor.methods({
	addTask: function(text) {
		console.log("adding " + text + " to db.");
		Tasks.insert({
			text: text, 
			createdAt: new Date()
		});
	}

});