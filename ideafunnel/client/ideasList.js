if (Meteor.isClient) {

  Template.ideaDetail.helpers({
    id: function () {
      return this._id;
    },
    idea: function() {
      return Ideas.find({_id: this._id}).fetch();
    },
    comments: function() {
      return Comments.find({ideaId: this._id});
    }

  });

  Template.ideaDetail.events({
    'submit .new-task': function (event) {
      var text = event.target.comment.value;
      Meteor.call('addComment', text, this._id);
      event.target.value = "";
      return false;
    },
    'click #addComment': function (event) {
      console.log("add nested comment");
      console.log(this._id);
    }
  });

}
