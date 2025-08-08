import { motion, useAnimate } from "framer-motion";
import { forwardRef, useImperativeHandle } from "react";
const FormContainer = forwardRef(
  ({ children, page, initialState, animateTo, exitTo, duration }, ref) => {
    const [scope, animate] = useAnimate();

    const handleExit = async () => {
      await animate(scope.current, exitTo, { delay: 0.25, duration });
    };

    useImperativeHandle(ref, () => ({
      triggerExit: handleExit,
    }));

    return (
      <div className="h-full w-full bg-yellow-100 dark:bg-[#232323] dark:text-[#f0f0f0]">
        <div className="p-4 relative h-full flex flex-col justify-start items-center">
          <motion.div
            data-motion
            key={page}
            ref={scope}
            initial={initialState}
            animate={animateTo}
            exit={exitTo}
            className="m-4 relative rounded top-[5%] z-10 w-full 
            sm:w-[95%] md:w-[65%] lg:w-[45%] xl:w-[35%] lg:min-h-[60%] 
            p-4 py-6 shadow-lg 
            bg-white flex flex-col lg:justify-center gap-2 dark:bg-[#28292a]"
          >
            <div className="h-full flex flex-col gap-5 lg:p-6">{children}</div>
          </motion.div>
          <div className="absolute bottom-0 right-0">
            <div className="relative overflow-hidden h-[20rem] w-[20rem]">
              <div className="absolute bottom-[-10rem] left-[50%] flex justify-center items-center h-[20rem] w-[20rem]">
                <div className="absolute border-amber-700 dark:border-amber-50 border-5 h-[20rem] w-[20rem] rounded-[15rem]"></div>
                <div className="absolute border-amber-600  dark:border-amber-100 border-5 h-[16rem] w-[16rem] rounded-[15rem]"></div>
                <div className="absolute border-amber-500  dark:border-amber-200 border-5 h-[12rem] w-[12rem] rounded-[15rem]"></div>
                <div className="absolute border-amber-400  dark:border-amber-300 border-5 h-[8rem] w-[8rem] rounded-[15rem]"></div>
                <div className="absolute border-amber-300  dark:border-amber-400 border-5 h-[4rem] w-[4rem] rounded-[15rem]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default FormContainer;
