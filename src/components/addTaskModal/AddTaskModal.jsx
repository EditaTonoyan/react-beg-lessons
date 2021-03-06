import React,  { createRef } from 'react';
import{Button, Modal,FormControl,Form} from 'react-bootstrap';
import styles from './AddTaskModal.module.css';
import PropTypes from 'prop-types';


class AddTaskModal extends React.Component{
  constructor(props) {
    super(props);
    this.inputRef = createRef();
    this.state = {
        title: "",
        description: ""
    }
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
    
            this.props.onHide();
        }
          
        componentDidMount() {
          this.inputRef.current.focus();
        }

    render(){
       const {isAnyTaskChecked, onHide}  = this.props
       const{title, description} = this.state
      return(
      <Modal
      onHide = {onHide}
      show={true}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <FormControl 
                ref={this.inputRef}
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
                style={{resize:"none"}}
                name='description'
                placeholder="description"
                onChange={this.handlechange}
                className={styles.input }
                as="textarea" 
                rows={3}
                disabled = {isAnyTaskChecked}
                value={description}
            />
              
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary "
          onClick = {onHide}
        >
            Close
        </Button>
        <Button
        onClick={this.handleSub} 
        disabled = {isAnyTaskChecked || !title || !description}
        >
            Add
        </Button>
      </Modal.Footer>
    </Modal>
      )
    }
    
}

AddTaskModal.propTypes = {
  onHide:PropTypes.func,
  isAnyTaskChecked:PropTypes.bool,
  handleSubmit:PropTypes.func,
}
export default AddTaskModal