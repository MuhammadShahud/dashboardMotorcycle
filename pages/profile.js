import { useEffect, useState } from "react";
import SideNavbar from "../components/sideNavbar";
import Header from "../components/header";
import { useSnapshot } from "valtio";
import { state } from "../valtio/state";
import { useRouter } from "next/router";
import Transport from "../api/transport";
import { toast } from "react-toastify";

export default function Notification() {
  const [loading, setLoading] = useState(false);
  const snap = useSnapshot(state);
  const email = snap.authUser ? snap.authUser.email : "";
  const [newUser, setNewUser] = useState({
    id: snap.authUser ? snap.authUser.userID : "",
    email: snap.authUser ? snap.authUser.email : "",
    password: null,
    firstName: snap.authUser ? snap.authUser.fullName.split(" ")[0] : "",
    lastName: snap.authUser ? snap.authUser.fullName.split(" ")[1] : "",
    phoneNumber: snap.authUser ? snap.authUser.phoneNumber : "",
    isAdmin: snap.authUser ? snap.authUser.isAdmin : true,
    userRole: snap.authUser ? snap.authUser.userRole : "ADMIN",
  });
  const router = useRouter();
  useEffect(() => {
    state.activeTab = 8;
  }, [router.pathname]);
  const handleProfileUpdate = () => {
    setLoading(true);
    Transport.HTTP.updateProfile(
      email,
      {
        email: newUser.email,
        password: newUser.password,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phoneNumber: newUser.phoneNumber,
      },
      sessionStorage.getItem("token")
    )
      .then((res) => {
        setLoading(false);
        state.authUser = { ...state.authUser, ...newUser };
        toast.success("User Updated Has Been Deleted Successfully", {
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
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
        setLoading(false);
      });
  };

  return (
    <>
      <Header />
      <div className={"flex grid grid-cols-12  w-screen h-screen bg-white-400"}>
        <SideNavbar />

        <div className="p-16 col-span-10">
          <div className="flex flex-row justify-between bg-white col-span-8">
            <div className="flex flex-row justify-between w-full py-3">
              <h3 className="font-semibold text-gray-800">Edit Profile</h3>
              {loading && (
                <div className="flex w-full items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 mt-5 border-b-4 border-blue-500" />
                </div>
              )}
              <button
                onClick={handleProfileUpdate}
                className="px-4 py-2 text-white font-semibold bg-blue-500 rounded"
              >
                Update
              </button>
            </div>
          </div>
          <div className="flex flex-col px-6 py-5 col-span-10">
            <p className="mb-2 font-semibold text-gray-700">First Name</p>
            <input
              value={newUser.firstName}
              onChange={(ev) => {
                setNewUser({ ...newUser, firstName: ev.target.value });
              }}
              type="text"
              name=""
              placeholder="Type First Name"
              className="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-12"
              id=""
            />
            <p className="mb-2 font-semibold text-gray-700">Last Name</p>
            <input
              value={newUser.lastName}
              onChange={(ev) => {
                setNewUser({ ...newUser, lastName: ev.target.value });
              }}
              type="text"
              name=""
              placeholder="Type Last Name"
              className="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-12"
              id=""
            />
            <p className="mb-2 font-semibold text-gray-700">Email</p>
            <input
              readOnly
              disabled
              value={newUser.email}
              onChange={(ev) => {
                setNewUser({ ...newUser, email: ev.target.value });
              }}
              type="email"
              name=""
              placeholder="Type Email Name"
              className="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-12"
              id=""
            />{" "}
            <p className="mb-2 font-semibold text-gray-700">Phone Number</p>
            <input
              value={newUser.phoneNumber}
              onChange={(ev) => {
                setNewUser({ ...newUser, phoneNumber: ev.target.value });
              }}
              type="tel"
              name=""
              placeholder="Type Phone Number"
              className="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-12"
              id=""
            />
            <p className="mb-2 font-semibold text-gray-700">Password</p>
            <input
              value={newUser.password}
              onChange={(ev) => {
                setNewUser({ ...newUser, password: ev.target.value });
              }}
              type="text"
              name=""
              placeholder="Type Password"
              className="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-12"
              id=""
            />
            <hr />
          </div>
        </div>
      </div>
    </>
  );
}
