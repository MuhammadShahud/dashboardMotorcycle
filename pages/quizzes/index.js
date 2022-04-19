import Head from "next/head";
import { useEffect, useState } from "react";
import SideNavbar from "../../components/sideNavbar";
import Header from "../../components/header";
import Transport from "../../api/transport";
import QuestionModal from "../../components/questionModal";
import { useRouter } from "next/router";
import { state } from "../../valtio/state";
import { useSnapshot } from "valtio";

export default function Quizzes() {


  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [activeItem, setActiveItem] = useState({});
  const [searchText, setSearchText] = useState("");
  const [flashcardSets, setFlashcardSets] = useState([]);
  const snap = useSnapshot(state);
  const [searchFlashcardSets, setSearchFlashcardSets] = useState([
    {
      id: 1,
      title: "some",
      titleSlug: "some",
      desc: "some description",
      premium: false,

      createdAt: "12/3/23",
      cards: [
        {
          front: "some",
          back: "back",
        },
      ],
    },
    {
      id: 2,
      title: "another",
      titleSlug: "another",
      desc: "some description",
      premium: false,
      createdAt: "12/3/23",
      cards: [
        {
          front: "some",
          back: "back",
        },
      ],
    },
  ]);
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.length == 0) {
      router.push("/login");
    }
    if (loading) {
      getFlashcards();
      console.log('working')
    }
  }, [state.flashcards, router.pathname]);
  useEffect(() => {
    setFlashcardSets(snap.flashcards);
  }, [state.flashcards]);

  useEffect(() => {
    state.activeTab = 7;
  }, [router.pathname]);

  const getFlashcards = () => {
    Transport.HTTP.getQuizesSet()
      .then((res) => {
        setFlashcardSets(res.data.results);
        setSearchFlashcardSets(res.data.results);
        state.flashcards = (res.data.results);
        console.log(res.data.results)
        setLoading(false);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    setSearchFlashcardSets(
      flashcardSets.filter((currFlashcard) => {
        if (!searchText) return currFlashcard;
        return (
          currFlashcard.title.toLowerCase().includes(searchText) ||
          currFlashcard.description.toLowerCase().includes(searchText) ||
          currFlashcard.subscriptionType.toLowerCase().includes(searchText)
        );
      })
    );
  }, [searchText, flashcardSets, snap.flashcards]);

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

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchFlashcardSets(
      flashcardSets.filter((currFlashcard) => {
        if (!searchText) return currFlashcard;
        return (
          currFlashcard.title.toLowerCase().includes(searchText) ||
          currFlashcard.desc.toLowerCase().includes(searchText) ||
          currFlashcard.premium.toLowerCase().includes(searchText)
        );
      })
    );
  };
  return (
    <>
      {showModal && (
        <FlashCardModal
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
        <div className="flex flex-col col-span-10 custom-scrollbar overflow-auto max-h-[95%] py-50 ">
          <div className="p-10 py-50 flex flex-col ">
            <div className={"h-16 flex items-center justify-between  mb-4"}>
              <div className="pb-2">
                <p className={"text-lg text-bold fs-32"}
                  style={{ fontSize: "38px" }}
                >QUIZES</p>
              </div>
              <button
                onClick={() => {
                  router.push("/quizzes/create");
                }}
                className={
                  "h-12 w-80 bg-blue-500 flex items-center justify-center rounded-sm"
                }
              >
                <p className={"text-lg text-white"}>Add New Quiz</p>
              </button>
            </div>

            <div
              className={
                "h-16 w-full flex items-center bg-gray-100 pl-4 pr-4 py-5"
              }
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
                  "truncate h-8 w-64 border-r border-gray-300 text-black text-lg font-semibold ml-4 p-0 m-0"
                }
              >
                Title
              </p>
              <p
                className={
                  "truncate h-8 w-64 border-r border-gray-300 text-black text-lg font-semibold ml-4 p-0 m-0"
                }
              >
                Description
              </p>
              <p
                className={
                  "truncate h-8 w-96 border-r border-gray-300 text-black text-lg font-semibold ml-4 p-0 m-0 text-center"
                }
              >
                Author
              </p>
              <p
                className={
                  "truncate h-8 w-96 border-r border-gray-300 text-black text-lg font-semibold ml-4 p-0 m-0"
                }
              >
                Subscription Type
              </p>

              <p
                className={
                  "truncate h-8 w-96 border-r border-gray-300 text-black text-lg font-semibold ml-4 p-0 m-0"
                }
              >
                Date
              </p>
            </div>

            {loading ? (
              <div className="flex w-full items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 mt-5 border-b-4 border-blue-500" />
              </div>
            ) : (
              <div className="py-15 mb-15 border flex-col flex ">
                {searchFlashcardSets &&
                  searchFlashcardSets.map((flashcardSet, index) => {
                    return (
                      <div
                        onClick={() => {
                          const url = `/quizzes/${flashcardSet.id}`;
                          console.log("url -->> ", url);
                          router.push(url);
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
                            "truncate h-8 w-64 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                          }
                        >
                          {flashcardSet.title}
                        </p>
                        <p
                          className={
                            "truncate h-8 w-64 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0 "
                          }
                        >
                          {flashcardSet.desc}
                        </p>
                        <p
                          className={
                            "truncate h-8 w-64 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0 text-center"
                          }
                        >
                          shahudmalik5@gmail.com
                        </p>
                        <p
                          className={
                            "truncate h-8 w-96 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0 text-center"
                          }
                        >
                          {flashcardSet.premium ? 'premium' : 'free'}
                        </p>

                        <p
                          className={
                            "truncate h-8 w-96 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                          }
                        >
                          {new Date(flashcardSet.createdAt).toDateString()}
                        </p>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
