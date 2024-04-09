import "./Modal.scss"

const Modal = ({isOpen, onClose, children}) => {

    
    if (!isOpen) {
        document.body.style.overflow = "visible"
        return null;
    }  // Don't render anything if the modal
    document.body.style.overflow = "hidden";

    return(
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-content">
                    <button className="modal-close" onClick={onClose}>X</button>
                    {children}
                </div>
            </div>
        </div>
    )
}
export default Modal