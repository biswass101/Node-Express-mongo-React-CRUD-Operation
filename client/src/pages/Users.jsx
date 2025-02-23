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

  const handleAddUpdateUser = (e) => {
    e.preventDefault()
    
    setIsOpen(false)
    try {
        if(action === "Add User") {
          axios.post('http://localhost:5000/create', form)
        .then(res => {
          form.createdAt = new Date().toLocaleString()
          setUserData([...userData, form])
          // delete form.createdAt  
          toast(res.data.message)
        })
        .catch(err => {
            toast(err.response.data.error)
        })
        } else {
          const updateData = {
            name: form.name,
            email: form.email,
            mobile: form.mobile,
           }
          axios.put(`http://localhost:5000/update/${form._id}`, updateData).then((res) => {
            userData && userData.map((user) => {
              if(user._id === form._id) {
                user.name = form.name
                user.email = form.email
                user.mobile = form.mobile
                user.updatedAt = new Date().toLocaleString()
              }
            })
            setUserData([...userData])
            toast(res.data.message)
            delete form._id
            delete form.updatedAt
          })
            .catch(err => toast(err.response.data.error))
        }
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
            form = {form} setForm = {setForm}
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
                  onClick={handleAddUpdateUser}
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
