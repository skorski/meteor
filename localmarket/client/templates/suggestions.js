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
            showFilter: false,
            showNavigationRowsPerPage: false,
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
            			fieldID: "createdAt",
            			key: 'createdAt',
            			label: 'time',
            			// new Spacebars.SafeString('<i class="fa fa-clock-o "></i>'),
            			fn: function() {return ''}
            		},            		
            		{
            			fieldID: 'task',
            			key: 'text',
            			label: 'Task'
            		},
            		{
            			fieldID: 'votes',
            			key: 'votes',
            			label: 'Votes'
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
  "click .reactive-table tr .delete": function(event) {

  },
  "click .reactive-table tr": function(event) {
  		Session.set('selected_task', this._id);
  		// console.log('session set to ' + this._id);
  		// console.log('switching on ' + event.target.className);

  		classes = event.target.className.split(' ');

  		switch(_.last(classes)) {
  			case "delete":
  				Meteor.call("deleteTask", this._id);
  				// console.log("tried to delete " + this._id);
  				break;
  			case "upvote":
 					Meteor.call('taskUpvote', this._id);
 					// console.log("clicked upvote for " + this._id);  	
 					break;	
 				default:
 					// console.log('event class ' + event.target.className);
  		}
  },
  "click .reactive-table tr .upvote": function(event) {

  }
});