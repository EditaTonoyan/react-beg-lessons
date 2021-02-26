import React, { Component } from 'react';
// import Addnewtask from '../components/Addnewtask';
import Task from '../Task/Task'
import Addtask from '../Addnewtask/Addtask'
import styles from './Todo.module.css'
import { Col, Container, Row } from 'react-bootstrap';


export default class Todo extends Component {
    state = {
        task:['a1', 'a2'],
        inputValue:''
        
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
            return (<Col 
                         key = {index} >< Task task={value} />
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
                             deschandleSubmit = {this.deschandleSubmit}
                        />
                     </Col>
                    
                </Row>
                
                 <Row> 
                    {newTask}
                 </Row>
                

            </Container>
        )
    }
}
