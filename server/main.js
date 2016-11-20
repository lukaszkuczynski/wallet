import { Meteor } from 'meteor/meteor';

Spendings = new Mongo.Collection('spendings');

Meteor.startup(() => {
  // code to run on server at startup
});
