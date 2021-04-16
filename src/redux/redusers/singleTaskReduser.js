import Types from '../actionTypes';

const initialState = {
        singleTask:null,
        isOpenTaskModal:false,
}

const singleTaskReduser = (state = initialState, action) => {
    switch(action.type){
        case Types.SET_SINGLE_TASK:{
            return{
                ...state,
                    singleTask:action.data,
            }
        }
        case Types.TOGGLE_MODAL:{
            return{
                ...state,
                    isOpenTaskModal:!state.isOpenTaskModal,
            }
        }
        case Types.SET_OR_REMOVE_MODAL:{
            return{
                ...state,
                    isOpenTaskModal:action.isOpenTaskModal,
            }
        }
        default: return state
    }
}
export default singleTaskReduser