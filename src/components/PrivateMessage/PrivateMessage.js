import React, { Component } from 'react';
import {connect} from 'react-redux';
import SearchUser from './SearchUser';
import axios from 'axios'
import './PrivateMessage.css';
import close from './../../assets/close-circle.png';

class PrivateMessage extends Component {
    constructor(){
        super()

        this.state = {
            title:'',
            content:'',
            searchedUsers:[],
            selectedUser:null,
        }

        this.selectUser = this.selectUser.bind(this)
        this.showSelectedUser = this.showSelectedUser.bind(this)
    }

    componentDidMount(){
        let id = '';
        try{
            id = this.props.match.params.id;
        }
        catch(err){}

        if(typeof id !== 'undefined'){
            axios.get(`/api/getUserInfo/${id}/false`)
                .then(res=>this.setState({selectedUser:res.data[0]}))
                .catch(err=>console.log(err))
        }
        else{}
        
    }
    
    selectUser(e){
        this.setState({selectedUser:e})
    }

    showSelectedUser(){
        let e = this.state.selectedUser;
        let html = 
            <div className="lightGreenColor userContainer">
                <img className="userPicture" src={e.picture} />
                <div className="headerText">{e.name}</div>
                <div className="removeUser" onClick={()=>this.setState({selectedUser:null,searchedUsers:[]})}><img className="img" src={close}/></div>
            </div>
        
        return html;
    }

    sendMessage(){
        const {title,content,selectedUser} = this.state;

        if(title && content && selectedUser){
            let obj = {title:title,content:content,toUser:selectedUser.auto_id,fromUser:this.props.state.user_id,date:new Date()}
            axios.post('/api/addPrivateMessage',obj)
                .then(res=>this.props.history.push(`/myProfile/mail?ssc=${res.data}`))
                .catch(err=>console.log(err))
        }
    }
    render() {
        return (
            <div className="mainPrivateMessageContainer dp1-bs">
                <div className="accentColor headerText ">
                    <div>
                        Private Message
                    </div>
                </div>
                    {this.state.selectedUser === null ?
                <div className="searchUser">
                    <input placeholder="Search for a user" onChange={(e)=>this.setState({searchInput:e.target.value})} />
                    <SearchUser searchInput={this.state.searchInput} selectUser={this.selectUser} />
                </div>
                    :<div className="mainUserContainer">{this.showSelectedUser()}</div>}
                <div className="ceTitle">
            <label className="headerText">Title</label>
            <br/>
            <input id="titleText" className="bodyText"onChange={e=>this.setState({title:e.target.value})}/>
          </div>
          <div className="ceContent">
            <label className="headerText">Content</label>
            <br />
            <textarea id="contentTextBox" className="bodyText ceContentTextArea" spellCheck="false" onChange={e=>this.setState({content:e.target.value})}></textarea>
          <button className="greenColor" onClick={()=>this.sendMessage()}>send</button>
          </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        state:state,
    }
}

export default connect(mapStateToProps)(PrivateMessage);