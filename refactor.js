const trackingList = {
  list: [],

  addEntry(expense, amount, category) {
    this.list.push({ id: Date.now(), expense, amount, category });
  },

  removeEntry(id) {
    this.list = this.list.filter((entry) => entry.id !== id);
  },

  editEntry(id, expense, amount, category) {
    this.list = this.list.map((entry) =>
      entry.id === id ? { ...entry, expense, amount, category } : entry
    );
  },

  filterBy(categories) {
    return this.list.filter((item) => categories.includes(item.category));
  },

  selectedCategories() {},

  uniqueCategories() {
    return this.list.map((item) => item.category);
  },

  getTotal() {
    return this.list.reduce((sum, item) => +sum + +item.amount, 0);
  },

  sumByCategory(category) {
    return this.list
      .filter((item) => item.category === category)
      .reduce((sum, item) => +sum + +item.amount, 0);
  },

  isNotEmpty() {
    return this.list.length > 0;
  },

  reset() {
    this.list = [];
  },
};

document.getElementById("expenseForm").addEventListener("submit", (e) => {
  e.preventDefault();

  let expense = document.getElementById("expense").value.trim();
  let amount = parseInt(document.getElementById("amount").value.trim());
  let category = document.getElementById("category").value.trim();
  trackingList.addEntry(expense, amount, category);
  e.target.reset();
  updateLog(trackingList.list);
});

function renderExpenseItem(id, { expense, amount, category }) {
  return `
      <li class="expense-item" id="${id}">
        <span class="expense-name">${expense}</span>
        <span class="expense-amount">${amount}</span>
        <span class="expense-category">${category}</span>
        <button id="edit">Edit</button>
        <button id="delete">Delete</button>
      </li>`;
}

function updateLog(list) {
  const log = document.getElementById("log");
  log.innerHTML = list.length
    ? list.map(renderExpenseItem).join("")
    : `<li class="no-data">No Data</li>`;
}
