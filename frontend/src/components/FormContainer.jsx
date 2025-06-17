const FormContainer = ({ children }) => {
  return (
    <div className="form-container">
      <div className="relative justify-between h-full">
        <>{children}</>
        <div className="absolute bottom-0 right-0 z-10">
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
