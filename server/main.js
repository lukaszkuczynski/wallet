import { Meteor } from 'meteor/meteor';

Operation = new Mongo.Collection('operation');
Balance = new Mongo.Collection('balance');

Meteor.startup(() => {
  // code to run on server at startup
});
