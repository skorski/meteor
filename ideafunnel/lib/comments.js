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
		// don't delete the post because that can mess up the nested comments
		// also give the user the option to re-instate
		privateComment = Comments.find({_id: ideaID}).fetch()[0].comment;
		Comments.update({_id: ideaID}, {$set: {comment: "deleted", privateComment: privateComment}});
	},
	upvoteComment: function(ideaID) {
		Comments.update(ideaID, {$inc: {votes: 1}});
	}
});