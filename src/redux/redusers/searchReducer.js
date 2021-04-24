import Types from '../actionTypes';

const initialState = {
    status:null,
    search:"",
    sort:null,
    create_lte:null,
    create_gte:null,
    complete_lte:null,
    complete_gte:null,
   
}

const searchReducer = (state = initialState, action) => {
    switch(action.type){
        case Types.SET_DROPDOWN_VALUE:{
            const{name, value} = action
            return {
                ...state,
                [name]:value
            }
        }
        case Types.CHANGE_SEARCH_INPUT:{
            const {type, value} = action.target
            return{
                ...state,
                [type]:value
            }
        }
        case Types.SET_SEARCH_DATE:{
            const {searchInput, date} = action
            return{
                ...state,
                [searchInput]:date
            }
        }
        case Types.RESET_SEARCH_DATA:{
            return{
                ...initialState
            }
        }
        default: return state
    }
    
}
export default searchReducer