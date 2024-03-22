import { Inter } from "next/font/google";
import Footer from "@/Layout/Footer";
import CommonHeader from "@/Layout/CommonHeader";
import WorkspacesComponent from "@/Components/workspaces";
import Header from "@/Layout/Header";

const inter = Inter({ subsets: ["latin"] });

export default function Workspaces() {
  return (
    <>
      <Header />
      {/* <CommonHeader /> */}
      <div className="text-center mb-10">
        <p className="font-bold text-xl mt-2 uppercase">Workspaces</p>
      </div>
      <WorkspacesComponent />
      <Footer />
    </>
  );
}
