import React, { Component } from 'react';
import styles from './Task.module.css';
import {Card, Button, InputGroup} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

const Task = ({
     task,
     handleDeletetask,
     handlecheckedTasks,
     isAnyTaskChecked,
     isChecked
    }) => {
        const classes = [];
        if(isChecked){
            classes.push(styles.disabled)
        }
  
    
        return (
     
                <Card className={classes.join(' ')}>
                    <div className={styles.chbox}>
                            <InputGroup.Checkbox 
                            onClick={() => handlecheckedTasks(task._id)}
                            />
                    </div>
                <Card.Body>
                    <Card.Title  style={{color:"#495057"}}>
                        <p>{task.title}</p>
                    </Card.Title>
                    <Button
                        variant="danger"
                        onClick={(e) => handleDeletetask(task._id)}
                        disabled={isAnyTaskChecked}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                        
                    <Button 
                        variant="warning" 
                        className="ml-3"
                        disabled={isAnyTaskChecked}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                   
                </Card.Body>
                </Card>
        )
    
}
export default Task