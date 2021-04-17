import Types from '../actionTypes';
import {isRequired,maxLength,minLength,validateEmail} from '../../Helpers/Validators';

const initialState = {
  
        name: {
            valid:false,
            error:null,
            value:""
        },
        message: {
            valid:false,
            error:null,
            value:""
        },
        
        email: {
            valid:false,
            error:null,
            value:""
        },
  
    

    // errorMessage:""
}

const contactFormReduser = (state = initialState, action) => {
    
let maxLength20 = maxLength(30);
let minLength6 = minLength(1)

    switch(action.type){
        case Types.HANDLE_CHANGE:{
            const { value, name } = action.target;
            let error = null;
            let valid = !error
            error =
                     isRequired(value) || 
                     maxLength20(value) || 
                     minLength6(value) || 
                     name === 'email' && validateEmail(value)
                if(error){
                      valid = false
                }
                
            return {
                ...state,
                
                    [name]: {
                        value,
                        valid,
                        error
                    }
                
            }
              
            }
            // case Types.ERROR_MESSAGE:{
            //     return{
            //          ...state,
            //          errorMessage:action.errorMessage
            //     }
            // }
             case Types.RESET_FORM:{
                return{
                    ...initialState
                }
             }
           
            default: return state
    }
   
}
export default contactFormReduser