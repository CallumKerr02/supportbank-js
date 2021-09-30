
// Support Bank 


const csv = require('csv-parser');
const prompt = require('prompt-sync')();
const fs = require('fs');
const transactionFileReadContent = fs.createReadStream('Transactions2014.csv');
const input = ('List Ben');


class Account {
    constructor(name){
        this.balance = 0;
        this.name = name;
    }
}

class Transaction {
    constructor(date, from ,to, narrative, amount){
        this.date = date;
        this.from = from;
        this.to = to;
        this.narrative = narrative;
        this.amount = amount;
    }

}

const transactions = [];
const accounts = [];
const accountsName = [];


const transactionReadContents = fs.readFileSync('Transactions2014.csv', 'utf8');
const transactionAsStrings = transactionReadContents.toString().split('\n');


for (let i = 1; i < transactionAsStrings.length; i++) {
    const transactionAsArray = transactionAsStrings[i].split(",");
    transactions.push(
        new Transaction(
            transactionAsArray[0],
            transactionAsArray[1],
            transactionAsArray[2],
            transactionAsArray[3],
            parseFloat(transactionAsArray[4]),
        )
    )
}
for (let i = 1; i < transactionAsStrings.length; i++) {
    const accountIntoArray = transactionAsStrings[i].split(",");
    accounts.push(
        new Account(
            accountIntoArray[1]
        )
    )
}

for (let i = 0; i < accountsName.length; i++){
    accounts.push(new Account(accountsName[i]));
}

for (const transaction of transactions){
    const toAccount = findAccount(transaction.to);
    const fromAccount = findAccount(transaction.from);
    if (fromAccount === undefined){
        throw Error("From Account cannot be found");
    }
    fromAccount.balance -= transaction.amount;
    if (toAccount === undefined){
        throw Error("To account cannot be found");
    }
    toAccount.balance += transaction.amount;
}

for (const account of accounts){
    console.log(account.name + " has £" + account.balance.toFixed(2));
}

for (let o = 0; o < transactions.length; o++){
    if (!doesAccountNameAlreadyExist(transactions[o].from, accountsName)){
        accountsName.push(transactions[o].from);
}
    if (!doesAccountNameAlreadyExist(transactions[o].to, accountsName)){
    accountsName.push(transactions[o].to);
    }
  }
  let uniqueAcc = [new Set (accountsName)]
  console.log(uniqueAcc)


function doesAccountNameAlreadyExist(accountsName, accounts) {
    for (let a = 0; a< accountsName.length; a++){
        if (accountsName[a] == accounts){
            return true;
        }
    }
}

function findAccount(accountsName){
    for (const account of accounts){
        if (account.name === accountsName){
            return account;
        }
    }
    return undefined;
}

//console.log(accounts[2].name);
// for (let x = 0; x < transactions.length; x++){
//     if (input.toLowerCase() === 'list all'){
//         transactionFileReadContent.pipe(csv())
//         .on('data', (row) => {
//         console.log(row);
//         })
//         .on('end', () => {
//         console.log('All Accounts have been listed from CSV File');
//         });
//         }
//         else if (input.toLowerCase() == 'list' + (accounts.name)){
//             console.log(accounts[x]);
//         }


//         else if (input.toLowerCase()[0] !== 'l'){
//             console.log('Please input List all or List Account');

//     }
// }

   

