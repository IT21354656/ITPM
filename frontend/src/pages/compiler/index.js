import React from "react";
import Head from "next/head";
import Footer from "@/Layout/Footer";
//import SlideBar from "@/Layout/Slidebar"; // Corrected import statement
import Header from "@/Layout/Header";
import Compiler from "@/Components/compiler";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
export default function CompilerPage() {
  // Renamed the component to CompilerPage
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
        <Grid item xs={0.05}>
          {" "}
          {/* <SlideBar expandContent={expandContent} /> */}
        </Grid>
        <Grid item xs={11.9}>
          <Head>{/* Add your head content here */}</Head>
          <Header />

          <Compiler />
          <Footer />
        </Grid>
        <Grid item xs={0.1}>
          {" "}
          {/* <SlideBar expandContent={expandContent} /> */}
        </Grid>
      </Grid>
    </div>
  );
}
