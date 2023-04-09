import React from "react";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider.jsx";
import FeaturedProduct from "../FeaturedProduct/FeaturedProduct.jsx";
import Header from "../Header/Header.jsx";

export default function Home() {
  return (
    <>
      <Header />
      <CategoriesSlider />
      <FeaturedProduct />
    </>
  );
}
