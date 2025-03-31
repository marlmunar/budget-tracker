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

  filterBy(categories) {
    return Object.values(this.list).filter((item) =>
      categories.includes(item.category)
    );
  },

  selectCategories() {},

  uniqueCategories() {
    return [...new Set(Object.values(this.list).map((item) => item.category))];
  },

  getTotal() {
    return Object.values(this.list).reduce(
      (sum, item) => +sum + +item.amount,
      0
    );
  },

  sumByCategory(category) {
    return Object.values(this.list)
      .filter((item) => item.category === category)
      .reduce((sum, item) => +sum + +item.amount, 0);
  },

  isNotEmpty() {
    return Object.keys(this.list).length > 0;
  },

  reset() {
    this.id = 0;
    this.list = {};
  },
};
