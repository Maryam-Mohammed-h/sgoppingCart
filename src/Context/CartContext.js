import { createContext } from "react";
import axios from "axios";
export let cartContext = createContext();

export function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  async function addToCart(productIdNumber) {
    return axios
      .post(
        `https://route-ecommerce.onrender.com/api/v1/cart`,
        {
          productId: productIdNumber,
        },
        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  async function getLoggedUserCart() {
    return axios
      .get(`https://route-ecommerce.onrender.com/api/v1/cart`, {
        headers: headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  return (
    <cartContext.Provider value={{ addToCart, getLoggedUserCart }}>
      {props.children}
    </cartContext.Provider>
  );
}
