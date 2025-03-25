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
    console.log("deleting entry");
    console.log(" entry");
    console.log(this.list[id]);
    delete this.list[id];
    console.log(this.list);
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
  console.log(Object.keys(trackingList.list)[0]);
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
  console.log(parent.id);
  const id = parent.id;
  if (e.target.tagName !== "BUTTON") {
    return;
  }

  if (id !== "updateBox") {
    e.target.matches("#delete") && deleteEntry(id);
    e.target.matches("#edit") && updateEntry(id);
    return;
  }

  e.target.matches("#save") && saveUpdate(id);
  e.target.matches("#cancel") && closeUpdate();
});

function deleteEntry(id) {
  trackingList.removeEntry(id);
  updateLog();
}

function updateEntry(id) {
  console.log("Update entry");
  console.log(id);
  console.log(trackingList.list[id]);
  const log = document.getElementById("log");
  log.insertAdjacentHTML(
    "afterBegin",
    `<li class="update-entry" id="updateBox">
        <form>
          <div><h3>Edit entry</h3></div>
            <div>
              <div>
                <div class="input-column">
                  <label for="expense">Expense</label>
                  <input
                    id="expense"
                    type="text"
                    value="${trackingList.list[id].expense}";
                    name="expense"
                    autocomplete="off"
                    required
                  />
                </div>
                <div class="input-column">
                  <label for="amount">Amount</label>
                  <input
                    id="amount"
                    type="number"
                    value="${trackingList.list[id].amount}";
                    name="amount"
                    autocomplete="off"
                    required
                  />
                </div>
                <div class="input-column">
                  <label for="category">Category</label>
                  <input
                    id="category"
                    type="text"
                    value="${trackingList.list[id].category}";
                    name="category"
                    autocomplete="off"
                    required
                  />
                </div>
              </div>
              <div class="button-row">
                <button type="submit" id="save">Save</button>
                <button type="button" id="cancel">Cancel</button>
              </div>
            </div>
            </form>
          </li>`
  );
}

function saveUpdate(id) {
  console.log(`Saving updates for ${id}`);
  closeUpdate();
}

function closeUpdate() {
  const updateBox = document.getElementById("updateBox");
  updateBox.remove();
}
