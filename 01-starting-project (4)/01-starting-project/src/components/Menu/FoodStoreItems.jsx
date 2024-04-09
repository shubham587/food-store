import { useContext, useEffect, useState } from "react";
import { FoodContext } from "../Store/FoodContext";
import axios from "axios";
import FoodCard from "../Utils/FoodCard";
import errImg from "../../assets/brokenImg.png"
import "./FoodStoreItems.scss";
import Modal from "../Utils/Modal";

const FoodStoreItems = () => {
  const foodCtx = useContext(FoodContext);
  const [error, setError] = useState(false);
  const { foodItem, foodItemHandler } = foodCtx;
  useEffect(() => {
    const getFoodItems = async () => {
      await axios
        .get("http://192.168.42.133:5000/food-store")
        .then((res) => {
          foodCtx.foodItemHandler(res.data["food-store"]);
          setError(false)
        })
        .catch((err) => {
          setError(true);
        });
    };
    getFoodItems();
  }, []);
  // console.log(foodItem);
  return (
    <>
      <h1 style={{ textAlign: "center" }}>MENU</h1>
      {error? "":<div className="food-store-container">
        {foodItem.map((ele, ind) => (
          <FoodCard key={ind} cardDetail={ele} />
        ))}
      </div>}
      {/* <Modal  /> */}
    </>
  );
};
export default FoodStoreItems;
