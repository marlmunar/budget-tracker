document
  .getElementById("expenseForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let expense = document.getElementById("expense").value.trim();
    let amount = document.getElementById("amount").value.trim();
    let category = document.getElementById("category").value.trim();
    trackingList.addEntry(expense, amount, category);
    console.log(trackingList.getList());
    // if (input === "") return;

    // let items = JSON.parse(localStorage.getItem("items")) || [];
    // items.push(input);
    // localStorage.setItem("items", JSON.stringify(items));

    // document.getElementById("itemInput").value = "";
    // loadItems();
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
