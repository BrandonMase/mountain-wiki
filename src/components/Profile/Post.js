import React, { Component } from 'react';

export default class Post extends Component {
  render() {
    let date = this.props.childProps.date.split("/")
    date = `${date[1]}/${date[2]}/${date[0]}`;
    return (
      <div className="mainProfilePostContainer dp1-bs">
         
          <div className="lightPrimaryColor"><p>{this.props.childProps.total_points}<br />votes</p></div>
         
        <div className="postRightContainer">
          <div className="accentColor headerText">
          <a className="entryLink" href={`/entry/${this.props.childProps.auto_id}`}>
            {this.props.childProps.title}
          </a>
          </div>
          <div className="bodyText">
            <span className="answers"><strong>{this.props.childProps.answers}</strong> comments</span>
            <span>posted on {date}</span>
          </div>
        </div>
      </div>
    );
  }
}