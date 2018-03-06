import React, { Component } from 'react';
import './EntryView.css';
import './Comments.css';
import marked from 'marked';
import Entry from './Entry';
import Answer from './Answer';
import Reply from './Reply';
import axios from 'axios';
export default class  extends Component {

  constructor(props) {
    super(props);

    this.state = {
      entry: '',
      comments:null,
    }

    this.getEntry = this.getEntry.bind(this);
      
  }

  componentDidMount(props) {
    const { id } = this.props.match.params
    
    axios.get(`/api/getEntry/${id}`)
      .then(res => this.setState({ entry: res.data.entry[0], comments: res.data.comments }))
      .catch(e => console.log(e));
  }

  getEntry() {
    if (this.state.entry) {
      return <Entry childProps={this.state.entry}/>
    }
  }

  hasAnswers() {
    let html = [];
    if (this.state.comments) {
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
      for (let i = 0; i < 5; i++){
        html.push(<Reply />)
      }
      html.push(<div className="addAComment secondaryText"><button className="greenColor">See all comments</button></div>);
    }
    else {
      for (let i = 0; i <= reply; i++){
        html.push(<Reply />)
      }
      html.push(<div className="addAComment secondaryText"><button className="greenColor">add a comment</button></div>);
    }

    return html;
  }
  render() {
    return (
      <div className="fullEntryContainer">
        {/* {this.state.entry.content} */}
        {this.getEntry()}
          {this.hasAnswers()}
      </div>  
    );
  }
}