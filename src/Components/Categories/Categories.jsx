import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import style from './Category.module.css'

export default function Categories() {
 
  let [allCat,setCat] = useState([])
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };


  async function getData()
  {
   let {data} =  await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`)
   setCat(data.data)
  }

  useEffect(()=>{
    getData()
  },[])

  return <>
   <Slider {...settings} className="my-3">
      {allCat.map((ele)=> <div key={ele._id}>
        <img src={ele.image} className={style.customImage} alt="" />
        <p className="text-center my-2">{ele.name}</p>
      </div>)}  
    </Slider>
  </>
}
