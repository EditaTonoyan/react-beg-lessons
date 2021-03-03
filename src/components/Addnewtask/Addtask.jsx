import React, { Component } from 'react'
import styles from './Addtask.module.css'
import {FormControl,InputGroup,Button} from 'react-bootstrap';


export default class Addtask extends Component {
    
    state = {
        inputValue:'',
    }

    handlechange = (event) => {
        const {value} = event.target;
        this.setState({
            inputValue:value
        });
    }

    handleSub = ({key, type}) =>{
        if(!this.state.inputValue||
            (type === 'keypress' && key !== 'Enter'))
                 return;
        this.props.handleSubmit(this.state.inputValue);
        this.setState({
            inputValue:''
        });
    }
      

    render() {
       const{isAnyTaskChecked}  = this.props
        return (
                <InputGroup >
                    <FormControl 
                    
                        type='text'
                        onChange={this.handlechange} 
                        value={this.state.inputValue}
                        className={styles.input}
                        onKeyPress={this.handleSub}
                        placeholder="Task..."
                        disabled = {isAnyTaskChecked}
                    />
                       
                    <Button 
                        variant="primary" 
                        onClick={this.handleSub} 
                        className="ml-3"
                        disabled = {isAnyTaskChecked}
                    >
                        ADD
                    </Button>
                </InputGroup>
            
        )
    }
}
