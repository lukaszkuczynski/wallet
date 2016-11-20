import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Spendings = new Mongo.Collection('spendings');



Template.spendingList.helpers({
  spending() {
    return Spendings.find();
  }
});
