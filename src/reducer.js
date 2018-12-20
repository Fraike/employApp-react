import { combineReducers } from 'redux'
import { user } from './redux/user.redux'
import { chartuser} from './redux/chartuser.redux'

 
export default combineReducers({user,chartuser})