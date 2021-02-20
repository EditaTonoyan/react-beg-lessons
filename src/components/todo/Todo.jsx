import React, { Component } from 'react';
// import Addnewtask from '../components/Addnewtask';
import Task from '../Task/Task'
import Addtask from '../Addnewtask/Addtask'
import styles from './Todo.module.css'


export default class Todo extends Component {
    state = {
        task:['task1', 'task2', 'task3'],
        //inputValue:""
        
    }

    handleSubmit = (value) =>{
        const task = [...this.state.task];
        task.push(value);
        this.setState({
            task
        });
    }

    render() {
        const newTask = this.state.task.map((value, index) => {
            return (<ul className={styles.ul}>< Task task={value} key = {index} /></ul>)
        })

        return (
            <div >
                <h1 className={styles.header}>My ToDo List</h1>
                <Addtask
                 handleSubmit = {this.handleSubmit}/>
                 <div> 
                    {newTask}
                 </div>
                

            </div>
        )
    }
}
