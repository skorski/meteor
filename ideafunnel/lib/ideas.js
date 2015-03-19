Ideas = new Mongo.Collection('ideas');

Ideas.attachSchema(new SimpleSchema({
		title: {
			type: String,
			label: 'Title',
			max: 100
		},
		description: {
			type: String,
			label: 'Idea Detail',
			max: 600
		}
}));

Ideas.allow({
	insert: function() {
		return true;
	},
	update: function() {
		return true;
	},
	remove: function() {
		return true;
	}

});

Meteor.methods ({
	createIdea: function(idea) {
		Ideas.insert({
			title: idea,
			votes: 0,
			createdAt: new Date()
			});
		console.log("New Idea Inserted: " + idea);
	},
	removeIdea: function(ideaID) {
		Ideas.remove(ideaID);
	},
	upvoteIdea: function(ideaID) {
		Ideas.update(ideaID, {$inc: {votes: 1}});
	}
});