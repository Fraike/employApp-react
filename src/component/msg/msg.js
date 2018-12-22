import React from 'react'
import axios from 'axios'
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
        // console.log(this.props)
        if (!this.props.chat.chatmsg){
            return null
        }
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v=>{
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
       
        const chatList = Object.values(msgGroup)
         console.log(chatList);
        const Item = List.Item
        const Brief = List.Item.Brief
        const userid = this.props.user._id
        return (
            <div>
                <List>
                    {
                        chatList.map(v=>{
                            // console.log(v)
                            const lastItem = this.getLastItem(v)
                            const targetId = v[0].from === userid ? v[0].to:v[0].from
                            const unreadNum = v.filter(v=>!v.read&&v.to===userid).length
                            const name = this.props.chat.users[targetId] ? this.props.chat.users[targetId].name : ''
                            const avatar = this.props.chat.users[targetId] ? this.props.chat.users[targetId].avatar : ''
                            
                            return (
                                <Item
                                    key={lastItem._id}
                                    extra={<Badge text={unreadNum}></Badge>}
                                    thumb={require(`../img/${avatar}.png`)}
                                >
                                {lastItem.content}
                                <Brief>{name}</Brief>
                            </Item>
                            )
                        })
                    }
                </List>
            </div>
        )
    }
}

export default Msg