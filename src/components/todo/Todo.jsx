import React, { Component } from 'react';
// import Addnewtask from '../components/Addnewtask';
import Task from '../Task/Task'
import Addtask from '../Addnewtask/Addtask'
import IdGenerator from '../../Helpers/IdGenerator'
import styles from './Todo.module.css'
import { Col, Container, Row, Button} from 'react-bootstrap';


export default class Todo extends Component {
    state = {
        task:[
            {_id:IdGenerator(), title:'task1'},
            {_id:IdGenerator(), title:'task2'},
            {_id:IdGenerator(), title:'task3'},
        ],
        inputValue:'',
        checkedTasks:new Set()
        
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
        const task = [...this.state.task];
        task = task.filter(task => task._id !== _id)
        this.setState({
            task
        })
   
    }

    handlecheckedTasks = (_id) => {
       const {checkedTasks} = this.state;
       let newSet = checkedTasks;
        if(!newSet.has(_id)){
            newSet.add(_id)
        }else{
            newSet = newSet.delete(_id)
        }
        this.setState({
            checkedTasks
        })
    }
    
    handleDeleteCheckedTask = () => {
        let task = [...this.state.task];
        const {checkedTasks} = this.state;
         task = task.filter(task => !checkedTasks.has(task._id));
        this.setState({
            task,
            checkedTasks:new Set()
           
        })
        
    }


    render() {
        const {checkedTasks} = this.state;
        const newTask = this.state.task.map(task => {
            return (<Col className = "mt-3"
                         key = {task._id} >
                        < Task task={task}
                        isChecked = {checkedTasks.has(task._id)}
                        isAnyTaskChecked = {!!checkedTasks.size}
                        handleDeletetask = {this.handleDeletetask}
                        handlecheckedTasks = {this.handlecheckedTasks}
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
                            isAnyTaskChecked = {!!checkedTasks.size}
                             handleSubmit = {this.handleSubmit}
                        />
                     </Col>
                    
                </Row>
                
                 <Row xl={4} xs={2} sm={3}> 
                    {newTask.length ? newTask : <p style={{color:'black'}}>there are no tasks</p>}
                 </Row>
                <Row  className="justify-content-center mt-5">
                    <Button 
                    variant = "danger"
                    onClick = {this.handleDeleteCheckedTask}
                    disabled = {!!!checkedTasks.size}
                    >
                        Delete All checked
                    </Button>
                </Row>
            </Container>
        )
    }
}
