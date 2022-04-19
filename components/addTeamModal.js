import React, { useEffect, useState } from "react";
import Transport from "../api/transport";

export default function AddTeamModal(props) {
  const [id, setId] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newUser, setNewUser] = useState({
    id: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    isAdmin: true,
    userRole: "ADMIN",
  });

  useEffect(() => {
    if (props.isEdit && !editing) {
      setId(props.item.id);
      setNewUser(props.item);
    }
  });

  const action = () => {
    setLoading(true);
    if (props.isEdit) {
      Transport.HTTP.updateUser(newUser, sessionStorage.getItem("token"))
        .then((res) => {
          props.toggleModal();
          setLoading(false);
          toast.success("User Updated Has Been Deleted Successfully", {
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        })
        .catch((err) => {
          toast.error(`There is An error`, {
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setLoading(false);
          props.toggleModal();
        });
    } else {
      Transport.HTTP.addUser(
        {
          email: newUser.email,
          password: newUser.password,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          phoneNumber: newUser.phoneNumber,
          isAdmin: true,
          userRole: "ADMIN",
        },
        sessionStorage.getItem("token")
      )
        .then((res) => {
          props.toggleModal();
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          props.toggleModal();
        });
    }
  };

  return (
    <div
      className="flex justify-center h-screen items-center bg-black bg-opacity-50 fixed
    inset-0
    z-50"
    >
      <div className="custom-scrollbar overflow-auto max-h-[95%] flex flex-col w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg border border-gray-300 shadow-xl">
        <div className="flex flex-row justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg">
          <p className="font-semibold text-gray-800">
            {props.isEdit ? "Edit" : "Add"} Team Member
          </p>
          <svg
            onClick={() => {
              props.toggleModal();
            }}
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>
        <div className="flex flex-col px-6 py-5 bg-gray-50">
          <p className="mb-2 font-semibold text-gray-700">First Name</p>
          <input
            value={newUser.firstName}
            onChange={(ev) => {
              setEditing(true);
              setNewUser({ ...newUser, firstName: ev.target.value });
            }}
            type="text"
            name=""
            placeholder="Type First Name"
            className="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-12"
            id=""
          />
          <p className="mb-2 font-semibold text-gray-700">Last Name</p>
          <input
            value={newUser.lastName}
            onChange={(ev) => {
              setEditing(true);
              setNewUser({ ...newUser, lastName: ev.target.value });
            }}
            type="text"
            name=""
            placeholder="Type Last Name"
            className="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-12"
            id=""
          />
          <p className="mb-2 font-semibold text-gray-700">Email</p>
          <input
            value={newUser.email}
            onChange={(ev) => {
              setEditing(true);
              setNewUser({ ...newUser, email: ev.target.value });
            }}
            type="email"
            name=""
            placeholder="Type Email Name"
            className="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-12"
            id=""
          />{" "}
          <p className="mb-2 font-semibold text-gray-700">Phone Number</p>
          <input
            value={newUser.phoneNumber}
            onChange={(ev) => {
              setEditing(true);
              setNewUser({ ...newUser, phoneNumber: ev.target.value });
            }}
            type="tel"
            name=""
            placeholder="Type Phone Number"
            className="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-12"
            id=""
          />
          <p className="mb-2 font-semibold text-gray-700">Password</p>
          <input
            value={newUser.password}
            onChange={(ev) => {
              setEditing(true);
              setNewUser({ ...newUser, password: ev.target.value });
            }}
            type="text"
            name=""
            placeholder="Type Password"
            className="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-12"
            id=""
          />
          <hr />
        </div>
        <div className="flex flex-row items-center justify-between p-5 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg">
          <p
            onClick={() => {
              props.toggleModal();
            }}
            className="font-semibold text-gray-600"
          >
            Cancel
          </p>

          {loading && (
            <div className="flex w-full items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 mt-5 border-b-4 border-blue-500" />
            </div>
          )}
          <button
            onClick={() => {
              action();
            }}
            className="px-4 py-2 text-white font-semibold bg-blue-500 rounded"
          >
            {props.isEdit ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
