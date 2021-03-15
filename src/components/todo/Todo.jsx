import React, { Component } from 'react';
import Task from '../Task/Task';
// import Addtask from '../Addnewtask/Addtask'
import IdGenerator from '../../Helpers/IdGenerator';
import styles from './Todo.module.css';
import { Col, Container, Row, Button} from 'react-bootstrap';
// import AddTaskModal from '../addTaskModal/AddTaskModal';
// import EditTaskModal from '../editTaskModal/EditTaskModal';
import AddEditTaskModal from '../AddEditTaskModal/AddEditTaskModal'
import ConfirModal from '../deleteTaskModal/ConfirModal'


class Todo extends Component {
    state = {
        task:[
            {
                _id:IdGenerator(),
                 title:'task1',
                 description:"taskDesc1"
            },

            {
                _id:IdGenerator(), 
                title:'task2', 
                description:"taskDesc2"
            },

            {
                _id:IdGenerator(), 
                title:'task3', 
                description:"taskDesc13"
            },
        ],
        inputValue:'',
        checkedTasks:new Set(),
        onHide:true,
        isOpenAddEditTaskModal:false,
        isOpenDeleteTaskModal:false,
        editableTask:{
            _id:'',
            title:'',
            description:''
        }
        
    }


    toggleOpenTaskModel = (editableTask = null) => {       
        if(editableTask === null){
            this.setState({
                isOpenAddEditTaskModal:!this.state.isOpenAddEditTaskModal
            });
        }else{
            this.setState({
                isOpenAddEditTaskModal:!this.state.isOpenAddEditTaskModal,
                editableTask
            });
        }
        
    }

    handleSubmit = (inputsValues) =>{
        const task = [...this.state.task];
        if(inputsValues._id === ''){
            inputsValues._id = IdGenerator();
            task.push(inputsValues);
            this.setState({
                task
            });
        }else{
            const idx = task.findIndex(task => task._id === inputsValues._id);
            task[idx] = inputsValues;
            const editableTask = {
                _id:'',
                title:'',
                description:''
            }
            this.setState({
                task,
                editableTask
            });
        }

        
        
    }

    toggleOpenDeleteTaskModal = () => {
        this.setState({
            isOpenDeleteTaskModal:!this.state.isOpenDeleteTaskModal
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

    getTaskById = (checkedTasks) =>{
        let title = null;
        if(checkedTasks.size == 1){
            const iterator = checkedTasks.values();
            const id = iterator.next().value;
            const chachetask = this.state.task.find(task => task._id == id);
            title = chachetask.title;
        }else{
          title = checkedTasks.size;
        }
    
        return title;
        
       
    
    }

    render() {
        const {checkedTasks,task,isOpenAddEditTaskModal,isOpenDeleteTaskModal} = this.state;
        const newTask = this.state.task.map(task => {
            return (<Col className = "mt-3"
                         key = {task._id} >
                        < Task task={task}
                        isChecked = {checkedTasks.has(task._id)}
                        isAnyTaskChecked = {!!checkedTasks.size}
                        handleDeletetask = {this.handleDeletetask}
                        handlecheckedTasks = {this.handlecheckedTasks}
                        handleCheckAll = {this.handleCheckAll}
                        toggleOpenTaskModel = {this.toggleOpenTaskModel}
                        />
                         
                    </Col>)
        })

      



        return (
            <>
            <Container>
                <Row>
                    <Col>
                        <h1 className={styles.header}>My ToDo List</h1>
                    </Col>
                    
                </Row>

                <Row>
                    <Col>
                        <Button
                            style={{marginLeft:'50%'}}
                            onClick = {() => this.toggleOpenTaskModel(this.state.editableTask)}
                            disabled = {checkedTasks.size || this.state.title || this.state.description}
                        >
                            Click For Add
                        </Button>
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
                      onClick = {this.toggleOpenDeleteTaskModal}
                      
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
            {/* {isOpenAddTaskModel && <AddTaskModal
                                    onHide = {this.toggleOpenAddTaskModel}
                                    isAnyTaskChecked = {!!checkedTasks.size}
                                    handleSubmit = {this.handleSubmit}
            />} */}

            {isOpenDeleteTaskModal && <ConfirModal
                                          onHide = {this.toggleOpenDeleteTaskModal}
                                          handleDeleteCheckedTask = {this.handleDeleteCheckedTask}
                                          countOrTaskName = {this.getTaskById(checkedTasks)}
            />}
{/* 
            {editableTask  && <EditTaskModal
                                    onHide = {this.removeEditableTask}
                                    editableTask={editableTask}
                                    onSubmit={this.handleEditTask}
                                    
                                  />
            } */}

            { isOpenAddEditTaskModal && <AddEditTaskModal
                                            onHide = {this.toggleOpenTaskModel} 
                                            editableTask = {this.state.editableTask}
                                            handleSubmit = {this.handleSubmit}
                                        />}
            </>
        )
    }
}

export default Todo;