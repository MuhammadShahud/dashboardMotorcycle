import React, { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { state } from "../valtio/state";
import { ToastContainer } from "react-toastify";
import NotificationModal from "./notificationModal";
export default function Header(props) {
  const globalState = useSnapshot(state);
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setUser(globalState.authUser);
  }, [globalState.authUser]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <div
      className={
        "pl-10 pr-10 grid-column-12 justify-between flex items-center h-20 w-screen border-b border-gray-200"
      }
    >
      {showModal && (
        <NotificationModal
          toggleModal={() => {
            toggleModal();
          }}
        />
      )}
      <div style={{ height: "40px" }}>
        <img
          object-fit="true"
          className={"col-span-4 h-16"}
          src={"/logo01.jpeg"}
          style={{ height: "100%", width: "100%", objectFit: "contain" }}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex">
          <button
            onClick={() => {
              toggleModal();
            }}
            className={`flex items-center h-14 w-full  pl-10`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke={`${globalState.activeTab === 7 ? "#8B3A93" : "#323A46"}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
              />
            </svg>
            <p className="px-2">Notify</p>
          </button>
        </div>
        <div className="px-4 flex items-center">
          <p className="p-2">{user && user.fullName}</p>
          <div
            className={
              "flex h-12 w-12 rounded-full bg-blue-100 items-center justify-center"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#858A95"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute mt-16">
        <ToastContainer />
      </div>
    </div>
  );
}
