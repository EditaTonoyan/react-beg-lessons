import React,  { createRef } from 'react';
import{Button, Modal,FormControl,Form} from 'react-bootstrap';
import styles from './AddEditTaskModal.module.css';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import GetDate from '../../Helpers/GetDate'

class AddEditTaskModal extends React.Component{
  constructor(props) {
    super(props);
    this.inputRef = createRef();
    this.state = {
      title: "",
      description: "",
      ...props.editableTask,
      date: props.editableTask ? new Date(props.editableTask.date): new Date()
  }
}

setDate = (date) => {
  this.setState({
      date
     
  });
}
          
handleChange = (event) => {
  const { name, value } = event.target;
  this.setState({
      [name]: value
  });
}
handleSub = ({ key, type }) => {
  const { title, description } = this.state;
  if (!title ||
      !description ||
      (type === 'keypress' && key !== 'Enter')
  )
      return;
      const formData ={
        ...this.state,
        date:GetDate(this.state.date)
      }
  this.props.onSubmit(formData);
  // this.props.onHide();
}

        
          
        componentDidMount() {
          this.inputRef.current.focus();
        }

     render(){    
      const {onHide, editableTask } = this.props;
       const{_id, title, description,date} = this.state
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
        {editableTask ? "Edit Task Modal" : "Add Task Modal"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <FormControl 
                ref={this.inputRef}
                name='title'
                type='text'
                onChange={this.handleChange}
                value={this.state.inputValue}
                className={styles.input}
                onKeyPress={this.handleSub}
                placeholder="Title"
                value={title}
              />
            <Form.Control 
                style={{resize:"none"}}
                name='description'
                placeholder="description"
                onChange={this.handleChange}
                className={styles.input }
                as="textarea" 
                rows={3}
                value={description}
            />
            <Form.Group>
              <DatePicker 
                  
                  selected={date} 
                  onChange={this.setDate} 
              
              />
            </Form.Group>
              
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary "
          onClick={(event) => onHide()} 
        >
            Close
        </Button>
        <Button
        onClick={this.handleSub} 
        disabled = {!title || !description}
        >
            {_id === '' ? 'Add' : 'Save'}
            
        </Button>
      </Modal.Footer>
    </Modal>
      )
    }
    
}

 AddEditTaskModal.propTypes = {
   onHide:PropTypes.func,
   isAnyTaskChecked:PropTypes.bool,
   handleSubmit:PropTypes.func,
}
export default AddEditTaskModal