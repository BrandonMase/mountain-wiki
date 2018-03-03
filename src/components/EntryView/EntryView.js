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
    document.getElementById('entryContentP').innerHTML = marked('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec eros congue ante tincidunt dignissim. In egestas maximus nisl, vel finibus leo egestas id. Duis vitae ornare nulla, eget hendrerit sem. Nam ultrices odio nunc, sit amet elementum eros mollis quis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas elementum rhoncus est. Nullam placerat nisi sit amet turpis efficitur aliquam. Proin interdum, felis in vehicula venenatis, lorem sem ultricies mauris, at iaculis quam eros condimentum mauris. Aenean a tellus id nibh pretium consequat. Maecenas erat mauris, eleifend at nunc non, vulputate auctor augue. Nam in ullamcorper tellus, at tincidunt libero. Suspendisse iaculis mauris sit amet arcu volutpat pretium et sit amet est. Fusce vehicula est et massa laoreet elementum. Proin ut vulputate justo, a fringilla sem. Mauris lobortis sit amet ipsum eu ultricies.');
  }
  render() {
    return (
      <div className="fullEntryContainer">
      <Entry />
      
        <div className="fullcommentsContainer">
          <div className="fullCommentChainContainer dp1-bs">
            <Answer />
            <Reply />
            <Reply />
            <Reply />
            <div className="addAComment secondaryText"><button className="greenColor">add a comment</button></div>  
          </div>
        </div>

                <div className="fullcommentsContainer">
          <div className="fullCommentChainContainer dp1-bs">
            <Answer />
            <Reply />
            <Reply />
            <Reply />
            <div className="addAComment secondaryText"><button className="greenColor">add a comment</button></div> 
          </div>
        </div>

                <div className="fullcommentsContainer">
          <div className="fullCommentChainContainer dp1-bs">
            <Answer />
            <Reply />
            <Reply />
            <Reply />
            <div className="addAComment secondaryText"><button className="greenColor">add a comment</button></div> 
          </div>
        </div>
      </div>  
    );
  }
}