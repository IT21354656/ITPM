import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import Head from "next/head";
import Header from "@/Layout/Header";
import Footer from "@/Layout/Footer";
import Navbar from "@/Layout/Navbar";
import BasicModal from "@/Components/codeGeneratorModal";
import SlideBar from "@/Layout/Slidebar";

import Grid from "@mui/material/Grid";


//const inter = Inter({ subsets: ["latin"] });
export default function CodeGenerator() {

    const [content, setConten] = useState(9.5); // Added a state variable
const [slideBar, setslideBar] = useState(2.5);
const expandContent = (value) => {
  if (value) {
    setConten(9.5);
    setslideBar(2.5);
  } else {
    setConten(11.4);
    setslideBar(0.6);
  }
};


  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={slideBar}>
          {" "}
          <SlideBar expandContent={expandContent} />
        </Grid>
        <Grid item xs={content}>
          <Head>{/* Add your head content here */}</Head>
          <Header />

          <BasicModal />
          <Footer />
        </Grid>
      </Grid>
    </div>
  );
}
