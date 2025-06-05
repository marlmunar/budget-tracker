import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddEntryForm from "../components/AddEntryForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseSummary from "../components/ExpenseSummary";
import {
  TbArrowBackUp,
  TbFileDots,
  TbDeviceSdCard,
  TbFilePencil,
  TbFileDownload,
  TbFileAnalytics,
  TbFileX,
} from "react-icons/tb";
import {
  useDeleteLogMutation,
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

const LogScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logData, setLogData] = useState({});
  const [categories, setCategories] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [displayName, setDisplayName] = useState("");
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isEditingCategories, setIsEditingCategories] = useState(false);
  const [isDeletingCategory, setIsDeletingCategory] = useState(false);
  const [lastAction, setLastAction] = useState("");

  const [getLog, { data }] = useLazyGetLogQuery();
  const [updateLog] = useUpdateLogMutation();
  const [deleteLog] = useDeleteLogMutation();
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
    <main className="mx-auto md:max-w-[90%] lg:max-w-[80%]">
      <title>{`Budgetarians' Log - ${logId}`}</title>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 text-3xl items-center">
          <button className="log-button" onClick={() => navigate("/profile")}>
            <TbArrowBackUp />
          </button>

          <h2 className="text-2xl font-semibold underline">{displayName}</h2>
        </div>

        <div className="relative flex text-3xl">
          <div className="flex items-center gap-2">
            <span className="text-sm italic">
              <LogScreenStatus
                isNotSaved={isNotSaved}
                lastAction={lastAction}
              />
            </span>
            <button className="log-button" onClick={handleSave}>
              <TbDeviceSdCard />
            </button>
            <button
              data-info="exempted"
              name="buttoners"
              className="log-button"
              onClick={() => {
                setIsSelecting((prev) => !prev);
              }}
            >
              <TbFileDots />
            </button>
          </div>

          {isSelecting && (
            <OutsideClick
              onOutsideClick={() => {
                setIsSelecting(false);
              }}
            >
              <menu className="z-10 absolute right-0 border-2 w-32 text-base p-2 flex flex-col items-center gap-2 mt-12 shadow-lg bg-white rounded ">
                <li>
                  <button
                    className="log-options"
                    onClick={() => {
                      setIsRenaming(true);
                    }}
                  >
                    <TbFilePencil />
                    <span>Rename</span>
                  </button>
                </li>
                <li>
                  <button className="log-options">
                    <TbFileDownload />
                    <span>Download</span>
                  </button>
                </li>
                <li>
                  <button className="log-options">
                    <TbFileAnalytics />
                    <span>Visualize</span>
                  </button>
                </li>
                <li>
                  <button
                    className="log-options text-red-500"
                    onClick={() => {
                      setIsDeleting(true);
                    }}
                  >
                    <TbFileX />
                    <span>Delete</span>
                  </button>
                </li>
              </menu>
            </OutsideClick>
          )}
        </div>
      </div>

      <div className="py-4 grid grid-cols-1 lg:grid-cols-[min-content_auto] grid-rows-[min-content_min-content] my-2 gap-4">
        {!isAddingEntry &&
          !isAddingCategory &&
          !isEditingCategories &&
          !isDeletingCategory && (
            <EntryOptions
              setIsAddingEntry={setIsAddingEntry}
              setIsEditingCategories={setIsEditingCategories}
              setIsDeletingCategory={setIsDeletingCategory}
            />
          )}
        {isAddingEntry && (
          <AddEntryForm
            categories={categories}
            setIsAddingEntry={setIsAddingEntry}
            setIsAddingCategory={setIsAddingCategory}
          />
        )}
        {isAddingCategory && (
          <AddCategoryForm
            logId={logId}
            categories={categories}
            setIsAddingEntry={setIsAddingEntry}
            setIsAddingCategory={setIsAddingCategory}
            setLastAction={setLastAction}
          />
        )}
        {isEditingCategories && (
          <EditCategoryForm
            logId={logId}
            categories={categories}
            setIsEditingCategories={setIsEditingCategories}
            setLastAction={setLastAction}
          />
        )}
        {isDeletingCategory && (
          <DeleteCategoryForm
            logId={logId}
            categories={categories}
            setIsDeletingCategory={setIsDeletingCategory}
            setLastAction={setLastAction}
          />
        )}
        <ExpenseList categories={categories} />
        <ExpenseSummary entries={tempEntries} />
      </div>
      {isRenaming && (
        <RenameModal
          isRenaming={isRenaming}
          setIsRenaming={setIsRenaming}
          displayName={displayName}
          handleSubmit={(tempName) => {
            setIsRenaming(false);
            setDisplayName(tempName);
            handleRename(tempName);
            dispatch(setIsNotSaved(true));
          }}
          title="Edit Log Name"
          description="Edit the name of your log"
        />
      )}
      {isDeleting && (
        <ConfirmModal
          isOpen={isDeleting}
          setIsOpen={setIsDeleting}
          handleConfirm={() => {
            setIsDeleting(false);
            handleDelete();
          }}
          action="Delete"
          description={`Delelete ${displayName}?`}
        />
      )}
      {show && (
        <Modal isOpen={show} onClose={cancel} title="Confirm Exit">
          <div className="flex flex-col items-center gap-2 p-2">
            <p>Leave with unsave changes?</p>
            <div className="button-row">
              <button onClick={confirm}>Confirm</button>
              <button onClick={cancel}>Cancel</button>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
};

export default LogScreen;
