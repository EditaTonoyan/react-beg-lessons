import React, { Component } from 'react';
// import Addnewtask from '../components/Addnewtask';
import Task from '../Task/Task'
import Addtask from '../Addnewtask/Addtask'
import IdGenerator from '../../Helpers/IdGenerator'
import styles from './Todo.module.css'
import { Col, Container, Row } from 'react-bootstrap';


export default class Todo extends Component {
    state = {
        task:[
            {_id:IdGenerator(), title:'task1'},
            {_id:IdGenerator(), title:'task2'},
            {_id:IdGenerator(), title:'task3'},
        ],
        inputValue:''
        
    }

    handleSubmit = (value) =>{
        const task = [...this.state.task];
        task.push({title:value, _id:IdGenerator()});
        this.setState({
            task
        });
    }

    handleDeletetask = (_id) => {
        // console.log('id',_id)
        let task = [...this.state.task];
            task = task.filter(task => task._id !== _id)
        this.setState({
            task
        })
   
    }
    render() {
        const newTask = this.state.task.map(task => {
            return (<Col className = "mt-3"
                         key = {task._id} >
                        < Task task={task}
                          handleDeletetask = {this.handleDeletetask}
                         />
                    </Col>)
        })



        return (
            <Container >
                <Row>
                    <Col>
                        <h1 className={styles.header}>My ToDo List</h1>
                    </Col>
                    
                </Row>
                <Row>
                    <Col>
                        <Addtask
                             handleSubmit = {this.handleSubmit}
                        />
                     </Col>
                    
                </Row>
                
                 <Row xl={4} xs={2} sm={3}> 
                    {newTask.length ? newTask : <p style={{color:'black'}}>there are no tasks</p>}
                 </Row>
                

            </Container>
        )
    }
}
