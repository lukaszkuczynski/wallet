import { Meteor } from 'meteor/meteor';

Spendings = new Mongo.Collection('spendings');
Balances = new Mongo.Collection('balances');

Meteor.startup(() => {
  // code to run on server at startup
});
