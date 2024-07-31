import React from "react";
import "./Landing.css";

import Header from "../Header/Header";
import NetflixIntro from "../NetflixIntro/NetflixIntro";
import Feature from "../Feature/Feature";
import Faq from "../Faq/Faq";
import Footer from "../Footer/Footer";

function Landing() {
  return (
    <>
      <Header />
      <main>
        <NetflixIntro />
        <Feature />
        <Faq />
      </main>
      <Footer />
    </>
  );
}

export default Landing;
