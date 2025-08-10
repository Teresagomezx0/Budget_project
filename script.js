"use strict";

//create class for budget and storing

class Budget {
  constructor() {
    this.incomes = [];
    this.expenses = [];
  }

  addIncome(description, amount) {
    this.incomes.push({ description: description, amount: amount });
  }

  addExpense(description, amount) {
    this.expenses.push({ description: description, amount: amount });
  }

  getIncomeTotal() {
    return this.incomes.reduce(function (total, item) {
      return total + item.amount;
    }, 0);
  }

  getExpenseTotal() {
    return this.expenses.reduce(function (total, item) {
      return total + item.amount;
    }, 0);
  }

  getBudgetTotal() {
    return this.getIncomeTotal() - this.getExpenseTotal();
  }
}

const budget = new Budget();

//form inputs variables/ DOM manipulation
const form = document.getElementById("income-form");
const select = document.getElementById("type");
const discInput = document.getElementById("disc");
const amountInput = document.getElementById("amount");
const errorMsg = document.getElementById("error");

//totals display variables
const incomeTotal = document.getElementById("income-total");
const expenseTotal = document.getElementById("expense-total");
const budgetTotal = document.getElementById("budget-total");

//history variables
const incomeList = document.getElementById("income-list");
const expenseList = document.getElementById("expense-list");

//Add expense/income btns
const addIncomeBtn = document.getElementById("add-income-btn");
const addExpenseBtn = document.getElementById("add-expense-btn");

//functions for display/error message

//will ensure the decimals are formated to the second decimal
function formatMoney(num) {
  return "$" + num.toFixed(2);
}

//form validation:
function isValid(disc, amount) {
  if (!disc) return "Please enter a description.";
  if (isNaN(amount) || amount <= 0) return "Amount must be a positive number!";
  return "";
}

//funciton for totals
function updateUI() {
  incomeTotal.textContent = formatMoney(budget.getIncomeTotal());
  expenseTotal.textContent = formatMoney(budget.getExpenseTotal());
  budgetTotal.textContent = formatMoney(budget.getBudgetTotal());

  incomeList.innerHTML = "";
  budget.incomes.forEach(function (item) {
    const li = document.createElement("li");
    li.textContent = item.description + ": " + formatMoney(item.amount);
    incomeList.appendChild(li);
  });

  //expense list
  expenseList.innerHTML = "";
  budget.expenses.forEach(function (item) {
    const li = document.createElement("li");
    li.textContent = item.description + ": " + formatMoney(item.amount);
    expenseList.appendChild(li);
  });
}

//main form submit
function handleAdd(givenType) {
  //created one function to handle all buttons to avoid DRY. givenType will change the expense/income
  const disc = discInput.value.trim();
  const amount = parseFloat(amountInput.value.trim());

  const msg = isValid(disc, amount);
  if (msg) {
    errorMsg.textContent = msg;
    return;
  }
  errorMsg.textContent = "";

  const type = givenType || select.value;
  if (type === "income") {
    budget.addIncome(disc, amount);
    console.log("after addIncome - incomes", budget.incomes);
  } else {
    budget.addExpense(disc, amount);
    console.log("after addExpenses - expenses", budget.expenses);
  }

  updateUI();
  form.reset();
  select.value = "income";
}

addIncomeBtn.addEventListener("click", function () {
  handleAdd("income"); //changes type to income
});
addExpenseBtn.addEventListener("click", function () {
  handleAdd("expense");
});
