import { Inter } from "next/font/google";
import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import HomePage from "@/Components/homePage";
import SignUp from "@/Components/signup";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Header />

      <SignUp />
      <Footer />
    </>
  );
}
