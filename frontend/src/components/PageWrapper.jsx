import { Outlet } from "react-router-dom";

const PageWrapper = () => {
  return (
    <div className="flex-1 @container w-full h-full py-2 lg:px-10 md:px-2 mx-auto grow dark:bg-[#232323] dark:text-[#f0f0f0]">
      <Outlet />
    </div>
  );
};

export default PageWrapper;
