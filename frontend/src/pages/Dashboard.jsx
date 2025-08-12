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
      <main className="h-full flex gap-2">
        <div
          className="w-full h-full rounded flex flex-col gap-1
         bg-gray-200 shadow shadow-slate-300"
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
          className="w-full h-full rounded flex flex-col gap-1
         bg-gray-200 shadow shadow-slate-300"
        >
          <Breakdown totalData={(distribution, totalData)} />
          <Grade />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
