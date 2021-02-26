import React, { Component } from 'react'
import styles from './Addtask.module.css'
import {FormControl,InputGroup,Button} from 'react-bootstrap';


export default class Addtask extends Component {
    state = {
        
        inputValue:'',
        // descInputValue:''
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


    handleKeyPress = ({type, key}) => {
        
        console.log(key);
        // if(event.key === 'Enter'){
        //     this.props.handleSubmit(this.state.inputValue);
        //     this.setState({
        //         inputValue:'',
        //     })
        // }
      }
      

    render() {
        return (
                    <div className="dispyalflex">
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                            </InputGroup.Prepend>
                            <FormControl 
                            type='text'
                            onChange={this.handlechange} 
                            value={this.state.inputValue}
                            className={styles.input}
                            onKeyPress={this.handleKeyPress}
                            placeholder="Task..."
                            aria-label="Task"
                            aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        
                        <Button variant="primary" onClick={this.handleSub}>
                            ADD
                        </Button>

                    </div>
        )
    }
}
