import  { useEffect, useRef } from 'react';
import{Button, Modal,FormControl,Form} from 'react-bootstrap';
import styles from './AddEditTaskModal.module.css';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import GetDate from '../../Helpers/GetDate';
import {connect} from 'react-redux';
import {changeModalThunk,setDataModalThunk, resetTaskModalstateThunk} from '../../redux/action'
import Types from '../../redux/actionTypes'

const AddEditTaskModal = (props) => {

  const {
    onHide,
    editableTask,
   
  } = props;
  const {
    title,
    description, 
    date
  } = props.state

  console.log(date)
const inpRef = useRef(null)
const handleSub = ({ key, type }) => {
  if (!title ||
      !description ||
      (type === 'keypress' && key !== 'Enter')
  )
      return;
      const formData ={
        ...props.state,
        date:GetDate(date)
      
      }

 props.onSubmit(formData);
}

        
useEffect(() => {
 editableTask && props.resetTaskModalState(editableTask)
  inpRef.current.focus();
  return () => {
    props.resetData()
  }
}, [])
      return(
      <Modal
      onHide = {onHide}
      show={true}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
      <Modal.Header closeButton>
        <Modal.Title>
        {editableTask ? "Edit Task Modal" : "Add Task Modal"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <FormControl 
                 ref={inpRef}
                name='title'
                type='text'
                onChange={(e) => props.handleChange(e.target)}
                className={styles.input}
                onKeyPress={handleSub}
                placeholder="Title"
                value={title}
              />
            <Form.Control 
                style={{resize:"none", marginBottom:'10px'}}
                name='description'
                placeholder="description"
                onChange={(e) => props.handleChange(e.target)}
                className={styles.input }
                as="textarea" 
                rows={3}
                value={description}
            />
             <Form.Group  >
                        <DatePicker
                        
                            selected={new Date(date)}
                            onChange={(date) => props.setDate(date)}
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
        onClick={handleSub} 
        disabled = {!title || !description}
        >
            {editableTask === '' ? 'Add' : 'Save'}
            
        </Button>
      </Modal.Footer>
    </Modal>
      )
  }
    


 AddEditTaskModal.propTypes = {
   onHide:PropTypes.func,
   isAnyTaskChecked:PropTypes.bool,
   handleSubmit:PropTypes.func,
}
const mapStateToProps = (state) => {
  return {
    state: state.addTaskModalState
}
}

const mapDispatchToProps = (dispatch) => {
  return{
    handleChange:(task) => {
      dispatch((dispatch) => changeModalThunk(dispatch, task))
    } ,
    setDate:(date) => {
      dispatch((dispatch) => setDataModalThunk(dispatch, date))
    },
    resetData:() => {
      dispatch({type:Types.RESET_MODAL_DATA})

    },
    resetTaskModalState:(editableTask) => {
      dispatch((dispatch) =>resetTaskModalstateThunk(dispatch, editableTask))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddEditTaskModal)