document.getElementById("expenseForm").addEventListener("submit", (e) => {
  e.preventDefault();

  let expense = document.getElementById("expense").value.trim();
  let amount = document.getElementById("amount").value.trim();
  let category = document.getElementById("category").value.trim();
  trackingList.addEntry(expense, amount, category);
  updateDOM();
  clearForm();
});

document.getElementById("expenseForm").addEventListener("reset", clearForm());

function updateDOM() {
  updateLog();
  updateSummary();
  toggleHeaders();
}

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

  editEntry(id, expense, amount, category) {
    console.log("updating entry");
    console.log("entry");
    console.log(this.list[id]);
    this.list[id] = { expense, amount, category };
    console.log(this.list);
  },

  getTotal() {
    const total = Object.values(this.list).reduce(
      (sum, item) => +sum + +item.amount,
      0
    );
    return total;
  },

  sumByCategory(category) {
    const sum = Object.values(this.list)
      .filter((item) => item.category === category)
      .reduce((sum, item) => +sum + +item.amount, 0);
    return sum;
  },

  isNotEmpty() {
    return Object.keys(this.list).length > 0;
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
  if (trackingList.isNotEmpty()) {
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
  e.target.matches("#delete") && deleteEntry(id);
  e.target.matches("#edit") && updateEntry(id);
});

document.getElementById("update").addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") {
    return;
  }
  e.target.matches("#cancel") && closeUpdateForm();
});

document.getElementById("update").addEventListener("submit", (e) => {
  if (e.target.matches("#updateForm")) {
    e.preventDefault();

    let id = document.getElementById("updateForm").firstElementChild.id;
    console.log(`Saving updates for ${id}`);
    let expense = document.getElementById("updateExpense").value.trim();
    let amount = document.getElementById("updateAmount").value.trim();
    let category = document.getElementById("updateCategory").value.trim();
    trackingList.editEntry(id, expense, amount, category);
    updateDOM();
    closeUpdateForm();
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  }
});

function deleteEntry(id) {
  trackingList.removeEntry(id);
  updateDOM();
}

function updateEntry(id) {
  console.log("Update entry");
  console.log(id);
  console.log(trackingList.list[id]);
  const log = document.getElementById("update");
  log.insertAdjacentHTML(
    "afterBegin",
    `<form id="updateForm" class="update-entry">
              <div id="${id}" class="section-title"><h3>Edit entry</h3></div>
              <div>
                <div>
                  <div class="input-column">
                    <label for="expense">Expense</label>
                    <input
                      id="updateExpense"
                      type="text"
                      value="${trackingList.list[id].expense}"
                      ;
                      name="expense"
                      autocomplete="off"
                      required
                    />
                  </div>
                  <div class="input-column">
                    <label for="amount">Amount</label>
                    <input
                      id="updateAmount"
                      type="number"
                      value="${trackingList.list[id].amount}"
                      ;
                      name="amount"
                      autocomplete="off"
                      required
                    />
                  </div>
                  <div class="input-column">
                    <label for="category">Category</label>
                    <input
                      id="updateCategory"
                      type="text"
                      value="${trackingList.list[id].category}"
                      ;
                      name="category"
                      autocomplete="off"
                      required
                    />
                  </div>
                </div>
                <div class="button-row">
                  <button type="submit">Save</button>
                  <button type="button" id="cancel">Cancel</button>
                </div>
              </div>
            </form>
          `
  );
  document.getElementById("updateForm").scrollIntoView({ behavior: "smooth" });
}

function closeUpdateForm() {
  const updateBox = document.getElementById("updateForm");
  updateBox.remove();
}

function updateSummary() {
  const summary = document.getElementById("summary");
  const total = document.getElementById("total");
  console.log("updating summary");
  const uniqueCategories = [
    ...new Set(Object.values(trackingList.list).map((item) => item.category)),
  ];
  console.log("unique categories");
  console.log(uniqueCategories);
  if (trackingList.isNotEmpty()) {
    summary.innerHTML = "";
    uniqueCategories.sort().forEach((category) => {
      summary.insertAdjacentHTML(
        "afterbegin",
        `
            <li class="per-category">
              <span class="espense-amount">${category}</span>
              <span class="expense-category">${trackingList.sumByCategory(
                category
              )}</span>
            </li>
        `
      );
      total.textContent = trackingList.getTotal();
    });
    return;
  }
  summary.innerHTML = `<li class="no-data">
                  <span class="no-data">No Data</span>
                  </li>`;
}

function toggleHeaders() {
  console.log("displaying headers");
  const headers = document.querySelectorAll(".hidden");
  console.log(headers);
  if (trackingList.isNotEmpty()) {
    headers.forEach((el) => {
      el.style.display = "block";
    });
    return;
  }
  headers.forEach((el) => {
    el.style.display = "none";
  });
}
