import React, { Component } from 'react';
import './Comments.css';
export default class Answer extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }
  componentDidMount(props){
    const { auto_id, content, total_points,date,name,picture,user_total_points } = this.props.childProps;
    console.log(this.props.childProps)
    this.setState({auto_id:auto_id,content:content,total_points:total_points,date:date,name:name,picture:picture,user_total_points:user_total_points})
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
          <p>
            {this.state.content}
              </p>

  
            </div>
            </div>
    );
  }
}