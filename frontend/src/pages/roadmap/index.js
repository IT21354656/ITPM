import { Inter } from "next/font/google";
import Footer from "@/Layout/Footer";

import Header from "@/Layout/Header";

import RoadmapPage from "@/Components/roadmapPage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>

      <Header />

      <RoadmapPage />
      <Footer />
    </>
  );
}
