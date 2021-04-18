import { memo } from 'react'
import React, { Component } from 'react';
import styles from './Task.module.css';
import {Card, Button, InputGroup} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck,faHourglassHalf} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
// import GetDate from '../../Helpers/GetDate'
import { withRouter,Link } from 'react-router-dom';


const Task = ({ 
                task, 
                handleDeletetask, 
                handlecheckedTasks, 
                isAnyTaskChecked, 
                isChecked, 
                getEditableTask,
                editableTask,
                toggleStatus,
                ...props}) => {

                    // console.log(task.date)

        const classes = [];
        if(isChecked){
            classes.push(styles.disabled)
        }
        
        
   
      
        return(     
                <Card className={classes.join(' ')}>
                    <div className={styles.chbox}>
                            <InputGroup.Checkbox 
                            onChange={() => handlecheckedTasks(task._id)}
                            checked = {isChecked}

                            
                            />
                    </div>
                    <Card.Body>
                        <Card.Title  style={{color:"#495057"}}>
                            <Link to={`/task/${task._id}`}>
                                 {task.title} 
                            </Link>
                        </Card.Title>
                        <Card.Text  style={{color:"#495057"}} className="mb-3">{task.description}</Card.Text>
                        <Card.Text  style={{color:"#495057"}} className="mb-3">{task.date.slice(0,10)}</Card.Text>
                        
                        <Button
                            variant="outline-danger"
                            onClick={(e) => handleDeletetask(task._id)}
                            disabled={isAnyTaskChecked}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                            
                        <Button 
                            variant="outline-warning" 
                            className="ml-3"
                            disabled={isAnyTaskChecked}
                            onClick={() => getEditableTask(task)}
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>

                        <Button 
                            variant={task.status ==="done" ? "outline-success" : "outline-info" } 
                            className="ml-3"
                            onClick={() => toggleStatus(task)}
                        >
                           {task.status === "done" && <FontAwesomeIcon icon={faCheck} />}
                           {task.status === "active" && <FontAwesomeIcon icon={faHourglassHalf} />}
                        </Button>
                    
                    </Card.Body>
                </Card>
        )
    
}
Task.propTypes = {
    task:PropTypes.shape({
        _id:PropTypes.string.isRequired,
        title:PropTypes.string.isRequired,
        description:PropTypes.string.isRequired,
    }),
    handleDeletetask:PropTypes.func,
    handlecheckedTasks:PropTypes.func,
    isAnyTaskChecked:PropTypes.bool,
    isChecked:PropTypes.bool,


}
export default withRouter(memo (Task))