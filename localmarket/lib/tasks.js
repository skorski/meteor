var Tasks = new Mongo.Collection('tasks');

Tasks.allow({
  insert: function(doc) {
    return doc;
  }
});


Meteor.methods({
	addTask: function(text) {
		Tasks.insert({
			text: text, 
			createdAt: new Date()
		});
	}

});