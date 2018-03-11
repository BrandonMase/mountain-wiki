import React, { Component } from 'react';
import './Comments.css';
import axios from 'axios'
import Reply from './Reply'
import { connect } from 'react-redux';

class Answer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seeAllComments: false,
      newComment:null,
      date:new Date().toJSON().slice(0,10).replace(/-/g,'/'),
    }
    this.makeAnwserEditable = this.makeAnwserEditable.bind(this)
    this.showEditableAnswer = this.showEditableAnswer.bind(this)
    this.updateAnswer = this.updateAnswer.bind(this)
    this.getReplies = this.getReplies.bind(this)
  }
  componentDidMount(props) {
    const { auto_id, content, total_points, date, name, picture, user_total_points, user_id,replies,entry_id } = this.props.childProps;
    this.setState({ auto_id: auto_id, content: content, newContent: content, total_points: total_points, date: date, name: name, picture: picture, user_total_points: user_total_points, user_id: +user_id,replies:replies,entry_id:entry_id })
  }
  
  //CREATES A NEW REPLY TO AN ANSWER
  createNewComment(){
    const {user_id,username} = this.props.state

    if(this.state.newComment){
      let replies = [];
      if(this.state.replies){
      replies = this.state.replies.slice()
      }

      let obj = {ref_answer_id:+this.state.auto_id,total_points:0,date:this.state.date,content:this.state.newComment,name:username,user_id:+user_id,entry_id:+this.state.entry_id}
      axios.post("/api/addReply",obj)

      replies.push(obj)
      this.setState({...this.state,replies:replies,newComment:null})

      document.getElementById('answerP').innerText = +document.getElementById('answerP').innerText + 1
    }
  }

  //CHECKS TO SEE IF THE USER THE MADE AN ANSWER IS LOGGED IN
  //IF THEY ARE LOGGED IN CHANGE THE ANSWER DIV AND LET THEM EDIT THE ANSWER
  makeAnwserEditable() {
    const { user_id } = this.props.state;
    let html = '';

    if (this.state.user_id === user_id) {
      html = <div className="editContainer secondaryText">
        <textarea  className="bodyText" onChange={e => this.setState({ newContent: e.target.value })} value={this.state.newContent} id="editAnswerContent">{this.state.content}</textarea>
        <a className="editContent" id="clickEdit" href="#" onClick={e => this.showEditableAnswer(e)}>edit answer</a>
        <button id='submitAnswer' className="greenColor" onClick={() => this.updateAnswer()}>submit answer</button>
        <button id='cancelAnswer' className="redColor" onClick={() => this.cancelAnswer()}>cancel edit</button>
      </div>
    }
    
    return html;
  }

  //UPDATES THE ANSWER AND RESET THE ANSWER DIV BACK TO NORMAL
  updateAnswer() {
    document.getElementById('editAnswerContent').style.display = "none";
    document.getElementById('answerContent').style.display = "inherit";
    document.getElementById('clickEdit').style.display = "inherit";
    document.getElementById('submitAnswer').style.display = "none";
    document.getElementById('cancelAnswer').style.display = "none";
    this.setState({content:this.state.newContent})
    axios.put("/api/updateComment",this.state)
  }

  //CANCELS THE UPDATE TO THE ANSWER AND RESETS THE ANSWER DIV
  cancelAnswer() {
    document.getElementById('editAnswerContent').style.display = "none";
    document.getElementById('answerContent').style.display = "inherit";
    document.getElementById('clickEdit').style.display = "inherit";
    document.getElementById('submitAnswer').style.display = "none";
    document.getElementById('cancelAnswer').style.display = "none";
    this.setState({newContent:this.state.content})
  }

  //ONCE THE LOGGED IN USER CLICKS THE EDIT ANSWER LINK SHOW THE EDITABLE TEXTBOX
  showEditableAnswer(e){
    e.preventDefault();
    document.getElementById('editAnswerContent').style.display = "inherit";
    document.getElementById('answerContent').style.display = "none";
    document.getElementById('clickEdit').style.display = "none";
    document.getElementById('submitAnswer').style.display = "initial";
    document.getElementById('cancelAnswer').style.display = "initial";
  }

  //CHECKS TO SEE IF THERE IS ANY REPLIES TO THE ANSWER
  //IF THERE IS MORE THAN 5 JUST SHOWS THE FIRST 5
  //IF THEY HIT THE SEE ALL COMMENT BUTTON, SHOWS ALL THE COMMENTS FOR THAT ANSWER
  getReplies() {
    let html = [];

    if (this.state.replies) {

      //IF THERE IS MORE THAN 5 REPLIES AND SELLALLCOMMENTS IS FALSE ONLY SHOW 5 REPLIES
      if (this.state.replies.length >= 5 && !this.state.seeAllComments) {
        for (let i = 0; i < 5; i++) {
          html.push(<Reply childProps={this.state.replies[i]} />)
        }

        html.push(<div className="addAComment secondaryText"><button  onClick={e => this.setState({ seeAllComments: true })}>See all {this.state.replies.length} comments</button></div>);
      }
      else {

        //ONCE SEEALLCOMMENTS IS TRUE SHOWS ALL REPLIES
        this.state.replies.map(e => {
          html.push(<Reply childProps={e}/>)
        })

        html.push(<div className="addAComment secondaryText"><textarea className="replyTextBox bodyText" onChange={e=>this.setState({newComment:e.target.value})}></textarea><button className="greenColor" onClick={e=>this.createNewComment()}>add a comment</button></div>);
      }
    }
    else {
      html.push(<div className="addAComment secondaryText"><textarea className="replyTextBox bodyText" onChange={e=>this.setState({newComment:e.target.value})}></textarea><button className="greenColor" onClick={e=>this.createNewComment()}>add a comment</button></div>);
    } 

    return html;
  }
  render() {
    return (
      <div>
        <div className="commentContainer dp2-bs">
          <div className="commentDetails headerText lightPrimaryColor">
            <div className="userName">
              <img src={this.state.picture} />
                <div className="actualUserName">
                  <p><a className="authorLink" href={`/u/${this.state.user_id}`}>{this.state.name}</a></p>
                </div>

              <br />

              <div className="userPoints">{this.state.user_total_points}</div>

              <p className="answeredText secondaryText">answered {this.state.date}</p> 

            </div>

            <div className="votesDiv">
              <img src="/images/chevron-up.png" />
              <p>{this.state.total_points}</p>
              <img src="/images/chevron-down.png"/>
            </div>

          </div>
          <div className="commentContent bodyText">
          <p id="answerContent">
            {this.state.content}
          </p>
          {this.makeAnwserEditable()}
        </div>
        
      </div>
      {this.getReplies()} 
    </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
  state:state
}
}

export default connect(mapStateToProps)(Answer)