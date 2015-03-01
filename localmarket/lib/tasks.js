Tasks = new Mongo.Collection('tasks');

 // Tasks.allow({
 //   insert: function() {
 //   	return true;
 //   },
 //   update: function() { 
 //   	return true;
 //   }
 // });

Tasks.deny({
	remove: function() { return false; }
})


Tasks.latest = function() {
  return Tasks.latest();
}

Tasks.mostWanted = function() {
	return Tasks.findOne({}, {sort: {votes: -1, createdAt: -1}, limit: 1});
}

Tasks.all = function() {
  return Tasks.find({}, {sort: {createdAt: -1, limit: 5}});
}


Meteor.methods({
	addTask: function(textVal) {
		Tasks.insert({
			text: textVal, 
      votes: 0,
      sortText: textVal.toLowerCase(),
			createdAt: new Date()
		});
	// console.log(Tasks.find({}, {text: textVal})).fetch();
	// we need to return false here otherwise the page will refresh
	return false;
	},
	deleteTask: function(taskId) {
		Tasks.remove(taskId);
	},
	taskUpvote: function (taskId) {
		Tasks.update(taskId, { $inc: {votes: 1}});
  }

});
