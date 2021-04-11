import React, { Component } from 'react';
import Task from '../../Task/Task';
import styles from './Todo.module.css';
import { Col, Container, Row, Button} from 'react-bootstrap';
import AddEditTaskModal from '../../AddEditTaskModal/AddEditTaskModal'
import ConfirModal from '../../deleteTaskModal/ConfirModal';
import Spinner from '../SingleTaskPage/Spinner/Spinner';
import {connect} from 'react-redux';


const API_HOST = "http://localhost:3001";
class Todo extends Component {


    handleEditTask = async(editableTask) => {
            try{
                const _id = editableTask._id
                this.props.setOrRemoveSpinner(true)
                const res = await fetch (`${API_HOST}/task/${_id}`,{
                    method:"PUT",
                    body:JSON.stringify(editableTask),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await res.json();
                if(data.error){
                    throw data.error
                }else{ 
                    this.props.editTask(data)
                }
            
                }catch( error)  {
                    console.log("edit task error", error)
                }finally{
                    this.props.setOrRemoveSpinner(false)

                }
    }

    handleAddTask = (formData) => {
        this.props.setOrRemoveSpinner(true)

        fetch(`${API_HOST}/task`,{
            method:"POST",
            body:JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data=> {
            if(data.error){
                throw data.error  
            }else{
                this.props.addTask(data)
            }
          

        })
        .catch(error=> {
            console.log("error", error)
        })
        .finally(()=>{
            this.props.setOrRemoveSpinner(false)

        })
     

    }

    componentDidMount() {
        this.props.setOrRemoveSpinner(true)

        fetch(`${API_HOST}/task`)
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error;
                this.props.setTask(data)
            })
            .catch(error => {
                console.log("Get All Tasks ", error);
            })
            .finally(()=>{
                this.props.setOrRemoveSpinner(false)

            })
    }
 
    handleDeletetask = async(_id) => {
           try{
              
            this.props.setOrRemoveSpinner(true)

                let response = await fetch(`${API_HOST}/task/${_id}`,{
                method:"DELETE"
                });
                let result = await response.json();
                if(result.error){
                    throw result.error
                }else{
                   this.props.deleteOneTask(_id)
                }
           }catch(error){
            console.log("error delete task", error)
           }finally{
            this.props.setOrRemoveSpinner(false)

           }
    }

    
    handleDeleteCheckedTask = () => {
        
        const {checkedTasks} = this.props;
        this.props.setOrRemoveSpinner(true)

        fetch(`${API_HOST}/task`,{
            method:"PATCH",
            body: JSON.stringify({ tasks: Array.from(checkedTasks) }),
            headers:{
                "Content-Type": "application/json"
            }
            
        })
        .then(res => res.json())
        .then(data =>{
           if(data.error){
               throw data.error
           }else{
                this.props.deleteCheckedTask()

           } 
        })
        .catch(error => {
            console.log("delete All Task Error", error)
        })
        .finally(() => {
            this.props.setOrRemoveSpinner(false)

        })
       
        
    }

    render() {
        
        const {
                task,
                isOpenAddTaskModal,
                isOpenSpinner,
                isOpenDeleteTaskModal,
                editableTask,
                checkedTasks,
                oneCheckedTask
            } = this.props
        const newTask = task.map(task => {
            return (<Col 
                        className = "mt-3"
                         key = {task._id}
                    >
                        < Task task={task}
                        isChecked = {checkedTasks.has(task._id)}
                        isAnyTaskChecked = {!!checkedTasks.size}
                        handleDeletetask = {this.handleDeletetask}
                        handlecheckedTasks = {this.props.handlecheckedTasks}
                        handleCheckAll = {this.handleCheckAll}
                        getEditableTask = {this.props.toggleSetEditableTask}
                        editableTask={editableTask}
                        />
                         
                    </Col>)
        })

      



        return (
            <div className = {styles.body}>
            <Container >
                <Row>
                    <Col>
                        <h1 className={styles.header}>My ToDo List</h1>
                    </Col>
                    
                </Row>

                <Row>
                    <Col>
                        <Button
                            style={{marginLeft:'50%'}}
                            onClick = {this.props.setOrRemoveModal}
                            disabled = {!!checkedTasks.size}
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
                      onClick = {this.props.toggleOpenDeleteTaskModal}
                      
                    >
                        Delete All checked
                    </Button>
                    
                
                    <Button 
                      style = {{display:!!task.length ? 'block' : 'none' }}
                      className="ml-5"
                      variant="primary"
                      onClick = {this.props.handleToggleCheckAll}
                      disabled = {checkedTasks == ''}
                 
                    >
                        {
                          task.length === checkedTasks.size ? "Remove Checked": "Check All"
                        }
                    </Button>

                </Row>                
            </Container>

            {isOpenDeleteTaskModal && <ConfirModal
                                          onHide = {this.props.toggleOpenDeleteTaskModal}
                                          handleDeleteCheckedTask = {this.handleDeleteCheckedTask}
                                          countOrTaskName = {oneCheckedTask ? oneCheckedTask.title : checkedTasks.size}
            />}


                {
                    isOpenAddTaskModal && <AddEditTaskModal
                        onHide={this.props.setOrRemoveModal}
                        onSubmit={this.handleAddTask}
                    />
                }

                {
                    editableTask && <AddEditTaskModal
                        onHide={this.props.toggleSetEditableTask}
                        onSubmit={this.handleEditTask}
                        editableTask={editableTask}
                    />
                }

                {isOpenSpinner &&  <Spinner/>}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
       task:state.todoState.task,
       isOpenAddTaskModal:state.todoState.isOpenAddTaskModal,
       isOpenSpinner:state.isOpenSpinner,
       isOpenDeleteTaskModal:state.todoState.isOpenDeleteTaskModal,
       editableTask:state.todoState.editableTask,
       checkedTasks:state.todoState.checkedTasks,
       oneCheckedTask:state.todoState.oneCheckedTask
    }
    
}

const mapDispatchToProps = (dispatch) =>{
    return{
       setTask:(data) => {
           dispatch({type:"SET_TASKS", data})
       },
       setOrRemoveSpinner:(isOpenSpinner) => {
        dispatch({type:"SET_OR_REMOVE_SPINNER", isOpenSpinner})
       },
       setOrRemoveModal:() => {
        dispatch({type: "SET_OR_REMOVE_ADD_MODAL"})
       },
        addTask:(data) => {
        dispatch({type:  "ADD_TASK", data})
       },
       toggleOpenDeleteTaskModal:() => {
        dispatch({type:"DELETE_TASK_MODAL"})
       },
       deleteOneTask:(_id) => {
        dispatch({type:"DELETE_ONE_TASK",_id})
       },
       editTask:(data) => {
        dispatch({type: "EDIT_TASK", data})
       },
    
       toggleSetEditableTask:(data) => {
           dispatch({type:"TOGGLE_SET_EDITABLE_TASK", data})
       },
       handlecheckedTasks:(_id) => {
        dispatch({type:"CHECKED_TASKS", _id})

       },
       deleteCheckedTask:() => {
        dispatch({type:"DELETE_CHECKED_TASKS"})

       },
       handleToggleCheckAll:() => {
        dispatch({type:"TOGGLE_CHECK_ALL"})

       },
   
       
        
      
       
      
       
}
}
export default connect(mapStateToProps, mapDispatchToProps)(Todo);
