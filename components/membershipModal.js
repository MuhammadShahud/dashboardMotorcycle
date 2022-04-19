import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Transport from "../api/transport";

export default function MembershipModal(props) {
  const [id, setId] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newMembership, setNewMembership] = useState({
    id: "",
    title: "",
    type: "",
    price: "",
    description: "",
    createdAt: "",
  });

  useEffect(() => {
    if (props.isEdit && !editing) {
      setId(props.item.id);
      setNewMembership(props.item);
    }
  });

  const action = () => {
    setLoading(true);
    if (props.isEdit) {
      Transport.HTTP.updateMembership(
        newMembership.id,
        newMembership,
        sessionStorage.getItem("token")
      )
        .then((res) => {
          toast.info("Membership Has Been Updated Successfully", {
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          props.toggleModal();

          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(`There is An error`, {
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          props.toggleModal();
        });
    } else {
      Transport.HTTP.addMembership(
        newMembership,
        sessionStorage.getItem("token")
      )
        .then((res) => {
          props.toggleModal();
          setLoading(false);
          toast.success("Membership Has Been Added Successfully", {
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        })
        .catch((err) => {
          setLoading(false);
          props.toggleModal();
          toast.error(`There is An error`, {
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    }
  };

  return (
    <div
      className="flex justify-center h-screen items-center bg-black bg-opacity-50 fixed
    inset-0
    z-50"
    >
      {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Button
</button>

<button className="btn btn-blue">
  Button
</button>

<style>

</style> */}
      <div className="custom-scrollbar overflow-auto max-h-[95%] flex flex-col w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg border border-gray-300 shadow-xl">
        <div className="flex flex-row justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg">
          <p className="font-semibold text-gray-800">Add New Membership</p>
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
          <p className="mb-2 font-semibold text-gray-700">Membership Title</p>
          <input
            value={newMembership.title}
            onChange={(ev) => {
              setEditing(true);
              setNewMembership({ ...newMembership, title: ev.target.value });
            }}
            type="text"
            name=""
            placeholder="Type Membership Title"
            className="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-12"
            id=""
          />
          <p className="mb-2 font-semibold text-gray-700">Membership Type</p>
          <input
            value={newMembership.type}
            onChange={(ev) => {
              setEditing(true);
              setNewMembership({ ...newMembership, type: ev.target.value });
            }}
            type="text"
            name=""
            placeholder="Type Membership Type"
            className="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-12"
            id=""
          />
          <p className="mb-2 font-semibold text-gray-700">Price</p>
          <input
            value={newMembership.price}
            onChange={(ev) => {
              setEditing(true);
              setNewMembership({ ...newMembership, price: ev.target.value });
            }}
            type="number"
            name=""
            placeholder="Type Price Name"
            className="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-12"
            id=""
          />{" "}
          <p className="mb-2 font-semibold text-gray-700">Description</p>
          <textarea
            value={newMembership.description}
            onChange={(ev) => {
              setEditing(true);
              setNewMembership({
                ...newMembership,
                description: ev.target.value,
              });
            }}
            type="text"
            name=""
            placeholder="Type front description..."
            className="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-36"
            id=""
          ></textarea>
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
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
