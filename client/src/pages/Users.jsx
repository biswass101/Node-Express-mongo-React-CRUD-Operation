import React, { useState } from "react";
import AddUser from "../components/AddUser";
import UserContainer from "../components/UserContainer";
import UserCreateModal from "../components/UserCreateModal";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { IoMdPersonAdd } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";

const Users = () => {
  const [userData, setUserData] = useState(null)
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState("Add User");
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddUser = (e) => {
    e.preventDefault()
    setUserData([...userData, form])
    setIsOpen(false)
    try {
        axios.post('http://localhost:5000/create', form)
        .then(res => toast(res.data.message))
        .catch(err => {
            toast(err.response.data.error)
        })
    } catch (error) {
        toast(error.message)
    }
  }
  return (
    <div>
      <div className="max-w-7xl h-[100vh] mx-auto">
        {/* Round add Button */}
        <div className="w-full flex justify-center items-center">
          <AddUser
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            action={action}
            setAction={setAction}
          />
        </div>
        {/* Users Containers */}
        <div className="w-full h-[85vh] mt-5">
          <UserContainer
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            action={action}
            setAction={setAction}
            userData = {userData}
            setUserData= {setUserData}
          />
        </div>
        <UserCreateModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          action={action}
          setAction={setAction}
        >
          <form>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-5">
                <TextField
                  onChange={handleChange}
                  name="name"
                  label="Name"
                  type="text"
                  value={form.name}
                  required
                />
                <TextField
                  onChange={handleChange}
                  name="email"
                  label="Email"
                  type="text"
                  value={form.email}
                  required
                />
                <TextField
                  onChange={handleChange}
                  name="mobile"
                  label="Mobile"
                  type="number"
                  value={form.mobile}
                  required
                />
              </div>
              <div>
                <Button
                  onClick={handleAddUser}
                  type="submit"
                  variant="contained"
                  color="success"
                  className="flex items-center gap-2"
                >
                  <IoMdPersonAdd size={20} />
                  <span className="text-md font-semibold">
                    {action === "Add User" ? "Add" : "Update"}
                  </span>
                </Button>
              </div>
            </div>
          </form>
        </UserCreateModal>
      </div>
    </div>
  );
};

export default Users;
