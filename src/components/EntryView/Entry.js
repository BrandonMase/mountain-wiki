import React, { Component } from 'react';
import './EntryView.css';
export default class Entry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      total_points: 0,
      answers:0,
      entry_id:null,
    }
  }

  componentDidMount(props) {
    const { title, content, total_points, answers,entry_id } = this.props.childProps;
    this.setState({title:title,content:content,total_points:total_points,answers:answers,entry_id:entry_id})
  }

  hasEntry() {
    let html = '';
    if (this.state.entry_id) {
      html = <div className="entryDesc headerText greenColor">
        <a href="#">This question has an entry<div><img src="images/approval.png" /></div></a>
      </div>
    }  
  
    return html;
  }
  render() {
    return (
      <div className="entryContainer dp1-bs">
        <div className="entryVotesDiv">
        </div>  
        <div className="entryHeader headerText accentColor">
          <p>{this.state.title}</p>
        </div>
        {this.hasEntry()}
        <div className="entryContent bodyText">
          
          <p id="entryContentP">
            {this.state.content}          
</p>
          </div>
          <div className="entryBottom primaryText">
            <div className="votesContainer">  
              <div className="votesBottom">
              <p className="headerText greenColor">{this.state.total_points}</p>
              </div>
              <p className="headerText">Votes</p>
            </div>

            <div className="votesContainer">  
              <div className="votesBottom">
              <p className="headerText redColor">{this.state.answers}</p>
              </div>
              <p className="headerText">Answers</p>
            </div>
        
        </div> 
         
        </div>
    );
  }
}