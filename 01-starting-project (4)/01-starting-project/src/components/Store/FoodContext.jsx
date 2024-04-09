import { createContext, useContext, useState } from "react";

export const FoodContext = createContext({
  foodItem: [],
  foodItemHandler: () => {},
  modalStatusHandler: () => {},
  cart: {},
  cartHandler : () => {},
  quantityHandler: () => {},
  modalHandler: () => {},
  modal: false,
  render: false,
  handlerRender : () => {},
  modalStatus: "cart-modal",
});

const FoodContextProvider = ({ children }) => {
  const [foodItem, setFoodItem] = useState([]);
  const [cartItem, setCartItem] = useState({});
  const [isOpen, setIsOpen] = useState(true)
  const [render, setRender] = useState(true)
  const [modalStatus, setModalStatus] = useState("cart-modal")

  const foodItemHandler = (data) => {
    setFoodItem(data);
  };

  const modalStatusHandler = (data) => {
    setModalStatus(data)
    console.log("modalStatus", modalStatus);
  }

  const handlerRender = () => {
    setRender((prev) => (!prev))
    console.log("Render", render);
  }

  const quantityHandler = (type, cardDetail) => {
    const { id, food_img, food_name, food_price, food_quantity } = cardDetail;
    const card_id = Number(id);
    if (type === "plus") {
      const _cartItem = structuredClone(cartItem)
      if (card_id in _cartItem) {
          _cartItem[card_id]["food_quantity"] = _cartItem[card_id]["food_quantity"] + 1;
        setCartItem(_cartItem);
        setFoodItem((prev) =>
          prev.map((ele) => {
            if (ele["id"] === card_id) {
              return {
                ...ele,
                food_quantity: ele["food_quantity"]++,
              };
            } else {
              return ele;
            }
          })
        );
      } else {
        setCartItem((prev) => {
          prev[card_id] = {
            id: card_id,
            food_img,
            food_name,
            food_price,
            food_quantity: 1,
          };
          return prev;
        });
        setFoodItem((prev) =>
          prev.map((ele) => {
            if (ele["id"] === card_id) {
              return {
                ...ele,
                food_quantity: ele["food_quantity"]++,
              };
            } else {
              return ele;
            }
          })
        );
      }
    } else if (type === "minus") {
      const _cartItem = structuredClone(cartItem)
      if (card_id in _cartItem && food_quantity !== 0) {
        _cartItem[card_id]["food_quantity"] = _cartItem[card_id]["food_quantity"] - 1;
        setCartItem(_cartItem)
        setFoodItem((prev) =>
          prev.map((ele) => {
            if (ele["id"] === id) {
              return {
                ...ele,
                food_quantity: ele["food_quantity"]--,
              };
            } else {
              return ele;
            }
          })
        );
      }else if(food_quantity == 0){
        delete _cartItem[card_id];
        setCartItem(_cartItem);
        // setFoodItem(foodItem.filter((x)=> x.id!==id))
      }
    }
  };
  
  const modalHandler = () => {
    console.log("modal");
    setIsOpen((prev) => {return !prev})
    console.log(isOpen, "isOpen");
  }
  
  
  const cartHandler = () => {
    // let _cart = structuredClone(cartItem)
    // _cart = Object.values(_cart).filter(item => item["food_quantity"] > 0);
    // console.log(cart, "_Cart");
    // setCartItem(_cart)
  }
  
  const ctxVal = {
    "foodItem": foodItem,
    foodItemHandler,
    "cart": cartItem,
    quantityHandler,
    modalHandler,
    "modal": isOpen,
    handlerRender,
    render,
    "modalStatus": modalStatus,
    modalStatusHandler,
    cartHandler
  };

  return <FoodContext.Provider value={ctxVal}>{children}</FoodContext.Provider>;
};
export default FoodContextProvider;
