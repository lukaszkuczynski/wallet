import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Spendings = new Mongo.Collection('spendings');



Template.spendingList.helpers({
  spending() {
    return Spendings.find({},{'sort' : {'createdAt':-1}});
  }
});

Template.body.events({
  'submit .add-spending'(event) {
    event.preventDefault();

    const target = event.target;
    const amount = target.amount.value;

    Spendings.insert({
      amount : amount,
      createdAt: new Date() 
    });

    target.amount.value = '';

  }
    
});

