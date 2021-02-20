import React, { Component } from 'react'
import styles from './Addtask.module.css'
export default class Addtask extends Component {
    state = {
        inputValue:''
    }

    handlechange = (event) => {
        const {value} = event.target;
        this.setState({
            inputValue:value
        });
    }

    handleSub = () =>{
        if(!this.state.inputValue)
        return;
        this.props.handleSubmit(this.state.inputValue);
        this.setState({
            inputValue:''
        })
    }

    render() {
        return (
            <div>

                <div>
                    <input 
                        type='text'
                        placeholder='Task...' 
                        onChange={this.handlechange} 
                        value={this.state.inputValue}
                        className={styles.input}
                    />
                
                    <button 
                    className={styles.button}
                    onClick={this.handleSub}>
                        ADD
                    </button>
                </div>
            </div>
        )
    }
}
