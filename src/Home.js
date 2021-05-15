import React from "react";
import app from "./base";



import CoverComp from "./routes/comp/CoverComp";
import SliderFstComp from "./routes/comp/SliderFstComp";
import BoxTopComp from "./routes/comp/BoxTopComp";

import VendorBannerComp from "./routes/comp/VendorBannerComp";

import FooterComp from "./routes/comp/FooterComp";
import BlogComp from "./routes/comp/BlogComp";


import StatBoxComp from "./routes/comp/StatBoxComp";
import VideoComp from "./routes/comp/VideoComp";



const Home = () => {
  return (
  	<div>

      	
      	<CoverComp />
        <SliderFstComp />
        <BoxTopComp />
        <BlogComp />
        <VideoComp />
        <VendorBannerComp />
        <StatBoxComp />
      	

     </div>
  );
};

export default Home;
