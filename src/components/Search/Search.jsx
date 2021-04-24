 import styles from './search.module.css';
 import {useEffect} from 'react';
 import {connect} from 'react-redux';
 import DatePicker from "react-datepicker";

 import {
        setDropdownValueThunk,
        changeSearchInputThunk,
        setSearchDateThunk,
        resetSearchDataThunk,
        submitSearcValuesThunk
    } from '../../redux/action';
 import {
     Form, 
     Button,
     InputGroup,
     DropdownButton,
     Dropdown,
    } from 'react-bootstrap';

const sortVariants = [
    
    {
        label:'A-Z',
        value: 'a-z'
    },
    {
        label:'Z-A',
        value: 'z-a'
    },
    {
        label:'Creation_Date_Oldest',
        value: 'creation_date_oldest'
    },
    {
        label:'Creation_Date_Vewest',
        value: 'creation_date_newest'
    },
    {
        label:'Completion_Date_Oldest',
        value: 'completion_date_oldest'
    },
    {
        label:'Completion_Date_Newest',
        value: 'completion_date_newest'
    },
    {
        label:'Reset',
        value: ''
    }
]

const statusVariants = [
    {
        label:'Active',
        value: 'active'
    },
    {
        label:'Done',
        value: 'done'
    },
    {
        label:'Reset',
        value: ''
    }
]

const Search = (props) => {


    const { 
        //funcion
        setDropdownValue,
        handleChange,
        setDate,
        resetData,
        handleSubmit
    } = props
    const { 
        //state
        status,
        search,
        sort,
        create_lte,
        create_gte,
        complete_lte,
        complete_gte,
    } = props.state


    useEffect(() => {
        resetData()
    }, [])
   
    const sortValues = sortVariants.map((variant, index) => {
        return(
            <Dropdown.Item key = {index} onClick={() => setDropdownValue("sort", variant.value)}>{variant.label}</Dropdown.Item>
        )
    })

    const statusValues = statusVariants.map((variant, index) => {
        return(
            <Dropdown.Item key = {index} onClick={() => setDropdownValue("status", variant.value)}>{variant.label}</Dropdown.Item>

        )
    })
    return(
        <div>
            <div>
                <InputGroup className="mb-3">
                    <Form.Control 
                    type="search" 
                    placeholder="search"
                    onChange={(e) => handleChange(e.target)}
                    value={search}
                    />
                </InputGroup >
                
                <InputGroup className="mt-3 d-flex justify-content-center">
                <DropdownButton title={sort ? sortVariants.find(i => i.value === sort).label : "sort"}>
                    {sortValues}
                </DropdownButton>

                <DropdownButton   className="ml-3" title={status ? statusVariants.find(i => i.value === status).label :"status"}>
                    {statusValues}
                </DropdownButton>
                </InputGroup>
                <Form.Group className="mt-3 d-flex justify-content-center">
                        <p  style={{color:"black", marginRight:"10%"}}>Created late</p>
                        <p style={{color:"black", marginLeft:"5%"}}>Created Greater</p>
              </Form.Group>
                <Form.Group className="mt-3 d-flex justify-content-center">
                        <DatePicker
                                
                             selected={create_lte}
                             onChange={(date) => setDate("create_lte", date)}
                        />
                        <DatePicker
                            className="ml-3"
                            selected={create_gte}
                            onChange={(date) => setDate("create_gte",date)}
                        />
              </Form.Group>
              <Form.Group className="mt-3 d-flex justify-content-center">
                        <p  style={{color:"black", marginRight:"10%"}}>Complete late</p>
                        <p style={{color:"black", marginLeft:"5%"}}>Complete Greater</p>
              </Form.Group>
              <Form.Group  className="mt-3 d-flex justify-content-center">
                        <DatePicker
                            selected={complete_lte}
                            onChange={(date) => setDate("complete_lte",date)}
                        />
             
                        <DatePicker
                            className="ml-3"

                            selected={complete_gte}
                            onChange={(date) => setDate("complete_gte",date)}
                        />
              </Form.Group>

                <Button
                onClick={() => handleSubmit(props.state)}
                 variant="primary"
                 type="submit"
                 style={{marginLeft:"48%", marginBottom:"5%"}}
                >
                    Filter
                </Button>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => { 
    // const { 
    //     status,
    //     search,
    //     sort,
    //     create_lte,
    //     create_gte,
    //     complete_lte,
    //     complete_gte,}  = state.searchState
    return {
        state:state.searchState
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        setDropdownValue:(name, value) => {
            dispatch((dispatch) => setDropdownValueThunk(dispatch, name, value))
        },
        handleChange:(target) => {
            dispatch((dispatch) => changeSearchInputThunk(dispatch, target))
        },
    
        setDate:(searchInput, date) => {
            dispatch((dispatch) => setSearchDateThunk(dispatch, searchInput, date))
        },
        handleSubmit:(formData) => {
            dispatch((dispatch) => submitSearcValuesThunk(dispatch, formData))
        },
        resetData:() => {
            dispatch((dispatch)=> resetSearchDataThunk(dispatch))
        }
        
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search)