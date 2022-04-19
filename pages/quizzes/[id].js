import { useEffect, useState } from "react";
import SideNavbar from "../../components/sideNavbar";
import { useRouter } from "next/router";
import Header from "../../components/header";
import QuestionModal from "../../components/questionModal";
import { state } from "../../valtio/state";
import Transport from "../../api/transport";
import { toast } from "react-toastify";
import { useSnapshot } from "valtio";

export default function QuizzesDetails(props) {
  const [loading, setLoading] = useState(true);
  const [questionLoading, setQuestionLoading] = useState(false);
  const [operationDone, setOperationDone] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [activeItem, setActiveItem] = useState({});
  const [isOperationLoading, setIsOperationLoading] = useState(false);
  const [effect, setEffect] = useState(false)


  const [quizzesSet, setQuizzesSet] = useState({
    author: 'Shahudmalik5@gmail.com',
  
    title: "",
    desc: "",
    premium: false,

  });
  const router = useRouter();
  const { id: quizzesSetId } = router.query;
  const snap = useSnapshot(state);

  useEffect(() => {
    if (sessionStorage.length == 0) {
      router.push("/login");
    }
    state.activeTab = 7;
  }, [router.pathname]);

  
  useEffect(() => {

  
      setIsOperationLoading(true);
      Transport.HTTP.getQuizzesSetById(
        quizzesSetId? quizzesSetId : quizzesSet.id,
        sessionStorage.getItem("token")
      )
        .then((res) => {
          console.log(res);
          setQuestionLoading(true);
          const result = res.data;
          setQuizzesSet((quizzesSets) => ({ ...quizzesSets, ...result }));
          setLoading(false)
          setIsOperationLoading(false)
          setQuestionLoading(false);

        })
        .catch((err) => {
          setLoading(false);
          setQuestionLoading(false);
          setIsOperationLoading(false);
        });
    
  }, [showModal,quizzesSetId]);



  const handleDeleteQuestion = (id, index) => (e) => {
    const del = confirm("Are Your Sure you want to delete?").valueOf();
    setIsOperationLoading(true);
    if (del) {
      // state.questions = state.questions.filter((fs) => fs.id !== id);
      Transport.HTTP.deleteQuestion(id, sessionStorage.getItem("token"))
        .then((res) => {
          const questionId = {
            questions: []
          }
const array = [];
          quizzesSet.questions.forEach(q => {
            array.push(q.id)
          });

     questionId.questions = array.filter(value=>value!==id)
          console.log(id);
          console.log(questionId.questions);
          Transport.HTTP.updateQuizzesSet(
            quizzesSet.id,
            questionId,
            sessionStorage.getItem("token")
          )
            .then((res) => {
              setEffect(!effect);
              toast.success("Question Has Been Deleted Successfully", {
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              setLoading(false);
              setIsOperationLoading(false);
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
              setIsOperationLoading(false);
            });
        });
    }
  };

  const handleDeleteQuizzesSet = (id) => (e) => {
    const del = confirm("Are Your Sure you want to delete?").valueOf();
    if (del) {
      const questionId = {
        questions: []
      }
      quizzesSet.questions.forEach(q => {
        questionId.questions.push(q.id)
      });

      Transport.HTTP.deleteManyQuestions(
        questionId.questions
      )
        .then((res) => {
          Transport.HTTP.deleteQuizzesSet(
            quizzesSet.id,
            sessionStorage.getItem("token")
          )
            .then((res) => {
              toast.success("Quiz Set Has Been Deleted Successfully", {
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              setLoading(false);
              router.replace("/quizzes");
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
        });
    }
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

  const handleUpdateQuizzesSet = () => {
    setOperationDone(true);
    setIsOperationLoading(true);
    console.log("quizzesSet", quizzesSet);
    Transport.HTTP.updateQuizzesSet(
      quizzesSet.id,
      {
        title : quizzesSet.title,
        desc : quizzesSet.desc,
        premium : quizzesSet.premium
      },
      sessionStorage.getItem("token")
    )
      .then((res) => {
        console.log("res",res.data);
        toast.info("Quizzes Set Has Been Updated Successfully", {
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false);
        setIsOperationLoading(false);
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
        setIsOperationLoading(false);
      });
    setOperationDone(false);
  };

  return (
    <>
      <Header />
      <div className={"flex grid grid-cols-12 w-screen h-screen bg-white-400"}>
        <SideNavbar />
        {showModal && (
          <QuestionModal
            isEdit={isEdit}
            item={activeItem}
            quizzesSet={quizzesSet}
            toggleModal={() => {
              toggleModal();
            }}
          />
        )}
        {loading ? (
          <div className="flex w-full col-span-10 items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 mt-5 border-b-4 border-blue-500" />
          </div>
        ) : (
          <div className="custom-scrollbar overflow-auto max-h-[95%] p-10 flex flex-col col-span-10">
            <div className={"h-16 flex items-center justify-between  mb-4"}>
              <div className="pb-2">
                <p className="font-semibold text-gray-800">Quiz Detail</p>
              </div>
              <div className="flex flex-row justify-between">
                <button
                  onClick={handleUpdateQuizzesSet}
                  disabled={isOperationLoading}
                  className={
                    "disabled:bg-gray-500 disabled:cursor-not-allowed mx-2 h-12 rounded w-40 bg-blue-500 flex items-center justify-center rounded-sm"
                  }
                >
                  <p className={"text-lg text-white"}>Update Set</p>
                </button>
                <button
                  onClick={handleDeleteQuizzesSet(quizzesSet.id)}
                  disabled={isOperationLoading}
                  className={
                    "disabled:bg-gray-500 mx-2 h-12 rounded w-40 bg-red-500 flex items-center justify-center rounded-sm"
                  }
                >
                  <p className={"text-lg text-white"}>Delete Set</p>
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
                      setQuizzesSet((quizzesSet) => ({
                        ...quizzesSet,
                        title: e.target.value,
                      }))
                    }
                    type="text"
                    name=""
                    placeholder="Type Title"
                    className="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-12"
                    id=""
                  />
                  <p className="mb-2 font-semibold text-gray-700">
                    Description
                  </p>
                  <textarea
                    value={quizzesSet.desc}
                    onChange={(e) =>
                      setQuizzesSet((quizSet) => ({
                        ...quizzesSet,
                        description: e.target.value,
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
                    value={quizzesSet.premium ? 'premium' : 'free'}
                    onChange={(e) =>
                      setQuizzesSet((quizzesSet) => ({
                        ...quizzesSet,
                        subscriptionType: e.target.value,
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
                  <div className="flex flex-row justify-between py-6">
                    <p className="mb-2 font-semibold text-gray-700">
                      Questions
                    </p>


                    <button
                      onClick={() => {
                        toggleModal();
                      }}
                      className="bg-green-400 px-6 py-2 rounded text-white font-bold"
                    >
                      Add new Question
                    </button>
                  </div>

                  <div>
                    <div
                      className={
                        "h-16 w-full flex items-center bg-gray-100 pl-4 pr-4"
                      }
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
                        Title
                      </p>
                      <p
                        className={
                          "h-8 w-96 border-r border-gray-300 text-black text-lg font-semibold ml-4 p-0 m-0"
                        }
                      >
                        Explanation
                      </p>
                      <p
                        className={
                          "h-8 w-96 border-r border-gray-300 text-black text-lg font-semibold ml-4 p-0 m-0"
                        }
                      >
                        Created At
                      </p>
                      <p
                        className={
                          "h-8 w-60 border-gray-300 text-black text-lg font-semibold ml-4 p-0 m-0"
                        }
                      >
                        Action
                      </p>
                    </div>
                    {questionLoading ? (
                      <div className="flex w-full items-center justify-center">
                        <div className="animate-spin rounded-full h-10 w-10 mt-5 border-b-4 border-blue-500" />
                      </div>
                    ) : (
                      <>
                        {quizzesSet.questions &&
                          quizzesSet.questions.map((question, index) => {
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
                                    "truncate h-8 w-96 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                                  }
                                >
                                  {question.question}
                                </p>
                                <p
                                  className={
                                    "truncate h-8 w-96 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                                  }
                                >
                                  {question.explanation}
                                </p>
                                <p
                                  className={
                                    "truncate h-8 w-96 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                                  }
                                >
                                  {new Date(question.createdAt).toDateString()}
                                </p>
                                <div
                                  className={
                                    "truncate flex h-8 w-60 border-gray-300 text-gray-600 text-lg  ml-4 p-0 m-0"
                                  }
                                >
                                  <button
                                    onClick={() => {
                                      toggleModal(true, question);
                                    }}
                                    className="bg-blue-300 hover:text-gray-800 hover:bg-blue-400   py-1 px-5 rounded inline-flex items-center"
                                  >
                                    <span className="text-white hover:text-gray-800">
                                      Edit
                                    </span>
                                  </button>
                                  <button
                                    onClick={handleDeleteQuestion(question.id)}
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
                  <hr />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
