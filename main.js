document.getElementById("expenseForm").addEventListener("submit", (e) => {
  e.preventDefault();

  let expense = document.getElementById("expense").value.trim();
  let amount = document.getElementById("amount").value.trim();
  let category = document.getElementById("category").value.trim();
  trackingList.addEntry(expense, amount, category);
  console.log(trackingList.getList());
  updateLog();
  clearForm();
});

document.getElementById("expenseForm").addEventListener("reset", clearForm());

function clearForm() {
  console.log("clearing forms");
  document.getElementById("expenseForm").reset();
}

const trackingList = {
  id: 0,
  list: {},

  addEntry(expense, amount, category) {
    this.id++;
    this.list[this.id] = { expense, amount, category };
  },

  removeEntry(id) {
    delete this.list[this.id];
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
  console.log(Object.keys(trackingList.list));
  const log = document.getElementById("log");
  if (Object.keys(trackingList.list).length > 0) {
    log.innerHTML = "";
    for (let id in trackingList.list) {
      log.insertAdjacentHTML(
        "beforeend",
        `
            <li class="expense-item" id="${id}">
                    <span class="expense-name">${trackingList.list[id].expense}</span>
                    <span class="espense-amount">${trackingList.list[id].amount}</span>
                    <span class="expense-category">${trackingList.list[id].category}</span>
                    <button id="edit">Edit</button>
                    <button id="delete">Delete</button>
                  </li>
        `
      );
    }
    return;
  }
  log.innerHTML = `<li class="no-data">
                  <span class="no-data">No Data</span>
                  </li>`;
}

document.getElementById("log").addEventListener("click", (e) => {
  const parent = e.target.closest("li");
  console.log(parent.attributes.id);
  const id = parent.attributes.id;
  if (e.target.tagName === "BUTTON") {
    e.target.matches("#delete") && deleteEntry(id);
    e.target.matches("#edit") && updateEntry(id);
  }
});

function deleteEntry(id) {
  trackingList.removeEntry(id);
  updateLog();
}

function updateEntry(id) {
  console.log("Update entry");
}
