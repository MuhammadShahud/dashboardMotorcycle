import Head from "next/head";
import { useEffect, useState } from "react";
import SideNavbar from "../components/sideNavbar";
import Header from "../components/header";
import Transport from "../api/transport";
import { useRouter } from "next/router";
import { state } from "../valtio/state";
import { useSnapshot } from "valtio";

export default function Users() {
  const snap = useSnapshot(state);

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState(users);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  useEffect(() => {
    state.activeTab = 2;
  }, [router.pathname]);

  useEffect(() => {
    setUsers(snap.users);
  }, [state.users]);

  useEffect(() => {
    if (sessionStorage.length == 0) {
      router.push("/login");
    }
    if (users.length < 1) {
      getUsers();
    }
  }, [snap.users]);

  const getUsers = () => {
    Transport.HTTP.getUsers(sessionStorage.getItem("token"))
      .then((res) => {
        const result = res.data.data.map((user) => {
          return user;
        });
        setUsers(JSON.parse(JSON.stringify(result)));
        setSearchUsers(JSON.parse(JSON.stringify(result)));
        state.users = JSON.parse(JSON.stringify(result));
        setLoading(false);
      })
      .catch((err) => {
        // alert(err)
      });
  };

  useEffect(() => {
    setSearchUsers(
      users.filter((user) => {
        if (!searchText) return user;
        return (
          user.firstName.toLowerCase().includes(searchText) ||
          user.lastName.toLowerCase().includes(searchText) ||
          user.email.toLowerCase().includes(searchText) ||
          user.phoneNumber.toLowerCase().includes(searchText)
        );
      })
    );
  }, [searchText, users]);

  const handleToggleStatus = (userID, email, isActive) => (e) => {
    const data = state.users.map((currUser) => {
      if (currUser.userID === userID) {
        currUser.isActive = isActive;
      }
      return currUser;
    });
    state.users = data;
    Transport.HTTP.toggleUserStatus(
      { email, isActive },
      sessionStorage.getItem("token")
    )
      .then((res) => {})
      .catch((err) => {
        alert(err);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchUsers(
      users.filter((user) => {
        if (!searchText) return user;
        return (
          user.firstName.toLowerCase().includes(searchText) ||
          user.lastName.toLowerCase().includes(searchText) ||
          user.email.toLowerCase().includes(searchText) ||
          user.phoneNumber.toLowerCase().includes(searchText)
        );
      })
    );
  };

  return (
    <>
      <Header />
      <div className={"flex grid grid-cols-12 w-screen h-screen bg-white-400"}>
        <SideNavbar />

        <div className="overflow-auto p-10 flex flex-col col-span-10  h-screen">
          {/*<div className={"h-16 flex items-center justify-between  mb-4"}>*/}
          {/*    <input className={"h-12 w-1/5 border border-gray-300"}/>*/}
          {/*    <button className={"h-12 w-80 bg-blue-500 flex items-center justify-center rounded-sm"}>*/}
          {/*        <p className={"text-lg text-white"}>*/}
          {/*            Add New*/}
          {/*        </p>*/}
          {/*    </button>*/}
          {/*</div>*/}

          <div className="pb-3">
            <form method="GET" onSubmit={handleSearch}>
              <div className="relative min-w-50">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <button
                    type="submit"
                    className="p-1 focus:outline-none focus:shadow-outline"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      className="w-6 h-6"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </button>
                </span>
                <input
                  type="search"
                  name="q"
                  className="py-2 text-sm text-white border rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
                  placeholder="Search..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  autoComplete="off"
                />
              </div>
            </form>
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
              Name
            </p>
            <p
              className={
                "h-8 w-64 border-r border-gray-300 text-black text-lg font-semibold ml-4 p-0 m-0"
              }
            >
              Email
            </p>
            <p
              className={
                "h-8 w-64 border-r border-gray-300 text-black text-lg font-semibold ml-4 p-0 m-0"
              }
            >
              Date
            </p>
            <p
              className={
                "h-8 w-40 border-r border-gray-300 text-black text-lg font-semibold ml-4 p-0 m-0"
              }
            >
              Subscription
            </p>
            <p
              className={
                "h-8 w-40 border-r border-gray-300 text-black text-lg font-semibold ml-4 p-0 m-0"
              }
            >
              Status
            </p>
            <p
              className={
                "h-8 w-40 border-r border-gray-300 text-black text-lg font-semibold ml-4 p-0 m-0"
              }
            >
              Action
            </p>
          </div>

          {loading ? (
            <div className="flex w-full items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 mt-5 border-b-4 border-blue-500" />
            </div>
          ) : (
            <>
              {searchUsers.map(
                (
                  {
                    firstName,
                    lastName,
                    email,
                    isActive,
                    userID,
                    createdAt,
                    subscription,
                  },
                  index
                ) => (
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
                      {index + 1}
                    </p>
                    <p
                      className={
                        "h-8 w-64 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                      }
                    >
                      {firstName + " " + lastName}
                    </p>
                    <p
                      className={
                        "h-8 w-64 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                      }
                    >
                      {email}
                    </p>
                    <p
                      className={
                        "h-8 w-64 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                      }
                    >
                      {new Date(createdAt).toDateString()}
                    </p>
                    <p
                      className={
                        "h-8 w-40 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                      }
                    >
                      {subscription}
                    </p>
                    <p
                      className={
                        "h-8 w-40 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                      }
                    >
                      <div className="ml-3 text-gray-700 font-medium">
                        {isActive ? "Active" : "InActive"}
                      </div>
                    </p>
                    <div
                      className={
                        "h-8 w-40 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                      }
                    >
                      <label
                        htmlFor={userID}
                        className="flex items-center cursor-pointer"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={isActive}
                            onChange={handleToggleStatus(
                              userID,
                              email,
                              !isActive
                            )}
                            className="sr-only"
                            id={userID}
                          />
                          <div className="back block bg-gray-300 w-14 h-8 rounded-full"></div>
                          <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                        </div>
                      </label>
                    </div>
                  </div>
                )
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
