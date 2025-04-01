const trackingList = {
  list: [],
  selected: [],
  isFiltered: false,

  addEntry(expense, amount, category) {
    this.list.push({
      id: Date.now().toString(),
      expense,
      amount,
      category,
    });
  },

  removeEntry(id) {
    this.list = this.list.filter((entry) => entry.id !== id);
  },

  editEntry(id, expense, amount, category) {
    this.list = this.list.map((entry) =>
      entry.id === id ? { ...entry, expense, amount, category } : entry
    );
  },

  getEntry(id) {
    return this.list.find((entry) => entry.id === id);
  },

  setSelected(categories) {
    this.selected = [...categories];
  },

  applyFilter(categories) {
    return this.list.filter((entry) => categories.includes(entry.category));
  },

  uniqueCategories() {
    return [...new Set(this.list.map((entry) => entry.category))];
  },

  getTotal() {
    return this.list.reduce((sum, entry) => +sum + +entry.amount, 0);
  },

  sumByCategory(category) {
    return this.list
      .filter((entry) => entry.category === category)
      .reduce((sum, entry) => +sum + +entry.amount, 0);
  },

  isNotEmpty() {
    return this.list.length > 0;
  },

  resetFilter() {
    this.selected = this.uniqueCategories();
    this.isFiltered = false;
  },
};

function displayMessage(message) {
  const messageBox = document.getElementById("message-box");
  const content = document.createElement("div");

  content.innerHTML = `<div id="message" class="absolute-box message">
              <p>Entry succesfully added!</p>
            </div>`;
  messageBox.appendChild(content);

  setTimeout(() => {
    content.firstElementChild.classList.add("show");
  }, 10);

  setTimeout(() => {
    content.firstElementChild.classList.add("fade-out");
    setTimeout(() => {
      content.remove();
    }, 500);
  }, 1500);
}

document.getElementById("expenseForm").addEventListener("submit", (e) => {
  e.preventDefault();

  let expense = document.getElementById("expense").value.trim();
  let amount = parseInt(document.getElementById("amount").value.trim());
  let category = document.getElementById("category").value.trim();
  trackingList.addEntry(expense, amount, category);
  trackingList.resetFilter();
  displayMessage();
  updateDOM();
  clearForm();
});

document.getElementById("expenseForm").addEventListener("reset", clearForm);

function updateDOM() {
  updateLog();
  updateSummary();
  toggleHeaders();
  closeUpdateForm();
  closeFilterForm();
  closeDownloadForm();
}

function clearForm() {
  document.getElementById("expenseForm").reset();
}

function renderExpenseItem({ id, expense, amount, category }) {
  return `
      <li class="expense-item" id="${id}">
        <span>${expense}</span>
        <span>${amount}</span>
        <span>${category}</span>
        <button id="edit">Edit</button>
        <button id="delete">Delete</button>
      </li>`;
}

function updateLog() {
  const list = trackingList.isFiltered
    ? trackingList.applyFilter(trackingList.selected)
    : trackingList.list;
  const log = document.getElementById("log");
  log.innerHTML = list.length
    ? list.map(renderExpenseItem).join("")
    : `<div class="no-data">No Data</div>`;
}

document.getElementById("log").addEventListener("click", (e) => {
  const parent = e.target.closest("li");
  if (!parent) return;

  const id = parent.id;
  switch (e.target.id) {
    case "delete":
      deleteEntry(id);
      break;
    case "edit":
      updateEntry(id);
      break;
  }
});

document.getElementById("update").addEventListener("click", (e) => {
  if (e.target.id === "cancel") {
    closeUpdateForm();
  }
});

function deleteEntry(id) {
  trackingList.removeEntry(id);
  updateDOM();
}

function updateEntry(id) {
  const update = document.getElementById("update");
  const entry = trackingList.getEntry(id);

  update.innerHTML = `<form id="updateForm" class="update-entry absolute-box">
              <div id="${id}" class="section-title"><h3>Edit entry</h3></div>
              <div>
                <div>
                  <div class="input-column">
                    <label for="expense">Expense</label>
                    <input
                      id="updateExpense"
                      type="text"
                      value="${entry.expense}"
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
                      value="${entry.amount}"
                      name="amount"
                      autocomplete="off"
                      min="1"
                      max="1000000"
                      step="0.01"
                      required
                    />
                  </div>
                  <div class="input-column">
                    <label for="category">Category</label>
                    <input
                      id="updateCategory"
                      type="text"
                      value="${entry.category}"
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
          `;

  document.getElementById("updateForm").scrollIntoView({ behavior: "smooth" });
}

document.getElementById("update").addEventListener("submit", (e) => {
  if (e.target.matches("#updateForm")) {
    e.preventDefault();

    let id = document.getElementById("updateForm").firstElementChild.id;
    let expense = document.getElementById("updateExpense").value.trim();
    let amount = document.getElementById("updateAmount").value.trim();
    let category = document.getElementById("updateCategory").value.trim();

    trackingList.editEntry(id, expense, amount, category);

    updateDOM();
    closeUpdateForm();

    const edited = document.getElementById(id);
    if (edited) {
      edited.scrollIntoView({ behavior: "smooth" });
      edited.classList.add("highlighted");
    }
  }
});

function closeUpdateForm() {
  const updateForm = document.getElementById("updateForm");
  if (updateForm) {
    updateForm.remove();
  }
}

function renderExpenseSummary(category) {
  return `
      <li class="per-category">
        <span>${category}</span>
        <span>${trackingList.sumByCategory(category)}</span>
      </li>`;
}

function updateSummary() {
  const summary = document.getElementById("summary");
  const categories = trackingList.uniqueCategories().sort();

  summary.innerHTML = trackingList.isNotEmpty()
    ? categories.map(renderExpenseSummary).join("")
    : `<div class="no-data">No Data</div>`;

  const total = document.getElementById("total");
  total.textContent = trackingList.getTotal();
}

function toggleHeaders() {
  const headers = document.querySelectorAll(".hidden");
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

document.getElementById("filterBox").addEventListener("click", (e) => {
  const target = e.target.id;

  switch (target) {
    case "removeFilter":
      trackingList.resetFilter();
      closeFilterForm();
      renderFilterForm();
      break;
    case "cancel":
      closeFilterForm();
      break;
  }
});

function renderFilterForm() {
  const filterBox = document.getElementById("filterBox");
  const uniqueCategories = trackingList.uniqueCategories();

  filterBox.insertAdjacentHTML(
    "afterBegin",
    `<form id="filterForm" class="absolute-box filter-table">
      <div class="section-title">
        <h3>Filter by Categories</h3>
        <button type="button" id="removeFilter" title="Reset filter"><i class="fa-solid fa-filter-circle-xmark"></i></button>
      </div>
      <div>
        <div class="checklist">
          ${uniqueCategories
            .sort()
            .map(
              (category, index) => `
              <div class="checkbox">
                <input type="checkbox" id="category${
                  index + 1
                }" name="${category}" ${
                trackingList.selected.includes(category) ? "checked" : ""
              }/>
                <label for="category${index + 1}">${category}</label>
              </div>
            `
            )
            .join("")}
        </div>
        <div class="button-row">
          <button type="submit">Save</button>
          <button type="button" id="cancel">Cancel</button>
        </div>
      </div>
    </form>`
  );
}

document.getElementById("filter").addEventListener("click", (e) => {
  renderFilterForm();
});

document.getElementById("filterBox").addEventListener("submit", (e) => {
  if (e.target.matches("#filterForm")) {
    e.preventDefault();

    const filterBox = document.getElementById("filterBox");
    const selectedItems = filterBox.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    const categories = Array.from(selectedItems).map((entry) => entry.name);
    console.log(categories);
    trackingList.setSelected(categories);
    if (trackingList.uniqueCategories().length > categories.length) {
      trackingList.isFiltered = true;
    }
    closeFilterForm();
    updateDOM();
  }
});

function closeFilterForm() {
  const filterForm = document.getElementById("filterForm");
  if (filterForm) {
    filterForm.remove();
  }
}

document.getElementById("downloadBox").addEventListener("click", (e) => {
  if (e.target.id === "cancel") {
    closeDownloadForm();
  }
});

function renderDownloadForm() {
  const downloadBox = document.getElementById("downloadBox");

  downloadBox.insertAdjacentHTML(
    "afterBegin",
    `<form id="downloadForm" class="absolute-box download-form">
              <div class="section-title">
                <h3>Save as Excel</h3>
              </div>
              <div>
                <div class="file-input">
                  <label for="fileName">Give your file a name</label>
                  <input
                    type="text"
                    id="fileName"
                    name="fileName"
                    placeholder="MyExpenses"
                    required
                  />
                </div>
                <div class="button-row">
                  <button type="submit">Save</button>
                  <button type="button" id="cancel">Cancel</button>
                </div>
              </div>
            </form>`
  );
}

document.getElementById("download").addEventListener("click", (e) => {
  renderDownloadForm();
});

document.getElementById("downloadBox").addEventListener("submit", (e) => {
  e.preventDefault();

  const data = trackingList.list;
  let fileName =
    document.getElementById("fileName").value.trim() || "MyExpenses";

  let worksheet = XLSX.utils.json_to_sheet(data);
  let workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  XLSX.writeFile(workbook, `${fileName}.xlsx`);
});

function closeDownloadForm() {
  const downloadForm = document.getElementById("downloadForm");
  if (downloadForm) {
    downloadForm.remove();
  }
}
