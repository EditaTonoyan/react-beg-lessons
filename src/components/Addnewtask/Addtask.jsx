import React, { Component } from 'react'
import styles from './Addtask.module.css'
import {FormControl,Button,Form} from 'react-bootstrap';

class Addtask extends Component {
    
    state = {
       title:'',
       description:''
    } 
    

    handlechange = (event) => {
        const {value, name} = event.target;
        this.setState({
           [name]:value
        });
    }

    handleSub = ({key, type}) =>{  
        const {title,description} = this.state     
        if(!title || !description ||
            (type === 'keypress' && key !== 'Enter')
            )
                 return;


            const inputsValues = {
                title:title,
                description:description
            }
        this.props.handleSubmit(inputsValues);

        this.setState({
            title:'',
            description:''
        });
    }
      

    render() {
        
       const {isAnyTaskChecked}  = this.props
       const{title, description} = this.state
         return (
               <>
                    <FormControl 
                        name='title'
                        type='text'
                        onChange={this.handlechange} 
                        value={this.state.inputValue}
                        className={styles.input}
                        onKeyPress={this.handleSub}
                        placeholder="Title"
                        disabled = {isAnyTaskChecked}
                        value={title}
                    />
                     <Form.Control 
                        name='description'
                        placeholder="description"
                        onChange={this.handlechange}
                        className={styles.input }
                        as="textarea" 
                        rows={3}
                        disabled = {isAnyTaskChecked}
                        value={description}
                      />
                    <Button 
                        variant="primary" 
                        onClick={this.handleSub} 
                        className={styles.button}
                        disabled = {isAnyTaskChecked || !title || !description}
                    >
                        ADD
                    </Button>
              </>
            
        )
    }
}
export default Addtask