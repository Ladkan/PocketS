import './style.scss'

function Modal(props:any){
    const {isOpen, onClose, children} = props
    if(!isOpen) return null

    return (
        <div className="modal" >
            <div className="modal_content">
                {children}
                <button onClick={onClose} >Close</button>
            </div>
        </div>
    )
}

export default Modal