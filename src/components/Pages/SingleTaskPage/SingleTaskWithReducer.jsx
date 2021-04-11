import {Link} from 'react-router-dom';
import styles from './singleTask.module.css';
import {Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit  } from '@fortawesome/free-solid-svg-icons';
import AddEditTaskModal from '../../AddEditTaskModal/AddEditTaskModal';
import Spinner from './Spinner/Spinner';
import{withRouter} from 'react-router-dom';
//reduser
import {useReducer, useEffect} from 'react';


const initialState = {
        singleTask:null,
        isOpenTaskModal:false,
        isOpenSpinner:false
}
const API_HOST = "http://localhost:3001";

const reduser = (state = initialState, action) => {
// console.log(action.type)
    switch (action.type){
       
        case "MODAL_TRUE": {
            return {
                ...state,
                isOpenTaskModal: true,
                
            }
        }
        case "SPINNER_TRUE":{

            return{
                ...state,
                isOpenSpinner: true
            }
        }
        case "SPINNER_FALSE":{

            return{
                ...state,
                isOpenSpinner: false
            }
        }
        case "SET_TASK":{
           
            return{
                ...state,
                singleTask:action.data
                
            }
        }
        case "EDIT_TASK":{
            return{
                ...state,
                singleTask:action.data,
                isOpenTaskModal:false
            }
        }
        case "TOGGLE_MODAL":{
            return{
                ...state,
                isOpenTaskModal:!state.isOpenTaskModal  
            }
         
        }
        default: return state
 
        }

    }

    

const SingleTaskWithReducer = (props) => {
   const  [state, dispatch] = useReducer(reduser,initialState)

    //COMPONENTDIDMOUNT
    useEffect(()=>{
        const {id} = props.match.params;
        fetch(`${API_HOST}/task/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error;
                    dispatch({type:"SET_TASK", data})
                   
        
            })
            .catch(error => {
                props.history.push(`/error/${error.status}`, error.message)
                console.log("Single task reques erstror ", error);
            })
    
    },[])
    //DELETE
    const deleteTask = () => {
        dispatch({type:"SPINNER_TRUE"})
        const {id} = props.match.params;
        fetch(`${API_HOST}/task/${id}`, {
            method:"DELETE"
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) throw data.error
           props.history.push("/");
            
        })
        
        .catch(error => {
            console.log("Delete task reques error", error)
            dispatch({type:"SPINNER_FALSE"})

           
        })
    }

    //EDIT
    const handleEditTask = (task) => {
        dispatch({type:"SPINNER_TRUE"})
        fetch(`${API_HOST}/task/${task._id}`, {
            method:"PUT",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) {
                throw data.error
            }else{
                 
            dispatch({type:"EDIT_TASK", data})

            dispatch({type:"SPINNER_FALSE"})
            }
          
          

        })
       
        .catch(error=>{
            dispatch({ type: "MODAL_TRUE" }); 
            console.log("edit task request error", error)
        })
        .finally(() => {
            dispatch({ type: "SPINNER_FALSE" }); 
    
        })
    }
    
   if(!state.singleTask) return <Spinner/>
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
            <p style={{textAlign:'center', fontSize:'25px', marginBottom:'20px'}}>Title: {state.singleTask.title}</p>
            <p style={{textAlign:'center', fontSize:'25px'}}>Descriptions: {state.singleTask.description}</p>  
            <div  style={{textAlign:'center', marginTop:'25px'}}> 
            <Button
            variant="danger"
            onClick={deleteTask}

            >

            <FontAwesomeIcon icon={faTrash} />
            </Button>
            <Button
            onClick={() =>dispatch({ type: "TOGGLE_MODAL" })}
            variant="warning"
            className="ml-3"
            >
            <FontAwesomeIcon  icon={faEdit}/>
            </Button>
            </div>
            </div>

            {state.isOpenTaskModal && <AddEditTaskModal
                onSubmit= {handleEditTask}
                onHide={() =>dispatch({ type: "TOGGLE_MODAL" })}
                editableTask={state.singleTask}
            />} 
            {state.isOpenSpinner && <Spinner/>}

        </div>

    )
}
export default withRouter(SingleTaskWithReducer)