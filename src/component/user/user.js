import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import browserCookie from 'browser-cookies'
import { logoutSubmit } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'


@connect(
    state=>state.user,
    {logoutSubmit}
)



class User extends React.Component{
    constructor(props){
        super(props)
        this.logout = this.logout.bind(this)
    }
    logout(e){
       
        const alert  = Modal.alert
        alert('注销', '确认退出吗？', [
            { text: '取消', onPress: () => console.log('取消') },
            { text: '确认', onPress: () => {
                        browserCookie.erase('userid')
                        // window.location.href =  window.location.href
                        this.props.logoutSubmit()
            } }
          ])

    }
    render(){
        const props = this.props
        const Item = List.Item
        const Brief = Item.Brief
        return props.user ? (   
            <div>
                <Result
                    img={<img style={{width:50}} src={require(`../img/${props.avatar}.png`)} alt="" />}
                    title={props.user}
                    message={props.type === 'boss'?props.company:null}
                ></Result>
                <List renderHeader={()=>'简介'}>
                    <Item multipleLine>
                        {props.title}
                        {props.desc && props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
                        {props.money && <Brief>薪资：{props.money}</Brief>}
                    </Item>

                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Item onClick={this.logout}>退出登录</Item>
                </List>
            </div>
        ): <div>{ props.redirectTo ? <Redirect to={props.redirectTo}></Redirect>:null}</div>
    }
}

export default User