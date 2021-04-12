import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Types from '../redux/actionTypes'

const initialState = {
    singleTasks:{
        singleTask:null,
        isOpenTaskModal:false,
    },
    
    todoState:{
        task:[],
        isOpenAddTaskModal:false,
        isOpenDeleteTaskModal:false,
        editableTask:'',
        checkedTasks:new Set(),
        oneCheckedTask:null
    },
    isOpenSpinner:false,
}

    

const reduser = (state = initialState, action) => {
    switch(action.type){
        //Single Task
        case Types.SET_SINGLE_TASK:{
            return{
                ...state,
                singleTasks:{
                    ...state.singleTasks,
                    singleTask:action.data,
                }
            }
        }
        case Types.TOGGLE_MODAL:{
            return{
                ...state,
                singleTasks:{
                    ...state.singleTasks,
                    isOpenTaskModal:!state.singleTasks.isOpenTaskModal,
                }
            }
        }
        case Types.SET_OR_REMOVE_SPINNER:{
            return{
                ...state,
                isOpenSpinner:action.isOpenSpinner
            }
        }
        case Types.SET_OR_REMOVE_MODAL:{
            return{
                ...state,
                singleTasks:{
                    ...state.singleTasks,
                    isOpenTaskModal:action.isOpenTaskModal,
                   
                }
            }
        }
        //ToDO
        case Types.SET_TASKS: {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    task: action.data
                }
            }
        }
        case Types.SET_OR_REMOVE_ADD_MODAL:{
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    isOpenAddTaskModal: !state.todoState.isOpenAddTaskModal
                }
            }
        }
        case Types.ADD_TASK:{
            const task = [...state.todoState.task];
            task.push(action.data);
            
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    task,
                    isOpenAddTaskModal:false
                }
            }
        }
        case Types.DELETE_TASK_MODAL:{
            const { checkedTasks, task } = state.todoState;
            let oneCheckedTask = null;
            if (checkedTasks.size === 1) {
                oneCheckedTask = task.find(task => task._id === Array.from(checkedTasks)[0]);
            }
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    oneCheckedTask,
                    isOpenDeleteTaskModal: !state.todoState.isOpenDeleteTaskModal
                }
            }
    
        }        
        case Types.DELETE_ONE_TASK:{
            let task = state.todoState.task;
            task = task.filter(task => task._id !== action._id)
            return{
                
                ...state,
                todoState: {
                ...state.todoState,
                 task
                } 
            }
        }
        case Types.EDIT_TASK:{
                const task = state.todoState.task;
                const idx = task.findIndex(task => task._id === action.data._id);
                task[idx] = action.data;
                return{
                    ...state,
                    todoState: {
                    ...state.todoState,
                        task,
                        editableTask:'', 
                        isOpenAddTaskModal:false


                    }
                }   
        }
        case Types.TOGGLE_SET_EDITABLE_TASK:{
            return{
            ...state,
            todoState: {
                ...state.todoState,
                editableTask:action.data
                }
            }
        }
        case Types.CHECKED_TASKS:{
           const {_id} = action;
            let checkedTasks = new Set(state.todoState.checkedTasks);
            if(!checkedTasks.has(_id)){
                checkedTasks.add(_id)
            }else{
                checkedTasks. delete(_id)
            }
           
            return{
                ...state,
            todoState: {
                ...state.todoState,
                checkedTasks
                }
               
            }
            
        } case Types.DELETE_CHECKED_TASKS:{
            let task = state.todoState.task;   
            task = task.filter(task => !state.todoState.checkedTasks.has(task._id));
           
            return{
                ...state,
                todoState: {
                    ...state.todoState,
                    task,
                    checkedTasks:new Set(),
                    }
               
            }
        }
        case Types.TOGGLE_CHECK_ALL:{
            const {task} = state.todoState
            let checkedTasks = new Set(state.todoState.checkedTasks)
            if(task.length === checkedTasks.size){
                checkedTasks.clear();
            }else{
                task.forEach(task => {
                    checkedTasks.add(task._id)
                });
            }
            return{
                ...state,
                todoState:{
                    ...state.todoState,
                    checkedTasks
                }
            }
    
    }
         default: return state

    }
  

}
     


const store = createStore(reduser,applyMiddleware(thunk));
window.store = store;

export default store;