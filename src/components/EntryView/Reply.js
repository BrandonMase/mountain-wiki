import React, { Component } from 'react';
import './Comments.css';
import { connect } from 'react-redux';
import axios from 'axios';
import {NavLink} from 'react-router-dom'

class Reply extends Component {
  constructor(props) {
    super(props);
    this.state={
      show:false,
      newContent:null,
    }

    this.addEdit = this.addEdit.bind(this);
    this.editComment = this.editComment.bind(this)
    this.editContainer = this.editContainer.bind(this)
  }

  componentDidMount(props){
    console.log("K:KER:LK:LWK",this.props.childProps)
    this.setState({newContent:this.props.childProps.content,content:this.props.childProps.content})
  }

  addEdit() {
    let html =<p id="replyContent"> {this.props.childProps.content}</p>;
    // console.log("THISPROPS",this.props)
    if (this.props.state.user_id == this.props.childProps.user_id) {
      console.log("THISPROPS",this.props)
      html = <div className="bodyText">
        <p id="replyContent"> {this.state.content}</p>
          {this.editContainer()}
      </div>
    }

    return html
  }
  editContainer(){
    let html = <a className="editContent" href="#" onClick={(e)=>this.editComment(e)}>edit your comment</a>;
    if(this.state.show){
   html = <div id="mainReplyContainer">
    <textarea className="bodyText" id="replyTextArea" onChange={e=>this.setState({newContent:e.target.value})}>{this.state.newContent}</textarea>
    <button onClick={e=>this.submitReply()} className="greenColor">submit reply</button>
    <button onClick={e=>this.cancelReply()} className="redColor">cancel reply</button>
    </div>
    }
    return html;
  }

  submitReply(){
    if(this.state.newContent){
      let obj = {auto_id:this.props.childProps.auto_id,newContent:this.state.newContent}
      axios.put('/api/updateComment',obj);
      this.setState({show:false,content:this.state.newContent})
    }
  }

  cancelReply(){
    this.setState({show:false,newContent:this.state.content})
  }

  editComment(e){
    e.preventDefault();
    this.setState({show:true})
    
  }
  render() {
    return (
                  <div className="commentContainer replyComment dp1-bs">
            <div className="commentDetails headerText lightPrimaryColor">
          <div className="userName"><img src={this.props.childProps.picture}/><div className="actualUserName"><p><NavLink className="authorLink" to={`/u/${this.props.childProps.user_id}`}>{this.props.childProps.name}</NavLink></p></div></div>
            </div>

            <div className="commentContent bodyText">
            {this.addEdit()}
  
          </div>
      

            </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
  }
}

export default connect(mapStateToProps)(Reply);