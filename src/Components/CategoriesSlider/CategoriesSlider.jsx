import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import style from "./Category.module.css";

export default function CategoriesSlider() {
  let [allCat, setCat] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };

  async function getData() {
    setisLoading(true);
    let { data } = await axios.get(
      `https://route-ecommerce.onrender.com/api/v1/categories`
    );
    setCat(data.data);
    setisLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <i className="fas fa-spinner fa-spin fa-2x text-mainColor "></i>
        </div>
      ) : (
        <Slider {...settings} className="my-3">
          {allCat?.map((ele) => (
            <div key={ele._id}>
              <img src={ele.image} className={style.customImage} alt="" />
              <p className="text-center h6  my-2">{ele.name}</p>
            </div>
          ))}
        </Slider>
      )}
    </>
  );
}
