Ideas = new Mongo.Collection('ideas');

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