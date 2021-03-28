import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import ContactInfo from '../ContactInfo/ContactInfo';
const inputs = [
    {
        name:'name',
        type:'text',
        placeholder:'Name',
    },
    {
        name:'email',
        type:'email',
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
const API_HOST = "http://localhost:3001";
export default class ContactForm extends Component {
    state ={
        form:[],
        name:"",
        email:"",
        message:"",
    }

    handleChange = (e) => {
    const {name, value} = e.target
        this.setState({
            [name]:value
        })

    }
    handleSubmit = () => {
        const formData = {...this.state}
        delete formData.form
        fetch(`${API_HOST}/form`,{
            method:"POST",
            body:JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) throw data.error
            console.log(data)
        })
        .catch(error=>{
            console.log("add conctact reques error", error)
        })

    }

  
    render() {
        const forms  = this.state.form.map((formdata, index) =>{
            return(
                <ContactInfo key = {index} formdata ={formdata}/>
            )
        } )
        
        const inputForms = inputs.map((input, index)=>{
            
            return (
                 <Form.Group key = {index}>
                    <Form.Control 
                        name={input.name}
                        type={input.type}
                        placeholder={input.placeholder}
                        value={this.state[input.name]}
                        as={input.as || undefined}
                        rows={input.rows || undefined}
                        onChange={this.handleChange}

                    />
                </Form.Group>
            )
               
            
        })
        return (
            
            <div style={{backgroundColor:"rgba(60, 139, 120, .3)"}}>
                <Form onSubmit={(e)=>e.preventDefault()}
                        style={{maxWidth: "550px", margin: "48px auto 0px"}} 
                >
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

                {forms}
            </div>
        )
    }
}
