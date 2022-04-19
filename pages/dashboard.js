import Head from "next/head";
import { useEffect, useState } from "react";
import SideNavbar from "../components/sideNavbar";
import Header from "../components/header";
import Transport from "../api/transport";
import { useRouter } from "next/router";
import { state } from "../valtio/state";
export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [usersReports, setUsersReports] = useState({});
  const router = useRouter();
  // const location = ;
  useEffect(() => {
    state.activeTab = 1;
  }, [router.pathname]);

  useEffect(() => {
    if (sessionStorage.length == 0) {
      router.push("/login");
    }
    if (loading) {
      getUsersReport();
    }
  }, []);

  const getUsersReport = () => {
    Transport.HTTP.getUsersReport(sessionStorage.getItem("token"))
      .then((res) => {
        setUsersReports(res.data.data);
      console.log(res.data.data, " is users report");

        setLoading(false);
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <Header />
      <div
        style={{ overflowY: "hidden !important" }}
        className={"flex grid grid-cols-12 w-screen max-h-screen bg-white-400"}
      >
        <SideNavbar />
        <div className="p-10 flex flex-col col-span-10  max-h-screen">
          {loading ? (
            <div className="flex w-full items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 mt-5 border-b-4 border-blue-500" />
            </div>
          ) : (
            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-auto">
              <div className=" m-1  bg-buttercup-50 p-10 border-b-4 border-buttercup-500 rounded-lg h-48 flex flex-row items-center justify-between">
                <div className="flex flex-col justify-center items-center">
                  <p className={"text-xl font-bold text-buttercup-800  mb-4"}>
                    Users
                  </p>
                  <p className={"text-5xl font-bold text-buttercup-800"}>
                    {usersReports.totalUsers}
                  </p>
                </div>
              </div>
              <div className=" m-1 bg-french-rose-50 p-10 border-b-4 border-french-rose-500 rounded-lg h-48 flex flex-row items-center justify-between">
                <div className="flex flex-col justify-center items-center">
                  <p
                    className={"text-xl font-bold  mb-4  text-french-rose-800"}
                  >
                    Flash Cards
                  </p>
                  <p className={"text-5xl font-bold text-french-rose-800"}>
                    {usersReports.inActiveUsers}
                  </p>
                </div>
              </div>
              <div className=" m-1 bg-cornflower-blue-100 p-10 border-b-4 border-cornflower-blue-500 rounded-lg h-48 flex flex-row items-center justify-between">
                <div className="flex flex-col justify-center items-center">
                  <p
                    className={
                      "text-xl font-bold text-cornflower-blue-800 mb-4"
                    }
                  >
                    Vocabulary
                  </p>
                  <p className={"text-5xl font-bold text-cornflower-blue-800"}>
                    {usersReports.activeUsers}
                  </p>
                </div>
              </div>
              <div className=" m-1 bg-mountain-meadow-50 p-10 border-b-4 border-mountain-meadow-500 rounded-lg h-48 flex flex-row items-center justify-between">
                <div className="flex flex-col justify-center items-center">
                  <p
                    className={
                      "text-xl font-bold text-mountain-meadow-800  mb-4"
                    }
                  >
                    Quizzes
                  </p>
                  <p className={"text-5xl font-bold text-mountain-meadow-800"}>
                    {usersReports.newUsers}
                  </p>
                </div>
              </div>
              
              {/* <div
                className={
                  "flex flex-wrap h-48 w-full mt-10 bg-gray-100 pl-10 pr-10 justify-between items-center"
                }
              >
                <div
                  className={
                    " items-center justify-center flex flex-col h-40 w-100 w-1/5 bg-white rounded-lg border border-blue-200"
                  }
                >
                  <p className={"text-xl font-bold  mb-4"}>
                    Total Users
                  </p>
                  <p className={"text-5xl font-bold text-blue-800"}>
                    {usersReports.total}
                  </p>
                </div>
                <div
                  className={
                    "items-center justify-center flex flex-col h-40 w-100 w-1/5 bg-white rounded-lg border border-blue-200"
                  }
                >
                  <p className={"text-xl font-bold text-gray-400 mb-4"}>
                    Active Users
                  </p>
                  <p className={"text-5xl font-bold text-blue-800"}>
                    {usersReports.activeUsers}
                  </p>
                </div>
                <div
                  className={
                    "items-center justify-center flex flex-col h-40 w-100 w-1/5 bg-white rounded-lg border border-blue-200"
                  }
                >
                  <p className={"text-xl font-bold text-gray-400 mb-4"}>
                    Inactive Users
                  </p>
                  <p className={"text-5xl font-bold text-blue-800"}>
                    {usersReports.inActiveUsers}
                  </p>
                </div>
                <div
                  className={
                    "items-center justify-center flex flex-col h-40 w-100 w-1/5 bg-white rounded-lg border border-blue-200"
                  }
                >
                  <p className={"text-xl font-bold text-gray-400 mb-4"}>
                    Premium Users
                  </p>
                  <p className={"text-5xl font-bold text-blue-800"}>
                    {usersReports.premiumUsers}
                  </p>
                </div>
                <div
                  className={
                    "items-center justify-center flex flex-col h-40 w-100 w-1/5 bg-white rounded-lg border border-blue-200"
                  }
                >
                  <p className={"text-xl font-bold text-gray-400 mb-4"}>
                    Teams
                  </p>
                  <p className={"text-5xl font-bold text-blue-800"}>
                    {usersReports.totalTeams}
                  </p>
                </div>
              </div> */}

              {/* <img src={"graph.png"} className={"h-98 w-full mt-10"} /> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
