import { useContext } from "react";
import Menu from "./components/Menu/Menu";
import FoodContextProvider, {
  FoodContext,
} from "./components/Store/FoodContext";

function App() {
  // const ctx = useContext(FoodContext);
  // const [rend, set]
  return (
    <>
      <FoodContextProvider>
        <Menu />
      </FoodContextProvider>
    </>
  );
}

export default App;
