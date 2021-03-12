import React, { Component } from 'react';
import {memo} from 'react'
import {Modal, Button} from 'react-bootstrap';

 const ConfirModal = ( {onHide,handleDeleteCheckedTask,count}) =>  {
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
                        Did You want to delete {count} of tasks?</Modal.Title>
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

export default memo(ConfirModal)