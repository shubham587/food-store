import { useContext } from "react";
import "./QuantityBtn.scss";
import { FoodContext } from "../Store/FoodContext";
const QuantityBtn = ({ detail, quantityVal }) => {
    const {quantityHandler, handlerRender, cartHandler} = useContext(FoodContext)
  return (
    <>
    <div className="btn-container">
      <button
        onClick={() => {quantityHandler("minus", detail); cartHandler; handlerRender()}}
        className="qty-btn qty-minus"
      >
        -
      </button>
      <h3 className="order-qty ">{quantityVal}</h3>
      <button
        onClick={() => {quantityHandler("plus", detail); cartHandler; handlerRender()}}
        className="qty-btn qty-plus"
      >
        +
      </button>
    </div>
    </>
  );
};
export default QuantityBtn;
