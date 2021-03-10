import React, { Component } from 'react';
import Task from '../Task/Task'
import Addtask from '../Addnewtask/Addtask'
import IdGenerator from '../../Helpers/IdGenerator'
import styles from './Todo.module.css'
import { Col, Container, Row, Button} from 'react-bootstrap';
import withScreenSizes from '../../hoc/WithScreenSizes'


class Todo extends Component {
    state = {
        task:[
            {_id:IdGenerator(), title:'task1'},
            {_id:IdGenerator(), title:'task2'},
            {_id:IdGenerator(), title:'task3'},
        ],
        inputValue:'',
        checkedTasks:new Set(),
        buttonTitle:'Check All'
        
    }

    handleSubmit = (value) =>{
        const task = [...this.state.task];
        task.push({title:value, _id:IdGenerator()});
        this.setState({
            task

        });
    }

    handleDeletetask = (_id) => {
        let task = [...this.state.task];
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
        this.state.buttonTitle = 'Check All'
        
    }

    handleToggleCheckAll = () => {
        const {task} = this.state
        let checkedTasks = new Set(this.state.checkedTasks)
        if(task.length === checkedTasks.size){
            checkedTasks.clear();
        }else{
            task.forEach(task => {
                checkedTasks.add(task._id)
            });
        }
        this.setState({
            checkedTasks
        })
    }

    render() {
        const {checkedTasks,task} = this.state;
        const newTask = this.state.task.map(task => {
            return (<Col className = "mt-3"
                         key = {task._id} >
                        < Task task={task}
                        isChecked = {checkedTasks.has(task._id)}
                        isAnyTaskChecked = {!!checkedTasks.size}
                        handleDeletetask = {this.handleDeletetask}
                        handlecheckedTasks = {this.handlecheckedTasks}
                        handleCheckAll = {this.handleCheckAll}
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
                     style = {{display:!!task.length ? 'block' : 'none' }}
                      variant = "danger"
                      onClick = {this.handleDeleteCheckedTask}
                      disabled = {!!!checkedTasks.size}
                    >
                        Delete All checked
                    </Button>
                    
                
                    <Button 
                      style = {{display:!!task.length ? 'block' : 'none' }}
                      className="ml-5"
                      variant="primary"
                      onClick = {this.handleToggleCheckAll}
                      disabled = {this.state.checkedTasks == ''}
                 
                    >
                        {
                          task.length === checkedTasks.size ? "Remove Checked": "Check All"
                        }
                    </Button>
    
                </Row>
            </Container>
        )
    }
}

export default withScreenSizes(Todo);