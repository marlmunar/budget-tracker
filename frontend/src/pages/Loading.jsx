import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Loading = () => {
  const isLoading = useSelector((state) => state.app.isLoading);

  return (
    <>
      {isLoading && (
        <div className="flex justify-center pt-52 text-2xl absolute z-100 bg-white top-0 lef-0 right-0 bottom-0 h-full w-full">
          <p>Loading...</p>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default Loading;
