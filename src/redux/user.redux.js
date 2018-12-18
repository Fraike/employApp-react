import axios from 'axios'
import {getRedirectPath} from './util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
    redirectTo: '',
    isAuth: false,
    msg: '',
    user: '',
    pwd: '',
    type: ''
}

//reducer
export function user(state=initState, action){
    switch(action.type){
        case REGISTER_SUCCESS:
            return {...state,msg:'', redirectTo: getRedirectPath(action.payload), isAuth:true,...action.payload}
        case ERROR_MSG:
            return {...state,msg:action.msg,isAuth:false}
        default:
        return state
    }
}

function registerSuccess(data){
    return { type: REGISTER_SUCCESS, payload:data}
}

function errorMsg(msg) {
    return { msg, type: ERROR_MSG}
}

export function register({user,pwd,repeatpwd,type}){
    if(!user||!pwd||!type){
        return errorMsg('用户密码不能为空')
    }
    if(pwd !== repeatpwd) {
        return errorMsg('密码不同')
    }
    //使用redux-thunk异步处理
    return dispatch=>{
        axios.post('/user/register',{user, pwd, type}).then(res=>{
            if(res.status === 200 && res.data.code === 0){
                dispatch(registerSuccess({user, pwd, type}))
            }else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}