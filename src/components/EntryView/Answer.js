import React, { Component } from 'react';
import './Comments.css';
import axios from 'axios'
export default class Answer extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
    this.makeAnwserEditable = this.makeAnwserEditable.bind(this)
    this.showEditableAnswer = this.showEditableAnswer.bind(this)
    this.updateAnswer = this.updateAnswer.bind(this)
  }
  componentDidMount(props) {
    const { auto_id, content, total_points, date, name, picture, user_total_points, user_id } = this.props.childProps;
    // console.log(this.props.childProps)
    this.setState({ auto_id: auto_id, content: content, newContent: content, total_points: total_points, date: date, name: name, picture: picture, user_total_points: user_total_points, user_id: +user_id })
    // document.getElementById('editAnswerContent').style.display = "none";
  }

  makeAnwserEditable() {
    let html = '';
    if (this.state.user_id === 34) {
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
  render() {
    return (
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
        <br/>
            </div>
    );
  }
}