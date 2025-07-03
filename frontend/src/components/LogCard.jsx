import { Link } from "react-router-dom";
import { TbDotsVertical, TbPencil, TbTrash, TbX } from "react-icons/tb";
import { useState } from "react";
import OutsideClick from "./OutsideClick";
import { useDispatch } from "react-redux";
import { setModalState } from "../slices/appSlice";

const LogCard = ({ logName, logStats, logId }) => {
  const dispatch = useDispatch();
  const [isSelecting, setIsSelecting] = useState(false);

  // const handleRename = async (name) => {
  //   try {
  //     const res = await updateLog({
  //       id: logId,
  //       data: { name },
  //     }).unwrap();
  //     console.log(res);
  //     setLastAction(Date.now());
  //   } catch (error) {
  //     console.log(error?.data?.message || error.message);
  //   }
  // };

  // const handleDelete = async () => {
  //   try {
  //     const res = await deleteLog({
  //       id: logId,
  //     }).unwrap();
  //     console.log(res);
  //     setLastAction(Date.now());
  //   } catch (error) {
  //     console.log(error?.data?.message || error.message);
  //   }
  // };

  return (
    <div className="relative mx-auto flex md:w-[98%] m-1 trasition-all duration-100 bg-white shadow-slate-300 shadow-sm rounded hover:shadow-lg hover:mb-2 hover:mt-1 ">
      <div className="p-2 pb-4 w-full">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between gap-2">
            <Link
              to={`/log/${logId}`}
              className="block grow text-base md:text-lg font-semibold bg-gray-200 rounded p-2 "
            >
              {logName}
            </Link>

            <OutsideClick
              onOutsideClick={() => setIsSelecting(false)}
              id={logId}
            >
              <div onClick={(e) => e.stopPropagation()} className="flex gap-2">
                {isSelecting && (
                  <>
                    <button
                      className="log-tool-button min-h-10 min-w-10 md:min-h-11 md:min-w-11"
                      onClick={() =>
                        dispatch(
                          setModalState({
                            showModal: true,
                            activeModal: "rename",
                            modalData: { name: logName },
                          })
                        )
                      }
                    >
                      <TbPencil />
                    </button>

                    <button
                      className="log-tool-button min-h-10 min-w-10 md:min-h-11 md:min-w-11"
                      onClick={() =>
                        dispatch(
                          setModalState({
                            showModal: true,
                            activeModal: "delete",
                            modalData: {
                              name: logName,
                              type: "log",
                              id: logId,
                            },
                          })
                        )
                      }
                    >
                      <TbTrash />
                    </button>
                  </>
                )}
                <button
                  title="Options"
                  data-id={logId}
                  onClick={() => setIsSelecting((prev) => !prev)}
                  className="log-tool-button min-h-10 min-w-10 md:min-h-11 md:min-w-11"
                >
                  {isSelecting ? <TbX /> : <TbDotsVertical />}
                </button>
              </div>
            </OutsideClick>
          </div>

          <div className="flex gap-2 px-2 text-[0.75rem] md:text-sm text-gray-800">
            <p>{logStats.lastEdited}</p>
            <p>
              {logStats.entries} {logStats.entries > 1 ? "entries" : "entry"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogCard;

{
  /* {isRenaming && (
          <RenameModal
            isRenaming={isRenaming}
            setIsRenaming={setIsRenaming}
            displayName={displayName}
            handleSubmit={(tempName) => {
              setIsRenaming(false);
              setDisplayName(tempName);
              handleRename(tempName);
            }}
            title="Edit Log Name"
            description="Edit the name of your log"
          />
        )} */
}
{
  /* {isDeleting && (
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
        )} */
}
