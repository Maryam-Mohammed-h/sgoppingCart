import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";

export default function Cart() {
  const [cartDetails, setcartDetails] = useState(null);
  let { getLoggedUserCart } = useContext(cartContext);
  async function getCartData() {
    let response = await getLoggedUserCart();
    if (response?.data?.status === "success") {
      setcartDetails(response.data.data);
    }
  }
  useEffect(() => {
    getCartData();
  }, []);
  return (
    <>
      {cartDetails ? (
        <div className="row p-4 my-4">
          <h3>Shop Cart</h3>
          <h6 className="text-mainColor">
            Total cart price : {cartDetails.totalCartPrice}
          </h6>
          {cartDetails.products.map((product) => (
            <div className="row border-bottom py-2 my-2 align-items-center">
              <div className="col-md-1">
                <img
                  src={product.product.imageCover}
                  className="w-100"
                  alt=""
                />
              </div>
              <div className="col-md-11 d-flex justify-content-between">
                <div>
                  <h6>{product.product.title}</h6>
                  <h6 className="text-mainColor">Price:{product.price}</h6>
                  <button className=" btn m-0 p-0 ">
                    <i className="fa-regular fa-trash-can text-mainColor"></i>{" "}
                    Remove
                  </button>
                </div>
                <div>
                  <button className="btn border-main btn-sm">-</button>
                  <span className="mx-2">{product.count}</span>
                  <button className="btn border-main btn-sm">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}
