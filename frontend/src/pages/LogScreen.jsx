import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AddEntryForm from "../components/AddEntryForm";
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
import OutsideClick from "../components/OutsideClick";
import { setIsNotSaved, setTempEntries } from "../slices/logSlice";
import RenameModal from "../components/RenameModal";
import EntryOptions from "../components/EntryOptions";
import AddCategoryForm from "../components/AddCategoryForm";
import EditCategoryForm from "../components/EditCategoryForm";
import DeleteCategoryForm from "../components/DeleteCategoryForm";
import ConfirmModal from "../components/ConfirmModal";
import LogScreenStatus from "../components/LogScreenStatus";
import usePrompt from "../hooks/usePrompt";
import Modal from "../components/Modal";
import { AnimatePresence, motion } from "framer-motion";
import LogScreenHeader from "../components/LogScreenHeader";
import Footer from "../components/Footer";

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
  const [isSelecting, setIsSelecting] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [displayName, setDisplayName] = useState("");
  const [activeAction, setActiveAction] = useState("");
  const [lastAction, setLastAction] = useState("");
  const [error, setError] = useState("");

  const [getLog, { data }] = useLazyGetLogQuery();
  const [downloadLog] = useDownloadLogMutation();
  const [deleteLog] = useDeleteLogMutation();
  const [updateLog] = useUpdateLogMutation();
  const { tempEntries } = useSelector((state) => state.logs);
  const { isNotSaved } = useSelector((state) => state.logs);
  const { logId } = useParams();

  const { show, confirm, cancel } = usePrompt(isNotSaved);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(startLoading());
        const res = await getLog(logId).unwrap();
        setLogData(res.data);
        setCategories(res.data.categories);
        setDisplayName(res.data.name);

        if (!isNotSaved) dispatch(setTempEntries([...res.data.entries]));
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.status === 400 || error.status === 404) {
          navigate("/not-found");
        }
      } finally {
        dispatch(stopLoading());
      }
    };

    fetchData();
  }, [logId, getLog, dispatch, lastAction]);

  const handleSave = async () => {
    try {
      dispatch(startLoading());
      const res = await updateLog({
        id: logId,
        data: { name: logData.name, categories, entries: tempEntries },
      }).unwrap();
      console.log(res);
      setLastAction(Date.now());
      dispatch(setIsNotSaved(false));
    } catch (error) {
      console.log(error?.data?.message || error.message);
    } finally {
      dispatch(stopLoading());
    }
  };

  const handleRename = async (name) => {
    try {
      dispatch(startLoading());
      const res = await updateLog({
        id: logId,
        data: { name },
      }).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error?.data?.message || error.message);
    } finally {
      dispatch(stopLoading());
    }
  };

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

  const handleDelete = async () => {
    try {
      const res = await deleteLog({
        id: logId,
      }).unwrap();
      console.log(res);
      navigate("/profile");
    } catch (error) {
      console.log(error?.data?.message || error.message);
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
      <LogScreenHeader logName={logData.name} />
      <div className="h-full m-2 grid grid-cols-[75%_auto] gap-2 w-[90%] mx-auto">
        <ExpenseList categories={categories} />
        <ExpenseSummary entries={tempEntries} />
      </div>
      <Footer bg="bg-gray-100" />
    </main>

    // </motion.div>
  );
};

export default LogScreen;
