import { Inter } from "next/font/google";
import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import Navbar from "@/Layout/Navbar/index.js";
import MyProfile from "../../Components/myProfile/index.js";
import SignIn from "@/Components/signIn";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Navbar />

      <MyProfile />
      <Footer />
    </>
  );
}
