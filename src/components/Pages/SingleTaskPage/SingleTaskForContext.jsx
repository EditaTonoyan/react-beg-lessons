import {useContext, useEffect} from 'react';
import {createSingleTaskContext} from '../../context/context';
import {Link} from 'react-router-dom';
import styles from './singleTask.module.css';
import {Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit  } from '@fortawesome/free-solid-svg-icons';
import AddEditTaskModal from '../../AddEditTaskModal/AddEditTaskModal';
import Spinner from './Spinner/Spinner';


const SingleTaskForContext = () => {
    
   const { 
    //state
    singleTask,
    isOpenTaskModal,
    isOpenSpinner,
    //functions
    setIsOpenTaskMOdal,
    handleEditTask,
    deleteTask,
    getTask

    } = useContext(createSingleTaskContext)
    useEffect(() => {
        getTask();
    },[getTask]);
  
 

 if (!singleTask || isOpenSpinner)   return <Spinner />
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
            onClick={deleteTask}

            >

            <FontAwesomeIcon icon={faTrash} />
            </Button>
            <Button
            onClick={() => setIsOpenTaskMOdal(true)}
            variant="warning"
            className="ml-3"
            >
            <FontAwesomeIcon  icon={faEdit}/>
            </Button>
            </div>
            </div>
            {isOpenTaskModal && <AddEditTaskModal
             onSubmit= {handleEditTask}
            onHide={() => setIsOpenTaskMOdal(false)}
            editableTask={singleTask}
            />}
            {isOpenSpinner && <Spinner/>}

        </div>

    )
}
export default SingleTaskForContext