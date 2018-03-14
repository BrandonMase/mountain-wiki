import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

export default class Comment extends Component {
    render() {
       console.log(this.props.childProps.entry_date)
        let date = this.props.childProps.date.slice(0,10).split("-")
        date = `${date[1]}/${date[2]}/${date[0]}`;

        let entry_date = this.props.childProps.entry_date.slice(0,10).split("-")
        entry_date = `${entry_date[1]}/${entry_date[2]}/${entry_date[0]}`;

        return (
        <div className="superMainProfilePostContainer">
        <div className="mainProfilePostContainer noMargin dp1-bs">
            
         
         <div className="postRightContainer">
           <div className="accentColor headerText commentCon">
           <NavLink className="entryLink" to={`/entry/${this.props.childProps.entry_id}`}>
             {this.props.childProps.title}
           </NavLink>
           </div>
           {!this.props.childProps.seen ?
          <div className="headerText privateText">this post is private</div> : ''}
         </div>
        </div>
            <div className="dp1-bs commentDiv">
                <p className="bodyText commentText lightPrimaryColor"> <NavLink to={`/u/${this.props.childProps.auto_id}`} className="authorLink alignRight">{this.props.childProps.name}</NavLink> {this.props.childProps.comment_points} points {date}</p>
                <p className="bodyText commentContent">{this.props.childProps.content}</p>
                
            </div>
        </div>
        );
    }
}