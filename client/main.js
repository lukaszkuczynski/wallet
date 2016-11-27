import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Operation = new Mongo.Collection('operation');
Balance = new Mongo.Collection('balance');

function lastBalance() {
  var last = Balance.find({},{'sort' : {'createdAt':-1}},{'limit': 1}).fetch()
  if (last.length === 0) return 0;
  return last[0]['balance'] 
}

function processBalance(operationType, previousBalance, operation) {
  var diff = 0
  if (operationType === 'spending') {
    diff = operation['amount'];
  } else if (operationType === 'income') {
    diff = -1 * operation['amount'];
  } else throw "unknown operationType " + operationType
  return previousBalance - diff;
}

Template.operationList.helpers({
  operation() {
    return Operation.find({},{'sort' : {'createdAt':-1}});
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

    const operation = 
    {
      amount : amount,
      createdAt: new Date(),
      description: desc
    };
    Operation.insert(operation);

    const previousBalance = lastBalance();
    console.log('prev' + previousBalance);
    const newBalance = processBalance('spending', previousBalance, operation);
    console.log('new' + newBalance);
    Balance.insert({
      operation: operation,
      createdAt: new Date(),
      balance: newBalance
    });

    target.amount.value = '';
    target.description.value = '';

  },

  'submit .add-income'(event) {
    event.preventDefault();

    const target = event.target;
    const amount = target.amount.value;
    const desc = target.description.value;

    const operation = 
    {
      amount : amount,
      createdAt: new Date(),
      description: desc
    };
    Operation.insert(operation);

    const previousBalance = lastBalance();
    console.log('prev' + previousBalance);
    const newBalance = processBalance('income', previousBalance, operation);
    console.log('new' + newBalance);
    Balance.insert({
      operation: operation,
      createdAt: new Date(),
      balance: newBalance
    });

    target.amount.value = '';
    target.description.value = '';

  }
    
});

