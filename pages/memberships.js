import Head from "next/head";
import { useEffect, useState } from "react";
import SideNavbar from "../components/sideNavbar";
import Header from "../components/header";
import { useRouter } from "next/router";
import { state } from "../valtio/state";
import MembershipModal from "../components/membershipModal";
import Transport from "../api/transport";
import { useSnapshot } from "valtio";
import { toast } from "react-toastify";

export default function Memberships() {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [activeItem, setActiveItem] = useState({});

  const [searchText, setSearchText] = useState("");
  const [memberships, setMemberships] = useState([
    // {
    //   id: 1,
    //   title: "Gold",
    //   type: "Weekly",
    //   description: "some description",
    //   price: 32,
    // },
    // {
    //   id: 2,
    //   title: "Silver",
    //   type: "Monthly",
    //   description: "some description",
    //   price: 99,
    // },
    // {
    //   id: 3,
    //   title: "Platinium",
    //   type: "Lifetime",
    //   description: "some description",
    //   price: 343,
    // },
  ]);
  const [searchMemberships, setSearchMemberships] = useState(memberships);

  const router = useRouter();
  const snap = useSnapshot(state);

  useEffect(() => {
    state.activeTab = 4;
  }, [router.pathname]);

  useEffect(() => {
    if (sessionStorage.length == 0) {
      router.push("/login");
    }
    if (memberships.length < 1) {
      getMemberships();
    }
  }, [snap.memberships]);

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

  const getMemberships = () => {
    Transport.HTTP.getMemberships(sessionStorage.getItem("token"))
      .then((res) => {
        setMemberships(JSON.parse(JSON.stringify(res.data.data)));
        setSearchMemberships(JSON.parse(JSON.stringify(res.data.data)));
        state.memberships = JSON.parse(JSON.stringify(res.data.data));
        setLoading(false);
      })
      .catch((err) => {
        // alert(err)
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchMemberships(
      memberships.filter((membership) => {
        if (!searchText) return membership;
        return (
          membership.title.toLowerCase().includes(searchText) ||
          membership.type.toLowerCase().includes(searchText) ||
          membership.price.toString().toLowerCase().includes(searchText) ||
          membership.description.toString().toLowerCase().includes(searchText)
        );
      })
    );
  };

  useEffect(() => {
    setSearchMemberships(
      memberships.filter((membership) => {
        if (!searchText) return membership;
        return (
          membership.title.toLowerCase().includes(searchText) ||
          membership.type.toLowerCase().includes(searchText) ||
          membership.price.toString().toLowerCase().includes(searchText)
        );
      })
    );
  }, [searchText, snap.memberships]);

  const handleDelete = (id) => (e) => {
    const del = confirm("Are Your Sure you want to delete?").valueOf();
    if (del) {
      state.memberships = state.memberships.filter((fs) => fs.id !== id);
      Transport.HTTP.deleteMembership(id, sessionStorage.getItem("token"))
        .then((res) => {
          toast.success("Membership Has Been Deleted Successfully", {
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setLoading(false);
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
        });
    }
  };

  return (
    <>
      <Header />
      {showModal && (
        <MembershipModal
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
              <form onSubmit={handleSearch}>
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
              NO.
            </p>

            <p
              className={
                "h-8 w-96 border-r border-gray-300 text-black text-lg font-semibold ml-4 p-0 m-0"
              }
            >
              Membership Title
            </p>
            <p
              className={
                "h-8 w-96 border-r border-gray-300 text-black text-lg font-semibold ml-4 p-0 m-0"
              }
            >
              Membership Type
            </p>
            <p
              className={
                "h-8 w-96 border-r border-gray-300 text-black text-lg font-semibold ml-4 p-0 m-0"
              }
            >
              Price
            </p>
            <p
              className={
                "h-8 w-60 border-gray-300 text-black text-lg font-semibold ml-4 p-0 m-0"
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
              {searchMemberships &&
                searchMemberships.map((membership, index) => {
                  return (
                    <div
                      key={index}
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
                          "h-8 w-96 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                        }
                      >
                        {membership.title}
                      </p>
                      <p
                        className={
                          "h-8 w-96 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                        }
                      >
                        {membership.type}
                      </p>
                      <p
                        className={
                          "h-8 w-96 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                        }
                      >
                        ${membership.price}
                      </p>
                      <div
                        className={
                          "flex h-8 w-60 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                        }
                      >
                        <button
                          onClick={() => {
                            toggleModal(true, membership);
                          }}
                          className="bg-blue-300 hover:text-gray-800 hover:bg-blue-400   py-1 px-5 rounded inline-flex items-center"
                        >
                          <span className="text-white hover:text-gray-800">
                            Edit
                          </span>
                        </button>
                        <button
                          onClick={handleDelete(membership.id)}
                          className="mx-1 bg-red-300 hover:text-red-800 hover:bg-red-400   py-1 px-5 rounded inline-flex items-center"
                        >
                          <span className="text-white hover:text-gray-800">
                            Delete
                          </span>
                        </button>
                      </div>
                    </div>
                  );
                })}
            </>
          )}
        </div>
      </div>
    </>
  );
}
