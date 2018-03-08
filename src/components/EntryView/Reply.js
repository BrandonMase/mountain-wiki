import React, { Component } from 'react';
import './Comments.css';
import { connect } from 'react-redux';
class Reply extends Component {
  constructor(props) {
    super(props);
    this.state={}

    this.addEdit = this.addEdit.bind(this);
  }
  addEdit() {
    let html = '';
    // console.log("THISPROPS",this.props)
    if (this.props.state.user_id == this.props.childProps.user_id) {
      console.log("THISPROPS",this.props)
      html = <div className="bodyText">
        <a href="#">edit your comment</a>
      </div>
    }

    return html
  }
  render() {
    return (
                  <div className="commentContainer replyComment dp1-bs">
            <div className="commentDetails headerText lightPrimaryColor">
          <div className="userName"><img src={this.props.childProps.picture}/><div className="actualUserName"><p>{this.props.childProps.name}</p></div></div>
            </div>

            <div className="commentContent bodyText">
              <p> 
                {this.props.childProps.content}
              </p>
          </div>
            {this.addEdit()}
            </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
  }
}

export default connect(mapStateToProps)(Reply);