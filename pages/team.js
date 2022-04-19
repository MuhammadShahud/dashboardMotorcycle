import Head from "next/head";
import { useEffect, useState } from "react";
import SideNavbar from "../components/sideNavbar";
import Header from "../components/header";
import Transport from "../api/transport";
import { useRouter } from "next/router";
import { state } from "../valtio/state";
import { useSnapshot } from "valtio";
import AddTeamModal from "../components/addTeamModal";

export default function Team() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState(users);
  const [searchText, setSearchText] = useState("");
  const snap = useSnapshot(state);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [activeItem, setActiveItem] = useState({});

  const router = useRouter();
  useEffect(() => {
    if (sessionStorage.length == 0) {
      router.push("/login");
    }
    if (loading) {
      getTeams();
    }
  }, []);
  useEffect(() => {
    setUsers(snap.teams);
  }, [state.teams]);

  useEffect(() => {
    state.activeTab = 3;
  }, [router.pathname]);

  const getTeams = () => {
    Transport.HTTP.getTeams(sessionStorage.getItem("token"))
      .then((res) => {
        const result = res.data.data.filter(
          (user) => snap.authUser.userID !== user.userID
        );
        setUsers(JSON.parse(JSON.stringify(result)));
        setSearchUsers(JSON.parse(JSON.stringify(result)));
        state.teams = JSON.parse(JSON.stringify(result));
        setLoading(false);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    setSearchUsers(
      users.filter((currUser) => {
        if (!searchText) return currUser;
        return (
          currUser.firstName.toLowerCase().includes(searchText) ||
          currUser.lastName.toLowerCase().includes(searchText) ||
          currUser.email.toLowerCase().includes(searchText) ||
          currUser.phoneNumber.toLowerCase().includes(searchText)
        );
      })
    );
  }, [searchText, snap.teams, users]);

  const handleSearch = (e) => {
    setSearchUsers(
      users.filter((currUser) => {
        if (!searchText) return currUser;
        return (
          currUser.firstName.toLowerCase().includes(searchText) ||
          currUser.lastName.toLowerCase().includes(searchText) ||
          currUser.email.toLowerCase().includes(searchText) ||
          currUser.phoneNumber.toLowerCase().includes(searchText)
        );
      })
    );
  };

  const handleToggleStatus = (userID, email, isActive) => (e) => {
    const data = state.teams.map((currUser) => {
      if (currUser.userID === userID) {
        currUser.isActive = isActive;
      }
      return currUser;
    });
    state.teams = data;
    Transport.HTTP.toggleUserStatus(
      { email, isActive },
      sessionStorage.getItem("token")
    )
      .then((res) => {})
      .catch((err) => {
        alert(err);
      });
  };

  const toggleModal = (isEdit = false, activeItem = {}) => {
    if (!isEdit) {
      setIsEdit(false);
      setActiveItem({});
    } else {
      setIsEdit(true);
      setActiveItem(activeItem);
    }
    setShowModal(!showModal);
  };

  return (
    <>
      <Header />
      {showModal && (
        <AddTeamModal
          isEdit={isEdit}
          item={activeItem}
          toggleModal={() => {
            toggleModal();
          }}
        />
      )}
      <div className={"flex grid grid-cols-12 w-screen h-screen bg-white-400"}>
        <SideNavbar />

        <div className="p-10 flex flex-col col-span-10  h-screen">
          <div className={"h-16 flex items-center justify-between  mb-4"}>
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

            <button
              onClick={() => {
                toggleModal();
              }}
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
                "h-8 w-96 border-r border-gray-300 text-black text-lg font-semibold ml-4 p-0 m-0"
              }
            >
              Name
            </p>
            <p
              className={
                "h-8 w-96 border-r border-gray-300 text-black text-lg font-semibold ml-4 p-0 m-0"
              }
            >
              Email
            </p>
            <p
              className={
                "h-8 w-96 border-r border-gray-300 text-black text-lg font-semibold ml-4 p-0 m-0"
              }
            >
              Phone Number
            </p>
            <p
              className={
                "h-8 w-64 border-r border-gray-300 text-black text-lg font-semibold ml-4 p-0 m-0"
              }
            >
              Date Added
            </p>

            <p
              className={
                "h-8 w-60 border-r border-gray-300 text-black text-lg font-semibold ml-4 p-0 m-0"
              }
            >
              Role
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
                    phoneNumber,
                    isAdmin,
                    email,
                    userID,
                    isActive,
                    updatedAt,
                    userRole,
                  },
                  index
                ) => {
                  return (
                    <div
                      onClick={() => {
                        toggleModal(true, {
                          firstName,
                          lastName,
                          phoneNumber,
                          isAdmin,
                          email,
                          userID,
                          isActive,
                          updatedAt,
                        });
                      }}
                      className={
                        "cursor-pointer h-16 w-full flex items-center bg-white pl-4 pr-4 border-b border-gray-200"
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
                          "h-8 w-96 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                        }
                      >
                        {firstName + " " + lastName}
                      </p>
                      <p
                        className={
                          "h-8 w-96 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                        }
                      >
                        {email}
                      </p>
                      <p
                        className={
                          "h-8 w-96 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                        }
                      >
                        {phoneNumber}
                      </p>
                      <p
                        className={
                          "h-8 w-64 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                        }
                      >
                        {new Date(updatedAt).toDateString()}
                      </p>

                      <p
                        className={
                          "h-8 w-64 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                        }
                      >
                        {userRole}
                      </p>
                      <p
                        className={
                          "h-8 w-40 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                        }
                      >
                        {isActive ? "Active" : "InActive"}
                      </p>
                      <div
                        className={
                          "h-8 w-40 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                        }
                      >
                        <label
                          htmlFor={`${userID}${index}`}
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
                              id={`${userID}${index}`}
                            />
                            <div className="back block bg-gray-300 w-14 h-8 rounded-full"></div>
                            <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                          </div>
                        </label>
                      </div>
                    </div>
                  );
                }
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
