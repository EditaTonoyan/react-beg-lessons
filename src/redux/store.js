import {createStore} from 'redux';

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
        case "SET_SINGLE_TASK":{
            return{
                ...state,
                singleTasks:{
                    ...state.singleTasks,
                    singleTask:action.data,
                }
            }
        }
        case "TOGGLE_MODAL":{
            return{
                ...state,
                singleTasks:{
                    ...state.singleTasks,
                    isOpenTaskModal:!state.singleTasks.isOpenTaskModal,
                }
            }
        }
        case "SET_OR_REMOVE_SPINNER":{
            return{
                ...state,
                isOpenSpinner:action.isOpenSpinner
            }
        }
        case "SET_OR_REMOVE_MODAL":{
            return{
                ...state,
                singleTasks:{
                    ...state.singleTasks,
                    isOpenTaskModal:action.isOpenTaskModal,
                   
                }
            }
        }
        //ToDO
        case "SET_TASKS": {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    task: action.data
                }
            }
        }
        case "SET_OR_REMOVE_ADD_MODAL":{
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    isOpenAddTaskModal: !state.todoState.isOpenAddTaskModal
                }
            }
        }
        case "ADD_TASK":{
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
        case "DELETE_TASK_MODAL":{
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
        case "DELETE_ONE_TASK":{
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
        case "EDIT_TASK":{
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
        case "TOGGLE_SET_EDITABLE_TASK":{
            return{
            ...state,
            todoState: {
                ...state.todoState,
                editableTask:action.data
                }
            }
        }
        case "CHECKED_TASKS":{
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
            
        } case "DELETE_CHECKED_TASKS":{
            let task = state.todoState.task;   
            task = task.filter(task => !state.todoState.checkedTasks.has(task._id));
           
            return{
                ...state,
                todoState: {
                    ...state.todoState,
                    task,
                    checkedTasks:new Set()
                    }
               
            }
        }
        case "TOGGLE_CHECK_ALL":{
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
     


const store = createStore(reduser);
window.store = store;

export default store;