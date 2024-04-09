import Navbar from "../Utils/Navbar";
import FoodStoreItems from "./FoodStoreItems";
import FoodContextProvider, { FoodContext } from "../Store/FoodContext";
import Modal from "../Utils/Modal";
import { useContext, useEffect, useState } from "react";
import Table from "../Utils/Table";

const Menu = ({ ctx }) => {
  const [isModal, setIsModal] = useState(false);
  const [modalStatus, setModalStatus] = useState("");
  const [cartDetail, setCartDetail] = useState({ quantity: 0, amount: 0 });
  const [red, setRed] = useState(false);
  const { cart } = useContext(FoodContext);

  const Cartlength = Object.values(cart).map(ele => ele).length
  console.log(Cartlength, "len");
  
  const modalStatusHandler = (data) => {
    setModalStatus((prev) => {
      return data;
    });
    console.log("modalStatus", modalStatus);
  };

  useEffect(() => {
    if (modalStatus === "order-modal") {
      const interval = setTimeout(() => {
        const tData = Object.values(cart).map((innerObj) => {
          if (innerObj["food_quantity"] != 0) {
            return innerObj;
          }
        });
        console.log(tData, "in int");
        setCartDetail((prev) => {
          return {
            ...prev,
            amount: tData.reduce(
              (total, item) =>
                total + item["food_price"] * item["food_quantity"],
              0
            ),
            quantity: tData.length,
          };
        });
      }, 1000);
      console.log(cartDetail);

      clearTimeout(interval);
    }
    () => {
      clearTimeout(interval);
    };
  }, [modalStatus, cart]);

  const modalHandler = () => {
    setIsModal((prev) => !prev);
    //
    // setFoodItem(ctx.cart)
  };
  return (
    // <FoodContextProvider>
    <>
      <Navbar
        modalStatusHandler={modalStatusHandler}
        modalHandler={modalHandler}
      />
      <Modal isOpen={isModal} onClose={modalHandler}>
        {modalStatus === "cart-modal" ? (
          <>
            {cart != 0 ? (
              <>
                <Table
                  tData={{}}
                  tHeader={["S.No.", "Name", "Price", "Quantity"]}
                />
                <button
                  className="place-order-btn"
                  onClick={() => modalStatusHandler("order-modal")}
                >
                  Place Order
                </button>
              </>
            ) : (
              <h1>Plz add food to Cart</h1>
            )}
          </>
        ) : modalStatus === "order-modal" ? (
          <>
            <div className="order-container">
              <h1>Order Content</h1>
              <Table
                tData={{}}
                tHeader={["S.No.", "Name", "Price", "Quantity"]}
              />
              <div className="order-content">
                <h2>Customer Details:</h2>
                <h3>John Doe</h3>
                <h3>Total Quantity: {cartDetail.quantity}</h3>
                <h3>Totatl Amount: ${cartDetail.amount}</h3>
              </div>
              <button
                className="checkout-btn"
                onClick={() => modalStatusHandler("checkout-modal")}
              >
                CheckOut
              </button>
            </div>
          </>
        ) : modalStatus === "checkout-modal" ? (
          <>
            <h1>Thank you for ordering...</h1>
          </>
        ) : (
          "Something went wrong. Please try again."
        )}
      </Modal>
      <FoodStoreItems />
    </>
    // </FoodContextProvider>
  );
};
export default Menu;
