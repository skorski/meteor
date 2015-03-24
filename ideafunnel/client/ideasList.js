if (Meteor.isClient) {

  Template.ideaDetail.helpers({
    id: function () {
      return this._id;
    },
    idea: function() {
      return Ideas.find({_id: this._id}).fetch();
    },
    comments: function(parentComment) {
      if(parentComment) {
        return Comments.find({ideaId: parentComment}).fetch();       
      }
    },
    expandComments: function(arg){
      console.log('arg ', arg);
      return false;
    }
  });

  Template.commentRender.helpers({
    expandComments: function(arg){
      console.log('arg', arg);
      return false;
    }
  });

  Template.commentRender.events({
    'click #addComment': function(e) {
      $(e.target).attr('style', 'display: true;');
    }
  });

  Template.ideaDetail.events({
    'submit .new-comment': function (event) {
      var text = event.target.comment.value;
      Meteor.call('addComment', text, this._id);
      event.target.value = "";
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
