import { createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import singleTaskReduser from  '../redux/redusers/singleTaskReduser';
import globalReduser from './redusers/globalReduser';
import toDoReduser from './redusers/toDoReduser';
import logger from 'redux-logger'
import contactFormReduser from './redusers/contactFormReduser';
import addTaskModalReduser from './redusers/addTaskModalReduser'

const reduser = combineReducers({
    singleTaskState:singleTaskReduser,
    toDoState:toDoReduser,
    globalState:globalReduser,
    contactformState:contactFormReduser,
    addTaskModalState:addTaskModalReduser
})


const store = createStore(reduser,applyMiddleware(thunk));
window.store = store;
export default store;