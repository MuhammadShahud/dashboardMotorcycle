import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Transport from "../api/transport";
import { state } from "../valtio/state";

export default function QuestionModal(props) {
  const [id, setId] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState({
    id: 1,
    title: "some front",
    description: "some back",
    explanation: "some explanation",
    choices: [
      {
        title: "fist choice",
        isCorrect: true,
      },
      {
        title: "second choice",
        isCorrect: true,
      },
      {
        title: "third choice",
        isCorrect: false,
      },
      {
        title: "fourth choice",
        isCorrect: false,
      },
    ],
    createdAt: "12/03/21",
  });

  const initialState = {
    id: "",
    question: "",
    explanation: "",
    category: 1,
    answer: "",
    premium: false,
    options: ['', '', '', '']
  }
  const [newQuestion, setNewQuestion] = useState(initialState);
  useEffect(() => {
    if (props.isEdit && !editing) {
      console.log(props.item);
      setId(props.item.id);
      setNewQuestion(props.item);
    }
  }, []);

  const action = () => {
console.log('sijad',newQuestion);

    setLoading(true);
    if (props.isEdit) {
      Transport.HTTP.updateQuestion(
        newQuestion,
      )
        .then((res) => {
          props.toggleModal();
          setLoading(false);
          toast.info("Question Has Been Updated Added Successfully", {
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        })
        .catch((err) => {
          setLoading(false);
          props.toggleModal();
          toast.error(`There is An error`, {
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    } else {
      delete newQuestion.id;
      Transport.HTTP.createQuestion(
       newQuestion,
        sessionStorage.getItem("token")
      )
        .then((res) => {
          setNewQuestion(initialState)
      
          const questionId = {
            questions:[]
          }
          props.quizzesSet.questions.forEach(q => {
            questionId.questions.push(q.id)
          });
          
          questionId.questions.push(res.data.id)
          console.log('questionId',questionId);
          Transport.HTTP.updateQuizzesSet(
            props.quizzesSet.id,
          questionId,
            sessionStorage.getItem("token")
          )
.then((res)=>{
  console.log('resss',res.data);
          props.toggleModal();
          toast.success("Question Has Been Added Successfully", {
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
          props.toggleModal();
        });
        });
    }
  };

  const handleCheckBoxChange = (index) => (e) => {
    setQuestion((question) => {
      let data = { ...question };
      data.choices[index].isCorrect = !data.choices[index].isCorrect;
      return data;
    });
  };
  const handleInputChange = (index) => (e) => {
    const option = [...newQuestion.options]
    option[index] = e.target.value
    setNewQuestion({
      ...newQuestion,
      options: option,
    })
  };
  const handleUpdateQuestion = (id, data) => (e) => {
    const res = state.questions.map((currQuestion) => {
      if (currQuestion.id === id) {
        currQuestion = data;
      }
      return currQuestion;
    });
    state.questions = res;
  };

  const handleAddQuestion = (data) => (e) => {
    const res = state.questions.push(data);
    state.questions = res;
  };

  return (
    <div
      className=" flex justify-center items-center bg-black bg-opacity-50 fixed
          inset-0
          z-50
          overflow-auto
          items-center
          "
    >
      <div className="custom-scrollbar overflow-auto max-h-[95%] flex flex-col  w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg border border-gray-300 shadow-xl">
        <div className="flex flex-row justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg">
          <p className="font-semibold text-gray-800">
            {!props.isEdit ? "Add" : "Edit"} Question
          </p>
          <svg
            onClick={() => {
              props.toggleModal();
            }}
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>
        <div className="flex flex-col px-6 py-5 bg-gray-50">
          <p className="mb-2 font-semibold text-gray-700">Question </p>
          <input
            value={newQuestion.question}
            required
            onChange={(e) =>
              setNewQuestion((question) => ({
                ...question,
                question: e.target.value,
              }))
            }
            type="text"
            name=""
            placeholder="Type Question"
            className="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-12"
            id=""
          />
          <p className="mb-2 font-semibold text-gray-700">Answer </p>
          <input
            value={newQuestion.answer}
            required
            onChange={(e) =>
              setNewQuestion((question) => ({
                ...question,
                answer: e.target.value,
              }))
            }
            type="text"
            name=""
            placeholder="Type Answer"
            className="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-12"
            id=""
          />
          {newQuestion.options.map((choice, index) => {
            return (
              <>
                <div className="flex flex-row justify-between ">
                  <p className="mb-2 font-semibold text-gray-700">
                    Choice {index + 1}
                  </p>
       
                </div>

                <input
                  value={choice}
                  required
                  onChange={handleInputChange(index)}
                  type="text"
                  name=""
                  placeholder={`Choice" + ${index + 1}`}
                  className="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-12"
                  id=""
                />
              </>
            );
          })}
         
          <p className="mb-2 font-semibold text-gray-700">Explanation</p>
          <textarea
            value={newQuestion.explanation}
            required
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, explanation: e.target.value })
            }
            type="text"
            name=""
            placeholder="Type message..."
            className="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-36"
            id=""
          ></textarea>
          <hr />
        </div>
        <div className="flex flex-row items-center justify-between p-5 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg">
          <p
            onClick={() => {
              props.toggleModal();
            }}
            className="font-semibold text-gray-600"
          >
            Cancel
          </p>

          {loading && (
            <div className="flex w-full items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 mt-5 border-b-4 border-blue-500" />
            </div>
          )}
          <button
            onClick={() => {
              action();
            }}
            className="px-4 py-2 text-white font-semibold bg-blue-500 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
