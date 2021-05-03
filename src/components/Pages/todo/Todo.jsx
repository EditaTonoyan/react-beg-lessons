import React from 'react';
import {useEffect} from 'react'
import Task from '../../Task/Task';
import styles from './Todo.module.css';
import { Col, Container, Row, Button} from 'react-bootstrap';
import AddEditTaskModal from '../../AddEditTaskModal/AddEditTaskModal'
import ConfirModal from '../../deleteTaskModal/ConfirModal';
import Spinner from '../SingleTaskPage/Spinner/Spinner';
import Search from '../../Search/Search'
import {connect} from 'react-redux';
import Types from '../../../redux/actionTypes';
import {
        getTaskThunk,
        addToDoTask,
        deleteOneTask,
        deleteCheckedTask,
        editTaskThunk,
        toggleStatusThunk,
        resetGlobalStatedata
    } from '../../../redux/action';

const Todo = (props) => {


useEffect(() => {
    props.setTask()
    return () => {
        props.resretData()
    }
}, [])

        const {
                task,
                isOpenAddTaskModal,
                isOpenSpinner,
                isOpenDeleteTaskModal,
                editableTask,
                checkedTasks,
                oneCheckedTask,
                toggleStatus
                
            } = props
            
        const newTask = task.map(task => {
            return (<Col 
                        className = "mt-3"
                         key = {task._id}
                    >
                        < Task task={task}
                        isChecked = {checkedTasks.has(task._id)}
                        isAnyTaskChecked = {!!checkedTasks.size}
                        handleDeletetask = {props.deleteOneTask}
                        handlecheckedTasks = {props.handlecheckedTasks}
                        getEditableTask = {props.toggleSetEditableTask}
                        editableTask={editableTask}
                        toggleStatus={toggleStatus}
                        />
                         
                    </Col>)
        })

      



        return (
            <div className = {styles.body}>
            <Container >
                <Row>
                    <Col>
                        <h1 > TODO LIST</h1>
                    </Col>
                    
                </Row>
            </Container >

            <Container style={{backgroundColor:"rgba(60, 139, 120, .3)", padding:"15px"}}>
                <Row>
                    <Col>
                        <Search/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button
                            style={{marginLeft:'50%'}}
                            onClick = {props.setOrRemoveModal}
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
                      disabled = {!!!checkedTasks.size}
                      onClick = {props.toggleOpenDeleteTaskModal}
                      
                    >
                        Delete All checked
                    </Button>
                    
                
                    <Button 
                      style = {{display:!!task.length ? 'block' : 'none' }}
                      className="ml-5"
                      variant="primary"
                      onClick = {props.handleToggleCheckAll}
                      disabled = {checkedTasks == ''}
                 
                    >
                        {
                          task.length === checkedTasks.size ? "Remove Checked": "Check All"
                        }
                    </Button>

                </Row>  
            </Container>


            {isOpenDeleteTaskModal && <ConfirModal
                                          onHide = {props.toggleOpenDeleteTaskModal}
                                          handleDeleteCheckedTask = {() => props.deleteCheckedTask(checkedTasks)}
                                          countOrTaskName = {oneCheckedTask ? oneCheckedTask.title : checkedTasks.size}
            />}


                {
                    isOpenAddTaskModal && <AddEditTaskModal
                        onHide={props.setOrRemoveModal}
                        onSubmit={props.addTask}
                    />
                }

                {
                    editableTask && <AddEditTaskModal
                        onHide={props.toggleSetEditableTask}
                        onSubmit={props.editTask}
                        editableTask={editableTask}
                    />
                   
                }
              

                {isOpenSpinner &&  <Spinner/>}
            </div>
        )
    }

const mapStateToProps = (state) => {
    return{
       task:state.toDoState.task,
       isOpenAddTaskModal:state.toDoState.isOpenAddTaskModal,
       isOpenSpinner:state.globalState.isOpenSpinner,
       isOpenDeleteTaskModal:state.toDoState.isOpenDeleteTaskModal,
       editableTask:state.toDoState.editableTask,
       checkedTasks:state.toDoState.checkedTasks,
       oneCheckedTask:state.toDoState.oneCheckedTask,
       errorMessage:state.globalState.errorMessage,
       successMessage:state.globalState.successMessage
    }
    
}

const mapDispatchToProps = (dispatch) =>{
    return{
       setTask:() => {
           dispatch(getTaskThunk)
       },
       setOrRemoveSpinner:(isOpenSpinner) => {
        dispatch({type:Types.SET_OR_REMOVE_SPINNER, isOpenSpinner})
       },
       setOrRemoveModal:() => {
        dispatch({type: Types.SET_OR_REMOVE_ADD_MODAL})
       },
        addTask:(formData) => {
        dispatch((dispatch) => addToDoTask(dispatch, formData))
       },
       toggleOpenDeleteTaskModal:() => {
        dispatch({type:Types.DELETE_TASK_MODAL})
       },
       deleteOneTask:(_id) => {
        dispatch((dispatch) => deleteOneTask(dispatch, _id))
       },
       editTask:(editableTask) => {
        dispatch((dispatch)=> editTaskThunk(dispatch, editableTask))
       },
    
       toggleSetEditableTask:(data) => {
           dispatch({type:Types.TOGGLE_SET_EDITABLE_TASK, data})
       },
       toggleStatus:(task)=>{
           dispatch((dispatch)=>toggleStatusThunk(dispatch, task))
       },
       handlecheckedTasks:(_id) => {
        dispatch({type:Types.CHECKED_TASKS, _id})

       },
       deleteCheckedTask:(checkedTasks) => {
        dispatch((dispatch) => deleteCheckedTask(dispatch,checkedTasks))

       },
       handleToggleCheckAll:() => {
        dispatch({type:Types.TOGGLE_CHECK_ALL})

       },
       resretData: () => {
        dispatch({type:Types.RESET_DADA})
       }
       
      
       
}
}
export default connect(mapStateToProps, mapDispatchToProps)(Todo);
