import {createSingleTaskContext} from '../context';
import {useState,useCallback} from 'react';
const API_HOST = "http://localhost:3001";

const SingleTaskContextProvider = (props) => {
   const [singleTask,setSingleTask] = useState(null);
   const [isOpenTaskModal, setIsOpenTaskMOdal] = useState(false);
   const [isOpenSpinner, setIsOpenSpinner] = useState(false);

   //Edit
    const handleEditTask = useCallback((task) => {
    setIsOpenSpinner(true)
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
        setSingleTask(data)
        setIsOpenSpinner(false)
        setIsOpenTaskMOdal(false)

       
    })
   
    .catch(error=>{
        setIsOpenTaskMOdal(true)
        console.log("edit task request error", error)
    })
    .finally(() => {
        setIsOpenSpinner(false)

    })
},[])
//delete 
const deleteTask = useCallback(() => {
    setIsOpenSpinner(true)

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
        console.log("Deelte task reques error", error)
        setIsOpenSpinner(false)

       
    })
},[singleTask, props.history])
//CoponentDidMount
const getTask = useCallback(() => {
    const {id} = props.match.params;
        fetch(`${API_HOST}/task/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error;
                    setSingleTask(data)
            })
            .catch(error => {
                props.history.push(`/error/${error.status}`, error.message)
                console.log("Single task reques erstror ", error);
            })
},[])


return(
   <createSingleTaskContext.Provider
        value = {{
            singleTask,
            isOpenTaskModal,
            isOpenSpinner,
            //functions
            handleEditTask,
            setIsOpenTaskMOdal,
            deleteTask,
            getTask
        }}
   >
       {props.children}
   </createSingleTaskContext.Provider>
   )
}

export default SingleTaskContextProvider