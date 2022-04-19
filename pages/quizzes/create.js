import { useEffect, useState } from "react";
import SideNavbar from "../../components/sideNavbar";
// import Header from "../../components/header";
import { useRouter } from "next/router";
import Header from "../../components/header";
import QuestionModal from "../../components/questionModal";
import { state } from "../../valtio/state";
import Transport from "../../api/transport";
// import FlashCardModal from "../../components/flashCardModal";
// import { state } from "../../valtio/state";
import { toast } from "react-toastify";

export default function CreateQuiz() {
  const [loading, setLoading] = useState(false);
  const [isOperationLoading, setIsOperationLoading] = useState(false);
  const [quizzesSet, setQuizesSet] = useState({
    author: 'Shahudmalik5@gmail.com',
    id: 1,
    title: "",
    desc: "",
    premium: false,

  });

  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.length == 0) {
      router.push("/login");
    }
  });

  useEffect(() => {
    state.activeTab = 7;
  }, [router.pathname]);

  const handleAddQuizzesSet = () => {
    setIsOperationLoading(true);
    Transport.HTTP.addQuizzesSet(quizzesSet, sessionStorage.getItem("token"))
      .then((res) => {
        Transport.HTTP.getQuizesSet()
          .then((res) => {
            setLoading(false);
            toast.success("Quizzes Set Has Been Added Successfully", {
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
           
            router.push(`/quizzes/${res.data.results[res.data.results.length - 1].id}`);
            setIsOperationLoading(false);
          })
          .catch(() => {
            setLoading(false);
            toast.error(`There is An error`, {
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setIsOperationLoading(false);
          });
      });
    }
    return (
      <>
        <Header />
        <div className={"flex grid grid-cols-12 w-screen h-screen bg-white-400"}>
          <SideNavbar />

          <div className="custom-scrollbar overflow-auto max-h-[95%] p-10 flex flex-col col-span-10">
            <div className={"h-16 flex items-center justify-between  mb-4"}>
              <div className="pb-2">
                <p className="font-semibold text-gray-800">Quiz Detail</p>
              </div>
              <div className="flex flex-row justify-between">
                <button
                  onClick={handleAddQuizzesSet}
                  disabled={isOperationLoading}
                  className={
                    "disabled:bg-blue-100 mx-2 h-12 rounded w-40 bg-blue-500 flex items-center justify-center rounded-sm"
                  }
                >
                  <p className={"text-lg text-white"}>Create Set</p>
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
                    value={quizzesSet.title}
                    onChange={(e) =>
                      setQuizesSet((quizzesSett) => ({
                        ...quizzesSett,
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
                    value={quizzesSet.description}
                    onChange={(e) =>
                      setQuizesSet((quizSet) => ({
                        ...quizSet,
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
                    value={quizzesSet.subType}
                    onChange={(e) =>
                      setQuizesSet((quizzesSett) => ({
                        ...quizzesSett,
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
