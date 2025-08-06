import { TbCheck, TbPencil, TbX } from "react-icons/tb";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ManageCategory from "../ManageCategory";
import { setDefaultCategories } from "../../slices/logSlice";
import { useUpdateMutation } from "../../slices/userApiSlice";
import { setPreferences } from "../../slices/userSlice";

const DefaultCategories = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { defaultCategories } = useSelector((state) => state.logs);
  const [updateProfile, { isLoading }] = useUpdateMutation();
  const [tempList, setTempList] = useState(defaultCategories);
  const [category, setCategory] = useState(null);
  const [action, setAction] = useState("");
  const [isManaging, setIsManaging] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [tempList]);

  useEffect(() => {
    setTempList(defaultCategories);
  }, [defaultCategories]);

  const handleClick = (selectedCategory) => {
    if (tempList.length === 1) {
      return setError("Categories cannot be empty");
    }

    const newCategories = tempList.filter((cat) => cat !== selectedCategory);
    setTempList(newCategories);
    return;
  };

  const close = () => {
    setIsManaging(false);
    setCategory(null);
    setAction("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setDefaultCategories(tempList));
    try {
      const res = await updateProfile({
        logPreferences: { defaultCategories: tempList },
      }).unwrap();
      dispatch(setPreferences(res.logPreferences));
      closeModal();
    } catch (error) {
      const errorMsg = error?.data?.message || error.message;
      setError(errorMsg);
    }
  };

  return isManaging ? (
    <ManageCategory close={close} action={action} category={category} />
  ) : (
    <form
      method="POST"
      id="manageCategories"
      onSubmit={handleSubmit}
      className="flex flex-col relative gap-1"
    >
      <menu className="rounded text-center text-base flex flex-col gap-1">
        <li className="modal-input-container">
          <div className="flex w-full rounded gap-1 text-sm md:text-base">
            <button
              type="button"
              className="bg-gray-200 rounded w-full min-h-10 p-1"
              onClick={() => {
                setAction("add");
                setIsManaging(true);
              }}
            >
              Add New
            </button>
            <button
              type="button"
              className="bg-gray-200 rounded w-full min-h-10 p-1"
              onClick={() => setTempList(defaultCategories)}
            >
              Reset Values
            </button>
          </div>
        </li>

        {tempList.map((cat, index) => (
          <li key={index} className="modal-input-container">
            <div
              className="flex items-center justify-between p-1 px-2 rounded w-full min-h-10 text-sm md:text-base"
              style={{ backgroundColor: cat.color }}
            >
              {cat.name}
              <div className="space-x-1 flex items-center">
                <button
                  type="button"
                  className="text-xl p-1 rounded
                   text-blue-400
                   bg-white
                   hover:border-transparent hover:shadow shadow-gray-700/50 
                   transition-all duration-300"
                  onClick={() => {
                    setIsManaging(true);
                    setAction("edit");
                    setCategory({
                      name: cat.name,
                      color: cat.color,
                      type: cat.type,
                    });
                  }}
                >
                  <TbPencil />
                </button>
                <button
                  type="button"
                  className="text-xl p-1 rounded
                   text-red-400
                   bg-white
                   hover:border-transparent hover:shadow shadow-gray-700/50 
                   transition-all duration-300"
                  onClick={() => {
                    handleClick(cat);
                  }}
                >
                  <TbX />
                </button>
              </div>
            </div>
          </li>
        ))}
      </menu>

      {error && (
        <div className="mx-1 text-left text-red-500 md:text-sm text-xs">
          {error}
        </div>
      )}
      {!isManaging && (
        <button className="modal-action-button" formNoValidate>
          Save
        </button>
      )}
    </form>
  );
};

export default DefaultCategories;
