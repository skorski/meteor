if (Meteor.isClient) {

  Template.ideaDetail.helpers({
    id: function () {
      return this._id;
    },
    idea: function() {
      return Ideas.find({_id: this._id}).fetch();
    },
  });

  Template.ideaDetail.comments = function(parentComment) {
      if(parentComment) {
        return Comments.find({ideaID: parent}).fetch();       
      } else {
        return Comments.find({ideaID: this._id});
      }

    }

  Template.ideaDetail.events({
    'submit .new-comment': function (event) {
      var text = event.target.comment.value;
      Meteor.call('addComment', text, this._id);
      event.target.value = "";
      return false;
    },
    'click #addComment': function (event) {
      console.log("add nested comment");
      // show a floating input text box
      console.log(this._id);
      return false;
    }
  });

  Template.commentRender.created = function () {
    this.showChildren = false;
  }

  Template.commentRender.events({
    'click #addComment': function(event, template) {
      template.showChildren = false;
    }

  })

}
