import { useEffect, useState } from "react";
import SideNavbar from "../../components/sideNavbar";
import Header from "../../components/header";
import { useRouter } from "next/router";
import { state } from "../../valtio/state";
import Transport from "../../api/transport";
import { toast } from "react-toastify";


export default function FlashcardDetails(props) {
  const [loading, setLoading] = useState(true);
  const [operationLoading, setOperationLoading] = useState(false);
  const [cardsBySetId, setCardsBySetId] = useState();
  const [flashcardSet, setFlashcardSet] = useState({
    id: 1,
    title: "",
    category: "card",
    desc: "",
    premium: false,
    createdAt: "12/3/23",
  });
  const router = useRouter();
  const { id: flashcardSetId } = router.query;
  useEffect(() => {

    if (flashcardSetId) {
      Transport.HTTP.getFlashcardSetById(
        flashcardSetId,
      )
        .then((res) => {

          const result = res.data;
          setFlashcardSet((flashcardSett) => ({ ...flashcardSett, ...result }));

        })
        .catch((err) => {
          alert(err);
          props.toggleModal();
        });
      Transport.HTTP.getCardsBySetId(flashcardSetId)
        .then((res) => {
          const response = res.data.results;
          setCardsBySetId(response);
          setLoading(false);


        })

    }
  }, [router]);

  useEffect(() => {
    if (sessionStorage.length == 0) {
      router.push("/login");
    }
  }, [flashcardSet]);

  useEffect(() => {
    state.activeTab = 6;
  }, [router.pathname]);

  const handleUpdateFlashcardSet = () => {

    setOperationLoading(true);

    Transport.HTTP.updateFlashcardSet(
      flashcardSet.id,
      flashcardSet,
      sessionStorage.getItem("token")
    )
      .then((res) => {
        console.log(res);
        toast.info("Flashcard Has Been Updated Successfully", {
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false);
        setOperationLoading(false);
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
        setOperationLoading(false);
      });


  };

  const handleAddCard = () => {

    setCardsBySetId((cardsBySetId) => {
      const data = [...cardsBySetId];
      data.unshift({
        front: "",
        back: "",
        setId: flashcardSet.id,
        category: flashcardSet.category,
        createCardd: 'created'
      });
      data.sort((a, b) => b.id - a.id);
      console.log('data', data);
      return data;

    });
  };

  const handleCardChange =
    (id, type = "front") =>
      (e) => {
        setCardsBySetId((cardsBySetId) => {
          const data = [...cardsBySetId];
          data[id] = { ...data[id], [type]: e.target.value };
          data.sort((a, b) => b.id - a.id);

          return data;
        });
      };
  const createNewCard = (index) => {
    console.log(cardsBySetId[index]);
    if (cardsBySetId[index].front || cardsBySetId[index].back) {
      const card = cardsBySetId[index]

      delete card.createCardd;

      Transport.HTTP.createCards(
        card,
        sessionStorage.getItem("token")
      )
        .then((res) => {
          toast.info("NewCard Has Been Added Successfully", {
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        })
        .then((res) => {
          setLoading(true)
          Transport.HTTP.getCardsBySetId(flashcardSetId)
            .then((res) => {
              const response = res.data.results;
              setCardsBySetId(response);
              setLoading(false);
            })
        })
    };
  }

  const editCard = (index, id) => {
    const card = cardsBySetId[index];
    console.log(card);
    Transport.HTTP.updateCard(
      id,
      card,
      sessionStorage.getItem("token")
    )
      .then((res) => {
        toast.info("Card Has Been Updated Successfully", {
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })


  }

  const handleDeleteCard = (id, index) => {
    console.log('Working', id, index);
    const del = confirm("Are Your Sure you want to delete?").valueOf();
    if (del) {
      Transport.HTTP.deleteSingleCard(
        id,
        sessionStorage.getItem("token")
      )
        .then((res) => {
          toast.success("Flashcard Has Been Deleted Successfully", {
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setCardsBySetId((cardsBySetId) => {
            const data = [...cardsBySetId];
            data.splice(index, 1);
            return data;
          });

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

        });
    }
  };

  const handleDeleteFlashcardSet = (id) => () => {
    const del = confirm("Are Your Sure you want to delete?").valueOf();
    if (del) {
      setLoading(false);
      state.flashcards = state.flashcards.filter((fs) => fs.id !== id);
      Transport.HTTP.deleteManyCards(
        flashcardSet.id,
        sessionStorage.getItem("token")
      )
      .then((res)=>{
      Transport.HTTP.deleteFlashcardSet(
        flashcardSet.id,
        sessionStorage.getItem("token")
      )
        .then((res) => {
          toast.success("Flashcard Set Has Been Deleted Successfully", {
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setLoading(false);
          router.back();
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
      })
    }
  };


  return (
    <>
      <Header />
      <div className={"flex grid grid-cols-12 w-screen h-screen bg-white-400"}>
        <SideNavbar />
        {loading ? (
          <div className="border col-span-10 flex w-full h-full items-center justify-center">
            <div className="flex w-full items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 mt-5 border-b-4 border-blue-500" />
            </div>
          </div>
        ) : (
          <div className="custom-scrollbar overflow-auto max-h-[95%] p-10 flex flex-col col-span-10">
            <div className={"h-16 flex items-center justify-between  mb-4"}>
              <div className="pb-2">
                <p className="font-semibold text-gray-800">Flashcard Detail</p>
              </div>
              <div className="flex flex-row justify-between">
                <button
                  onClick={handleUpdateFlashcardSet}
                  disabled={operationLoading}
                  className={
                    "disabled:cursor-not-allowed disabled:bg-blue-100 mx-2 h-12 rounded w-40 bg-blue-500 flex items-center justify-center rounded-sm"
                  }
                >
                  <p className={"text-lg text-white"}>Update Set</p>
                </button>
                <button
                  onClick={handleDeleteFlashcardSet(flashcardSet.id)}
                  disabled={operationLoading}
                  className={
                    "disabled:cursor-not-allowed disabled:bg-blue-100 mx-2 h-12 rounded w-40 bg-red-500 flex items-center justify-center rounded-sm"
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
                  <p className="mb-2 font-semibold text-gray-700">
                    Description
                  </p>
                  <textarea
                    value={flashcardSet.desc}
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
                    value={flashcardSet.premium ? 'premium' : 'free'}
                    onChange={(e) =>
                      setFlashcardSet((flashcardSet) => ({
                        ...flashcardSet,
                        premium: e.target.value === 'free' ? false : true
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
                    <p className="mb-2 font-semibold text-gray-700">Cards</p>
                    <button
                      onClick={handleAddCard}
                      className="bg-green-400 px-6 py-2 rounded text-white font-bold"
                    >
                      Add new Card
                    </button>
                  </div>
                  <div className="flex flex-col divide-y divide-blue-200">
                    {loading ? (
                      <div className="flex w-full items-center justify-center">
                        <div className="animate-spin rounded-full h-10 w-10 mt-5 border-b-4 border-blue-500" />
                      </div>
                    ) : cardsBySetId.map((card, index) => {
                      return (
                        <div
                          key={index}
                          className="flex flex-row border-b py-2 items-center "
                        >
                          <div className="w-full justify-between pr-3">
                            <p className="mb-2 font-semibold text-gray-700">
                              Front
                            </p>
                            <textarea
                              value={card.front}
                              onChange={handleCardChange(index, "front")}
                              type="text"
                              name=""
                              placeholder="Type back description..."
                              className="w-full p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-24"
                              id=""
                            ></textarea>
                          </div>

                          <div className="w-full justify-between pl-3">
                            <p className="mb-2 font-semibold text-gray-700">
                              Back
                            </p>
                            <textarea
                              value={card.back}
                              onChange={handleCardChange(index, "back")}
                              type="text"
                              name=""
                              placeholder="Type back description..."
                              className="w-full p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-24"
                              id=""
                            ></textarea>
                          </div>
                          <div className="pl-3">
                            <button onClick={() => handleDeleteCard(card.id, index)}>
                              <svg
                                width="30"
                                height="30"
                                x="0"
                                y="0"
                                viewBox="0 0 512 512"
                                className="text-red-400"
                              >
                                <g>
                                  <g xmlns="http://www.w3.org/2000/svg">
                                    <g>
                                      <path
                                        d="M62.205,150l26.569,320.735C90.678,493.865,110.38,512,133.598,512h244.805c23.218,0,42.92-18.135,44.824-41.265    L449.795,150H62.205z M180.986,452c-7.852,0-14.458-6.108-14.956-14.063l-15-242c-0.513-8.276,5.771-15.395,14.033-15.908    c8.569-0.601,15.381,5.757,15.908,14.033l15,242C196.502,444.632,189.721,452,180.986,452z M271,437c0,8.291-6.709,15-15,15    c-8.291,0-15-6.709-15-15V195c0-8.291,6.709-15,15-15s15,6.709,15,15V437z M360.97,195.938l-15,242    c-0.493,7.874-7.056,14.436-15.908,14.033c-8.262-0.513-14.546-7.632-14.033-15.908l15-242    c0.513-8.276,7.764-14.297,15.908-14.033C355.199,180.543,361.483,187.662,360.97,195.938z"
                                        fill="#8F3A93"
                                        data-original="#8F3A93"
                                        className=""
                                      ></path>
                                    </g>
                                  </g>
                                  <g xmlns="http://www.w3.org/2000/svg">
                                    <g>
                                      <path
                                        d="M451,60h-90V45c0-24.814-20.186-45-45-45H196c-24.814,0-45,20.186-45,45v15H61c-16.569,0-30,13.431-30,30    c0,16.567,13.431,30,30,30c137.966,0,252.039,0,390,0c16.569,0,30-13.433,30-30C481,73.431,467.569,60,451,60z M331,60H181V45    c0-8.276,6.724-15,15-15h120c8.276,0,15,6.724,15,15V60z"
                                        fill="#FB3A93"
                                        data-original="#8F3A93"
                                        className=""
                                      ></path>
                                    </g>
                                  </g>
                                  <g xmlns="http://www.w3.org/2000/svg"></g>
                                  <g xmlns="http://www.w3.org/2000/svg"></g>
                                  <g xmlns="http://www.w3.org/2000/svg"></g>
                                  <g xmlns="http://www.w3.org/2000/svg"></g>
                                  <g xmlns="http://www.w3.org/2000/svg"></g>
                                  <g xmlns="http://www.w3.org/2000/svg"></g>
                                  <g xmlns="http://www.w3.org/2000/svg"></g>
                                  <g xmlns="http://www.w3.org/2000/svg"></g>
                                  <g xmlns="http://www.w3.org/2000/svg"></g>
                                  <g xmlns="http://www.w3.org/2000/svg"></g>
                                  <g xmlns="http://www.w3.org/2000/svg"></g>
                                  <g xmlns="http://www.w3.org/2000/svg"></g>
                                  <g xmlns="http://www.w3.org/2000/svg"></g>
                                  <g xmlns="http://www.w3.org/2000/svg"></g>
                                  <g xmlns="http://www.w3.org/2000/svg"></g>
                                </g>
                              </svg>
                            </button>

                            {card.createCardd ?
                              <button onClick={() => createNewCard(index)}>
                                <img
                                  src={'/right-chevron.png'}
                                  height={30}
                                  width={30} />
                              </button> :

                              <button onClick={() => editCard(index, card.id)}>
                                <img src={'/pencil.png'}
                                  height={30}
                                  width={30} />
                              </button>
                            }

                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
