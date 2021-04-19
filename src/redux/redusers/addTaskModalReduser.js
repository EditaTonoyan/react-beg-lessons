import Types from '../actionTypes';

const initialState = {
        title: "",
        description: "",
        date:new Date(),
        // ...editableTask
}


const addTaskModalReduser = (state = initialState, action) => {
    switch(action.type){
        case Types.CHANGE_MODAL:{
            const {value, name} = action.target

            return{
                ...state,
                [name]:value
            }

        }

        case Types.SET_DATA:{
             return{
                ...state,
                date:action.actionData
            }
        }
        case Types.RESET_MODAL_DATA:{
            return{
                ...initialState
            }
        }
        default: return state
    }
    
}


export default addTaskModalReduser