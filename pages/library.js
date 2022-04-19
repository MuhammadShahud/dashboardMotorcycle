import Head from "next/head";
import { useEffect, useState } from "react";
import SideNavbar from "../components/sideNavbar";
import Header from "../components/header";
import LibraryModal from "../components/libraryModal";
import Transport from "../api/transport";
import { useRouter } from "next/router";
import { state } from "../valtio/state";

export default function Library() {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [activeItem, setActiveItem] = useState({});

  const [categories, setCategories] = useState([]);
  const [searchCategories, setSearchCategories] = useState(categories);
  const router = useRouter();

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    state.activeTab = 5;
  }, [router.pathname]);

  useEffect(() => {
    setSearchCategories(
      categories.filter((category) => {
        if (!searchText) return category;
        return (
          category.title.toLowerCase().includes(searchText) ||
          category.description.toLowerCase().includes(searchText)
        );
      })
    );
  }, [searchText]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchCategories(
      categories.filter((category) => {
        if (!searchText) return category;
        return (
          category.title.toLowerCase().includes(searchText) ||
          category.description.toLowerCase().includes(searchText)
        );
      })
    );
  };

  useEffect(() => {
    if (sessionStorage.length == 0) {
      router.push("/login");
    }
    if (loading) {
      getCategories();
    }
  });

  const getCategories = () => {
    Transport.HTTP.getCategory(sessionStorage.getItem("token"))
      .then((res) => {
        setCategories(res.data.data);
        setSearchCategories(res.data.data);
        setLoading(false);
      })
      .catch((err) => alert(err));
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
      {showModal && (
        <LibraryModal
          isEdit={isEdit}
          item={activeItem}
          toggleModal={() => {
            toggleModal();
          }}
        />
      )}

      <Header />
      <div className={"flex grid grid-cols-12 w-screen h-screen bg-white-400"}>
        <SideNavbar />

        <div className="p-10 flex flex-col col-span-10  h-screen">
          <div className={"h-16 flex items-center justify-between  mb-4"}>
            <div>
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
              {searchCategories.map((cat, index) => (
                <div
                  onClick={() => {
                    toggleModal(true, cat);
                  }}
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
                    {cat.title}
                  </p>
                  <p
                    className={
                      "h-8 w-64 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                    }
                  >
                    {cat.subscription}
                  </p>
                  <p
                    className={
                      "h-8 w-96 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                    }
                  >
                    {cat.description}
                  </p>
                  <p
                    className={
                      "h-8 w-64 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                    }
                  >
                    {new Date(cat.createdAt).toDateString()}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
