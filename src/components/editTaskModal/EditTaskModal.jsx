import React, { createRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

class EditTaskModal extends React.Component {
    constructor(props) {
        super(props);
        this.titleInputRef = createRef(null);
        this.state = {
            ...props.editableTask
        }
    }
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    handleS = ({ key, type }) => {
        const { title, description } = this.state;
        if (!title ||
            !description ||
            (type === 'keypress' && key !== 'Enter')
        )
            return;


        this.props.onSubmit(this.state);
        this.props.onHide();
    }

    componentDidMount() {
        this.titleInputRef.current.focus();
    }
    render() {
        const { onHide } = this.props;
        const { title, description } = this.state;
        return (
            <Modal
                show={true}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Task Modal
        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="mb-5 mt-5" onSubmit={(e) => e.preventDefault()}>
                        <Form.Group >
                            <Form.Control
                                name="title"
                                type="text"
                                placeholder="Title"
                                onChange={this.handleChange}
                                onKeyPress={this.handleS}
                                ref={this.titleInputRef}
                                value={title}
                            />

                        </Form.Group>
                        <Form.Group >
                            <Form.Control
                                name="description"
                                as="textarea"
                                rows={3}
                                style={{ resize: "none" }}
                                placeholder="Description"
                                onChange={this.handleChange}
                                value={description}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>Close</Button>
                    <Button
                        onClick={this.handleS}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
EditTaskModal.propTypes = {
    onHide: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    editableTask: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    })
}

export default EditTaskModal;
