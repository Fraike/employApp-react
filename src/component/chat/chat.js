import React from 'react'
import { InputItem , List, NavBar,Icon } from 'antd-mobile'

import {connect} from 'react-redux'
import {sendMsg,getMsgList,recvMsg} from '../../redux/chat.redux'
import { getChatId } from '../../redux/util';
// import io from 'socket.io-client'
// const socket = io('ws://localhost:9093')

@connect(
    state=>state,
    {sendMsg,getMsgList,recvMsg}
)
class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state = {text:'',msg:[]}
    }
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }
    handleSubmit(){
        // socket.emit('sendmsg',{text:this.state.text})
        // this.setState({text:''})
        // console.log(this.state)
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({from,to,msg})
        this.setState({text:''})
    }
    render(){
        const emoji = '😀 😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘  😗 😙 😚 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹️ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😰 😱 😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🤥 🤫 🤭 🧐 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾'
                        .split(' ').filter(v=>v).map(v=>v.text)

        const userid = this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users
        if(!users[userid]){
            return null
        }
        const chatid = getChatId(userid,this.props.user._id)
        const chatmsg = this.props.chat.chatmsg.filter(v=>v.chatid === chatid)
        return (
            <div id='chat-page' style={{marginTop:45}}>
                <NavBar onLeftClick={()=>{this.props.history.goBack()}}  icon={<Icon type="left" />} mode='dark'>{users[userid].name}</NavBar>
                {chatmsg.map(v=>{
                    const avatar = require(`../img/${users[v.from].avatar}.png`)
                   return v.from===userid?(
                   <List key={v._id}>
                    <Item thumb={avatar}>
                        {v.content}
                    </Item>
                   </List>
                   ):(
                    <List key={v._id}>
                    <Item 
                        extra={<img src={avatar}></img>}    
                        className='chat-me'
                    >
                        {v.content}
                    </Item>
                   </List>
                   )
                })}

                <div className="stick-footer">
                <List>
                    <InputItem
                        placeholder="请输入"
                        value={this.state.text}
                        onChange={v=>{this.setState({text:v})}}
                        extra = {<span onClick={()=>this.handleSubmit()}>发送</span>}
                    >
                    
                    </InputItem>

                </List>
                </div>
            </div>
        )
    }
}

export default Chat