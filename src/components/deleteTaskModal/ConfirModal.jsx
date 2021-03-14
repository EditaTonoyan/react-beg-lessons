import PropTypes from 'prop-types';
import {Modal, Button} from 'react-bootstrap';


 const ConfirModal = ( {onHide,handleDeleteCheckedTask,countOrTaskName}) =>  {
    const  onSubmit = () => {
        onHide();
        handleDeleteCheckedTask();
     }
        return (
            <div>
                <Modal 
                    show = {true}
                    backdrop="static"
                    onHide = {onHide}
                     >
                    <Modal.Header closeButton>
                    <Modal.Title>
                        Did You want to delete {countOrTaskName} of tasks?</Modal.Title>
                    </Modal.Header>

                    <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick = {onHide}
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="primary"
                        onClick = {onSubmit}
                        >
                        Delete
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

    ConfirModal.propTypes = {
        onHide: PropTypes.func.isRequired,
        handleDeleteCheckedTask: PropTypes.func.isRequired,
        countOrTaskName: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ])
    }
export default ConfirModal