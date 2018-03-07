import React, { Component } from 'react';
import './Comments.css';
import './EntryView.css';

import marked from 'marked';
import Entry from './Entry';
import Answer from './Answer';
import Reply from './Reply';
import axios from 'axios';
export default class extends Component {

  constructor(props) {
    super(props);

    this.state = {
      entry: '',
      comments: [],
      newAnswer: null,
      user_id: 34,
      entry_id: null,
      date: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
    }

    this.getEntry = this.getEntry.bind(this);
    this.addAnswer = this.addAnswer.bind(this)
    this.addAnswerHTML = this.addAnswerHTML.bind(this)
      
  }

  componentDidMount(props) {
    const { id } = this.props.match.params
    this.setState({ entry_id: id })
    
    axios.get(`/api/getEntry/${id}`)
      .then(res => this.setState({ entry: res.data.entry[0], comments: res.data.comments }))
      .catch(e => console.log(e));
  }

  getEntry() {
    if (this.state.entry) {
      console.log("getEntry ran")
      return <Entry childProps={this.state.entry} />
    }
  }

  hasAnswers() {
    let html = [];
    if (this.state.comments !== []) {
      let comments = this.state.comments;
      comments = comments.sort((a, b) => b.total_points - a.total_points);
      comments.map(e => {
     
        html.push(
          <div className="fullcommentsContainer">
            <div id="bg1" className="fullCommentChainContainer dp1-bs">
              <Answer childProps={e} />
              {/* {this.getReplies()} */}
            </div>
          </div>
        )
      })
    }

    return html;
  }

  getReplies() {
    let html = [];
    let reply = Math.random() * 50;

    if (reply >= 5) {
      for (let i = 0; i < 5; i++) {
        html.push(<Reply />)
      }
      html.push(<div className="addAComment secondaryText"><button className="greenColor">See all comments</button></div>);
    }
    else {
      for (let i = 0; i <= reply; i++) {
        html.push(<Reply />)
      }
      html.push(<div className="addAComment secondaryText"><button className="greenColor">add a comment</button></div>);
    }

    return html;
  }

  addAnswer() {
    let comments = this.state.comments;
    let newAnswer = {content:this.state.newAnswer,name:this.state.user_id,date:this.state.date,picture:"http://lorempixel.com/400/200/",user_total_points:0,auto_id:34,total_points:0}
    comments.push(newAnswer)

    let newEntry = { ...this.state.entry }
    newEntry["answers"] = +newEntry.answers+1
    this.setState({ comments: comments,entry:newEntry},()=>this.getEntry())
    let obj = this.state
    axios.post('/api/addAnswer/',obj)
  }

  addAnswerHTML() {
    let html =
      <div id ="canAddAnswer"className="newAnswer dp1-bs">
        <div className="accentColor">
          Know the answer? Share with others!
        </div>
        <textarea className="bodyText" onChange={e => this.setState({newAnswer:e.target.value})} ></textarea>
        <div><button className="greenColor" onClick={this.addAnswer}>Add answer</button></div>
      </div>
    
    let comments = this.state.comments;

    let alreadyAnswered = false;
    alreadyAnswered = comments.map(e => {
      console.log("comment MAp", e.user_id,this.state.user_id);
      if(e.user_id == this.state.user_id){return true}
    })
    console.log("addAnswerHTML",alreadyAnswered)
    if (alreadyAnswered[0]) {
      html =
        <div id="cannotAddAnswer" className="newAnswer dp1-bs">
          <div className="accentColor">
            You already answered in this entry. Please edit your answer if you have to.
        </div>
        </div>
    }

    return html;
  }
  render() {
    return (
      <div className="fullEntryContainer">
        {/* {this.state.entry.content} */}
        {this.getEntry()}
        {this.hasAnswers()}
        {this.addAnswerHTML()}
      </div>  
    );
  }
}