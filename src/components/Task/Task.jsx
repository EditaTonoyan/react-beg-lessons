import { memo } from 'react'
import React, { Component } from 'react';
import styles from './Task.module.css';
import {Card, Button, InputGroup} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import withScreenSizes from '../../hoc/WithScreenSizes';
import PropTypes from 'prop-types';
import { string } from 'prop-types';

const Task = ({ 
                task, 
                handleDeletetask, 
                handlecheckedTasks, 
                isAnyTaskChecked, 
                isChecked, 
                ...props}) => {
        const classes = [];
        if(isChecked){
            classes.push(styles.disabled)
        }
  
    
        return (
     
                <Card className={classes.join(' ')}>
                    <div className={styles.chbox}>
                            <InputGroup.Checkbox 
                            onChange={() => handlecheckedTasks(task._id)}
                            checked = {isChecked}
                            
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
Task.propTypes = {
    task:PropTypes.shape({
        _id:PropTypes.string,
        title:PropTypes.string,
    }),
    handleDeletetask:PropTypes.func,
    handlecheckedTasks:PropTypes.func,
    isAnyTaskChecked:PropTypes.bool,
    isChecked:PropTypes.bool,


}
export default memo (withScreenSizes(Task))