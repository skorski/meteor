var Comments = new Mongo.Collection('comments');

Comments.allow({
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
	addComment: function(comment, ideaId) {
		Ideas.insert({
			title: comment,
			ideaId: ideaId,
			votes: 0,
			createdAt: new Date()
			});
		console.log("New Comment Inserted: " + idea);
	},
	removeComment: function(ideaID) {
		Ideas.remove(ideaID);
	},
	upvoteComment: function(ideaID) {
		Ideas.update(ideaID, {$inc: {votes: 1}});
	}
});