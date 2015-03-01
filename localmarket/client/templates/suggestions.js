Meteor.startup(function() {

});

Template.suggestions.helpers({
	openTasks: function () {
		return Tasks.find({}, {sort: {votes: -1, createdAt: -1}}).fetch();
	},
	taskList: function (){
		return Tasks.find({}, {sort: {votes: -1, createdAt: -1}});
	},
	settings: function (){
		return {
            rowsPerPage: 10,
            showFilter: true,
            fields: [
            		{
            			fieldID: 'delete',
            			key: 'delete',
            			label: '',
            			fn: function() {return new Spacebars.SafeString(
            			            				'<i class="fa fa-trash-o delete"></i>')
            										}
            		},
            		{
            			fieldID: 'upvote',
            			key: 'upvote',
            			label: '',
            			fn: function() {return new Spacebars.SafeString(
            			            				'<i class="fa fa-thumbs-up upvote"></i>')
            										}
            		},            		
            		{
            			fieldID: 'task',
            			key: 'text',
            			label: 'Task'
            		},
            		{
            			fieldID: 'votes',
            			key: 'votes',
            			label: 'votes'
            		}            		
						]
        };
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