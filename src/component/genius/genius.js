import React from 'react'
import axios from 'axios'

class Genius extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount(){
        axios.get('/user/list?type=genius')
            .then(res=>{
                if(res.code === 200) {
                    this.setState({data:res.data.data})
                }
            })
    }
    render(){
        return <div>boss</div>
    }
}

export default Genius