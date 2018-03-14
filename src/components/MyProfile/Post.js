import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
export default class Post extends Component {
  render() {
    let date = this.props.childProps.date.slice(0,10).split("-")
    date = `${date[1]}/${date[2]}/${date[0]}`;
    return (
      <div className="mainProfilePostContainer dp1-bs">
         
          <div className="lightPrimaryColor"><p>{this.props.childProps.total_points}<br />votes</p></div>
         
        <div className="postRightContainer">
          <div className="primaryColor headerText isPost">
          <NavLink className="entryLink" to={`/entry/${this.props.childProps.auto_id}`}>
            {this.props.childProps.title}
          </NavLink>
          </div>
          <div className="bodyText">
            <span className="answers"><strong>{this.props.childProps.answers}</strong> comments</span>
            <span>posted on {date}</span>
          </div>
          {!this.props.childProps.seen ?
          <div className="headerText privateText">this post is private</div> : ''}
        </div>
      </div>
    );
  }
}