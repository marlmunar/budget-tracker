import React from "react";

const Categories = () => {
  return (
    <section className="bg-white h-28 w-full rounded p-2">
      <h3 className="text-lg font-semibold">Categories</h3>
      <div className="flex *:w-full gap-1">
        <div className="flex gap-2 items-center">
          <div className="h-8 w-8 rounded bg-[#4caf50]"></div>
          <div className="flex flex-col">
            <span>Category 1</span>
            <div className="text-xs text-gray-500 space-x-1">
              <span>33%</span>
              <span>Category Type</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="h-8 w-8 rounded bg-[#2196f3]"></div>
          <div className="flex flex-col">
            <span>Category 2</span>
            <div className="text-xs text-gray-500 space-x-1">
              <span>33%</span>
              <span>Category Type</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="h-8 w-8 rounded bg-[#ff9800]"></div>
          <div className="flex flex-col">
            <span>Category 3</span>
            <div className="text-xs text-gray-500 space-x-1">
              <span>33%</span>
              <span>Category Type</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
