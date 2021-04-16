import Types from '../redux/actionTypes'
const API_HOST = "http://localhost:3001";

  //*****SINGLETASK*****


export const setDataThunk = (dispatch, id, history) => {
     fetch(`${API_HOST}/task/${id}`)
         .then(res => res.json())
        .then(data => {
            if (data.error)
                throw data.error;
                dispatch({ type: Types.SET_SINGLE_TASK, data });
               

        })
        .catch(error => {
            history.push(`/error/${error.status}`, error.message)
            console.log("Single task reques erstror ", error);
         })
}

// export const editTaskThunk = (dispatch, task) => {
//     dispatch({type:Types.SET_OR_REMOVE_SPINNER, isOpenSpinner:true})

//         fetch(`${API_HOST}/task/${task._id}`, {
//             method:"PUT",
//             body: JSON.stringify(task),
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         })
//         .then(res => res.json())
//         .then(data => {
//             if(data.error) throw data.error
//             dispatch({ type: Types.SET_SINGLE_TASK, data });
//             dispatch({type:Types.SET_OR_REMOVE_MODAL, isOpenTaskModal:false})
            

//         })
//         .catch(error=>{
//             dispatch({type:Types.SET_OR_REMOVE_SPINNER, isOpenSpinner:false})
//             dispatch({type:Types.SET_OR_REMOVE_MODA, isOpenTaskModal:true})
//             console.log("edit task request error", error)
//         })
//         .finally(() => {
//             dispatch({type:Types.SET_OR_REMOVE_SPINNER, isOpenSpinner:false})

//         })
// }

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
export const deleteOneTask = async (dispatch,_id, history = null) => {
    try{
              
        dispatch({type:Types.SET_OR_REMOVE_SPINNER, isOpenSpinner:true})

            let response = await fetch(`${API_HOST}/task/${_id}`,{
            method:"DELETE"
            });
            let result = await response.json();
            if(result.error){
                throw result.error
            }else{
                if(!history){
                    dispatch({type:Types.DELETE_ONE_TASK, _id})
                   
                }else{
                    history.push("/");

                }
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
export const editTaskThunk = async(dispatch, editableTask, page= "todo") => {
   
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
            if(page === "singleTask"){
                dispatch({ type: Types.SET_SINGLE_TASK, data });
                dispatch({type:Types.SET_OR_REMOVE_MODAL, isOpenTaskModal:false})

            }else if(page === "todo"){
            dispatch({type:Types.EDIT_TASK, data})
                

               
            }
            dispatch({type:Types.EDIT_TASK, data})
        }
    
        }catch( error)  {
            console.log("edit task error", error)
        }finally{
            dispatch({type:Types.SET_OR_REMOVE_SPINNER, isOpenSpinner:false})

        }
}
//ContactForm
export const submitCotactFormThunk = (dispatch, data, history) => {
        for (let key in data) {
            if(typeof data[key] === "object" && data[key].hasOwnProperty("value")){
                data[key] = data[key].value;
            }else{
            delete data[key];
            }
        }
       
        dispatch({type:Types.SET_OR_REMOVE_SPINNER, isOpenSpinner:true})
      dispatch({type:Types.ERROR_MESSAGE, errorMessage: ''})

        fetch(`${API_HOST}/form`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error;
                history.push("/");
            })
            .catch(error => {
            dispatch({type:Types.SET_OR_REMOVE_SPINNER, isOpenSpinner:false})
            dispatch({type:Types.ERROR_MESSAGE, errorMessage: error.message})

                
                console.log("Form Contact Request Error", error);
            });
        }
