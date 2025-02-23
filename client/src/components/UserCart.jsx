import React from "react";
import { TbListDetails } from "react-icons/tb";
import { LiaUserEditSolid } from "react-icons/lia";
import { HiUserRemove } from "react-icons/hi";
import { IoIosTimer } from "react-icons/io";
import { MdOutlineUpdate } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
const UserCart = ({form, setForm, setIsOpen, setAction, userData, setUserData, _id, name, email, mobile, createdAt, updatedAt }) => {
  // console.log(userData)  
  const handleClick = () => {
    setIsOpen(true);
    setAction("Update User")
    setForm({name, email, mobile, _id})
  };
  const handleUserRemove = () => {
    axios.delete(`http://localhost:5000/delete/${_id}`)
     .then(res => toast(res.data.message))
     .catch(err => toast(err.message))
    const removedUser = userData.filter((user) => user._id != _id)
    setUserData(removedUser)
  }
  return (
    <div className="px-5 py-3 bg-white rounded-lg min-w-[22rem]">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-5 bg-green-300 rounded-lg p-2">
          <div className="flex items-center gap-2">
            <TbListDetails size={20} />
            <h1 className="font-bold text-lg">User Details</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleClick}
              className="flex justify-center items-center hover:bg-green-800 hover:text-white 
            rounded-full p-1"
            >
              <LiaUserEditSolid size={25} />
            </button>
            <button
              onClick={handleUserRemove}
              className="flex justify-center items-center hover:bg-red-800 hover:text-white 
            rounded-full p-1"
            >
              <HiUserRemove size={25} />
            </button>
          </div>
        </div>
        <div className="flex flex-col font-semibold">
          <h2>{name}</h2>
          <p>{email}</p>
          <p>{mobile}</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="flex gap-1 items-center">
            <IoIosTimer />
            created at <span>{new Date(createdAt).toLocaleString()}</span>
          </p>
          <p className="flex gap-1 items-center">
            <MdOutlineUpdate />
            updated at <span>{new Date(updatedAt).toLocaleString()}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCart;
