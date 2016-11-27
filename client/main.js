import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Spendings = new Mongo.Collection('spendings');
Balances = new Mongo.Collection('balances');

function lastBalance() {
  var last = Balances.find({},{'sort' : {'createdAt':-1}},{'limit': 1}).fetch()
  if (last.length === 0) return 0;
  return last[0]['balance'] 
}


Template.spendingList.helpers({
  spending() {
    return Spendings.find({},{'sort' : {'createdAt':-1}});
  }
});

Template.balance.helpers({
  currentBalance() {
    return lastBalance();
  }
});

Template.body.events({
  'submit .add-spending'(event) {
    event.preventDefault();

    const target = event.target;
    const amount = target.amount.value;
    const desc = target.description.value;

    function processBalance(operationType, previousBalance, operation) {
      var diff = 0
      if (operationType === 'spending') {
        diff = operation['amount'];
      } else throw "unknown operationType " + operationType
      return previousBalance - diff;
    }


    const operation = 
    {
      amount : amount,
      createdAt: new Date(),
      description: desc
    };
    Spendings.insert(operation);

    const previousBalance = lastBalance();
    console.log('prev' + previousBalance);
    const newBalance = processBalance('spending', previousBalance, operation);
    console.log('new' + newBalance);
    Balances.insert({
      operation: operation,
      createdAt: new Date(),
      balance: newBalance
    });

    target.amount.value = '';
    target.description.value = '';

  }
    
});

