import React,  { createRef } from 'react';
import{Button, Modal,FormControl,Form} from 'react-bootstrap';
import styles from './AddEditTaskModal.module.css';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import GetDate from '../../Helpers/GetDate';
import {connect} from 'react-redux';
import {changeModalThunk,setDataModalThunk} from '../../redux/action'

class AddEditTaskModal extends React.Component{
//   constructor(props) {
//     super(props);
//     this.inputRef = createRef();
//   //   this.state = {
//   //     // ...props.editableTask,
//   //     // date: props.editableTask ? new Date(props.editableTask.date): new Date()
//   // }
// }

// setDate = (date) => {
//   this.setState({
//       date
     
//   });
// }
handleSub = ({ key, type}) => {

  const { title, description,date } = this.props;
  if (!title ||
      !description ||
      (type === 'keypress' && key !== 'Enter')
  )
      return;
      const formData ={
       title,
       description,
      date
      }
  this.props.onSubmit(formData);
  // this.props.onHide();
}

        
          
        // componentDidMount() {
        //   this.inputRef.current.focus();
        // }

     render(){   
     
      const {onHide, editableTask, title, description, _id} = this.props;
      const date = editableTask ? new Date(editableTask.date): new Date()

      // const{_id} = this.state
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
                onChange={(event) => this.props.handleChange(event.target)}
               // value={this.state.inputValue}
                className={styles.input}
                onKeyPress={this.handleSub}
                placeholder="Title"
                value={title}
              />
            <Form.Control 
                style={{resize:"none"}}
                name='description'
                placeholder="description"
                onChange={(event) => this.props.handleChange(event.target)}
                className={styles.input }
                as="textarea" 
                rows={3}
                value={description}
            />
            <Form.Group>
              <DatePicker 
                  
                  selected={this.props.date} 
                  onChange={(date)=>this.props.setDate(date)} 
              
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
const mapStateToProps = (state) => {
  return{
    title:state.addTaskModalState.title,
    description:state.addTaskModalState.description
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange:(task) => {
      dispatch((dispatch) => changeModalThunk(dispatch, task))
    } ,
    setDate:(date) => {
      dispatch((dispatch) => setDataModalThunk(dispatch, date))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditTaskModal)