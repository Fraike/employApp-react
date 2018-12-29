import React from 'react'
import {
    InputItem,
    List,
    NavBar,
    Icon,
    Grid
} from 'antd-mobile'

import {connect} from 'react-redux'
import {sendMsg,getMsgList,recvMsg,readMsg} from '../../redux/chat.redux'
import { getChatId } from '../../redux/util';
// import io from 'socket.io-client'
// const socket = io('ws://localhost:9093')

@connect(
    state=>state,
    {sendMsg,getMsgList,recvMsg,readMsg}
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
    componentWillUnmount(){
        const to = this.props.match.params.user
        this.props.readMsg(to)
    }
    handleSubmit(){
        // socket.emit('sendmsg',{text:this.state.text})
        // this.setState({text:''})
        // console.log(this.state)
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({from,to,msg})
        this.setState({text:'',showEmoji:false})
    }
    fixcar(){
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        }, 0);
    }
    render(){
        const emoji = '😀 😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘  😗 😙 😚 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹️ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😰 😱 😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🤥 🤫 🤭 🧐 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾'
                        .split(' ').filter(v=>v).map(v=>({text:v}))
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
                            extra = {
                                <div>
                                    <span 
                                    style={{marginRight:15}} 
                                    onClick={
                                        ()=>{
                                            this.setState({showEmoji:!this.state.showEmoji})
                                            this.fixcar()
                                        }
                                    }

                                    >😀</span>
                                    <span onClick={()=>this.handleSubmit()}>发送</span>
                                </div>
                            }
                        >
                        </InputItem>
                    </List>
                    {
                        this.state.showEmoji && <Grid 
                        data={emoji}
                        columnNum={9}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={el=>{
                            this.setState({
                                text: this.state.text + el.text
                            })
                        }}
                        ></Grid>
                    }
                </div>
            </div>
        )
    }
}

export default Chat