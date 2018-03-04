import React, { Component } from 'react';
import './EntryView.css';
import './Comments.css';
import marked from 'marked';
import Entry from './Entry';
import Answer from './Answer';
import Reply from './Reply';
export default class  extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.getElementById('entryContentP').innerHTML = marked('# Lorem ipsum dolor sit amet, consectetur \r adipiscing elit. Etiam nec eros congue ante tincidunt dignissim. In egestas maximus nisl, vel finibus leo egestas id. Duis vitae ornare nulla, eget hendrerit sem. Nam ultrices odio nunc, sit amet elementum eros mollis quis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas elementum rhoncus est. Nullam placerat nisi sit amet turpis efficitur aliquam. Proin interdum, felis in vehicula venenatis, lorem sem ultricies mauris, at iaculis quam eros condimentum mauris. Aenean a tellus id nibh pretium consequat. Maecenas erat mauris, eleifend at nunc non, vulputate auctor augue. Nam in ullamcorper tellus, at tincidunt libero. Suspendisse iaculis mauris sit amet arcu volutpat pretium et sit amet est. Fusce vehicula est et massa laoreet elementum. Proin ut vulputate justo, a fringilla sem. Mauris lobortis sit amet ipsum eu ultricies.');
  }

  hasAnswers() {
    let html = [];

    for (let i = 0; i < Math.random() * 10; i++){
      let replies = []
      for (let j = 0; j < Math.random() * 50; j++){
        replies.push(<Reply/>)
      }
      html.push(
        <div className="fullcommentsContainer">
          <div className="fullCommentChainContainer dp1-bs">
            <Answer />
            {replies}
            <div className="addAComment secondaryText"><button className="greenColor">add a comment</button></div>
          </div>
        </div>  
        )
    }

    return html;
  }
  render() {
    return (
      <div className="fullEntryContainer">
        <Entry />
          {this.hasAnswers()}
      </div>  
    );
  }
}