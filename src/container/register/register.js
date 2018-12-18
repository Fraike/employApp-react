import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'

@connect(
    state=>state.user,
    {register}
)


class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'genius'
        }
        this.handleRegister = this.handleRegister.bind(this)
    }
    register(){
        this.props.history.push('./register')
    }
    handleChange(key,val){
        this.setState({
            [key]: val
        })
    }
    handleRegister(){
        this.props.register(this.state)
    }
    render(){
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:null}
                <Logo></Logo>
                <WingBlank>
                    {this.props.msg?<p className="error-msg">{this.props.msg}</p>:""}
                    <List>
                        <InputItem 
                            onChange = {(v)=>this.handleChange('user',v)}
                        >用户名</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem
                            onChange = {(v)=>this.handleChange('pwd',v)}
                            type='password'
                        >密码</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem
                            onChange = {(v)=>this.handleChange('repeatpwd',v)}
                            type='password'
                        >确认密码</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <RadioItem 
                            checked={this.state.type === 'genius'}
                            onChange = {()=>this.handleChange('type','genius')}
                        >牛人</RadioItem>
                        <RadioItem 
                            checked={this.state.type === 'boss'}
                            onChange = {()=>this.handleChange('type','boss')}
                        >BOSS</RadioItem>
                        <WhiteSpace></WhiteSpace>
                        <Button 
                            type='primary'
                            onClick={this.handleRegister}
                        >注册</Button>
                    </List>
                </WingBlank>
                
            </div>
        )
    }
}

export default Register