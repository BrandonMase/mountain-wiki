import React, { Component } from 'react';
import './LandingPage.css';
export default class QuestionDiv extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      total_points: 0,
      answers: 0,
      username: '',
      labels: '',
      date: '',
      is_entry:'',
    }
  }
  componentDidMount(props) {
    const { title, total_points, answers, labels, date,auto_id,name } = this.props.childProps
    console.log(this.props)
    this.setState({auto_id:auto_id, title: title, total_points: total_points, answers: answers, username: name, labels: labels, date: date },()=>console.log(this.state));
    
  }

  render() {
    return (
      <div className="newQuestionDiv dp2-bs">
        <div className="mobileVotesDiv lightPrimaryColor">
          <div className="votes primaryText">{this.state.total_points}<br /><img className="upAndDownVotes" src="/images/chevron-up.png" /><img className="upAndDownVotes" src="/images/chevron-down.png" /></div>
          <div className="votes primaryText">{this.state.answers}<br />A</div>
        </div>
        <div className="votesDiv">
          <div className="votes votesId lightPrimaryColor"><p>{this.state.total_points}<br />votes</p></div>
          <div className="votes answerId accentColor"><p>{this.state.answers} <br />answers</p></div>
        </div>
        <div className="rightQuestionDiv">
          <div className="questionHeaderText"><a href={`/entry/${this.state.auto_id}`}>{this.state.title}</a>
            is_entry:{this.state.is_entry.toString()}
            {this.props.childProps.is_question}
            {this.props.childProps.is_snippet}
          </div>
          <div className="questionLabel ">Javascript</div>
          <div className="questionLabel ">Javascript</div>
          <div className="questionDetails">by {this.state.username} {this.state.date}</div>
        </div>
      </div>
    );
  }
}