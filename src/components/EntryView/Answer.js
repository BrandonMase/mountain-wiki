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
    const { auto_id, content, total_points, date, name, picture, user_total_points, user_id,replies } = this.props.childProps;
    // console.log(this.props.childProps)
    this.setState({ auto_id: auto_id, content: content, newContent: content, total_points: total_points, date: date, name: name, picture: picture, user_total_points: user_total_points, user_id: +user_id,replies:replies })
    // document.getElementById('editAnswerContent').style.display = "none";
  }

  makeAnwserEditable() {
    const { user_id } = this.props.state;
    // console.log(this.props)
    let html = '';
    if (this.state.user_id === user_id) {
      html = <div className="editContainer secondaryText">
        <textarea onChange={e => this.setState({ newContent: e.target.value })} value={this.state.newContent} id="editAnswerContent">{this.state.content}</textarea>
        <a id="clickEdit" href="#" onClick={e => this.showEditableAnswer(e)}>edit answer</a>
        <button id='submitAnswer' className="greenColor" onClick={() => this.updateAnswer()}>submit answer</button>
        <button id='cancelAnswer' className="redColor" onClick={() => this.cancelAnswer()}>cancel edit</button>
      </div>
    }
    // document.getElementById('editAnswerContent').style.display = "none";
    return html;
  }

  updateAnswer() {
    document.getElementById('editAnswerContent').style.display = "none";
    document.getElementById('answerContent').style.display = "inherit";
    document.getElementById('clickEdit').style.display = "inherit";
    document.getElementById('submitAnswer').style.display = "none";
    document.getElementById('cancelAnswer').style.display = "none";
    this.setState({content:this.state.newContent})
    axios.put("/api/updateComment",this.state)
  }

  cancelAnswer() {
    document.getElementById('editAnswerContent').style.display = "none";
    document.getElementById('answerContent').style.display = "inherit";
    document.getElementById('clickEdit').style.display = "inherit";
    document.getElementById('submitAnswer').style.display = "none";
    document.getElementById('cancelAnswer').style.display = "none";
    this.setState({newContent:this.state.content})
  }

  showEditableAnswer(e){
    e.preventDefault();
    document.getElementById('editAnswerContent').style.display = "inherit";
    document.getElementById('answerContent').style.display = "none";
    document.getElementById('clickEdit').style.display = "none";
    document.getElementById('submitAnswer').style.display = "initial";
    document.getElementById('cancelAnswer').style.display = "initial";
  }

  getReplies() {
    let html = [];
    let reply = Math.random() * 50;
    if (this.state.replies) {
      if (this.state.replies.length >= 5 && !this.state.seeAllComments) {
        for (let i = 0; i < 5; i++) {
          html.push(<Reply childProps={this.state.replies[i]} />)
        }
        html.push(<div className="addAComment secondaryText"><button className="greenColor" onClick={e => this.setState({ seeAllComments: true })}>See all {this.state.replies.length} comments</button></div>);
      }
      else {
        this.state.replies.map(e => {
          html.push(<Reply childProps={e} />)
          
        })
        html.push(<div className="addAComment secondaryText"><button className="greenColor" onClick={e=>this.addCommentHTML()}>add a comment</button></div>);
      }
    }
    else {
      html.push(<div className="addAComment secondaryText"><button className="greenColor" onClick={e=>this.addCommentHTML()}>add a comment</button></div>);
    } 

    return html;
  }
  render() {
    return (
      <div>
                <div className="commentContainer dp2-bs">
        <div className="commentDetails headerText lightPrimaryColor">
          <div className="userName"><img src={this.state.picture} /><div className="actualUserName"><p>{this.state.name}</p></div><br /><div className="userPoints">{this.state.user_total_points}</div><p className="answeredText secondaryText">answered {this.state.date}</p> </div>
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
        <textarea></textarea>
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