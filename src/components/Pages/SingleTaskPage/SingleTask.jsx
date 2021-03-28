import React, { Component } from 'react';
import styles from './singleTask.module.css';
import {Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit  } from '@fortawesome/free-solid-svg-icons';
import AddEditTaskModal from '../../AddEditTaskModal/AddEditTaskModal';
import {Link} from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';
import PropTypes from 'prop-types';

const API_HOST = "http://localhost:3001";
export default class SingleTask extends Component {
    state = {
        singleTask:null,
        isOpenTaskModal:false,
        isOpenSpinner:false
    }

    toggleOpenTaskModal = () => {
        this.setState({
            isOpenTaskModal:!this.state.isOpenTaskModal
        })
    }

    handleEditTask = (task) => {
        this.setState({
            isOpenSpinner:true,
        })
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
            this.setState({
                singleTask: data,
                isOpenTaskModal:false
            })
        })
        .catch(error=>{
            this.setState({
                isOpenTaskModal:true
            })
            console.log("edit task request error", error)
        })
        .finally(() => {
            this.setState({
                isOpenSpinner:false,
            })
        })
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        fetch(`${API_HOST}/task/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error;
                this.setState({
                    singleTask: data
                });
            })
            .catch(error => {
                this.props.history.push('/404')
                console.log("Single task reques error ", error);
            })
    }

    deleteTask = () => {
        this.setState({
            isOpenSpinner:true,
        })
        const {id} = this.props.match.params;
        fetch(`${API_HOST}/tassk/${id}`, {
            method:"DELETE"
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) throw data.error
            this.props.history.push("/");
            
        })
        .catch(error => {
            console.log("Delete task reques error", error)
            this.setState({
                isOpenSpinner:false,
            })
           
        })
    }
  

    render() {
        const {
            isOpenTaskModal,
            singleTask,
            isOpenSpinner
        } = this.state
        if(this.state.singleTask == null) return   <div style={{textAlign:"center",
                                                                fontSize:"30px",
                                                                textShadow:" 2px 2px 4px #000000",
                                                                fontWeight: "bold",
                                                                color:"red"
                                                            }}
                                                    >
                                                                                                        
                                                         Please Wait...
                                                         <Spinner/>
                                                    </div>  
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
                    <p style={{textAlign:'center', fontSize:'25px', marginBottom:'20px'}}>Title: {this.state.singleTask.title}</p>
                    <p style={{textAlign:'center', fontSize:'25px'}}>Descriptions: {this.state.singleTask.description}</p>
                <div  style={{textAlign:'center', marginTop:'25px'}}> 
                <Button
                    variant="danger"
                    onClick={this.deleteTask}
                  
                >
                    
                <FontAwesomeIcon icon={faTrash} />
                </Button>
                <Button
                    onClick={this.toggleOpenTaskModal}
                    variant="warning"
                    className="ml-3"
                >
                <FontAwesomeIcon  icon={faEdit}/>
                </Button>
            </div>
            </div>
            {isOpenTaskModal && <AddEditTaskModal
                    onSubmit= {this.handleEditTask}
                    onHide={this.toggleOpenTaskModal}
                    editableTask={singleTask}
                />}
                {isOpenSpinner && <Spinner/>}
              
            </div>
        )
    }
  
}
SingleTask.propTypes = {
    history:PropTypes.object.isRequired,
    match:PropTypes.object.isRequired
}