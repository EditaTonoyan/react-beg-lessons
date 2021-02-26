import React, { Component } from 'react'
import styles from './Task.module.css'

export default class Task extends Component {
   
    render() {
        const {task} = this.props;
        return (
            <div>
                <div  className="task">
                  
                    <li className="list-group-item ">
                        <div>{task}
                            {this.props.task.value}
                            <button
                                type="button"
                                className="close">&times;
                            </button>
                        </div>
                    </li> 
       
                </div> 
            </div>
        )
    }
}
