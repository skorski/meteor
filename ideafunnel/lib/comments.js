Comments = new Mongo.Collection('comments');

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
		Comments.insert({
			comment: comment,
			ideaId: ideaId,
			votes: 0,
			createdAt: new Date()
			});
		console.log("New Comment Inserted: " + ideaId);

	},
	removeComment: function(ideaID) {
		Comments.remove(ideaID);
	},
	upvoteComment: function(ideaID) {
		Comments.update(ideaID, {$inc: {votes: 1}});
	}
});