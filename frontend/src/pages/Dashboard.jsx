import React, { useEffect, useState } from "react";
import Distribution from "../components/Dashboard/Distribution";
import Categories from "../components/Dashboard/Categories";
import Breakdown from "../components/Dashboard/Breakdown";
import Grade from "../components/Dashboard/Grade";
import { useLazyGetLogsQuery } from "../slices/logsApiSlice";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../slices/appSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [getLogs] = useLazyGetLogsQuery();
  const [data, setData] = useState([]);
  const [distribution, setDistribution] = useState([]);
  const [totalData, setTotalData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(startLoading());
        const res = await getLogs().unwrap();
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch(stopLoading());
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <title>Budgetarians' Log - Dashboard</title>
      <main className="mx-2 md:m-0 h-full flex flex-col md:flex-row gap-1 md:gap-2">
        <div
          className="w-full h-full max-h-[min-content] rounded flex flex-col gap-1
         bg-gray-200 shadow shadow-slate-300 
         dark:bg-[#28292a] *:dark:bg-[#2f2f2f]
         dark:shadow-none"
        >
          <Distribution
            data={data}
            distribution={distribution}
            setDistribution={setDistribution}
            setTotalData={setTotalData}
          />
          <Categories distribution={distribution} />
        </div>
        <div
          className="w-full h-full  max-h-[min-content] rounded flex flex-col gap-1
         bg-gray-200 shadow shadow-slate-300 
         dark:bg-[#28292a] *:dark:bg-[#2f2f2f]
         dark:shadow-none"
        >
          <Breakdown totalData={totalData} distribution={distribution} />
          <Grade totalData={totalData} />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
