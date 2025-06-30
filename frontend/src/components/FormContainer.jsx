const FormContainer = ({ children }) => {
  return (
    <div className="h-full w-full bg-yellow-100">
      {/* mx-auto shadow-lg text-sm md:text-base rounded lg:max-w-[45vw] border-y-2 border-slate-700 md:h-[min-content] my-5 overflow-hidden bg-gray-50 border min-h-full */}
      <div className="p-4 relative h-full flex flex-col justify-start items-center">
        <div className="m-4 relative rounded top-[5%] z-10 w-full sm:w-[95%] md:w-[65%] lg:w-[45%] xl:w-[35%] lg:min-h-[60%] p-4 py-6 shadow-lg bg-white flex flex-col lg:justify-center gap-2">
          <div className="h-full flex flex-col gap-5 lg:p-6">{children}</div>
        </div>
        <div className="absolute bottom-0 right-0">
          <div className="relative overflow-hidden h-[20rem] w-[20rem]">
            <div className="absolute bottom-[-10rem] left-[50%] flex justify-center items-center h-[20rem] w-[20rem]">
              <div className="absolute border-amber-700 border-5 h-[20rem] w-[20rem] rounded-[15rem]"></div>
              <div className="absolute border-amber-600 border-5 h-[16rem] w-[16rem] rounded-[15rem]"></div>
              <div className="absolute border-amber-500 border-5 h-[12rem] w-[12rem] rounded-[15rem]"></div>
              <div className="absolute border-amber-400 border-5 h-[8rem] w-[8rem] rounded-[15rem]"></div>
              <div className="absolute border-amber-300 border-5 h-[4rem] w-[4rem] rounded-[15rem]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
