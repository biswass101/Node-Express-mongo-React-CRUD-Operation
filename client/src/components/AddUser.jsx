import React from "react";
import { RiUserAddFill } from "react-icons/ri";
const AddUser = ({ isOpen, setIsOpen, action, setAction }) => {
  return (
    <div
      onClick={() => {
        setIsOpen(true)
        setAction("Add User")
      }}
      className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-700 p-5 rounded-full mt-2"
    >
      <RiUserAddFill className="text-white" size={18} />
      <button className="text-md text-white hover:text-slate-100 font-bold">
        Add
      </button>
    </div>
  );
};

export default AddUser;
