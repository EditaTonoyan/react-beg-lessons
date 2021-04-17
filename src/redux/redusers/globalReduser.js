import Types from '../actionTypes';

const initialState = {
    isOpenSpinner:false,
    errorMessage:"",
    successMessage:"",
}

const globalReduser = (state = initialState, action) => {
    switch(action.type){
        case Types.SET_OR_REMOVE_SPINNER:{
            return{
                ...state,
                isOpenSpinner:action.isOpenSpinner
            }
        }
        case Types.ERROR_MESSAGE:{
            return{
                 ...state,
                 errorMessage:action.errorMessage
            }
        }
        case Types.SUCCESS_MESSAGE:{
            return{
                 ...state,
                 successMessage:action.successMessage
            }
        }
        default: return state
    }
    
}
export default globalReduser