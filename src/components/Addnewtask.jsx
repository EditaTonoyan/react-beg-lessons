import React, { Component } from 'react'

export default class Addnewtask extends Component {
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
        const { handleSubmit } = this.props;
        handleSubmit(this.state.inputValue);
    }

    render() {
        return (
            <div>
              <div>
                    <input 
                        type='text'
                        placeholder='write a task' 
                        onChange={this.handlechange} 
                        value={this.state.inputValue}
                    />
                
                    <button onClick={this.handleSub}>
                        ADD
                    </button>
                </div>
                
            </div>
        )
    }
}
