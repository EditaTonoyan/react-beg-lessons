import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import styles from './contactForm.module.css';
//validation
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

let maxLength20 = maxLength(20);
let minLength6 = minLength(1)
const API_HOST = "http://localhost:3001";
 class ContactForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
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
        
            isLoading:false,
            errorMessage:""
        }
    }
   
    handleChange = (e) => {
    const {name, value} = e.target
    let valid = true;
    let error = null;
    // if(isRequired(value)){
    //     valid = false
    //     error = isRequired(value)
    // }else if (maxLength20(value)){
    //     valid = false
    //     error = maxLength20(value)
    // }else if(minLength6(value)){
    //     valid = false
    //     error = minLength6(value)
    // }else if (name === 'email' && validateEmail(value)){
    //     valid = false
    //     error = validateEmail(value)
    // }

    error = isRequired(value) || maxLength20(value) || minLength6(value) || name === 'email' && validateEmail(value)
    if(error){
        valid = false
    }
    
        this.setState({
            [name]: {
                valid: valid,
                error: error,
                value: value
            }
        })

    }

    handleSubmit = () => {
        const formData = ({...this.state})
        for (let key in formData) {
            if(typeof formData[key] === "object" && formData[key].hasOwnProperty("value")){
                formData[key] = formData[key].value;
            }else{
            delete formData[key];
            }
        }
       

       this.setState({isLoading:true, errorMessage:""})        
        fetch(`${API_HOST}/form`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error;
                this.props.history.push("/");
            })
            .catch(error => {
                // console.log(error.message)
                this.setState({ isLoading: false, errorMessage:error.message});
                console.log("Form Contact Request Error", error);
            });

           
    }
    render() { 
        let error = this.state.errorMessage
        let message =  error.split('').splice(6, 49).join('');
        let errorMessage = message.charAt(0).toUpperCase() + message.slice(1);

        const {isLoading} = this.state
        const inputForms = inputs.map((input, index)=>{
            
            return (
                 <Form.Group key = {index}>
                    <Form.Control 
                        name={input.name}
                        type={input.type}
                        placeholder={input.placeholder}
                        value={this.state[input.name].value}
                        as={input.as || undefined}
                        rows={input.rows || undefined}
                        onChange={this.handleChange}

                    />
                    <Form.Text style={{marginTop:"10px", marginLeft:"200px", color:"red"}}>{this.state[input.name].error}</Form.Text>
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
                        {errorMessage }
                     </p>
                    }
                    
                      
                    {inputForms}

                    <Button 
                        onClick={this.handleSubmit}
                        variant="primary" 
                        type="submit"
                        style={{marginLeft:"50%"}}
                    >
                        Send
                    </Button>
                   
                </Form>
               
                {isLoading  && <Spinner/>}
            </div>
        )
    }
}
export default withRouter(ContactForm)