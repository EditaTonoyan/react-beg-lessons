import {useEffect, useRef} from 'react';
import{Button, Modal,FormControl,Form} from 'react-bootstrap';
import styles from './AddEditTaskModal.module.css';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import GetDate from '../../Helpers/GetDate';
import {connect} from 'react-redux';
import {changeModalThunk,setDataModalThunk} from '../../redux/action'
import Types from '../../redux/actionTypes';

const AddEditTaskModal = (props) => {

const inpRef = useRef(null)


const handleSub = ({ key, type}) => {
  const { title, description, actionDate} = props;
  const date = GetDate(actionDate)
  
  
  if (!title ||
      !description ||
      (type === 'keypress' && key !== 'Enter')
  )
      return;
      const formData = {
       title,
       description,
       date
      }
  props.onSubmit(formData);
  
}

    useEffect(() => {
      inpRef.current.focus();
      return () => {
        props.resetData()
      }
    }, [])
  
          
      const {onHide, editableTask, title, description, actionDate} = props;
     console.log(editableTask); 
     
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
                ref={inpRef}
                name='title'
                type='text'
                onChange={(event) => props.handleChange(event.target)}
                className={styles.input}
                onKeyPress={handleSub}
                placeholder="Title"
                value={title}
              />
            <Form.Control 
                style={{resize:"none"}}
                name='description'
                placeholder="description"
                onChange={(event) => props.handleChange(event.target)}
                className={styles.input }
                as="textarea" 
                rows={3}
                value={description}
            />
            <Form.Group>
              <DatePicker 
                  
                  selected={ actionDate} 
                  onChange={(date)=>props.setDate(date)} 
              
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
            {editableTask ? 'Save' : 'Add'}
            
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
  return{
    title:state.addTaskModalState.title,
    description:state.addTaskModalState.description,
    actionDate:state.addTaskModalState.date
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange:(task) => {
      dispatch((dispatch) => changeModalThunk(dispatch, task))
    } ,
    setDate:(date) => {
      dispatch((dispatch) => setDataModalThunk(dispatch, date))
    },
     resetData:() => {
       dispatch({type:Types.RESET_MODAL_DATA})
     }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditTaskModal)