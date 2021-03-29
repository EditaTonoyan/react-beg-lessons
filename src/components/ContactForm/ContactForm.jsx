import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
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
 class ContactForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            name:"",
            email:"",
            message:"",
        }
    }
   
    handleChange = (e) => {
    const {name, value} = e.target
        this.setState({
            [name]:value
        })

    }

    handleSubmit = () => {
        const formData = {...this.state}
        fetch(`${API_HOST}/form`,{
            method:"POST",
            body:JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })

        .then(res => res.json())
        .then(data=> {
            if(data.error) throw data.error
            this.props.history.push("/");

        })
        .catch(error=> {
            console.log("error", error)
        })

    }

    render() { 
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

            </div>
        )
    }
}
export default withRouter(ContactForm)