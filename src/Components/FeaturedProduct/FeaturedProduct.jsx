import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { cartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function FeaturedProduct() {
  let [allProduct, setProduct] = useState([]);
  let { addToCart } = useContext(cartContext);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

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
  async function getData() {
    setisLoading(true);

    let { data } = await axios.get(
      `https://route-ecommerce.onrender.com/api/v1/products`
    );
    setProduct(data.data);
    setisLoading(false);
  }

  return (
    <div>
      <h4 className="my-5">FeaturedProduct</h4>
      <div className="row gy-4">
        {isLoading ? (
          <div className="text-center">
            <i className="fas fa-spinner fa-spin fa-2x text-mainColor "></i>
          </div>
        ) : (
          allProduct.map((ele) => (
            <div
              className="col-md-2 home-product cursor-pointer pb-2"
              key={ele._id}
            >
              <Link to={`products/${ele._id}`}>
                {" "}
                <img src={ele.imageCover} className="w-100" alt="" />
                <p className="text-mainColor  fw-bold">{ele.category.name}</p>
                <p className="text-muted">
                  {" "}
                  {ele.title.split(" ").slice(0, 2).join(" ")}
                </p>
                <div className="box d-flex justify-content-between">
                  <span className="text-muted">{ele.price} EGP</span>
                  <span>
                    {ele.ratingsAverage}{" "}
                    <i className="fas fa-star text-warning"></i>
                  </span>
                </div>
              </Link>
              <button
                className="btn w-100 mt-2 text-white bg-main product-home-button"
                onClick={() => addProductToCart(ele._id)}
              >
                + Add
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
