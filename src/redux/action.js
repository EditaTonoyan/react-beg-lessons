import Types from '../redux/actionTypes'
const API_HOST = "http://localhost:3001";

//SINGLETASK

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
