import { useEffect } from 'react';
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
import {setDataThunk,editTaskThunk,deleteOneTask} from '../../../redux/action';
import Types from '../../../redux/actionTypes';

const SingleTask = (props) => {
    const { history } = props;
    const { id } = props.match.params;


    useEffect(() => {
        props.setSingleTask(id, history)
        
    }, [id, history])

  
        const {singleTask, isOpenSpinner, isOpenTaskModal} = props
            
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
                    onClick={()=>props.deleteSingleTask(singleTask._id , history )}
                  
                >
                    
                <FontAwesomeIcon icon={faTrash} />
                </Button>
                <Button
           
                onClick={props.toggleOpenModal}
                    variant="warning"
                    className="ml-3"
                >
                <FontAwesomeIcon  icon={faEdit}/>
                </Button>
            </div>
            </div>
            {isOpenTaskModal && <AddEditTaskModal
                    onSubmit= {(editableTask)=>props.editSingleTask(editableTask, "singleTask")}
                    onHide={props.toggleOpenModal}
                    editableTask={singleTask}
                />}
                {isOpenSpinner && <Spinner/>}
              
            </div>
        )
    }
  

const mapStateToProps = (state) => {
    
    return{
        singleTask: state.singleTaskState.singleTask,
        isOpenTaskModal:state.singleTaskState.isOpenTaskModal,
        // isOpenSpinner:state.singleTaskState.isOpenSpinner,
        errorMessage:state.globalState.errorMessage,
        successMessage:state.globalState.successMessage

        
    }
}

const mapDispatchToProps = (dispatch) => {
   
    return{
        
        setSingleTask:(id, history) => {
            dispatch((dispatch) => setDataThunk(dispatch, id, history))
        },

        editSingleTask: (editableTask,singleTask) => {
            dispatch((dispatch) => editTaskThunk(dispatch,editableTask,singleTask))
        },

        deleteSingleTask: (_id,history) => {
            dispatch((dispatch) => deleteOneTask(dispatch,_id, history))
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