const trackingList = {
  list: [],

  addEntry(expense, amount, category) {
    this.list.push({ id: Date.now().toString(), expense, amount, category });
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
    return this.list.filter((entry) => entry.id === id);
  },

  filterBy(categories) {
    return this.list.filter((entry) => categories.includes(entry.category));
  },

  selectedCategories(list) {
    return list.map((entry) => entry.category);
  },

  uniqueCategories() {
    return this.list.map((entry) => entry.category);
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
  updateDOM(trackingList.list);
  clearForm();
});

document.getElementById("expenseForm").addEventListener("reset", clearForm);

function updateDOM(list) {
  updateLog(list);
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

function updateLog(list) {
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
  updateDOM(trackingList.list);
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
                      value="${entry[0].expense}"
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
                      value="${entry[0].amount}"
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
                      value="${entry[0].category}"
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

    updateDOM(trackingList.list);
    closeUpdateForm();

    const edited = document.getElementById(id);
    edited.scrollIntoView({ behavior: "smooth" });
    edited.classList.add("highlighted");
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
        <span class="espense-amount">${category}</span>
        <span class="expense-category">${trackingList.sumByCategory(
          category
        )}</span>
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
  if (e.target.id === "cancel") {
    closeFilterForm();
  }
});

document.getElementById("filter").addEventListener("click", (e) => {
  const filterBox = document.getElementById("filterBox");
  const uniqueCategories = trackingList.uniqueCategories();

  filterBox.insertAdjacentHTML(
    "afterBegin",
    `<form id="filterForm" class="absolute-box filter-table">
      <div class="section-title">
        <h3>Filter by Categories</h3>
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
                }" name="${category}" checked/>
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
});

document.getElementById("filterBox").addEventListener("submit", (e) => {
  if (e.target.matches("#filterForm")) {
    e.preventDefault();

    const filterBox = document.getElementById("filterBox");
    const selectedItems = filterBox.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    const categories = Array.from(selectedItems).map((entry) => entry.name);
    const tempList = trackingList.filterBy(categories);
    updateDOM(tempList);
    closeFilterForm();
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

document.getElementById("download").addEventListener("click", (e) => {
  const filterBox = document.getElementById("downloadBox");

  filterBox.insertAdjacentHTML(
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
});

document.getElementById("downloadBox").addEventListener("submit", (e) => {
  e.preventDefault();

  const data = trackingList.list();
  const fileName = document.getElementById("fileName").value.trim();

  let worksheet = XLSX.utils.json_to_sheet(data);
  let workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Generate Excel file and trigger download
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
});

function closeDownloadForm() {
  const downloadForm = document.getElementById("downloadForm");
  if (downloadForm) {
    downloadForm.remove();
  }
}
