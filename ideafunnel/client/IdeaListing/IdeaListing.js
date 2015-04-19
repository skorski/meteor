  Template.IdeaListing.helpers({
    ideas: function () {
      return Ideas.find({}, {sort: {votes: -1, createdAt: -1}}).fetch();
    }
  });

  Template.idea.helpers({
    notVoted: function () {
      return true;
    }
  });

  Template.idea.events({
    "click #upvote": function(e){
      console.log(this._id);
      upvoteIdea(this._id);
    }
  })