import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

const MessageModal = props => {
    return (
        <Modal 
            show={props.isOpen} 
            backdrop="static"
        >
            <Modal.Body>
                <h5>{props.message}</h5>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.toggleModal} >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MessageModal;