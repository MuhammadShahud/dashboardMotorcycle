import Head from "next/head";
import { useState } from "react";
import SideNavbar from "../components/sideNavbar";
import Header from "../components/header";

export default function Notification() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Header />
      <div className={"flex grid grid-cols-12 w-screen h-screen bg-white-400"}>
        <SideNavbar />

        <div className="p-10 flex flex-col items-center justify-center col-span-8  h-screen"></div>
      </div>
    </>
  );
}
