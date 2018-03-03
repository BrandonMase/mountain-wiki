import React, { Component } from 'react';
import './Comments.css';
export default class Answer extends Component {
  render() {
    return (
                <div className="commentContainer dp2-bs">
            <div className="commentDetails headerText lightPrimaryColor">
              <div className="userName"><img src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"/><div className="actualUserName"><p>Brandon</p></div><br /><div className="userPoints">320</div><p className="answeredText secondaryText">answered 3/2/2018</p> </div>
              <div className="votesDiv">
                <img src="/images/chevron-up.png" />
                <p>50</p>
                <img src="/images/chevron-down.png"/>
              </div>
            </div>

            <div className="commentContent bodyText">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec eros congue ante tincidunt dignissim. In egestas maximus nisl, vel finibus leo egestas id. Duis vitae ornare nulla, eget hendrerit sem. Nam ultrices odio nunc, sit amet elementum eros mollis quis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas elementum rhoncus est. Nullam placerat nisi sit amet turpis efficitur aliquam. Proin interdum, felis in vehicula venenatis, lorem sem ultricies mauris, at iaculis quam eros condimentum mauris.

Aenean a tellus id nibh pretium consequat. Maecenas erat mauris, eleifend at nunc non, vulputate auctor augue. Nam in ullamcorper tellus, at tincidunt libero. Suspendisse iaculis mauris sit amet arcu volutpat pretium et sit amet est. Fusce vehicula est et massa laoreet elementum. Proin ut vulputate justo, a fringilla sem. Mauris lobortis sit amet ipsum eu ultricies.
              </p>

  
            </div>
            </div>
    );
  }
}