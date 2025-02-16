import { display, error } from 'sicp';

function make_account(balance, password) {
  function call_the_cops() {
    display('Wiiuwiiuiu');
  }
  function withdraw(amount) {
    tries = 0;
    if (balance >= amount) {
      balance = balance - amount;
      return balance;
    } else {
      return 'Insufficient funds';
    }
  }
  function deposit(amount) {
    tries = 0;
    balance = balance + amount;
    return balance;
  }
  let tries = 0;
  function incorrect_pwd() {
    tries++;
    if (tries > 7) call_the_cops();
    return 'Incorrect password';
  }

  const dispatch = (pwd, m) =>
    pwd !== password ? incorrect_pwd
    : m === 'withdraw' ? withdraw
    : m === 'deposit' ? deposit
    : error(m, 'unknown request -- make_account');

  return dispatch;
}

const acc = make_account(100, 'secret password');

display(acc('secret password', 'withdraw')(50));
display(acc('sigma boi', 'withdraw')(50));
display(acc('sigma boi', 'withdraw')(50));
display(acc('sigma boi', 'withdraw')(50));
display(acc('sigma boi', 'withdraw')(50));
display(acc('sigma boi', 'withdraw')(50));
display(acc('sigma boi', 'withdraw')(50));
display(acc('sigma boi', 'withdraw')(50));
display(acc('sigma boi', 'withdraw')(50));
display(acc('secret password', 'withdraw')(50));
display(acc('sigma boi', 'withdraw')(50));
