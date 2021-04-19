import Types from '../actionTypes';

const initialState = {
    task:[],
    isOpenAddTaskModal:false,
    isOpenDeleteTaskModal:false,
    editableTask:'',
    checkedTasks:new Set(),
    oneCheckedTask:null
}

const toDoReduser = (state = initialState, action) => {
    switch(action.type){
        case Types.SET_TASKS: {
            return {
                ...state,
                    task: action.data
            }
        }
        case Types.SET_OR_REMOVE_ADD_MODAL:{
            return {
                ...state,
                    isOpenAddTaskModal: !state.isOpenAddTaskModal
            }
        }
        case Types.ADD_TASK:{
            const task = [...state.task];
            task.push(action.data);
           
            
            return {
                ...state,
                    task,
                    isOpenAddTaskModal:false
            }
        }
        case Types.DELETE_TASK_MODAL:{
            const { checkedTasks, task } = state;
            let oneCheckedTask = null;
            if (checkedTasks.size === 1) {
                oneCheckedTask = task.find(task => task._id === Array.from(checkedTasks)[0]);
            }
            return {
                ...state,
                    oneCheckedTask,
                    isOpenDeleteTaskModal: !state.isOpenDeleteTaskModal
            }
    
        }        
        case Types.DELETE_ONE_TASK:{
            let task = state.task;
            task = task.filter(task => task._id !== action._id)
            return{
                ...state,
                 task
            }
        }
        case Types.EDIT_TASK:{
            
                const task = [...state.task];
                const idx = task.findIndex(task => task._id === action.data._id);
                task[idx] = action.data;
                return{
                    ...state,
                        task,
                        editableTask:'', 
                        isOpenAddTaskModal:false

                }   
        }
        case Types.TOGGLE_SET_EDITABLE_TASK:{
            return{
            ...state,
                editableTask:action.data
            }
        }
        case Types.CHECKED_TASKS:{
           const {_id} = action;
            let checkedTasks = new Set(state.checkedTasks);
            if(!checkedTasks.has(_id)){
                checkedTasks.add(_id)
            }else{
                checkedTasks. delete(_id)
            }
           
            return{
                ...state,
                checkedTasks
               
            }
            
        } case Types.DELETE_CHECKED_TASKS:{
            let task = state.task;   
            task = task.filter(task => !state.checkedTasks.has(task._id));
           
            return{
                ...state,
                    task,
                    checkedTasks:new Set(),
               
            }
        }
        case Types.TOGGLE_CHECK_ALL:{
            const {task} = state
            let checkedTasks = new Set(state.checkedTasks)
            if(task.length === checkedTasks.size){
                checkedTasks.clear();
            }else{
                task.forEach(task => {
                    checkedTasks.add(task._id)
                });
            }
            return{
                ...state,
                    checkedTasks
            }
    
        }
        case Types.RESET_DADA:{
            return{
                ...initialState
            }
        }
        default: return state
    }
}
export default toDoReduser