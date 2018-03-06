import React, { Component } from 'react';
import './Comments.css';
export default class Answer extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
  componentDidMount(props){
    const { auto_id, content, total_points } = this.props.childProps;

    this.setState({auto_id:auto_id,content:content,total_points:total_points})
  }
  render() {
    return (
                <div className="commentContainer dp2-bs">
            <div className="commentDetails headerText lightPrimaryColor">
              <div className="userName"><img src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"/><div className="actualUserName"><p>Brandon</p></div><br /><div className="userPoints">320</div><p className="answeredText secondaryText">answered 3/2/2018</p> </div>
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