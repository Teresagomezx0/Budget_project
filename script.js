"use strict";

//create class for budget and storing

class Budget {
  constructor() {
    this.income = [];
    this.expense = [];
  }

  addIncome(description, amount) {
    this.income.push({ description, amount });
  }

  addExpense(description, amount) {
    this.expense.push({ description, amount });
  }

  _sum(list) {
    return list.reduce(function (total, item) {
      return total + item.amount;
    }, 0);
  }

  getIncomeTotal() {
    return this._sum(this.income);
  }

  getExpenseTotal() {
    return this._sum(this.expense);
  }
  getBudgetTotal() {
    return this.getIncomeTotal() - this.getExpenseTotal();
  }
}
