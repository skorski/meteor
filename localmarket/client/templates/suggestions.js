Template.suggestions.helpers({
	openTasks: function () {
		return Tasks.find({}, {sort: {sortText: 1, createdAt: -1}}).fetch();
	},
	ready: function() {
    return true;
  }
});


Template.suggestions.events({
	'submit .new-task': function(event) {
    var text = event.target.text.value;
    Meteor.call('addTask', text);
    event.target.text.value = "";
    // this is where the return false needs to be otherwise the page will reload
    return false;
  },
  "click .delete": function() {
  		Meteor.call("deleteTask", this._id);
  		// console.log("tried to delete " + this._id);
  },
  "click tr": function() {
  		Session.set('selected_task',this._id);
  		// Meteor.call('taskUpvote',this._id);
  },
  "click .upvote": function() {
  	Meteor.call('taskUpvote', this._id);
  }
});