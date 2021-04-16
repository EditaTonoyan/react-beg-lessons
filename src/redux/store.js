import { createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import singleTaskReduser from  '../redux/redusers/singleTaskReduser';
import globalReduser from './redusers/globalReduser';
import toDoReduser from './redusers/toDoReduser';
import logger from 'redux-logger'
import contactFormReduser from './redusers/contactFormReduser';

const reduser = combineReducers({
    singleTaskState:singleTaskReduser,
    toDoState:toDoReduser,
    globalState:globalReduser,
    contactformState:contactFormReduser
})


const store = createStore(reduser,applyMiddleware(thunk,logger));
window.store = store;
export default store;