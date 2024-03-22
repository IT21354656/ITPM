import { Inter } from "next/font/google";
import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import ViewLessonPage from "@/Components/dashboard/viewLessonPage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Header />
      <ViewLessonPage />
      <Footer />
    </>
  );
}
