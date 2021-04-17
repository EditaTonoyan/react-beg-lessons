import{ useEffect, useRef} from 'react';
import {Form, Button} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Spinner from '../Pages/SingleTaskPage/Spinner/Spinner'
import styles from './contactForm.module.css';
import {connect} from 'react-redux';
import Types  from '../../redux/actionTypes';
import  {submitCotactFormThunk} from '../../redux/action'
//validation
const inputs = [
    {
        name:'name',
        type:'text',
        placeholder:'Name',
    },
    {
        name:'email',
        type:'text',
        placeholder:'Enter email',
    },
    {
        name:'message',
        type:null,
        placeholder:'Message',
        as:'textarea',
        rows:3
        
    },
]



 const ContactForm = (props) => {

    const {
        data,
        errorMessage,
        isOpenSpinner,
        //FUNCTION
        handleChange,
        handleSubmit,
        } = props
   
     const firstInput = useRef(null)

     useEffect(() => {
        firstInput.current.focus()
        return () => {
           props.resetState()
        }
    }, [])

       

            let error = props.errorMessage
            let message =  error.split('').splice(6, 49).join('');
            let errormessage = message.charAt(0).toUpperCase() + message.slice(1);
            
        const inputForms = inputs.map((input, index)=>{
        
            return (
                 <Form.Group key = {index}>
                    <Form.Control 
                        ref={index === 0 ? firstInput : null}
                        name={input.name}
                        type={input.type}
                        placeholder={input.placeholder}
                        value={data[input.name].value}
                        as={input.as || undefined}
                        rows={input.rows || undefined}
                        onChange={(e)=>handleChange(e.target)}

                    />
                    <Form.Text style={{marginTop:"10px", marginLeft:"200px", color:"red"}}>{data[input.name].error}</Form.Text>
                </Form.Group>
                
            )
               
            
        })
        return (
            
            <div style={{backgroundColor:"rgba(60, 139, 120, .3)"}}>
                <Form onSubmit={(e)=>e.preventDefault()}
              
                        style={{maxWidth: "550px", margin: "48px auto 0px"}} 
                >
                    {errorMessage &&
                    <p className={styles.errorMessage} >
                        {errormessage }
                     </p>
                    }
                    
                      
                    {inputForms}

                    <Button 
                        onClick={()=>handleSubmit(data, props.history)}
                        variant="primary" 
                        type="submit"
                        style={{marginLeft:"50%"}}
                    >
                        Send
                    </Button>
                   
                </Form>
                {isOpenSpinner && <Spinner/>}
               
              
            </div>
        )
    }

const mapStateToProps = (state) => {
 return{
    errorMessage:state.globalState.errorMessage,
    successMessage:state.globalState.successMessage,
    isOpenSpinner:state.globalState.isOpenSpinner,
    data:{
        name:state.contactformState.name,
        email:state.contactformState.email,
        message:state.contactformState.message,
    }
  }
}
const mapDispatchToProps = (dispatch) => {
    return{
        handleChange:(target) => {
            dispatch({type:Types.HANDLE_CHANGE, target})
        },

        handleSubmit:(data, history) =>{
            dispatch((dispatch) => submitCotactFormThunk(dispatch,data, history) )
        },
        
        resetState:() => {
            dispatch({type:Types.RESET_FORM})
        }
        
    }
   }
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContactForm))