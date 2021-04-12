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
import {createSingleTaskContext} from '../../context/context';
import {setDataThunk,editTaskThunk,deleteTaskThunk} from '../../../redux/action';
import Types from '../../../redux/actionTypes';

class SingleTask extends Component {

    componentDidMount() {
       const props = this.props;
       this.props.setSingleTask(props);
     
    }

    deleteTask = () => {
        const props = this.props;
        this.props.deleteSingleTask(props);
     }

    render() {
        const {singleTask, isOpenSpinner, isOpenTaskModal} = this.props
            
        if(singleTask === null) return   <Spinner/>
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
                    onSubmit= {this.props.editSingleTask}
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
        
        setSingleTask:(props) => {
            dispatch((dispatch) => setDataThunk(dispatch, props))
        },

        editSingleTask: (task) => {
            dispatch((dispatch) => editTaskThunk(dispatch, task))
        },

        deleteSingleTask: (props) => {
            dispatch((dispatch) => deleteTaskThunk(dispatch, props))
        },
        toggleOpenModal:() => {
            dispatch({type:Types.TOGGLE_MODAL,})
        },
        setOrRemoveSpinner:(isOpenSpinner) => {
                dispatch({type:Types.SET_OR_REMOVE_SPINNER, isOpenSpinner})
         }, 
        setOrRemoveModal:(isOpenTaskModal) => {
            dispatch({type: Types.SET_OR_REMOVE_MODAL, isOpenTaskModal})
         }
        
    }
}

SingleTask.propTypes = {
    history:PropTypes.object.isRequired,
    match:PropTypes.object.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleTask)