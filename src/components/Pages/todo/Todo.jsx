import React, { Component } from 'react';
import Task from '../../Task/Task';
import styles from './Todo.module.css';
import { Col, Container, Row, Button} from 'react-bootstrap';
import AddEditTaskModal from '../../AddEditTaskModal/AddEditTaskModal'
import ConfirModal from '../../deleteTaskModal/ConfirModal';
import Spinner from '../../Spinner/Spinner';


const API_HOST = "http://localhost:3001";
class Todo extends Component {
    state = {
        task:[],
        inputValue:'',
        checkedTasks:new Set(),
        onHide:true,
        isOpenAddTaskModal:false,
        isOpenDeleteTaskModal:false,
        editableTask:'',
        isOpenSpinner:false,
        
    }

   
    //EDIT

    toggleSetEditableTask = (editableTask = null) => {
        this.setState({
            editableTask
        });
    }

    handleEditTask = (editableTask) => {
       
        ( async () => {
           
            try{
                const _id = editableTask._id
                this.setState({
                    isOpenSpinner:true,
                })
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
                    const task = [...this.state.task];
                    const idx = task.findIndex(task => task._id === data._id);
                    task[idx] = data;
                    this.setState({
                        task,
                        editableTask:''
                        
                   });
                }
            
                }catch( error)  {
                    console.log("edit task error", error)
                }finally{
                    this.setState({
                        isOpenSpinner:false,
                       
                    })
                }
        })()
    }


    //ADD
    toggleOpenAddTaskModal = () => {
        this.setState({
            isOpenAddTaskModal: !this.state.isOpenAddTaskModal
        });
    }
    handleAddTask = (formData) => {
        this.setState({
            isOpenSpinner:true
        })
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
                const task = [...this.state.task];
                task.push(data);
                this.setState({
                    task,
                    isOpenAddTaskModal:false
                });
            }
          

        })
        .catch(error=> {
            console.log("error", error)
        })
        .finally(()=>{
            this.setState({
                isOpenSpinner:false
            });
        })
     

    }

    componentDidMount() {
        this.setState({
            isOpenSpinner:true,
        })
        fetch(`${API_HOST}/task`)
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error;
                this.setState({
                    task: data
                });
            })
            .catch(error => {
                console.log("Get All Tasks ", error);
            })
            .finally(()=>{
                this.setState({
                    isOpenSpinner:false,
                })
            })
    }
  
    toggleOpenDeleteTaskModal = () => {
        this.setState({
            isOpenDeleteTaskModal:!this.state.isOpenDeleteTaskModal
        });
    }
 
    handleDeletetask = (_id) => {
       (async () => {
           try{
              
                this.setState({
                    isOpenSpinner:true
                })
                let response = await fetch(`${API_HOST}/task/${_id}`,{
                method:"DELETE"
                });
                let result = await response.json();
                if(result.error){
                    throw result.error
                }else{
                    let task = [...this.state.task];
                    task = task.filter(task => task._id !== _id)
                    this.setState({
                        task
                    })
                }
           }catch(error){
            console.log("error delete task", error)
           }finally{
            this.setState({
                isOpenSpinner:false
                
            })
           }
       

       })()

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
        const {checkedTasks} = this.state;
        this.setState({
            isOpenSpinner:true
        })
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
             let task = [...this.state.task];   
             task = task.filter(task => !checkedTasks.has(task._id));
             this.setState({
               task,
               checkedTasks:new Set()
              
                })
                this.state.buttonTitle = 'Check All'
           }
              
           
        })
        .catch(error => {
            console.log("delete All Task Error", error)
        })
        .finally(() => {
            this.setState({
                isOpenSpinner:false
            })
        })
       
        
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
        const {
                checkedTasks,
                task,
                isOpenAddTaskModal,
                isOpenDeleteTaskModal,
                editableTask,
                isOpenSpinner
            } = this.state;
        const newTask = this.state.task.map(task => {
            return (<Col className = "mt-3"
                         key = {task._id} >
                        < Task task={task}
                        isChecked = {checkedTasks.has(task._id)}
                        isAnyTaskChecked = {!!checkedTasks.size}
                        handleDeletetask = {this.handleDeletetask}
                        handlecheckedTasks = {this.handlecheckedTasks}
                        handleCheckAll = {this.handleCheckAll}
                        getEditableTask = {this.toggleSetEditableTask}
                        editableTask={this.state.editableTask}
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
                            onClick = {this.toggleOpenAddTaskModal}
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

            {isOpenDeleteTaskModal && <ConfirModal
                                          onHide = {this.toggleOpenDeleteTaskModal}
                                          handleDeleteCheckedTask = {this.handleDeleteCheckedTask}
                                          countOrTaskName = {this.getTaskById(checkedTasks)}
            />}


                {
                    isOpenAddTaskModal && <AddEditTaskModal
                        onHide={this.toggleOpenAddTaskModal}
                        onSubmit={this.handleAddTask}
                    />
                }

                {
                    editableTask && <AddEditTaskModal
                        onHide={this.toggleSetEditableTask}
                        onSubmit={this.handleEditTask}
                        editableTask={editableTask}
                    />
                }

                {isOpenSpinner &&  <Spinner/>}
            </div>
        )
    }
}

export default Todo;