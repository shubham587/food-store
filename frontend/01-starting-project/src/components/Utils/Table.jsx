import { useContext } from "react";
import "./Table.scss";
import { FoodContext } from "../Store/FoodContext";
import QuantityBtn from "./QuantityBtn";
const Table = ({ tHeader, tData }) => {
  const { cart, quantityHandler, handlerRender, modals, modalStatusHandler } =
    useContext(FoodContext);
  tData = Object.values(cart).filter((innerObj) => (innerObj["food_quantity"] != 0 ) )
  // tData.forEach(element => {
  //   if(element["food_quantity"] != 0){
  //     return  element;
  //   }else{

  //   }
  // });
  console.log(tData, "in table");
  console.log(tData, "tData");
  console.log(tHeader, "tHeader");
  return (
    <div className="table-container">
      <table className="table-content">
        <thead>
          <tr>
            {tHeader.map((head, ind) => (
              <td key={ind}>{head}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {tData.map((data, ind) => (
            data["food_quantity"] != undefined ?
            <tr key={ind}>
              <td>{ind + 1}</td>
              <td>{data["food_name"]}</td>
              <td>{data["food_price"]}</td>
              {/* <td>{data["food_quantity"]}</td> */}
              <td>
                <QuantityBtn
                  detail={data}
                  quantityVal={data["food_quantity"]}
                />
              </td>
            </tr> : ""
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
