import { useState } from "react";
import Modal from "../components/modal";
import { useRouter } from "next/router";
import Transport from "../api/transport";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = () => {
    setLoading(true);
    const data = { email, password };
    Transport.HTTP.login(data)
      .then((res) => {
        sessionStorage.setItem("token", res.data.token);
        router.replace("/dashboard");
        setLoading(false);
      })
      .catch((err) => {
        setShowModal(true);
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setShowModal(true);
    } else {
      login();
    }
  };

  return (
    <div
      className={
        "flex flex-col md:flex-row w-screen justify-center h-screen bg-white-400 "
      }
    >
      {showModal && (
        <Modal
          button1Action={() => {
            setShowModal(!showModal);
          }}
          button1Text="Close"
          title={"Warning"}
          body={"Invalid Email/Password"}
        />
      )}
      <div className="hidden md:block  md:w-1/2  h-screen">
        <div className="flex items-center justify-center h-screen">
          <img
            style={{ height: "400px" }}
            object-fit="true"
            src="/logo02.jpeg"
          />
        </div>
      </div>
      <div
        style={{ height: "100px" }}
        className="md:hidden  flex md:w-1/3  items-center justify-center"
      >
        <div style={{ height: "200px", width: "200px" }} className="">
          <img
            style={{ width: "100%", height: "100%" }}
            object-fit="true"
            src="/logo02.jpeg"
          />
        </div>
      </div>
      <div className="flex items-center justify-center md:w-1/2 my-5">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full p-10 items-center justify-center"
        >
          <p
            className={
              "text-center  w-full text-gray-600 font-md text-3xl mb-12"
            }
          >
            {"Admin Panel"}
          </p>

          <div className="flex flex-col md:w-1/2 h-22 mb-4">
            <p className="text-gray-600 text-sm mb-2">Email</p>
            <input
              onChange={(ev) => {
                setEmail(ev.target.value);
              }}
              className={
                "h-12 p-2 flex w-full border rounded-md border-gray-400 text-gray-600 border-rounded-md"
              }
            />
          </div>

          <div className={"flex flex-col md:w-1/2  h-22 mb-4"}>
            <p className={"text-gray-600 text-sm mb-2"}>Password</p>
            <input
              type="password"
              onChange={(ev) => {
                setPassword(ev.target.value);
              }}
              className={
                "h-12 p-2 flex w-full border rounded-md border-gray-400 text-gray-600 border-rounded-md"
              }
            />
          </div>

          <div className={"flex items-center justify-between md:w-1/2 "}>
            <div className={"flex items-center justify-center"}>
              <input onChange={(ev) => {}} className="w-5" type="checkbox" />
              <p className={"text-sm ml-2"}>Remember Me</p>
            </div>
            <p className={"text-sm ml-2 text-blue-600"}>
              Forgot Your Password ?
            </p>
          </div>

          {loading && (
            <div className="flex md:w-1/2  justify-center">
              <div className="animate-spin rounded-full h-10 w-10 mt-5 border-b-4 border-blue-500" />
            </div>
          )}
          <div className="flex md:w-1/2 justify-center">
            <button
              type="submit"
              // disabled={props.name === snap.activePage}
              className="flex items-center justify-center bg-blue-500 rounded-lg  h-12 w-full px-5 mt-5 text-white"
            >
              <p className="ml-3  text-left text-sm transition ">Login</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
