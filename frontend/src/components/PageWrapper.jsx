import { Outlet } from "react-router-dom";

const PageWrapper = () => {
  return (
    <div className="container h-full py-2 lg:px-10 md:px-2 mx-auto">
      <Outlet />
    </div>
  );
};

export default PageWrapper;
