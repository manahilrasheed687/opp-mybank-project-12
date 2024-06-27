#! /usr/bin/env node
import inquirer from "inquirer";
// Bank account 
class Bankaccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit money
    Withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of ${amount} sucessful, Remaining balance; ${this.balance} `);
        }
        else {
            console.log("Insufficient balance.");
        }
    }
    // Credit mpney 
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // $1 fee charged if more than $100 is deposit 
        }
        this.balance += amount;
        console.log(`Deposit of ${amount} sucessfull, Remaining balance ${this.balance}`);
    }
    // Check balance 
    checkBalance() {
        console.log(`current balance: ${this.balance}`);
    }
}
// Customer class 
class customer {
    firstName;
    LastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, LastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.LastName = LastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// Create bank account
const accounts = [
    new Bankaccount(1001, 500),
    new Bankaccount(1002, 1000),
    new Bankaccount(1003, 2000),
];
// Create customers 
const customers = [
    new customer("Hamza", "Khan", "Male", 35, 3343045316, accounts[0]),
    new customer("Syedashanzay", "Khan", "female", 24, 3362353818, accounts[1]),
    new customer("Ayesha", "Khan", "female", 35, 3341045316, accounts[2])
];
// function to interact with bank account 
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountnumber",
            type: "number",
            message: "Enter your account number:"
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountnumber);
        if (customer) {
            console.log(`Welcome, ${customer.firstName} ${customer.LastName} !\n`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "Select and operration",
                    choices: ["Deposit", "Withdraw", "Check balance", "Exit"]
                }]);
            switch (ans.select) {
                case "Deposit":
                    const depositamount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    });
                    customer.account.deposit(depositamount.amount);
                    break;
                case "Withdraw":
                    const Withdrawamount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to Withdraw:"
                    });
                    customer.account.Withdraw(Withdrawamount.amount);
                    break;
                case "Check balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Existing bank program...");
                    console.log("\n Thank you for using our bank services. Have a great day!");
                    return;
            }
        }
        else {
            console.log("Invalid account number. Plaese try again.");
        }
    } while (true);
}
service();
