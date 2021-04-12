import Types from '../redux/actionTypes'
const API_HOST = "http://localhost:3001";

  //*****SINGLETASK*****
export const setDataThunk = (dispatch, props) => {
     const {id} = props.match.params;
     fetch(`${API_HOST}/task/${id}`)
         .then(res => res.json())
        .then(data => {
            if (data.error)
                throw data.error;
                dispatch({ type: Types.SET_SINGLE_TASK, data });

        })
        .catch(error => {
            props.history.push(`/error/${error.status}`, error.message)
            console.log("Single task reques erstror ", error);
         })
}

export const editTaskThunk = (dispatch, task) => {
    dispatch({type:Types.SET_OR_REMOVE_SPINNER, isOpenSpinner:true})

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
            dispatch({ type: Types.SET_SINGLE_TASK, data });
            dispatch({type:Types.SET_OR_REMOVE_MODAL, isOpenTaskModal:false})
            

        })
        .catch(error=>{
            dispatch({type:Types.SET_OR_REMOVE_SPINNER, isOpenSpinner:false})
            dispatch({type:Types.SET_OR_REMOVE_MODA, isOpenTaskModal:true})
            console.log("edit task request error", error)
        })
        .finally(() => {
            dispatch({type:Types.SET_OR_REMOVE_SPINNER, isOpenSpinner:false})

        })
}
export const deleteTaskThunk = (dispatch, props) => {
    dispatch({type:Types.SET_OR_REMOVE_SPINNER, isOpenSpinner:true})
        
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
            dispatch({type:Types.SET_OR_REMOVE_SPINNER, isOpenSpinner:false})

           
        })
}

    //*****TODO*****
export const getTaskThunk = (dispatch) => {
    dispatch({type:Types.SET_OR_REMOVE_SPINNER, isOpenSpinner:true})

        fetch(`${API_HOST}/task`)
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error;
                    dispatch({type:Types.SET_TASKS, data})
                dispatch({type:Types.SET_TASKS, data})
            })
            .catch(error => {
                console.log("Get All Tasks ", error);
            })
            .finally(()=>{
                dispatch({type:Types.SET_OR_REMOVE_SPINNER, isOpenSpinner:false})

            })
}
export const addToDoTask = (dispatch, formData) => {
    dispatch({type:Types.SET_OR_REMOVE_SPINNER, isOpenSpinner:true})

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
            dispatch({type:Types.ADD_TASK, data})
        }
      

    })
    .catch(error=> {
        console.log("error", error)
    })
    .finally(()=>{
        dispatch({type:Types.SET_OR_REMOVE_SPINNER, isOpenSpinner:false})

    })
}
export const deleteOneTask = async (dispatch, _id) => {
    try{
              
        dispatch({type:Types.SET_OR_REMOVE_SPINNER, isOpenSpinner:true})

            let response = await fetch(`${API_HOST}/task/${_id}`,{
            method:"DELETE"
            });
            let result = await response.json();
            if(result.error){
                throw result.error
            }else{
               dispatch({type:Types.DELETE_ONE_TASK, _id})
            }
       }catch(error){
        console.log("error delete task", error)
       }finally{
        dispatch({type:Types.SET_OR_REMOVE_SPINNER, isOpenSpinner:false})

       }
}
export const deleteCheckedTask = (dispatch, checkedTasks) => {
    dispatch({type:Types.SET_OR_REMOVE_SPINNER, isOpenSpinner:true})

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
            dispatch({type:Types.DELETE_CHECKED_TASKS})

       } 
    })
    .catch(error => {
        console.log("delete All Task Error", error)
    })
    .finally(() => {
        dispatch({type:Types.SET_OR_REMOVE_SPINNER, isOpenSpinner:false})

    })
}
export const editToDoTaskThunk = async(dispatch, editableTask) => {
    try{
        const _id = editableTask._id
        dispatch({type:Types.SET_OR_REMOVE_SPINNER, isOpenSpinner:true})
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
            dispatch({type:Types.EDIT_TASK, data})
        }
    
        }catch( error)  {
            console.log("edit task error", error)
        }finally{
            dispatch({type:Types.SET_OR_REMOVE_SPINNER, isOpenSpinner:false})

        }
}