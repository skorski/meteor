Tasks = new Mongo.Collection('tasks');

 Tasks.allow({
   insert: function() {
   	return true;
   },
   update: function() { 
   	return true;
   }
 });


Tasks.latest = function() {
	console.log("latest " + Tasks.findOne({}, {sort: {createdAt: -1}, limit: 1}))
  return Tasks.findOne({}, {sort: {createdAt: -1}, limit: 1});
}

Tasks.all = function() {
u
	console.log("Tasks.all function: " + Tasks.findOne({}, {sort: {createdAt: -1}, limit: 5}));
  return Tasks.find({});
}


Meteor.methods({
	addTask: function(textVal) {
		console.log("adding " + textVal + " to db.");
		Tasks.insert({
			text: textVal, 
      votes: 0,
			createdAt: new Date()
		});
		console.log(Tasks.find({}, {text: textVal}));
	}

});
