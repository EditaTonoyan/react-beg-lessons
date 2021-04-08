import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Spinner from '../Pages/SingleTaskPage/Spinner/Spinner';
import styles from './contactForm.module.css';
import {isRequired,maxLength,minLength,validateEmail} from '../../Helpers/Validators';
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

let maxLength20 = maxLength(30);
let minLength6 = minLength(1)
const API_HOST = "http://localhost:3001";

const ContactFormWithHooks = (props) => {
    //*******STATES*******
    const [formData, setFormData] = useState({
        message: {
            valid:false,
            error:null,
            value:""
        },
        name: {
            valid:false,
            error:null,
            value:""
        },
        email: {
            valid:false,
            error:null,
            value:""
        },
    }  
    )
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    //*******HANDLERS*******
    const handleChange = (e) => {
        const {name, value} = e.target
        let valid = true;
        let error = null;
    
        error = isRequired(value) || maxLength20(value) || minLength6(value) || name === 'email' && validateEmail(value)
        if(error){
            valid = false
        }
        setFormData({
                ...formData,
                [name]: {
                    valid: valid,
                    error: error,
                    value: value
                }
            })
    
        }

        const handleSubmit = () => {
            const formData2 = ({...formData})
            for (let key in formData2) {
                if(typeof formData2[key] === "object" && formData2[key].hasOwnProperty("value")){
                    formData2[key] = formData2[key].value;
                }else{
                delete formData2[key];
                }
            }
           
    
            setErrorMessage({errorMessage:""})     
            setLoading({loading:true}) 
            fetch(`${API_HOST}/form`, {
                method: "POST",
                body: JSON.stringify(formData2),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error;
                    
                props.history.push("/");
            })
            .catch(error => {
                setErrorMessage({errorMessage:error.message})     
                setLoading({loading:false}) 
                
                 console.log("Form Contact Request Error", error);
            });
    
               
        }
        
         
        let newMessage = ""
         if(errorMessage.errorMessage !== undefined){
             let error = errorMessage.errorMessage
             let message =  error.substring(6, error.length);
              newMessage = message.charAt(0).toUpperCase() + message.slice(1)
         }
         
        const inputForms = inputs.map((input, index)=>{
            return (
                 <Form.Group key = {index}>
                    <Form.Control 
                        name={input.name}
                        type={input.type}
                        placeholder={input.placeholder}
                        value={formData[input.name].value}
                        as={input.as || undefined}
                        rows={input.rows || undefined}
                        onChange={handleChange}

                    />
                    <Form.Text style={{marginTop:"10px", marginLeft:"200px", color:"red"}}>{formData[input.name].error}</Form.Text>
                </Form.Group>
                
            )
               
            
        })
    return(
        <div>
           <div style={{backgroundColor:"rgba(60, 139, 120, .3)"}}>
                <Form onSubmit={(e)=>e.preventDefault()}
              
                        style={{maxWidth: "550px", margin: "48px auto 0px"}} 
                >
                   {
                       newMessage &&
                       <p className={styles.errorMessage} >
                       {newMessage} 
                        </p>
                   }
                   
                     
                    
                      
                    {inputForms}

                    <Button 
                        onClick={handleSubmit}
                        variant="primary" 
                        type="submit"
                        style={{marginLeft:"50%"}}
                    >
                        Send
                    </Button>
                   
                </Form>
               
             {loading.loading  && <Spinner/>} 
            </div>
        </div>
    )
}
export default withRouter(ContactFormWithHooks)