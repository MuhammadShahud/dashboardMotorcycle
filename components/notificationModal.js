import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Transport from "../api/transport";

export default function NotificationModal(props) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sendTo, setSendTo] = useState("all-users");
  const action = () => {
    setLoading(true);
    setTimeout(() => {
      const data = { title, body: description, receivers: sendTo };
      Transport.HTTP.sendGroupNotification(
        data,
        sessionStorage.getItem("token")
      )
        .then((res) => {
          props.toggleModal();
          setLoading(false);
          toast.info("Notification Has Been Sent Successfully", {
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
    }, 2000);
  };

  return (
    <div
      className="flex justify-center h-screen items-center bg-black bg-opacity-50 fixed
    inset-0
    z-50"
    >
      <div className="custom-scrollbar overflow-auto max-h-[95%] flex flex-col w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg border border-gray-300 shadow-xl">
        <div className="flex flex-row justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg">
          <p className="font-semibold text-gray-800">Notify</p>
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
          <p className="mb-2 font-semibold text-gray-700">Notification Title</p>
          <input
            value={title}
            onChange={(ev) => {
              setTitle(ev.target.value);
            }}
            type="text"
            name=""
            placeholder="Type Notification Title"
            className="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-12"
            id=""
          />
          <p className="mb-2 font-semibold text-gray-700">Send To</p>
          <select
            value={sendTo}
            onChange={(ev) => {
              setSendTo(ev.target.value);
            }}
            type="text"
            name=""
            className="w-full p-3 mb-5 bg-white border border-gray-200 rounded shadow-sm appearance-none"
            id=""
          >
            <option value="all-users">All Users</option>
            <option value="all-teams">All Teams</option>
            <option value="free-users">Free Users</option>
            <option value="premium-users">Premium Users</option>
          </select>

          <p className="mb-2 font-semibold text-gray-700">Body</p>
          <textarea
            value={description}
            onChange={(ev) => {
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
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
