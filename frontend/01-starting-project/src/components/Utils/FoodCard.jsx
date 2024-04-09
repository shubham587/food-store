import "./FoodCard.scss";
import logo from "../../public/logo.jpg";
import { FoodContext } from "../Store/FoodContext";
import { useContext } from "react";
const FoodCard = ({ cardDetail }) => {
  const { id, food_img, food_name, food_price, food_quantity } = cardDetail;
  const { quantityHandler, cartHandler } = useContext(FoodContext);
  // console.log(foodCtx);
  return (
    <div className="food-card-container">
      <div className="food-card">
        <div className="card-img">
          <img
            src={`http://192.168.42.133:5000/food-store/images/${Number(id)}`}
            // onError={(e) => (e.target.src = "../../public/brokenImg.png")}
            alt={`image ${id}`}
          />
        </div>
        <div className="food-name">
          <h3>Name: {food_name}</h3>
        </div>
        <div className="food-op">
          <div className="food-price">
            <h3>Price: {food_price}</h3>
          </div>
          <div className="food-quantity">
            <h3>Quantity: </h3>
            <button
              onClick={() => { quantityHandler("minus", cardDetail); }}
              className="qty-btn qty-minus"
            >
              -
            </button>
            <h3 className="order-qty qty-btn">{food_quantity}</h3>
            <button
              onClick={() => { quantityHandler("plus", cardDetail); }}
              className="qty-btn qty-plus"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
