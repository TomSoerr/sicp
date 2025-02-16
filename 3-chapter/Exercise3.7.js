import { display, error } from 'sicp';

function make_account(balance, password) {
  function withdraw(amount) {
    if (balance >= amount) {
      balance = balance - amount;
      return balance;
    } else {
      return 'Insufficient funds';
    }
  }
  function deposit(amount) {
    balance = balance + amount;
    return balance;
  }
  const dispatch = (pwd, action) =>
    pwd !== password ? () => 'Incorrect password'
    : action === 'withdraw' ? withdraw
    : action === 'deposit' ? deposit
    : error(action, 'unknown request -- make_account');

  return dispatch;
}

function make_joint(acc, acc_pwd, new_pwd) {
  return (pwd, action) =>
    pwd !== new_pwd ? 'Incorrect password' : acc(acc_pwd, action);
}

const peter_acc = make_account(100, 'open sesame');
const paul_acc = make_joint(peter_acc, 'open sesame', 'rosebud');

display(peter_acc('open sesame', 'withdraw')(5));
display(paul_acc('rosebud', 'withdraw')(5));
display(paul_acc('rosebud', 'deposit')(15));
display(peter_acc('open sesame', 'withdraw')(5));
