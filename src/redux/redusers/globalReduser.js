import Types from '../actionTypes';

const initialState = {
    isOpenSpinner:false,
}

const globalReduser = (state = initialState, action) => {
    switch(action.type){
        case Types.SET_OR_REMOVE_SPINNER:{
            return{
                ...state,
                isOpenSpinner:action.isOpenSpinner
            }
        }
        default: return state
    }
    
}
export default globalReduser