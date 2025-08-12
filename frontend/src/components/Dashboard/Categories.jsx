import React from "react";

const Categories = ({ distribution }) => {
  return (
    <section className="bg-white h-32 w-full rounded p-4">
      <h3 className="text-lg font-semibold">Categories</h3>
      <div className="flex *:w-full gap-1">
        {distribution.length > 0 ? (
          distribution
            .sort((a, b) => b.total - a.total)
            .map((entry, index) => (
              <div className="flex gap-2 items-center" key={index}>
                <div
                  style={{ background: entry.category.color }}
                  className="h-8 w-8 rounded"
                ></div>
                <div className="flex flex-col">
                  <span>{entry.category.name}</span>
                  <div className="text-xs text-gray-500 space-x-1">
                    <span>{entry.percent}%</span>
                    <span>{entry.category.type}</span>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div className="flex gap-2 items-center">
            <div className="bg-gray-300 h-8 w-8 rounded"></div>
            <div className="flex flex-col">
              <span>No Data</span>
              <div className="text-xs text-gray-500 space-x-1">
                <span>0.00%</span>
                <span>No data</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
