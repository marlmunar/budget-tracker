import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import ExpenseList from "../components/ExpenseList";
import ExpenseSummary from "../components/ExpenseSummary";
import {
  useDeleteLogMutation,
  useDownloadLogMutation,
  useLazyGetLogQuery,
  useUpdateLogMutation,
} from "../slices/logsApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../slices/appSlice";
import LogScreenHeader from "../components/LogScreenHeader";
import Footer from "../components/Footer";
import { setTempCategories, setTempEntries } from "../slices/logSlice";

const LogScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scrollToRef = useRef(null);

  useEffect(() => {
    const offset = 200;
    const element = scrollToRef.current;

    if (element) {
      const topPosition =
        element.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: topPosition,
        behavior: "smooth",
      });
    }
  }, []);

  const [logData, setLogData] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { lastAction } = useSelector((state) => state.app);

  const [error, setError] = useState("");

  const [getLog, { data }] = useLazyGetLogQuery();
  const [downloadLog] = useDownloadLogMutation();
  const [deleteLog] = useDeleteLogMutation();
  const [updateLog] = useUpdateLogMutation();
  const { tempEntries } = useSelector((state) => state.logs);
  const { isNotSaved } = useSelector((state) => state.logs);
  const { logId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getLog(logId).unwrap();
        setLogData(res.data);
        setCategories(res.data.categories);

        if (!isNotSaved) {
          dispatch(setTempEntries([...res.data.entries]));
          dispatch(setTempCategories([...res.data.categories]));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.status === 400 || error.status === 404) {
          navigate("/not-found");
        }
      } finally {
      }
    };

    fetchData();
  }, [isNotSaved, lastAction]);

  const handleDownload = async () => {
    try {
      dispatch(startLoading());
      await downloadLog({ logId, filename: logData.name }).unwrap();
    } catch (error) {
      setError(error?.data?.message || error.message);
    } finally {
      dispatch(stopLoading());
      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <main
      ref={scrollToRef}
      className="container mx-auto h-full flex flex-col bg-gray-300"
    >
      <title>{`Budgetarians' Log ${
        logData.name ? `- ${logData.name}` : ""
      }`}</title>

      <LogScreenHeader logData={logData} />
      <div className="h-full relative">
        <div
          className="container m-2 grid md:grid-cols-[75%_auto] 
            grid-rows-[minmax(1fr,min-content)] gap-2
            w-[95%] md:w-[90%] mx-auto items-start"
        >
          <ExpenseList props={{ selectedCategories, setSelectedCategories }} />
          <ExpenseSummary
            props={{
              selectedCategories,
              setSelectedCategories,
            }}
          />
        </div>
      </div>

      <Footer bg="bg-gray-100" />
    </main>
  );
};

export default LogScreen;
