import React, { Component } from 'react';
import {connect} from 'react-redux';
import styles from './singleTask.module.css';
import {Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit  } from '@fortawesome/free-solid-svg-icons';
import AddEditTaskModal from '../../AddEditTaskModal/AddEditTaskModal';
import {Link} from 'react-router-dom';
import Spinner from './Spinner/Spinner';
import PropTypes from 'prop-types';
import {createSingleTaskContext} from '../../context/context'

const API_HOST = "http://localhost:3001";
class SingleTask extends Component {

    handleEditTask = (task) => {
        this.props.setOrRemoveSpinner(true)

        fetch(`${API_HOST}/task/${task._id}`, {
            method:"PUT",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) throw data.error
            this.props.setSingleTask(data);
            this.props.setOrRemoveModal(false)
            

        })
        .catch(error=>{
            this.props.setOrRemoveModal(true)
            console.log("edit task request error", error)
        })
        .finally(() => {
            this.props.setOrRemoveSpinner(false)

        })
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        fetch(`${API_HOST}/task/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error;
                    this.props.setSingleTask(data);

            })
            .catch(error => {
                this.props.history.push(`/error/${error.status}`, error.message)
                console.log("Single task reques erstror ", error);
            })
    }

    deleteTask = () => {
        this.props.setOrRemoveSpinner(true)
        
        const {id} = this.props.match.params;
        fetch(`${API_HOST}/task/${id}`, {
            method:"DELETE"
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) throw data.error
            this.props.history.push("/");
            
        })
        .catch(error => {
            console.log("Delete task reques error", error)
            this.props.setOrRemoveSpinner(false)

           
        })
    }

    render() {
        const {singleTask, isOpenSpinner, isOpenTaskModal} = this.props
            
        if(singleTask == null) return   <Spinner/>
        return (
            <div>
                <h1 style={{color:'black'}}>Single Task</h1>
                <div>
                    <Link to="/">
                    <Button style={{marginLeft:"50%"}}>
                         GoBack
                    </Button>
                    </Link>
                   
                </div>
                <div className = {styles.singleTaskStyle}>
                    <p style={{textAlign:'center', fontSize:'25px', marginBottom:'20px'}}>Title: {singleTask.title}</p>
                    <p style={{textAlign:'center', fontSize:'25px'}}>Descriptions: {singleTask.description}</p>
                <div  style={{textAlign:'center', marginTop:'25px'}}> 
                <Button
                    variant="danger"
                    onClick={this.deleteTask}
                  
                >
                    
                <FontAwesomeIcon icon={faTrash} />
                </Button>
                <Button
           
                onClick={this.props.toggleOpenModal}
                    variant="warning"
                    className="ml-3"
                >
                <FontAwesomeIcon  icon={faEdit}/>
                </Button>
            </div>
            </div>
            {isOpenTaskModal && <AddEditTaskModal
                    onSubmit= {this.handleEditTask}
                    onHide={this.props.toggleOpenModal}
                    editableTask={singleTask}
                />}
                {isOpenSpinner && <Spinner/>}
              
            </div>
        )
    }
  
}


const mapStateToProps = (state) => {
    
    return{
        singleTask: state.singleTasks.singleTask,
        isOpenTaskModal:state.singleTasks.isOpenTaskModal,
        isOpenSpinner:state.isOpenSpinner,
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setSingleTask:(data) => {
            dispatch({type:"SET_SINGLE_TASK", data})
        },
        toggleOpenModal:() => {
            dispatch({type:"TOGGLE_MODAL",})
        },
        setOrRemoveSpinner:(isOpenSpinner) => {
                dispatch({type:"SET_OR_REMOVE_SPINNER", isOpenSpinner})
         }, 
        setOrRemoveModal:(isOpenTaskModal) => {
            dispatch({type:"SET_OR_REMOVE_MODAL", isOpenTaskModal})
         }
        
    }
}

SingleTask.propTypes = {
    history:PropTypes.object.isRequired,
    match:PropTypes.object.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleTask)