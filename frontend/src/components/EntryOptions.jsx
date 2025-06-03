const EntryOptions = ({
  setIsAddingEntry,
  setIsAddingCategory,
  setIsEditingCategories,
}) => {
  return (
    <section className="log-section-container row-span-2 max-h-[min-content] min-w-[15rem] justify-center">
      <h3 className="log-section-header">Enty Options</h3>
      <div className="my-2 flex flex-col gap-1">
        <button className="entry-button" onClick={() => setIsAddingEntry(true)}>
          Add Entry
        </button>
        <button
          className="entry-button"
          onClick={() => setIsAddingCategory(true)}
        >
          Add a category
        </button>
        <button
          className="entry-button"
          onClick={() => setIsEditingCategories(true)}
        >
          Edit Categories
        </button>
      </div>
    </section>
  );
};

export default EntryOptions;
