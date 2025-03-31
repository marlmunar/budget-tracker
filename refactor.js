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
