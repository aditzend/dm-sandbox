Template.Contact_create.onCreated( function() {
  Actodes.attachSchema(Schema.Contact, {replace:true});
  Rels.attachSchema(Schema.RelCompanyContact, {replace:true});
  console.log('Schema.Contact attached');
  console.log('Schema.RelCompanyContact attached');


});

var hooksObject = {
  before: {
    insert: function(doc) {
      doc.actodeType = 1;
      return doc;
    }
  },
  after: {
    insert: function(error,result) {
      Session.set('creating',false);
      console.log('actode inserted _id: ' + result);
      Rels.insert({
        origin:result,
        destiny:FlowRouter.getParam('_id'),
        owner:Meteor.userId(),
        type:'CONT'
      });
      console.log('rel created');

    }
  }
};


AutoForm.hooks({
  insertContactForm: hooksObject
});
