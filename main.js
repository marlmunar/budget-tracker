document
  .getElementById("expenseForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let expense = document.getElementById("expense").value.trim();
    let amount = document.getElementById("amount").value.trim();
    let category = document.getElementById("category").value.trim();
    trackingList.addEntry(expense, amount, category);
    console.log(trackingList.getList());
    updateLog();
  });

document.getElementById("clear").addEventListener("click", (e) => {
  document.getElementById("expenseForm").reset();
});

const trackingList = {
  id: 0,
  list: {},

  addEntry(expense, amount, category) {
    this.id++;
    this.list[this.id] = { expense, amount, category };
  },

  getList() {
    return { ...this.list };
  },

  reset() {
    this.id = 0;
    this.list = {};
  },
};

function updateLog() {
  console.log("Updating log");
  const log = document.getElementById("log");
  log.innerHTML = "";
  for (let id in trackingList.list) {
    log.insertAdjacentHTML(
      "beforeend",
      `
            <li class="expense-item">
                    <span class="expense-name">${trackingList.list[id].expense}</span>
                    <span class="espense-amount">${trackingList.list[id].amount}</span>
                    <span class="expense-category">${trackingList.list[id].category}</span>
                    <button>Edit</button>
                    <button>Delete</button>
                  </li>
        `
    );
  }
}
