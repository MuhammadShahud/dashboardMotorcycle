import React, { useEffect, useState } from "react";
import Transport from "../api/transport";

export default function LibraryModal(props) {
  const [id, setId] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subscription, setSubscription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    if (props.isEdit && !editing) {
      setId(props.item.id);
      setTitle(props.item.title);
      setDescription(props.item.description);
      setSubscription(props.item.subscription);
      setPrice(props.item.price);
      setDuration(props.item.duration);
    }
  });

  const action = () => {
    var data = { id, title, description, subscription, price, duration };
    setLoading(true);
    if (props.isEdit) {
      Transport.HTTP.editCategory(data, sessionStorage.getItem("token"))
        .then((res) => {
          props.toggleModal();
          setLoading(false);
        })
        .catch((err) => {
          alert(err);
          setLoading(false);
          props.toggleModal();
        });
    } else {
      Transport.HTTP.addCategory(data, sessionStorage.getItem("token"))
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
          <p className="font-semibold text-gray-800">Add Flash Card</p>
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
          <p className="mb-2 font-semibold text-gray-700">Flash Card Name</p>
          <input
            value={title}
            onChange={(ev) => {
              setEditing(true);
              setTitle(ev.target.value);
            }}
            type="text"
            name=""
            placeholder="Type Name"
            className="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-12"
            id=""
          />
          <p className="mb-2 font-semibold text-gray-700">Subscription Type</p>
          <select
            value={subscription}
            onChange={(ev) => {
              setEditing(true);
              setSubscription(ev.target.value);
            }}
            type="text"
            name=""
            className="w-full p-3 mb-5 bg-white border border-gray-200 rounded shadow-sm appearance-none"
            id=""
          >
            <option value="free">Free</option>
            <option value="premium">Premium</option>
          </select>
          <p className="mb-2 font-semibold text-gray-700">Price</p>
          <input
            value={price}
            onChange={(ev) => {
              setEditing(true);
              setPrice(ev.target.value);
            }}
            type="text"
            name=""
            placeholder="$ 0"
            className="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-12"
            id=""
          />
          <p className="mb-2 font-semibold text-gray-700">Duration (in days)</p>
          <input
            value={duration}
            onChange={(ev) => {
              setEditing(true);
              setDuration(ev.target.value);
            }}
            type="text"
            name=""
            placeholder="type durations"
            className="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-12"
            id=""
          />
          <p className="mb-2 font-semibold text-gray-700">Description</p>
          <textarea
            value={description}
            onChange={(ev) => {
              setEditing(true);
              setDescription(ev.target.value);
            }}
            type="text"
            name=""
            placeholder="Type message..."
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
