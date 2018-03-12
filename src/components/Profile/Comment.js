import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

export default class Comment extends Component {
    render() {
        let date = this.props.childProps.date.split("/")
        date = `${date[1]}/${date[2]}/${date[0]}`;
        return (
        <div className="superMainProfilePostContainer">
        <div className="mainProfilePostContainer noMargin dp1-bs">
                
            <div className="lightPrimaryColor"><p>{this.props.childProps.entry_points}<br />votes</p></div>
         
         <div className="postRightContainer">
           <div className="accentColor headerText">
           <NavLink className="entryLink" to={`/entry/${this.props.childProps.entry_id}`}>
             {this.props.childProps.title}
           </NavLink>
           </div>
           <div className="bodyText">
             <span className="answers"><strong>{this.props.childProps.answers}</strong> comments</span>
             <span>posted on {this.props.childProps.entry_date} by <NavLink to={`/u/${this.props.childProps.master_contributor}`} className="authorLink">{this.props.childProps.entry_name}</NavLink></span>
             
           </div>
         </div>
        </div>
            <div className="dp1-bs commentDiv">
                <p className="bodyText commentText lightPrimaryColor"> <NavLink to={`/u/${this.props.childProps.auto_id}`} className="authorLink alignRight">{this.props.childProps.name}</NavLink> {this.props.childProps.total_points} points {date}</p>
                <p className="bodyText commentContent">{this.props.childProps.content}</p>
                
            </div>
        </div>
        );
    }
}