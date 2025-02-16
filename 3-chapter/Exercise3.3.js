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
  const dispatch = (pwd, m) =>
    pwd !== password ? () => 'Incorrect password'
    : m === 'withdraw' ? withdraw
    : m === 'deposit' ? deposit
    : error(m, 'unknown request -- make_account');

  return dispatch;
}

const acc = make_account(100, 'secret password');

display(acc('secret password', 'withdraw')(50));
display(acc('sigma boi', 'withdraw')(50));
