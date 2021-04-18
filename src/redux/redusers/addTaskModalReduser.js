import Types from '../actionTypes';

const initialState = {
        title: "",
        description: "",
        date:new Date()

        
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
            const{date} = action
            console.log(date)
             return{
                ...state,
                date:action.date
            }
            

        }
        default: return state
    }
    
}


export default addTaskModalReduser