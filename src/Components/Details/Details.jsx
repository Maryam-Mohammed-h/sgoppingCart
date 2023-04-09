import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Slider from "react-slick";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { cartContext } from "../../Context/CartContext";

export default function Details() {
  const [productDetails, setProductDetails] = useState(null);
  let { addToCart } = useContext(cartContext);

  const [isLoading, setisLoading] = useState(false);
  let { id } = useParams();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  async function getProductDetails(id) {
    setisLoading(true);
    let { data } = await axios.get(
      `https://route-ecommerce.onrender.com/api/v1/products/${id}`
    );

    setProductDetails(data.data);

    setisLoading(false);
  }
  async function addProductToCart(productId) {
    let response = await addToCart(productId);
    if (response?.data?.status === "success") {
      toast(response.data.message, {
        className: "bg-success  text-white",
        position: "top-right",
        duration: 3000,
      });
    } else {
      toast.error("Sorry , try again later", {
        position: "top-right",
        duration: 3000,
      });
    }
  }
  useEffect(() => {
    getProductDetails(id);
  }, []);
  return (
    <>
      <div className="row py-3 justify-content-center align-items-center">
        {isLoading ? (
          <div className="text-center">
            <i className="fas fa-spinner fa-spin fa-2x text-mainColor "></i>
          </div>
        ) : (
          <>
            <div className="col-md-4">
              <Slider {...settings} className="my-3">
                {productDetails?.images.map((img, index) => (
                  <div key={index}>
                    <img src={img} className="w-75" alt="" />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="col-md-8">
              <h4 className="mb-2">{productDetails?.title}</h4>
              <p className="text-muted">{productDetails?.description}</p>
              <b>{productDetails?.price} EG</b>
              <p className="text-danger my-3">
                {productDetails?.category.name}
              </p>
              <button
                className="btn btn-success form-control w-50 my-4"
                onClick={() => addProductToCart(productDetails?.id)}
              >
                +Add
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
