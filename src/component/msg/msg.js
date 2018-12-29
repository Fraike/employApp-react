import React from 'react'
import {connect} from 'react-redux'
import { List, Badge } from 'antd-mobile';

@connect(
    state=>state
)

class Msg extends React.Component{
    getLastItem(arr){
        return arr[arr.length-1]
    }
    render(){
        if (!this.props.chat.chatmsg){
            return null
        }
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v=>{
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
       
        const chatList = Object.values(msgGroup).sort((a,b)=>{
            const a_last = this.getLastItem(a).create_time
            const b_last = this.getLastItem(b).create_time
            return b_last - a_last


        })
        //  console.log(chatList);
        const Item = List.Item
        const Brief = List.Item.Brief
        const userid = this.props.user._id
        return (
            <div>
                
                    {
                        chatList.map(v=>{
                            const lastItem = this.getLastItem(v)
                            const targetId = v[0].from === userid ? v[0].to:v[0].from
                            const unreadNum = v.filter(v=>!v.read&&v.to===userid).length
                            const name = this.props.chat.users[targetId] ? this.props.chat.users[targetId].name : ''
                            const avatar = this.props.chat.users[targetId] ? this.props.chat.users[targetId].avatar : ''
                            
                            return (
                            <List key={lastItem._id}>
                                    <Item
                                        arrow="horizontal"
                                        extra={<Badge text={unreadNum}></Badge>}
                                        thumb={require(`../img/${avatar}.png`)}
                                        onClick={()=>{
                                            this.props.history.push(`/chat/${targetId}`)
                                        }}
                                    >
                                    {lastItem.content}
                                    <Brief>{name}</Brief>
                                </Item>
                            </List>
                            )
                        })
                    }
                
            </div>
        )
    }
}

export default Msg