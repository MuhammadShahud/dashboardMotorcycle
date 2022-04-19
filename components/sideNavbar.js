import React, { useState } from "react";
import { useSnapshot } from "valtio";
import { state } from "../valtio/state";
import { useRouter } from "next/router";

export default function sideNavbar(props) {
  const globalState = useSnapshot(state);
  const router = useRouter();

  return (
    <div
      style={{ height: "calc(100vh - 100px)" }}
      className={
        "sticky flex flex-col col-span-2 justify-between border-r border-gray-200 pt-2"
      }
    >
      <div className=" border-gray-300">
        <button
          onClick={() => {
            state.activeTab = 1;
            router.push({ pathname: "/dashboard" });
          }}
          className={`flex items-center h-14 w-full ${
            globalState.activeTab === 1 ? "bg-blue-100" : "bg-white-100"
          } pl-10`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke={`${globalState.activeTab === 1 ? "#8B3A93" : "#323A46"}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <p
            className={`font-light ml-5 text-lg ${
              globalState.activeTab === 1 ? "text-blue-900" : "text-gray-800"
            }`}
          >
            Dashboard
          </p>
        </button>
        <button
          onClick={() => {
            state.activeTab = 2;
            router.push({ pathname: "/users" });
          }}
          className={`flex items-center h-14 w-full ${
            globalState.activeTab === 2 ? "bg-blue-100" : "bg-white-100"
          } pl-10`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke={`${globalState.activeTab === 2 ? "#8B3A93" : "#323A46"}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>

          <p
            className={`font-light ml-5 text-lg ${
              globalState.activeTab === 2 ? "text-blue-900" : "text-gray-800"
            }`}
          >
            Users
          </p>
        </button>
        
        {/*<button*/}
        {/*    onClick={()=>{*/}
        {/*        state.activeTab = 5;*/}
        {/*        router.push({pathname:'/library',});*/}
        {/*    }}*/}
        {/*    className={`flex items-center h-14 w-full ${(globalState.activeTab === 5) ? "bg-blue-100" : "bg-white-100"} pl-10`}>*/}
        {/*    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={`${(globalState.activeTab === 5) ? "#8B3A93" : "#323A46"}`}>*/}
        {/*        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />*/}
        {/*    </svg>*/}

        {/*    <p className={`font-light ml-5 text-lg ${(globalState.activeTab === 5) ? "text-blue-900" : "text-gray-800"}`}>*/}
        {/*        Categories*/}
        {/*    </p>*/}
        {/*</button>*/}
        {/* <button
        onClick={() => {
          state.activeTab = 5;
          router.push({ pathname: "/library" });
        }}
        className={`flex items-center h-14 w-full ${
          globalState.activeTab === 5 ? "bg-blue-100" : "bg-white-100"
        } pl-10`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke={`${globalState.activeTab === 5 ? "#8B3A93" : "#323A46"}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>

        <p
          className={`font-light ml-5 text-lg ${
            globalState.activeTab === 5 ? "text-blue-900" : "text-gray-800"
          }`}
        >
          Library
        </p>
      </button> */}
        <button
          onClick={() => {
            state.activeTab = 6;
            router.push({ pathname: "/flashcards" });
          }}
          className={`flex items-center h-14 w-full ${
            globalState.activeTab === 6 ? "bg-blue-100" : "bg-white-100"
          } pl-10`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke={`${globalState.activeTab === 6 ? "#8B3A93" : "#323A46"}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>

          <p
            className={`font-light ml-5 text-lg ${
              globalState.activeTab === 6 ? "text-blue-900" : "text-gray-800"
            }`}
          >
            Flashcards
          </p>
        </button>
        <button
          onClick={() => {
            state.activeTab = 3;
            router.push({ pathname: "/vocabulary" });
          }}
          className={`flex items-center h-14 w-full ${
            globalState.activeTab === 3 ? "bg-blue-100" : "bg-white-100"
          } pl-10`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke={`${globalState.activeTab === 3 ? "#8B3A93" : "#323A46"}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>

          <p
            className={`font-light ml-5 text-lg ${
              globalState.activeTab === 3 ? "text-blue-900" : "text-gray-800"
            }`}
          >
            Vocabulary
          </p>
        </button>
        <button
          onClick={() => {
            state.activeTab = 7;
            router.push({ pathname: "/quizzes" });
          }}
          className={`flex items-center h-14 w-full ${
            globalState.activeTab === 7 ? "bg-blue-100" : "bg-white-100"
          } pl-10`}
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
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <p
            className={`font-light ml-5 text-lg ${
              globalState.activeTab === 7 ? "text-blue-900" : "text-gray-800"
            }`}
          >
            Quizzes
          </p>
        </button>
      </div>

      <div className="border border-gray-300 grow items-end w-full">
        <button
          onClick={() => {
            state.activeTab = 7;
            router.push({ pathname: "/profile" });
          }}
          className={`flex items-center h-14 w-full ${
            globalState.activeTab === 8 ? "bg-blue-100" : "bg-white-100"
          } pl-10`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke={`${globalState.activeTab === 8 ? "#8B3A93" : "#323A46"}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <p
            className={`font-light ml-5 text-lg ${
              globalState.activeTab === 8 ? "text-blue-900" : "text-gray-800"
            }`}
          >
            Profile
          </p>
        </button>
        <button
          onClick={() => {
            sessionStorage.clear();
            router.push({ pathname: "/login" });
          }}
          className={`flex items-center h-14 w-full ${
            globalState.activeTab === 9 ? "bg-blue-100" : "bg-white-100"
          } pl-10`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>

          <p
            className={`font-light ml-5 text-lg ${
              globalState.activeTab === 9 ? "text-blue-900" : "text-gray-800"
            }`}
          >
            Logout
          </p>
        </button>
      </div>
      {/* <button
        onClick={() => {
          state.activeTab = 7;
          router.push({ pathname: "/notification" });
        }}
        className={`flex items-center h-14 w-full ${
          globalState.activeTab === 7 ? "bg-blue-100" : "bg-white-100"
        } pl-10`}
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

        <p
          className={`font-light ml-5 text-lg ${
            globalState.activeTab === 7 ? "text-blue-900" : "text-gray-800"
          }`}
        >
          Notification
        </p>
      </button> */}
    </div>
  );
}
