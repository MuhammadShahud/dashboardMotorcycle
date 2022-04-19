import { useEffect, useState } from "react";
import SideNavbar from "../../components/sideNavbar";
import Header from "../../components/header";
import { useRouter } from "next/router";
import { state } from "../../valtio/state";
import Modal from "../../components/modal";
import { toast } from "react-toastify";
import Transport from "../../api/transport";

export default function CreateFlashcardSet(props) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isOperationLoading, setIsOperationLoading] = useState(false);
  const router = useRouter()
  const [flashcardSet, setFlashcardSet] = useState({
    id: "",
    title: "",
    category: "",
    desc: "",
    premium: false,
    createdAt: "",
    subject: "cards"
  });

  useEffect(() => {
    if (sessionStorage.length == 0) {
      router.push("/login");
    }
  });

  useEffect(() => {
    state.activeTab = 6;
  }, [router.pathname]);


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

  const handleAddFlashcard = () => {
    setIsOperationLoading(true)
    Transport.HTTP.addFlashcardSet(
      flashcardSet,
      sessionStorage.getItem("token")
    )
      .then((res) => {
        setLoading(false);
        toast.success("Flashcard Has Been Added Successfully", {
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setIsOperationLoading(false)
        router.replace("/flashcards")
      })
      .catch((err) => {
        setLoading(false);
        toast.error(`There is An error`, {
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setIsOperationLoading(false)
      });
  };
  return (
    <>
      <Header />
      <div className={"flex grid grid-cols-12 w-screen h-screen bg-white-400"}>
        <SideNavbar />
        {showModal && (
          <Modal
            button1Action={() => {
              setShowModal(false);
            }}
            button1Text={"Close"}
            title={"Warning"}
            body={"Invalid Email/Password"}
          />
        )}
        <div className="custom-scrollbar overflow-auto max-h-[95%] p-10 flex flex-col col-span-10">
          <div className={"h-16 flex items-center justify-between  mb-4"}>
            <div className="pb-2">
              <p className="font-semibold text-gray-800">Flashcard Detail</p>
            </div>
            <div className="flex flex-row justify-between">
              <button
                onClick={handleAddFlashcard}
                disabled={isOperationLoading}
                className={
                  "disabled:bg-blue-100 disabled:cursor-not-allowed mx-2 h-12 rounded w-40 font-bold bg-blue-500 flex items-center justify-center rounded-sm"
                }
              >
                <p className={"text-lg text-white"}>
                  {loading ? "Loading" : "Create Set"}
                </p>
              </button>
            </div>
          </div>
          {loading ? (
            <div className="flex w-full items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 mt-5 border-b-4 border-blue-500" />
            </div>
          ) : (
            <>
              <div className="flex flex-col px-6 py-5">
                <p className="mb-2 font-semibold text-gray-700">Title</p>
                <input
                  value={flashcardSet.title}
                  onChange={(e) =>
                    setFlashcardSet((flashcardSet) => ({
                      ...flashcardSet,
                      title: e.target.value,
                    }))
                  }
                  type="text"
                  name=""
                  placeholder="Type Title"
                  className="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-12"
                  id=""
                />
                <p className="mb-2 font-semibold text-gray-700">Description</p>
                <textarea
                  value={flashcardSet.description}
                  onChange={(e) =>
                    setFlashcardSet((flashcardSet) => ({
                      ...flashcardSet,
                      desc: e.target.value,
                    }))
                  }
                  type="text"
                  name=""
                  placeholder="Type front description..."
                  className="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-24"
                  id=""
                ></textarea>
                <p className="mb-2 font-semibold text-gray-700">
                  Subscription Type
                </p>
                <select
                  value={flashcardSet.subscriptionType}
                  onChange={(e) =>
                    setFlashcardSet((flashcardSet) => ({
                      ...flashcardSet,
                      premium: e.target.value === 'free' ? false : true,
                    }))
                  }
                  type="text"
                  name=""
                  className="w-full p-3 mb-5 bg-white border border-gray-200 rounded shadow-sm appearance-none"
                  id=""
                >
                  <option value="free">Free</option>
                  <option value="premium">Premium</option>
                </select>
               
             
                <hr />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
