import { useContext } from "react"
import logo from "../../public/logo.jpg"
import "./Navbar.scss"
import { FoodContext } from "../Store/FoodContext"
// import { FontAwesomeIcon } from '@fontawesome/react-fontawesome'

const Navbar = ({modalHandler, modalStatusHandler}) => {

    const ctx = useContext(FoodContext)

    const handleClick = () => {
        modalHandler(),
        modalStatusHandler("cart-modal")
    }
    return(
        <>
            <div className="navbar-container">
                <div className="navbar-logo">
                    <img className="logo" src={logo} alt="logo" />
                </div>
                <div className="place-order">
                    <button onClick={handleClick} className="order-btn">Cart  </button>
                </div>
            </div>
        </>
    )
}
export default Navbar