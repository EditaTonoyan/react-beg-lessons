import React, { Component } from 'react';
import styles from './Task.module.css';
import {Card, Button, InputGroup} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

const Task = ({task, handleDeletetask}) => {

    
        return (
                <Card>
                    <div className={styles.chbox}>
                            <InputGroup.Checkbox />
                        </div>
                <Card.Body>
                    <Card.Title  style={{color:"#495057"}}>
                        <p>{task.title}</p>
                    </Card.Title>
                    <Button
                     variant="danger"
                     onClick={(e) => handleDeletetask(task._id)
                }
                     >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                        
                    <Button 
                     onClick={(e) => handleDeletetask(task._id)}
                     variant="warning" 
                     className="ml-3">
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                   
                </Card.Body>
                </Card>
        )
    
}
export default Task