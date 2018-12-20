import axios from 'axios'

const USER_LIST = 'USER_LIST'

const initstate = {
    userlist: []
}
//reducer
export function chartuser(state=initstate,action){
    switch(action.type){
        case USER_LIST:
            return {...state,userlist:action.payload}
        default:
            return state
    }
}
//actionCreator
function userList(data){
    return { type:USER_LIST, payload:data}
}

//caozuo
export function getUserList(type){
    return dispatch=>{
        axios.get('/user/list?type='+ type)
        .then(res=>{
            if(res.status === 200) {
                // this.setState({data:res.data.data})
                dispatch(userList(res.data.data))
            }
        })
    }
}