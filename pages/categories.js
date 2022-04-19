import Head from "next/head";
import { useEffect, useState } from "react";
import SideNavbar from "../components/sideNavbar";
import Header from "../components/header";
import LibraryModal from "../components/libraryModal";
import { useRouter } from "next/router";
import { state } from "../valtio/state";

export default function Library() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (sessionStorage.length == 0) {
      router.push("/login");
    }
  });

  useEffect(() => {
    state.activeTab = 5;
  }, [router.pathname]);

  return (
    <>
      <LibraryModal />
      <Header />
      <div className={"flex grid grid-cols-12 w-screen h-screen bg-white-400"}>
        <SideNavbar />

        <div className="p-10 flex flex-col col-span-10  h-screen">
          <div className={"h-16 flex items-center justify-between  mb-4"}>
            <input className={"h-12 w-1/5 border border-gray-300"} />
            <button
              className={
                "h-12 w-80 bg-blue-500 flex items-center justify-center rounded-sm"
              }
            >
              <p className={"text-lg text-white"}>Add New</p>
            </button>
          </div>

          <div
            className={"h-16 w-full flex items-center bg-gray-100 pl-4 pr-4"}
          >
            <p
              className={
                "h-8 w-20 border-r border-gray-300 text-black text-lg font-semibold p-0 m-0 text-center"
              }
            >
              #
            </p>
            <p
              className={
                "h-8 w-64 border-r border-gray-300 text-black text-lg font-semibold ml-4 p-0 m-0"
              }
            >
              Categories
            </p>
            <p
              className={
                "h-8 w-64 border-r border-gray-300 text-black text-lg font-semibold ml-4 p-0 m-0"
              }
            >
              Tag
            </p>
            <p
              className={
                "h-8 w-96 border-r border-gray-300 text-black text-lg font-semibold ml-4 p-0 m-0"
              }
            >
              Description
            </p>
            <p
              className={
                "h-8 w-60 border-r border-gray-300 text-black text-lg font-semibold ml-4 p-0 m-0"
              }
            >
              Created Date
            </p>
          </div>

          {loading ? (
            <div className="flex w-full items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 mt-5 border-b-4 border-blue-500" />
            </div>
          ) : (
            <>
              <div
                className={
                  "h-16 w-full flex items-center bg-white pl-4 pr-4 border-b border-gray-200"
                }
              >
                <p
                  className={
                    "h-8 w-20 border-gray-300 text-gray-600 text-lg  p-0 m-0 text-center"
                  }
                >
                  1
                </p>

                <p
                  className={
                    "h-8 w-64 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                  }
                >
                  The Job
                </p>
                <p
                  className={
                    "h-8 w-64 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                  }
                >
                  Introduction
                </p>
                <p
                  className={
                    "h-8 w-96 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                  }
                >
                  Sample Category Description
                </p>
                <p
                  className={
                    "h-8 w-64 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                  }
                >
                  10/04/2021
                </p>
              </div>
              <div
                className={
                  "h-16 w-full flex items-center bg-white pl-4 pr-4 border-b border-gray-200"
                }
              >
                <p
                  className={
                    "h-8 w-20 border-gray-300 text-gray-600 text-lg  p-0 m-0 text-center"
                  }
                >
                  2
                </p>

                <p
                  className={
                    "h-8 w-64 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                  }
                >
                  Agency Law
                </p>
                <p
                  className={
                    "h-8 w-64 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                  }
                >
                  Exam Topic
                </p>
                <p
                  className={
                    "h-8 w-96 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                  }
                >
                  -
                </p>
                <p
                  className={
                    "h-8 w-64 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                  }
                >
                  08/04/2021
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
