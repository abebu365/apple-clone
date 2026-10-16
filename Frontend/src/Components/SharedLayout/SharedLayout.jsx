import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import YoutubeVideos from "../Main/YoutubeVideos/YoutubeVideos";
import Footer from "../Footer/Footer";

function SharedLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <YoutubeVideos />
      <Footer />
    </>
  );
}

export default SharedLayout;
